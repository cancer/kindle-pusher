import { query, values } from "faunadb";
import { injectable } from "inversify";
import { DateTime } from "luxon";
import { UserOwnedBookshelfApi } from "../../lib/apis/user-owned-bookshelf/api";
import { UserOwnedBookDocument } from "../../lib/db/book";
import { BookshelfDocument } from "../../lib/db/bookshelf";
import { LambdaResult } from "../../lib/db/lambda-result";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { User } from "../user";
import { makeBooks, adaptLatest } from "./factory";
import { Book, UserOwnedBook } from "./index";

@injectable()
export class UserOwnedBooksRepository {
  constructor(
    private readonly provider: FaunadbProvider,
    private readonly api: UserOwnedBookshelfApi,
  ) {}
  
  async getAllByUser(userId: string): Promise<Book[]> {
    const userOwnedBooks = await this.getDocuments(userId);
    const bookDocuments = await Promise.all(userOwnedBooks.data.map(bookRef => {
      const bookByAsinRef = query.Match(query.Index('bookshelf_by_asin'), bookRef.data.asin);
      return this.provider.query<values.Document<BookshelfDocument>>(
        query.Get(bookByAsinRef),
      );
    }));
  
    return makeBooks(bookDocuments, userOwnedBooks)
  }
  
  async getLatest(user: User): Promise<UserOwnedBook[]> {
    const res = await this.api.get(user.bookShelfApi);
    const ownedBookAsins = (await this.getAllByUser(user.id)).map(v => v.asin);
    return adaptLatest(res, ownedBookAsins, user.id);
  }
  
  async putBook(book: UserOwnedBook) {
    const bookRef = query.Match(query.Index('all_books'), [book.asin, book.user]);
    const dateTime = DateTime.local().toISO();
  
    if (!await this.provider.exists(bookRef)) {
      console.log(`--- Create book: ${book.asin} by ${book.user}`);
      this.provider.query(query.Create(query.Collection('books'), {
        data: {
          user: book.user,
          asin: book.asin,
          ignored: book.ignored,
          createdAt: dateTime,
          updatedAt: dateTime,
        },
      }));
    }
  }
  
  private getDocuments(userId: string): Promise<LambdaResult<values.Document<UserOwnedBookDocument>>> {
    const booksByUserRef = query.Match(query.Index('books_by_user'), userId);
    return this.provider.query<LambdaResult<values.Document<UserOwnedBookDocument>>>(
      query.Map(
        query.Paginate(booksByUserRef),
        query.Lambda('X', query.Get(query.Var('X'))),
      ),
    );
  }
}
