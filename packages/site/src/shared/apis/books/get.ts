import { getToken } from "../../../domains/auth/get-token";
import { basePath } from "../base-path";

export const booksGetApi = async () => {
  const token = await getToken();
  
  try {
    const res = await fetch(`${basePath}/books?authorization=${token}`);
    return res.json();
  } catch(e) {
    throw e;
  }
};