import { createAuthClient } from "../auth-client";

export interface User {
  email: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export const getUser = async (): Promise<User> => {
  const client = await createAuthClient();
  try {
    return await client.getUser();
  } catch(e) {
    throw e;
  }
}

export const existUser = async (): Promise<boolean> => {
  try {
    const user =  await getUser();
    return !!user;
  } catch(e) {
    throw e;
  }
}