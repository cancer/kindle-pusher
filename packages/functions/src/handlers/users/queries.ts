import { injectable } from "inversify";
import { User } from "../../domains/user";
import { UsersRepository } from "../../domains/user/repository";

@injectable()
export class UsersQueries {
  constructor(private usersRepo: UsersRepository) {}
  
  async getUser(userId: string): Promise<User | null> {
    return this.usersRepo.get(userId);
  }
}