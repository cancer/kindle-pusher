import { createAuthClient } from "../auth-client";

export const existUser = async (): Promise<boolean> => {
  const client = await createAuthClient();
  try {
    const user =  await client.getUser();
    return !!user;
  } catch(e) {
    throw e;
  }
}