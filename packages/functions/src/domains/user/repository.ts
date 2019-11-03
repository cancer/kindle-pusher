import { Expr, query, values } from "faunadb";
import { injectable } from "inversify";
import { DateTime } from "luxon";
import { UserDocument } from "../../lib/db/user";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { makeUser } from "./factory";
import { User } from "./index";

export interface PutUserInput {
  userId: string;
  bookshelfApi: string;
  pushDestination: string;
}

@injectable()
export class UsersRepository {
  constructor(private readonly provider: FaunadbProvider) {}
  
  async get(userId: string): Promise<User | null> {
    const userRef = query.Match(query.Index('users_by_id'), userId);
    try {
      if (!await this.exists(userRef)) {
        return null;
      }
  
      const doc = await this.getUserDocument(userRef);
      return makeUser(doc);
    } catch(e) {
      throw e;
    }
  }
  
  async putUser(input: PutUserInput): Promise<void> {
    const userRef = query.Match(query.Index('users_by_id'), input.userId);
    const dateTime = DateTime.local().toISO()
  
    try {
      if (await this.exists(userRef)) {
        const doc = await this.getUserDocument(userRef);
        await this.provider.query(query.Update(doc.ref, {
          data: {
            bookshelfApi: input.bookshelfApi,
            pushDestination: input.pushDestination,
            updatedAt: dateTime,
          }
        }));
        return;
      }
  
      await this.provider.query(query.Create(query.Collection('users'), {
        data: {
          auth0Id: input.userId,
          bookshelfApi: input.bookshelfApi,
          pushDestination: input.pushDestination,
          createdAt: dateTime,
          updatedAt: dateTime,
        }
      }));
    } catch(e) {
      throw e;
    }
  }
  
  private getUserDocument(userRef: Expr): Promise<values.Document<UserDocument>> {
    return this.provider.query<values.Document<UserDocument>>(query.Get(userRef));
  }
  
  private exists(userRef: Expr): Promise<boolean> {
    return this.provider.query<boolean>(query.Exists(userRef));
  }
}