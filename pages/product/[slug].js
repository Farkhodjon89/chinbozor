import { StaticDataSingleton } from '../../utils/staticData'
import Layout from '../../components/Layout/Layout'
import ProductCard from '../../components/ProductCard/ProductCard'
import client from '../../appolo/apollo-client'
import PRODUCT from '../../queries/product'
import { PRODUCTS_SLUGS } from '../../queries/products'
import Seo from '../../utils/seo'

const Product = ({ product, categories }) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Каталог',
      url: '/shop',
    },
    {
      name: product.name,
      active: true,
    },
  ]
  return (
    <>
      <Seo
        title={`Chinbozor | ${product.name}`}
        description={product.description}
        image={product?.image?.sourceUrl}
      />
      <Layout breadcrumbs={breadcrumbs} categories={categories}>
        <ProductCard key={product.id} product={product} />
      </Layout>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const paths = []

//   const getAllProducts = async (after) => {
//     const temp = await client.query({
//       query: PRODUCTS_SLUGS,
//       variables: {
//         first: 100,
//         ...(after ? { after } : {})
//       }
//     })

//     paths.push(
//       ...temp.data.products.nodes.map((product) => ({
//         params: { slug: product.slug }
//       }))
//     )

//     if (temp.data.products.pageInfo.hasNextPage) {
//       await getAllProducts(temp.data.products.pageInfo.endCursor)
//     }
//   }

//   if (process.env.NODE_ENV === 'production') {
//     await getAllProducts()
//   }

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export async function getServerSideProps({ params }) {
  let response
  try {
    response = await client.query({
      query: PRODUCT,
      variables: { id: params.slug },
    })
  } catch (e) {
    return {
      notFound: true,
      // revalidate: 30,
    }
  }

  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()
  const category =
    response.data.product.productCategories.nodes.length === 0 ||
    response.data.product.productCategories.nodes[0].slug === 'uncategorized'
      ? ''
      : staticData.getCategoryBySlug(
          response.data.product.productCategories.nodes[0].slug,
          1
        )

  return {
    props: {
      categories,
      category,
      product: response.data.product,
    },
    // revalidate: 60,
  }
}

export default Product
