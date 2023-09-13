import gql from 'graphql-tag'
import { _Post } from './fragments'

export const POSTS_SLUGS = gql`
  query POSTS(
    $first: Int,
    $after: String
  ) {
    posts(
      first: $first
      after: $after
      where: {
        status: PUBLISH
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        slug
      }
    }
  }
`

export const POSTS = gql`
  query POSTS(
    $first: Int
  ) {
    posts(
      first: $first
      where: {
        status: PUBLISH
      }
    ) {
      nodes {
        ..._Post
      }
    }
  }
  ${_Post}
`

export const POST = gql`
  query POST(
    $id: ID!
  ) {
    post(id: $id, idType: SLUG) {
      ..._Post
    }
  }
  ${_Post}
`
