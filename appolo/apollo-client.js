import fetch from 'node-fetch'
import { ApolloClient } from '@apollo/client'
import ApolloLinkTimeout from 'apollo-link-timeout'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import introspectionQueryResultData from './fragment-types'
import { GRAPHQL_URL, WP_TOKEN } from './wp-config'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const timeoutLink = new ApolloLinkTimeout(600000)

export const middleware = new ApolloLink((operation, forward) => {
  const authNeededQueries = ['ORDER']

  const token = operation.getContext().customerToken || WP_TOKEN

  if (authNeededQueries.includes(operation.operationName)) {
    operation.setContext(() => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }))
  }

  return forward(operation)
})

export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return response
  })
})

const client = new ApolloClient({
  link: middleware.concat(
    timeoutLink.concat(
      afterware.concat(
        createHttpLink({
          uri: GRAPHQL_URL,
          fetch: fetch,
        })
      )
    )
  ),
  cache: new InMemoryCache({ fragmentMatcher }),
})

export default client
