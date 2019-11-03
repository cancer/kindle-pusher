import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { injectable } from "inversify";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthorizationError } from "../../domains/error/authorization";
import { HttpMethodNotAllowedError } from "../../domains/error/method-not-allowed";
import { getStatusCodeByError } from "../../lib/response/get-status-code-by-error";
import { makeErrorResponse } from "../../lib/response/make-error-response";
import { BooksQueries } from "./queries";

@injectable()
export class BooksHandler {
  constructor(private readonly queries: BooksQueries) {}
  
  async handle(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      if (event.httpMethod === 'GET') {
        return await this.handleGet(event);
      }
      
      throw new HttpMethodNotAllowedError(event.httpMethod);
    } catch(e) {
      console.error(e);
      
      return makeErrorResponse(
        getStatusCodeByError(e),
        e,
      );
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
        books: await this.queries.getBooks(authToken.id),
      }),
    };
  }
}