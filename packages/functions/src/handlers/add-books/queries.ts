import { injectable } from "inversify";
import { UserOwnedBook } from "../../domains/user-owned-book";
import { UserOwnedBooksRepository } from "../../domains/user-owned-book/repository";
import { UsersRepository } from "../../domains/user/repository";

@injectable()
export class AddBooksQueries {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly booksRepo: UserOwnedBooksRepository,
  ) {}
  
  async getLatestUserOwnedBooks(): Promise<UserOwnedBook[]> {
    const users = await this.usersRepo.getAll();
    const books = await Promise.all(users.map(async user => {
      return await this.booksRepo.getLatest(user);
    }));
    return books.flat();
  }
}