import { createAuthClient } from "../../shared/auth-client";

export const getToken = async (): Promise<string> => {
  try {
    const client = await createAuthClient();
    console.log(await client.getUser())
    const claim = await client.getIdTokenClaims();
    return claim.__raw;
  } catch(e) {
    throw e;
  }
}