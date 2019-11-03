import { injectable } from "inversify";
import { Book } from "../../domains/book";
import { BooksRepository } from "../../domains/book/repository";

@injectable()
export class BooksQueries {
  constructor(private readonly booksRepo: BooksRepository) {}
  
  getBooks(userId: string): Promise<Book[]> {
    return this.booksRepo.getAllByUser(userId);
  }
}