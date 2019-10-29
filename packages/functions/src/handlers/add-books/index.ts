import { APIGatewayEvent } from "aws-lambda";
import { query, values } from "faunadb";
import { FaunadbProvider } from "../../shared/faunadb-provider";
import { container } from "../../shared/inversify.config";
import { makeErrorResponse } from "../../shared/make-error-response";
import { UserDocument } from "../users/get";

export const handleAddBooksPost = async (event: APIGatewayEvent) => {
  const client = container.get(FaunadbProvider).provide();
  try {
    const users = await client.query(
      query.Map(
        query.Paginate(
          query.Match(
            query.Index('all_users'),
          )
        ),
        query.Lambda('X', query.Get(query.Var('X'))),
      )
    )
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: users,
      })
    }
  } catch(e) {
    console.error(e);
    makeErrorResponse(500, e);
  }
}