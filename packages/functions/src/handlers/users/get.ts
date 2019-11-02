import { APIGatewayEvent } from "aws-lambda";
import { parse } from "cookie";
import { query, values } from "faunadb";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { container } from "../../shared/inversify.config";
import { makeErrorResponse } from "../../shared/make-error-response";

export interface UserDocument {
  auth0Id: string;
  createdAt: string;
  updatedAt: string;
}

export const handleUsersGet = async (event: APIGatewayEvent) => {
  let authToken: AuthToken;
  try {
    if (event.headers['cookie'] === null) {
      throw new Error('Authorization required.')
    }
    const token = parse(event.headers['cookie']).token;
    authToken = await makeAuthToken(token);
  } catch(e) {
    return makeErrorResponse(401, e);
  }
  
  if (!authToken.isVerified) {
    return makeErrorResponse(401, new Error('Authorization required.'));
  }
  
  const client = container.get(FaunadbProvider).provide();
  const userRef = query.Match(query.Index('users_by_id'), authToken.id);
  
  try {
    const exists = await client.query<boolean>(query.Exists(userRef));
    if (!exists) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: null,
        }),
      };
    }
  
    const user = await client.query<values.Document<UserDocument>>(query.Get(userRef));
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: user.data,
      }),
    }
  } catch(e) {
    Error
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: {
          name: e.name,
          message: e.message,
          stack: e.stack,
          ping: await client.ping('read'),
        }
      })
    }
    //return makeErrorResponse(500, e);
  }
}
