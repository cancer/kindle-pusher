import { createAuthClient } from "../../shared/auth-client";
import { existUser } from "../../shared/user/index";

export const login = async () => {
  const client = await createAuthClient();
  
  try {
    if (!await existUser()) {
      client.loginWithRedirect()
      return;
    }
  } catch(_) {
    client.loginWithRedirect()
    return;
  }
}