import { usersGetApi } from "../../../shared/apis/users/get";

export const existUser = async (): Promise<boolean> => {
  try {
    const res = await usersGetApi();
    return res.user !== null;
  } catch(e) {
    throw e;
  }
}