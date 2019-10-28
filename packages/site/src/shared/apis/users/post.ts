import { getToken } from "../../../domains/auth/get-token";
import { basePath } from "../base-path";

export interface UsersPostDto {
  pushDestination: string;
  bookShelfApi: string;
}

export const usersPostApi = async (dto: UsersPostDto) => {
  const token = await getToken();
  
  try {
    await fetch(`${basePath}/users`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(dto),
    });
  } catch(e) {
    throw e;
  }
}