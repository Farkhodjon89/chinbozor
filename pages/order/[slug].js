import React from 'react'
import OrderSuccess from '../../components/OrderSuccess/OrderSuccess'
import client from '../../appolo/apollo-client'
import ORDER from '../../queries/order'
import Layout from '../../components/Layout/Layout'

export default function Order ({ order }) {
  return (
    <Layout headerStyle='checkout' showFooter={false} showBreadcrumbs={false}>
      <OrderSuccess order={order} />
    </Layout>
  )
}

export const getServerSideProps = async ({ params }) => {
  const order = await client.query({
    query: ORDER,
    variables: { id: params.slug }
  })
  return {
    props: {
      order: order.data.order
    }
  }
}
