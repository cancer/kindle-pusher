import { APIGatewayEvent } from "aws-lambda";
import { query } from "faunadb";
import { DateTime } from "luxon";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { getIdToken } from "../../shared/get-id-token";
import { container } from "../../shared/inversify.config";
import { makeErrorResponse } from "../../shared/make-error-response";

export const handleUsersPost = async (event: APIGatewayEvent) => {
  let authToken: AuthToken;
  try {
    authToken = makeAuthToken(getIdToken(event.headers['Cookie']))
  } catch(e) {
    return makeErrorResponse(401, e);
  }
  
  console.log(authToken)
  const dateTime = DateTime.local().toISO()
  const user = {
    auth0Id: authToken.id,
    createdAt: dateTime,
    updatedAt: dateTime,
  };
  
  const client = container.get(FaunadbProvider).provide();
  try {
    await client.query(query.Create(query.Ref('users'), user))
    return {
      status: 204,
    }
  } catch(e) {
    return makeErrorResponse(500, e);
  }
}