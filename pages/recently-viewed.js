import Layout from '../components/Layout/Layout'
import { connect } from 'react-redux'
import Link from 'next/link'
import { StaticDataSingleton } from '../utils/staticData'
import { LinkButton } from '../components/Button/Button'
import ProductList from '../components/ProductList/ProductList'

const Cart = ({
  recentViewedItems,
  categories
}) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/'
    },
    {
      name: 'Каталог',
      url: '/shop'
    },
    {
      name: 'Вы недавно смотрели',
      active: true
    }
  ]

  return (
    <Layout breadcrumbs={breadcrumbs} categories={categories}>
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Вы недавно смотрели
        </h1>
        {recentViewedItems.length > 0
          ? (
            <div className='mb-70'>
              <ProductList products={recentViewedItems} />
            </div>
            )
          : (
            <div className='text-center mb-70'>
              <h2 className='text-16 leading-18 text-d-gray-400 mb-20'>
                У вас нет просмотренных товаров
              </h2>
              <Link href='/shop' passHref legacyBehavior>
                <LinkButton>Начать покупки</LinkButton>
              </Link>
            </div>
            )}
      </div>
    </Layout>
  )
}
export async function getStaticProps () {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()

  return {
    props: {
      categories
    },
    revalidate: 60
  }
}

const mapStateToProps = (state) => {
  return {
    recentViewedItems: state.recentViewedData
  }
}

export default connect(mapStateToProps)(Cart)
