import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { injectable } from "inversify";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthorizationError } from "../../domains/error/authorization";
import { HttpMethodNotAllowedError } from "../../domains/error/method-not-allowed";
import { makeErrorResponse } from "../../lib/response/make-error-response";
import { makeNoContentResponse } from "../../lib/response/make-no-content-response";
import { getToken } from "../../shared/get-token";
import { UsersCommands } from "./commands";
import { UsersQueries } from "./queries";

interface UsersPostRequestBody {
  bookshelfApi: string;
  pushDestination: string;
}

@injectable()
export class UsersHandler {
  constructor(
    private readonly queries: UsersQueries,
    private readonly commands: UsersCommands,
  ) {}
  
  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      if (event.httpMethod === 'POST') {
        return await this.handlePost(event);
      }
  
      if (event.httpMethod === 'GET') {
        return await this.handleGet(event);
      }
      
      throw new HttpMethodNotAllowedError(event.httpMethod);
    } catch(e) {
      console.error(e);
      
      switch(true) {
        case e instanceof AuthorizationError:
          return makeErrorResponse(401, e);
        case e instanceof HttpMethodNotAllowedError:
          return makeErrorResponse(405, e);
        default:
          return makeErrorResponse(500, e);
      }
    }
  }
  
  private async handleGet(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    if (event.queryStringParameters === null) {
      throw new AuthorizationError();
    }
  
    const authToken = await makeAuthToken(event.queryStringParameters.authorization);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: await this.queries.getUser(authToken.id),
      }),
    };
  }
  
  private async handlePost(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const authToken = await makeAuthToken(getToken(event.headers['authorization']))
    
    const body: UsersPostRequestBody = event.body ? JSON.parse(event.body) : {};
    
    this.commands.putUser({
      userId: authToken.id,
      ...body,
    });
  
    return makeNoContentResponse();
  }
}
