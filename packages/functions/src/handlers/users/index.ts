import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { injectable } from "inversify";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthorizationError } from "../../domains/error/authorization";
import { makeErrorResponse } from "../../shared/make-error-response";
import { handleUsersPost } from "./post";
import { UsersQueries } from "./queries";

@injectable()
export class UsersHandler {
  constructor(private queries: UsersQueries) {}
  
  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      if (event.httpMethod === 'POST') {
        return await this.handlePost(event);
      }
  
      if (event.httpMethod === 'GET') {
        return await this.handleGet(event);
      }
    } catch(e) {
      console.error(e);
      
      switch(true) {
        case e instanceof AuthorizationError:
          return makeErrorResponse(401, e);
        default:
          return makeErrorResponse(500, e);
      }
    }
  
    return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
  }
  
  private async handleGet(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    if (event.queryStringParameters === null) {
      throw new AuthorizationError();
    }
  
    const authToken = await makeAuthToken(event.queryStringParameters.authorization);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: await this.queries.getUser(authToken),
      }),
    };
  }
  
  private async handlePost(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return await handleUsersPost(event)
  }
}
