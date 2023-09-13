import Layout from '../components/Layout/Layout'
import { connect } from 'react-redux'
import Link from 'next/link'
import { StaticDataSingleton } from '../utils/staticData'
import { LinkButton } from '../components/Button/Button'
import ProductList from '../components/ProductList/ProductList'

const Cart = ({
  wishlistItems,
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
      name: 'Избранные',
      active: true
    }
  ]

  return (
    <Layout breadcrumbs={breadcrumbs} categories={categories}>
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Избранные
        </h1>
        {wishlistItems.length > 0
          ? (
            <div className='mb-70'>
              <ProductList products={wishlistItems} />
            </div>
            )
          : (
            <div className='text-center mb-70'>
              <h2 className='text-16 leading-18 text-d-gray-400 mb-20'>
                У вас нет избранных товаров
              </h2>
              <Link href='/shop' passHref legacyBehavior>
                <LinkButton className='w-full md:w-1/3 mx-auto'>Начать покупки</LinkButton>
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
    wishlistItems: state.wishlistData
  }
}

export default connect(mapStateToProps)(Cart)
