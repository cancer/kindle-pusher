import { query } from "faunadb";
import { injectable } from "inversify";
import { DateTime } from "luxon";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { UserOwnedBook } from "../user-owned-book";

@injectable()
export class BookshelvesRepository {
  constructor(private readonly provider: FaunadbProvider) {}
  
  async putBook(book: UserOwnedBook) {
    const bookRef = query.Match(query.Index('bookshelf_by_asin'), book.asin);
    const dateTime = DateTime.local().toISO();

    console.log(`${book.asin} ${(await this.provider.exists(bookRef)) ? 'has been registered.' : 'is not registered.'}`);
    if (!await this.provider.exists(bookRef)) {
      console.log(`--- Create bookshelf: ${book.asin}`);
      this.provider.query(query.Create(query.Collection('bookshelf'), {
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
  }
}