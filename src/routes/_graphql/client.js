import { ApolloClient } from 'apollo-boost';
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from "apollo-link-error";

//export const client = new ApolloClient({
//  uri: 'http://localhost:8080/graphql'
//});

export function getClient(req) {
  const isBrowser = process.browser

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'same-origin'
  })

  const authLink = setContext((_, { headers }) => {
    if (req.session.token) {
      const token = req.session.token.jwt;
      const refresh = req.session.token.refresh;
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          refresh: refresh ? refresh : '',
        }
      }
    }

    return {
      headers: {
        ...headers,
      }
    }
  })

  const errorLink = onError(({ operation, graphQLErrors, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.message == "unauthorized") {
          const context = operation.getContext();
          const { response: { headers } } = context;
          if (headers) {
            const auth = headers.get('Set-Authorization');
            const refresh = headers.get('Set-Refresh');

            if (auth && refresh) {
              req.session.token.jwt = auth;
              req.session.token.refresh = refresh;
              // Now, pass the original operation to the next link
              // in the chain. This retries it with new tokens
              return forward(operation);
            }
          }
        }
      }
    }
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([
      errorLink,
      authLink,
      httpLink,
    ]),
    cache: new InMemoryCache()
  })
}