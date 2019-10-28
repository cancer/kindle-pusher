import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { query, values } from "faunadb";
import { DateTime } from "luxon";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { getToken } from "../../shared/get-token";
import { container } from "../../shared/inversify.config";
import { makeErrorResponse } from "../../shared/make-error-response";
import { UserDocument } from "./get";

export const handleUsersPost = async (event: APIGatewayEvent) => {
  let authToken: AuthToken;
  try {
    authToken = await makeAuthToken(getToken(event.headers['authorization']))
  } catch(e) {
    return makeErrorResponse(401, e);
  }
  
  const body = event.body ? JSON.parse(event.body) : {};
  
  const dateTime = DateTime.local().toISO()
  const user = {
    auth0Id: authToken.id,
    ...body,
    updatedAt: dateTime,
  };
  
  const client = container.get(FaunadbProvider).provide();
  const userRef = query.Match(query.Index('users_by_id'), authToken.id);
  
  try {
    if (await client.query<boolean>(query.Exists(userRef))) {
      const doc = await client.query<values.Document<UserDocument>>(query.Get(userRef));
      await client.query(query.Update(doc.ref, { data: user }))
      return {
        statusCode: 204,
        body: JSON.stringify({}),
      }
    }
  
    await client.query(query.Create(query.Collection('users'), { data: {
        ...user,
        createdAt: dateTime,
      } }))
    return {
      statusCode: 204,
      body: JSON.stringify({}),
    }
  } catch(e) {
    return makeErrorResponse(500, e);
  }
}