import { injectable } from "inversify";
import { PutUserInput, UsersRepository } from "../../domains/user/repository";

@injectable()
export class UsersCommands {
  constructor(private readonly usersRepo: UsersRepository) {}
  
  async putUser(input: PutUserInput): Promise<void> {
    try {
      await this.usersRepo.putUser(input);
    } catch(e) {
      throw e;
    }
  }
}