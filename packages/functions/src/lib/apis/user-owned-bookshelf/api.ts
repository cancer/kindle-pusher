import { injectable } from "inversify";
import fetch from "node-fetch";
import { UserOwnedBookshelfApiResponse } from "./response";

@injectable()
export class UserOwnedBookshelfApi {
  constructor() {}
  
  async get(bookshelfApiEndpoint: string): Promise<UserOwnedBookshelfApiResponse> {
    const res = await fetch(bookshelfApiEndpoint);
    return await res.json() as UserOwnedBookshelfApiResponse;
  }
}