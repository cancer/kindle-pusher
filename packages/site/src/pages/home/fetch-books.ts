import { basePath } from "../../shared/apis/base-path";

export interface Book {
  asin: string;
  detailPageUrl: string;
  productUrl: string;
  ignored: boolean;
}

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${basePath}/books`);
  return res.json();
}