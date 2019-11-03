import { query, values } from "faunadb";
import { injectable } from "inversify";
import { LambdaResult } from "../../handlers/add-books";
import { BookDocument } from "../../lib/db/book";
import { BookshelfDocument } from "../../lib/db/bookshelf";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { makeBooks } from "./factory";
import { Book } from "./index";

@injectable()
export class BooksRepository {
  constructor(private readonly provider: FaunadbProvider) {}
  
  async getAllByUser(userId: string): Promise<Book[]> {
    const userOwnedBooks = await this.getUserOwnedBookDocuments(userId);
    const bookDocuments = await Promise.all(userOwnedBooks.data.map(bookRef => {
      const bookByAsinRef = query.Match(query.Index('bookshelf_by_asin'), bookRef.data.asin);
      return this.provider.query<values.Document<BookshelfDocument>>(
        query.Get(bookByAsinRef),
      );
    }));
  
    return makeBooks(bookDocuments, userOwnedBooks)
  }
  
  private getUserOwnedBookDocuments(userId: string): Promise<LambdaResult<values.Document<BookDocument>>> {
    const booksByUserRef = query.Match(query.Index('books_by_user'), userId);
    return this.provider.query<LambdaResult<values.Document<BookDocument>>>(
      query.Map(
        query.Paginate(booksByUserRef),
        query.Lambda('X', query.Get(query.Var('X'))),
      ),
    );
  }
}
