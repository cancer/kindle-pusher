import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { injectable } from "inversify";
import { HttpMethodNotAllowedError } from "../../domains/error/method-not-allowed";
import { getStatusCodeByError } from "../../lib/response/get-status-code-by-error";
import { makeErrorResponse } from "../../lib/response/make-error-response";
import { AddBooksCommands } from "./commands";

@injectable()
export class AddBooksHandler {
  constructor(private readonly commands: AddBooksCommands) {}
  
  async handle(ev: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      if (ev.httpMethod === 'POST') {
        return await this.handlePost();
      }
      
      throw new HttpMethodNotAllowedError(ev.httpMethod);
    } catch(e) {
      console.error(e);
  
      return makeErrorResponse(
        getStatusCodeByError(e),
        e,
      );
    }
  }
  
  private async handlePost(): Promise<APIGatewayProxyResult> {
    try {
      await this.commands.addBooks();
      
      return {
        statusCode: 204,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({})
      }
    } catch(e) {
      throw e;
    }
  }
}