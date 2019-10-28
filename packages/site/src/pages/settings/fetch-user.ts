import { usersGetApi } from "../../shared/apis/users/get";

interface User {
  pushDestination: string;
  bookShelfApi: string;
}
export const fetchUser = async (): Promise<User> => {
  try {
    const res = await usersGetApi();
    if (res.user === null) {
      return {
        pushDestination: '',
        bookShelfApi: '',
      }
    }
    
    return {
      pushDestination: res.user.pushDestination,
      bookShelfApi: res.user.bookShelfApi,
    }
  } catch(e) {
    throw e;
  }
}