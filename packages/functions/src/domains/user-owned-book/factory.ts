import { values } from "faunadb";
import {
  UserOwnedBookshelfApiResponse,
  UserOwnedBookshelfItemResponse
} from "../../lib/apis/user-owned-bookshelf/response";
import { UserOwnedBookDocument } from "../../lib/db/book";
import { BookshelfDocument } from "../../lib/db/bookshelf";
import { LambdaResult } from "../../lib/db/lambda-result";
import { Book, UserOwnedBook } from "./index";

export const makeBooks = (books: values.Document<BookshelfDocument>[], userOwnedBooks: LambdaResult<values.Document<UserOwnedBookDocument>>): Book[] => {
  return books.map(book => {
    const userOwnedBook = userOwnedBooks.data.find(v => v.data.asin === book.data.asin);
    return {
      asin: book.data.asin,
      title: book.data.title,
      detailPageUrl: book.data.detailPageUrl,
      productUrl: book.data.productUrl,
      ignored: userOwnedBook ? userOwnedBook.data.ignored : false,
    };
  });
};


export const adaptLatest = (res: UserOwnedBookshelfApiResponse, ownedBookAsins: string[], userId: string): UserOwnedBook[] => {
  const latest = res.itemsList.filter(v => !ownedBookAsins.includes(v.asin));
  
  return latest.map(book => {
    return {
      asin: book.asin,
      title: book.title,
      detailPageUrl: book.detailPageUrl,
      productUrl: book.productUrl,
      ignored: false,
      user: userId,
    };
  })
}