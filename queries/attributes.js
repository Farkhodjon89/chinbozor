import gql from 'graphql-tag'

export const COLORS = gql`
  query COLORS {
    paColors(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
      }
    }
  }
`

export const BRANDS = gql`
  query BRANDS {
    paBrands(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
      }
    }
  }
`
