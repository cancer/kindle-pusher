import { APIGatewayEvent } from "aws-lambda";
import * as fs from 'fs';
import * as path from 'path';

const readFile = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve('./packages/functions/static/all.json'), 'utf-8', (err, data) => {
      if (!!err) {
        reject(err);
        return;
      }
      
      resolve(data);
    });
  });
};

export const handleBooksGet = async (event: APIGatewayEvent) => {
  const books = JSON.parse(await readFile());
  return {
    statusCode: 200,
    body: JSON.stringify((books as any).itemsList.map((v: any, i: number) => {
      return {
        ...v,
        ignored: i%2 === 0,
      };
    })),
  };
}