import { usersPostApi } from "../../../shared/apis/users/post";

export const createUser = async () => {
  try {
    await usersPostApi();
  } catch(e) {
    throw e;
  }
}