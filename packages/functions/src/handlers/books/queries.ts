import { injectable } from "inversify";
import { Book } from "../../domains/user-owned-book";
import { UserOwnedBooksRepository } from "../../domains/user-owned-book/repository";

@injectable()
export class BooksQueries {
  constructor(private readonly booksRepo: UserOwnedBooksRepository) {}
  
  getBooks(userId: string): Promise<Book[]> {
    return this.booksRepo.getAllByUser(userId);
  }
}