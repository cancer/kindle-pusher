import { values } from "faunadb";
import { UserDocument } from "../../lib/db/user";
import { User } from "./index";

export const makeUser = (doc: values.Document<UserDocument>): User => {
  return {
    id: doc.data.auth0Id,
    bookShelfApi: doc.data.bookShelfApi,
    pushDestination: doc.data.pushDestination,
  };
};