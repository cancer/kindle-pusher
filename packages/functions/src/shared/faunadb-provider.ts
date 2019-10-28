import { Client } from "faunadb";
import { inject, injectable } from "inversify";
import { container } from "./inversify.config";

if (typeof process.env.FAUNADB_SERVER_SECRET === 'undefined') {
  throw new Error('Missing FAUNADB_SERVER_SECRET.');
}

export const FaunadbSecret = Symbol.for('FaunadbSecret');
container
  .bind<string>(FaunadbSecret)
  .toConstantValue(
    process.env.FAUNADB_SERVER_SECRET,
  );


@injectable()
export class FaunadbProvider {
  private client: Client;
  
  constructor(@inject(FaunadbSecret) secret: string) {
    this.client = new Client({
      secret
    })
  }
  
  provide(): Client {
    return this.client;
  }
}