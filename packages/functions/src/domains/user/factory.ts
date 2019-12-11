import { values } from "faunadb";
import { LambdaResult } from "../../lib/db/lambda-result";
import { UserDocument } from "../../lib/db/user";
import { User } from "./index";

export const makeUser = (doc: values.Document<UserDocument>): User => {
  return {
    id: doc.data.auth0Id,
    bookShelfApi: doc.data.bookShelfApi,
    pushDestination: doc.data.pushDestination,
  };
};

export const makeUsers = (res: LambdaResult<values.Document<UserDocument>>): User[] => {
  return res.data.map(doc => makeUser(doc));
}