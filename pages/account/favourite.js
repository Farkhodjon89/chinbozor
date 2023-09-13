import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import ProductList from '../../components/ProductList/ProductList'
import { StaticDataSingleton } from '../../utils/staticData'
import { PersonalCabinet } from '../../components/Account/PersonalCabinet'
import client from '../../appolo/apollo-client'
import { PRODUCTS } from '../../queries/products'

const FavouritePage = ({ categories, products }) => {
  return (
    <>
      <Head>
        <title>OXXO - Cart Page</title>
      </Head>
      <Layout categories={categories}>
        <PersonalCabinet>
          <ProductList cols={3} products={products} />
        </PersonalCabinet>
      </Layout>
    </>
  )
}

export async function getStaticProps () {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()

  const products = await client.query({
    query: PRODUCTS,
    variables: { first: 8 }
  })

  return {
    props: {
      products: products.data.products.nodes,
      categories
    },
    revalidate: 60
  }
}

export default FavouritePage
