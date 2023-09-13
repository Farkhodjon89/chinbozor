import { StaticDataSingleton } from '../../utils/staticData'
import client from '../../appolo/apollo-client'
import { PRODUCTS } from '../../queries/products'
import Layout from '../../components/Layout/Layout'
import { COLORS, BRANDS } from '../../queries/attributes'
import Catalog from '../../components/Catalog/Catalog'
import { useRouter } from 'next/router'
import Seo from '../../utils/seo'

const Product = ({ pageInfo, products, categories, category, colors }) => {
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
      name: category.name,
      active: true,
    },
  ]

  const router = useRouter()
  let title = ''
  let description = ''
  switch (router.asPath) {
    case '/shop/kuhonnye-instrumenty':
      title = 'Кухонные инструменты. Ножи, точилки, сито'
      description =
        'Приобретайте высококачественные кухонные наборы в Chinbozor. Кухонные инструменты и аксессуары по выгодням ценам и доставкой.'
      break
    case '/shop/kuhonnye-sito':
      title = 'Кухонные аксессуары | Сито | Chinbozor.uz'
      description =
        'Сито - один из самых необходимых кухонных аксессуаров в нынешнее время. Купите сито в Ташкенте с доставкой, уже сегодня.'

      break

    case '/shop/nozhi-i-tochilki':
      title = 'Купить ножи и точилки для ножей | Сhinbozor.uz'
      description =
        'Купить ножи для нарезки хлеба, для нарезки сыра, для пиццы, либо приобрести точилку для ножей в магазине Chinbozor.'

      break
    case '/shop/podstavki-pod-goryachee':
      title = 'Кухонные аксессуары | Подставка под горячее'
      description =
        'Стильные и красивые силиконовые подставки под горячее - не только помогут вам в кулинарии, но и будут красиво смотреться на кухне.'

      break
    case '/shop/prochie-aksessuary-dlya-kuhni':
      title = 'Держатель, овощерезка, венчик | Сhinbozor.uz'
      description =
        'Высококачественные овощерезки, венчики, держатели, щетки для вашей кухни. Доступные цены, быстрая доставка в Ташкенте. Chinbozor.uz'
      break

    default:
      break
  }

  return (
    <>
      <Seo title={title} description={description} />
      <Layout breadcrumbs={breadcrumbs} categories={categories}>
        <Catalog
          key={category.id}
          colors={colors}
          categories={categories}
          category={category}
          pageInfo={pageInfo}
          products={products}
        />
      </Layout>
    </>
  )
}

export default Product

export const getStaticPaths = async () => {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = new StaticDataSingleton().getInstance()

  const paths = categories.categories.list.map(({ slug }) => ({
    params: { slug: slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()
  const categories = staticData.getRootCategories()
  const category = staticData.getCategoryBySlug(params.slug, 1)

  const products = await client.query({
    query: PRODUCTS,
    variables: { first: 15, categories: [params.slug] },
  })

  const colors = await client.query({
    query: COLORS,
  })

  return {
    props: {
      categories,
      category,
      colors: colors.data.paColors.nodes,
      products: products.data.products.nodes,
      pageInfo: products.data.products.pageInfo,
    },
    revalidate: 60,
  }
}
