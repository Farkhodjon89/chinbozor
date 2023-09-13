import gql from 'graphql-tag'

export const _Product = gql`
  fragment _Product on Product {
    id
    databaseId
    sku
    slug
    name
    onSale
    type
    status
    description
    image {
      sourceUrl
    }
    galleryImages {
      nodes {
        sourceUrl
      }
    }
    productCategories(where: { orderby: TERM_ID }) {
      nodes {
        name
        slug
      }
    }
    paColors {
      nodes {
        name
      }
    }
   }
`

export const _SimpleProduct = gql`
  fragment _SimpleProduct on SimpleProduct {
    id
    databaseId
    stockQuantity
    woocsRegularPrice
    woocsSalePrice
  }
`

export const _VariableProduct = gql`
  fragment _VariableProduct on VariableProduct {
    id
    databaseId
    woocsRegularPrice
    woocsSalePrice
    variations {
      nodes {
        id
        databaseId
        stockQuantity
        sku
        name
        image {
          sourceUrl
        }
        color: attributes(where: { taxonomy: "pa_color" }) {
          nodes {
            value
            color
          }
        }
      }
    }
  }
`

export const _Post = gql`
  fragment _Post on Post {
    title
    slug
    content
    date
    thumbnail: featuredImage {
      node {
        sourceUrl(size: MEDIUM)
      }
    }
    fullImage: featuredImage {
      node {
        sourceUrl(size: LARGE)
      }
    }
  }
`
