import { StaticDataSingleton } from '../../utils/staticData'
import client from '../../appolo/apollo-client'
import { PRODUCTS } from '../../queries/products'
import Layout from '../../components/Layout/Layout'
import { COLORS, BRANDS } from '../../queries/attributes'
import Catalog from '../../components/Catalog/Catalog'

const Product = ({ pageInfo, products, categories, colors }) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Каталог',
      active: true,
    },
  ]
  return (
    <Layout breadcrumbs={breadcrumbs} categories={categories}>
      <Catalog
        colors={colors}
        categories={categories}
        pageInfo={pageInfo}
        products={products}
      />
    </Layout>
  )
}

export default Product

// export async function getStaticProps({ query }) {
//   const staticData = new StaticDataSingleton()
//   await staticData.checkAndFetch()
//   const categories = staticData.getRootCategories()

//   const queryVars = { first: 15 }
//   if (query.onSale === 'sale') {
//     queryVars.onSale = true
//   }

//   const products = await client.query({
//     query: PRODUCTS,
//     variables: queryVars,
//   })

//   const colors = await client.query({
//     query: COLORS,
//   })

//   return {
//     props: {
//       categories,
//       colors: colors.data.paColors.nodes,
//       products: products.data.products.nodes,
//       pageInfo: products.data.products.pageInfo,
//     },
//     revalidate: 60,
//   }
// }

export async function getServerSideProps({ query }) {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()
  const queryVars = {
    first: 9,
  }
  if (query.onSale === 'sale') {
    queryVars.onSale = true
  }

  const products = await client.query({
    query: PRODUCTS,
    variables: queryVars,
  })

  const colors = await client.query({
    query: COLORS,
  })

  return {
    props: {
      categories,
      colors: colors.data.paColors.nodes,
      products: products.data.products.nodes,
      pageInfo: products.data.products.pageInfo,
    },
  }
}
