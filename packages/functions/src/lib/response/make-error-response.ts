import { APIGatewayProxyResult } from "aws-lambda";

export const makeErrorResponse = (status: number, error: Error): APIGatewayProxyResult => {
  return {
    statusCode: status,
    body: JSON.stringify({
      message: error.message,
    }),
  };
};