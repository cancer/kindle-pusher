import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

if (typeof process.env.AUTH0_DOMAIN === 'undefined') {
  throw new Error('Missing AUTH0_DOMAIN in env.');
}

if (typeof process.env.AUTH0_CLIENT_ID === 'undefined') {
  throw new Error('Missing AUTH0_CLIENT_ID in env.');
}

if (typeof process.env.AUTH0_REDIRECT_URI === 'undefined') {
  throw new Error('Missing AUTH0_REDIRECT_URI in env.');
}

const createAuthClientCreator = (domain: string, clientId: string, redirectUri: string): () => Promise<Auth0Client> => {
  let client: Auth0Client | null = null;
  
  return async function createAuthClient() {
    if (client !== null) {
      return client;
    }
    
    client = await createAuth0Client({
      domain,
      client_id: clientId,
      redirect_uri: redirectUri,
    });
    
    return client;
  }
}

export const createAuthClient = createAuthClientCreator(process.env.AUTH0_DOMAIN, process.env.AUTH0_CLIENT_ID, process.env.AUTH0_REDIRECT_URI);
