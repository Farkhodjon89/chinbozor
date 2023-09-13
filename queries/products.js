import gql from 'graphql-tag'
import { _Product, _SimpleProduct, _VariableProduct } from './fragments'

export const PRODUCTS_SLUGS = gql`
  query PRODUCTS_SLUGS(
    $first: Int
    $after: String
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
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

export const PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $onSale: Boolean
    $search: String
    $featured: Boolean
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
        featured: $featured
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ..._Product
        ... on SimpleProduct {
          ..._SimpleProduct
        }
        ... on VariableProduct {
          ..._VariableProduct
        }
      }
    }
  }
  ${_Product}
  ${_SimpleProduct}
  ${_VariableProduct}
`

export const SEARCH_PRODUCTS = gql`
  query PRODUCTS(
    $first: Int
    $after: String
    $categories: [String]
    $filters: [ProductTaxonomyFilterInput]
    $onSale: Boolean
    $search: String
    $featured: Boolean
  ) {
    products(
      first: $first
      after: $after
      where: {
        status: "publish"
        stockStatus: IN_STOCK
        onSale: $onSale
        categoryIn: $categories
        taxonomyFilter: { and: $filters }
        search: $search
        featured: $featured
      }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        name
        slug
      }
    }
  }
`
