import Link from 'next/link'
import { StaticDataSingleton } from '../utils/staticData'
import client from '../appolo/apollo-client'
import { PRODUCTS } from '../queries/products'
import HomeSlider from '../components/HomeSlider/HomeSlider'
import CategoriesList from '../components/CategoriesList/CategoriesList'
import ProductList from '../components/ProductList/ProductList'
import ProductSlider from '../components/ProductSlider/ProductSlider'
import BlogList from '../components/BlogList/BlogList'
import Layout from '../components/Layout/Layout'
import BlockWrapper from '../components/BlockWrapper/BlockWrapper'
import { HOME_PAGE } from '../queries/globalSettings'

export default function Home({
  featuredProducts,
  recommendedProducts,
  categories,
  posts,
  slides,
  homeCategories,
  offers,
}) {
  return (
    <Layout showBreadcrumbs={false} categories={categories}>
      <HomeSlider slides={slides} />
      <BlockWrapper className='mb-70' title='Популярные категории'>
        <CategoriesList categories={homeCategories} />
      </BlockWrapper>
      <BlockWrapper
        className='mb-70'
        title='Хиты продаж'
        linkName='Посмотреть все'
        link='/shop?filter_featured=true'
      >
        <ProductList products={featuredProducts} />
      </BlockWrapper>
      {offers && (
        <BlockWrapper className='mb-70' title='Специальные предложения'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-30'>
            {offers.map(({ url, image }, key) => (
              <div key={key}>
                <Link href={url} legacyBehavior>
                  <a>
                    <img src={image?.sourceUrl} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </BlockWrapper>
      )}
      <BlockWrapper
        className='mb-70'
        title='Выгодные предложения'
        linkName='Посмотреть все'
        link='/shop/?onSale=sale'
      >
        <ProductList products={recommendedProducts} />
      </BlockWrapper>
      {posts.length > 0 && (
        <BlockWrapper className='mb-70' title='Блог'>
          <BlogList posts={posts} />
        </BlockWrapper>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()

  const featuredProducts = await client.query({
    query: PRODUCTS,
    variables: { first: 8 },
  })

  const recommendedProducts = await client.query({
    query: PRODUCTS,
    variables: {
      first: 20,
      //categories: ['kuhonnye-instrumenty'],
      onSale: true,
    },
  })

  /* const posts = await client.query({
    query: POSTS,
    variables: { first: 3 }
  }) */

  const homePageData = await client.query({
    query: HOME_PAGE,
  })

  return {
    props: {
      featuredProducts: featuredProducts.data.products.nodes,
      recommendedProducts: recommendedProducts.data.products.nodes,
      posts: [], // posts.data.posts.nodes,
      categories: categories,
      slides: homePageData.data.themeGeneralSettings.globalOptions?.slider,
      homeCategories:
        homePageData.data.themeGeneralSettings.globalOptions?.categories,
      offers: homePageData.data.themeGeneralSettings.globalOptions?.offers,
    },
    revalidate: 60,
  }
}
