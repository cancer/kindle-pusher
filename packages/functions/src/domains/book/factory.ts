import { values } from "faunadb";
import { BookDocument } from "../../lib/db/book";
import { BookshelfDocument } from "../../lib/db/bookshelf";
import { LambdaResult } from "../../lib/db/lambda-result";
import { Book } from "./index";

export const makeBooks = (books: values.Document<BookshelfDocument>[], userOwnedBooks: LambdaResult<values.Document<BookDocument>>): Book[] => {
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
