import { usersPostApi, UsersPostDto } from "../../shared/apis/users/post";

export const updateUser = async (dto: UsersPostDto) => {
  try {
    await usersPostApi(dto);
  } catch(e) {
    throw e;
  }
}