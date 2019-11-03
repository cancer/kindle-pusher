import { injectable } from "inversify";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { User } from "../../domains/user";
import { UsersRepository } from "../../domains/user/repository";

@injectable()
export class UsersQueries {
  constructor(private usersRepo: UsersRepository) {}
  
  async getUser(authToken: AuthToken): Promise<User | null> {
    if (!await this.usersRepo.exists(authToken)) {
      return null;
    }
    
    return this.usersRepo.get(authToken);
  }
}