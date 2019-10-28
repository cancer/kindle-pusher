import { createAuthClient } from "../../../shared/auth-client";

export const handleRedirect = async () => {
  try {
    const client = await createAuthClient();
    await client.handleRedirectCallback();
  } catch(e) {
    throw e;
  }
}