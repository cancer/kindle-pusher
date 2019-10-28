import { getToken } from "../../../domains/auth/get-token";
import { basePath } from "../base-path";
import { UserResponse } from "./response";
import Cookies from 'js-cookie';

const setCookie = (token: string) => {
  const stored = Cookies.get('token');
  if (typeof stored === 'undefined') {
    Cookies.set('token', token, { expires: 1 });
    return;
  }
  
  if (stored !== token) {
    Cookies.remove('token');
    Cookies.set('token', token, { expires: 1 });
    return;
  }
}

export const usersGetApi = async (): Promise<UserResponse> => {
  const token = await getToken();
  setCookie(token);
  
  try {
    const res = await fetch(`${basePath}/users?authorization=${token}`);
    return await res.json();
  } catch(e) {
    throw e;
  }
}