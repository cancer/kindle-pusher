import { booksGetApi } from "../../shared/apis/books/get";

export interface Book {
  asin: string;
  detailPageUrl: string;
  productUrl: string;
  ignored: boolean;
}

export const fetchBooks = async (): Promise<Book[]> => {
  return booksGetApi();
}