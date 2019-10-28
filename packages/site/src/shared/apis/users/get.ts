import { getToken } from "../../../domains/auth/get-token";
import { UserResponse } from "./response";

export const usersGetApi = async (): Promise<UserResponse> => {
  const token = await getToken();
  
  try {
    const res = await fetch(`/.netlify/functions/users?authorization=${token}`);
    return await res.json();
  } catch(e) {
    throw e;
  }
}