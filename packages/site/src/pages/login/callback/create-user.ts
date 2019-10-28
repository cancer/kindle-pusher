import { usersPostApi } from "../../../shared/apis/users/post";

export const createUser = async () => {
  const dto = {
    pushDestination: '',
    bookShelfApi: '',
  };
  
  try {
    await usersPostApi(dto);
  } catch(e) {
    throw e;
  }
}