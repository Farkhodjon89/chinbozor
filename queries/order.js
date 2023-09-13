import gql from 'graphql-tag'

const ORDER = gql`
  query ORDER($id: ID!) {
    order(id: $id, idType: ORDER_NUMBER) {
      databaseId
      orderKey
      date
      customerNote
      total(format: RAW)
      subtotal(format: RAW)
      status
      paymentMethodTitle
      billing {
        firstName
        lastName
        phone
        address1
        city
      }
      lineItems {
        nodes {
          product {
            name
            image {
              sourceUrl
            }
          }
          quantity
          total
          color: metaData(key: "pa_color") {
            value
          }
        }
      }
    }
  }
`
export default ORDER
