import { getToken } from "../../../domains/auth/get-token";
import { basePath } from "../base-path";
import { UserResponse } from "./response";

export const usersGetApi = async (): Promise<UserResponse> => {
  const token = await getToken();
  
  try {
    const res = await fetch(`${basePath}/users?authorization=${token}`);
    return await res.json();
  } catch(e) {
    throw e;
  }
}