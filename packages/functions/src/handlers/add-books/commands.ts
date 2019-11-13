import { query, values } from "faunadb";
import { DateTime } from "luxon";
import { LambdaResult } from "../../lib/db/lambda-result";
import { UserDocument } from "../../lib/db/user";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { container } from "../../shared/inversify.config";
import fetch from "node-fetch";

interface Book {
  acquisitionDate: number;
  asin: string;
  authors: string[];
  detailPageUrl: string;
  lastAnnotationDate: number;
  percentageRead: number;
  productUrl: string;
  title: string;
  webReaderUrl: string;
}

interface Books {
  length: number;
  itemsList: Book[];
}

interface BookData {
  asin: string;
  title: string;
  detailPageUrl: string;
  productUrl: string;
  user: string;
}

const getNewArrivals = async () => {
  const res = await fetch('https://kindle-newer-book.netlify.com/books.json');
  const json = await res.json();
  return json.itemsList;
}

const getBooks = async (users: UserDocument[]): Promise<BookData[]> => {
  const result = await Promise.all(users.map(async user => {
    const res = await fetch(user.bookShelfApi);
    const json = await res.json() as Books;
    return json.itemsList.map(book => {
      return {
        asin: book.asin,
        title: book.title,
        detailPageUrl: book.detailPageUrl,
        productUrl: book.productUrl,
        user: user.auth0Id,
      };
    });
  }));
  
  return result.flat();
};

const createBookshelf = async (book: BookData) => {
  const client = container.get(FaunadbProvider).provide();
  const bookRef = query.Match(query.Index('bookshelf_by_asin'), book.asin);
  const dateTime = DateTime.local().toISO();
  
  console.log(`${book.asin} ${(await client.query<boolean>(query.Exists(bookRef))) ? 'has been registered.' : 'is not registered.'}`);
  if (!await client.query<boolean>(query.Exists(bookRef))) {
    console.log(`--- Create bookshelf: ${book.asin}`);
    client.query(query.Create(query.Collection('bookshelf'), {
      data: {
        asin: book.asin,
        title: book.title,
        detailPageUrl: book.detailPageUrl,
        productUrl: book.productUrl,
        createdAt: dateTime,
        updatedAt: dateTime,
      }
    }));
  }
};

const createBooks = async (book: BookData) => {
  const client = container.get(FaunadbProvider).provide();
  const bookRef = query.Match(query.Index('all_books'), [book.asin, book.user]);
  const dateTime = DateTime.local().toISO();
  
  if (!await client.query<boolean>(query.Exists(bookRef))) {
    console.log(`--- Create book: ${book.asin} by ${book.user}`);
    client.query(query.Create(query.Collection('books'), {
      data: {
        user: book.user,
        asin: book.asin,
        ignored: false,
        createdAt: dateTime,
        updatedAt: dateTime,
      },
    }));
  }
};

const getUserBookData = async (): Promise<BookData[]> => {
  const client = container.get(FaunadbProvider).provide();
  console.log('--- Get user bookshelf apis')
  const users = await client.query<LambdaResult<values.Document<UserDocument>>>(
    query.Map(
      query.Paginate(
        query.Match(
          query.Index('all_users'),
        )
      ),
      query.Lambda('X', query.Get(query.Var('X'))),
    )
  );
  
  return getBooks(
    users.data.map(user => {
      return user.data;
    }).filter(v => !!v.bookShelfApi)
  );
}

export class AddBooksCommands {
  constructor() {}
  
  async addBooks(): Promise<void> {
    const books = await getUserBookData();
    books.forEach(async book => {
      await createBookshelf(book);
      await createBooks(book);
    });
  }
}