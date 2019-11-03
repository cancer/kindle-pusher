import { Expr, query, values } from "faunadb";
import { injectable } from "inversify";
import { UserDocument } from "../../lib/db/user";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { AuthToken } from "../auth-token/auth-token";
import { makeUser } from "./factory";
import { User } from "./index";

@injectable()
export class UsersRepository {
  constructor(private readonly provider: FaunadbProvider) {}
  
  async get(authToken: AuthToken): Promise<User | null> {
    const userRef = query.Match(query.Index('users_by_id'), authToken.id);
    if (!await this.exists(userRef)) {
      return null;
    }
    
    const doc = await this.provider.query<values.Document<UserDocument>>(query.Get(userRef));
    return makeUser(doc);
  }
  
  private exists(userRef: Expr): Promise<boolean> {
    return this.provider.query<boolean>(query.Exists(userRef));
  }
}