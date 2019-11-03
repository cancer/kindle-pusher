import { APIGatewayProxyResult } from "aws-lambda";

export const makeNoContentResponse = (): APIGatewayProxyResult => {
  return {
    statusCode: 204,
    body: JSON.stringify({}),
  };
};