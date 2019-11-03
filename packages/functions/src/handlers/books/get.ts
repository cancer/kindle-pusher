import { APIGatewayEvent } from "aws-lambda";
import { parse } from "cookie";
import { query, values } from "faunadb";
import { makeAuthToken } from "../../domains/auth-token";
import { AuthToken } from "../../domains/auth-token/auth-token";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { container } from "../../shared/inversify.config";
import { makeErrorResponse } from "../../lib/response/make-error-response";
import { Lambda } from "../add-books";

interface BookDocument {
  asin: string
  user: string;
  ignored: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BookshelfDocument {
  asin: string;
  title: string;
  detailPageUrl: string;
  productUrl: string;
}

export const handleBooksGet = async (event: APIGatewayEvent) => {
  let authToken: AuthToken;
  try {
    if (event.headers['cookie'] === null) {
      throw new Error('Authorization required.')
    }
    const token = parse(event.headers['cookie']).token;
    authToken = await makeAuthToken(token);
  } catch(e) {
    return makeErrorResponse(401, e);
  }
  
  const client = container.get(FaunadbProvider).provide();
  const bookRefs = await client.query<Lambda<values.Document<BookDocument>>>(
    query.Map(
      query.Paginate(
        query.Match(
          query.Index('books_by_user'),
          authToken.id,
        )
      ),
      query.Lambda('X', query.Get(query.Var('X'))),
    ),
  );
  
  const books = await Promise.all(bookRefs.data.map(bookRef => {
    return client.query<values.Document<BookshelfDocument>>(
      query.Get(
        query.Match(
          query.Index('bookshelf_by_asin'),
          bookRef.data.asin,
        ),
      ),
    );
  }));
  
  return {
    statusCode: 200,
    body: JSON.stringify(books.map(v => v.data)),
  };
}