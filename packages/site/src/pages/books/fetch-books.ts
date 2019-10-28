import { basePath } from "../../shared/apis/base-path";

export const fetchBooks = async () => {
  const res = await fetch(`${basePath}/books`);
  return res.json();
}