import { APIGatewayEvent } from "aws-lambda";
import { query } from "faunadb";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { getToken } from "../../shared/get-token";
import { container } from "../../shared/inversify.config";
import { makeErrorResponse } from "../../shared/make-error-response";

export const handleUsersGet = async (event: APIGatewayEvent) => {
  let authToken: AuthToken;
  try {
    authToken = await makeAuthToken(getToken(event.headers['authorization']))
  } catch(e) {
    return makeErrorResponse(401, e);
  }
  
  const client = container.get(FaunadbProvider).provide();
  const userRef = query.Ref(query.Collection('users'), authToken.id);
  
  try {
    const exists = await client.query(query.Exists(userRef));
    if (!exists) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: null,
        }),
      };
    }
    
    const user = await client.query(query.Get(userRef));
    return {
      statusCode: 200,
      body: JSON.stringify({
        user,
      }),
    }
  } catch(e) {
    return makeErrorResponse(500, e);
  }
}
