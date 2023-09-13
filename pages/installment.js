import { StaticDataSingleton } from '../utils/staticData'
import Layout from '../components/Layout/Layout'
import NavMenu from '../components/NavMenu/NavMenu'

const InstallmentPage = ({
  categories
}) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/'
    },
    {
      name: 'Рассрочка',
      active: true
    }
  ]
  const menu = [
    {
      name: 'Часто задаваемые вопросы',
      url: '/faq'
    },
    {
      name: 'Условия пользования',
      url: '/terms-of-use'
    },
    {
      name: 'Условия доставки',
      url: '/terms-of-delivery'
    },
    {
      name: 'Рассрочка',
      url: '/installment',
      active: true
    }
  ]

  return (
    <Layout
      categories={categories}
      breadcrumbs={breadcrumbs}
    >
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Рассрочка
        </h1>
        <div className='grid grid-cols-12 gap-30'>
          <div className='col-start-1 col-end-13 md:col-start-1 md:col-end-5'>
            <NavMenu items={menu} />
          </div>
          <div className='col-start-1 col-end-13 md:col-start-5 md:col-end-13'>
            <article className='prose min-w-full mb-70'>
              <p>Рассрочка</p>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps () {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()

  return {
    props: {
      categories: categories
    },
    revalidate: 60
  }
}

export default InstallmentPage
