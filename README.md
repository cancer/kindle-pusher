## setup

put .env into packages/site/

```
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_REDIRECT_URI=
```

put .env into packages/functions/

```
FAUNADB_SERVER_SECRET=
AUTH0_JWKS_URI=
```

```
yarn install
```

## start to develop

```
npx netlify dev
```

http://localhost:1234/