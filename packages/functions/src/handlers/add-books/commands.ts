import fetch from "node-fetch";
import { BookshelvesRepository } from "../../domains/bookshelf/repository";
import { UserOwnedBook } from "../../domains/user-owned-book";
import { UserOwnedBooksRepository } from "../../domains/user-owned-book/repository";

const getNewArrivals = async () => {
  const res = await fetch('https://kindle-newer-book.netlify.com/books.json');
  const json = await res.json();
  return json.itemsList;
}

export class AddBooksCommands {
  constructor(
    private readonly booksRepo: UserOwnedBooksRepository,
    private readonly bookshelvesRepo: BookshelvesRepository,
  ) {}
  
  async addBooks(books: UserOwnedBook[]): Promise<void> {
    await Promise.all(books.map(async book => {
      this.booksRepo.putBook(book);
      this.bookshelvesRepo.putBook(book);
    }));
  }
}