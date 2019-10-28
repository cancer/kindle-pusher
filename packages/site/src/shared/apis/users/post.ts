import { getToken } from "../../../domains/auth/get-token";

export const usersPostApi = async () => {
  const token = await getToken();
  
  try {
    await fetch('/.netlify/functions/users', {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'POST',
    });
  } catch(e) {
    throw e;
  }
}