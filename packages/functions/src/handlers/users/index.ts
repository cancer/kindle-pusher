import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { injectable } from "inversify";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { makeErrorResponse } from "../../shared/make-error-response";
import { handleUsersPost } from "./post";
import { UsersQueries } from "./queries";

@injectable()
export class UsersHandler {
  constructor(private queries: UsersQueries) {}
  
  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    if (event.httpMethod === 'POST') {
      return this.handlePost(event);
    }
  
    if (event.httpMethod === 'GET') {
      return this.handleGet(event);
    }
  
    return makeErrorResponse(405, new Error(`${event.httpMethod} is not allowed.`));
  }
  
  private async handleGet(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    let authToken: AuthToken;
    try {
      if (event.queryStringParameters === null) {
        throw new Error('Authorization required.')
      }
      
      authToken = await this.makeAuthToken(event.queryStringParameters.authorization);
    } catch(e) {
      return makeErrorResponse(401, e);
    }
    
    try {
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: await this.queries.getUser(authToken),
        }),
      };
    } catch(e) {
      console.error(e);
      return makeErrorResponse(500, e);
    }
  }
  
  private async handlePost(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return await handleUsersPost(event)
  }
  
  private async makeAuthToken(token: string): Promise<AuthToken> {
    const authToken = await makeAuthToken(token);
    
    if (!authToken.isVerified) {
      throw new Error('Authorization required.');
    }
    
    return authToken;
  }
}
