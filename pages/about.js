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
      name: 'О Chinbozor',
      active: true
    }
  ]
  const menu = [
    {
      name: 'О Chinbozor',
      url: '/about',
      active: true
    },
    {
      name: 'Контакты',
      url: '/contacts'
    },
    {
      name: 'Публичная оферта',
      url: '/public-offer'
    }
  ]

  return (
    <Layout
      categories={categories}
      breadcrumbs={breadcrumbs}
    >
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          О Chinbozor
        </h1>
        <div className='grid grid-cols-12 gap-30'>
          <div className='md:col-start-1 md:col-end-5 col-start-1 col-end-13'>
            <NavMenu items={menu} />
          </div>
          <div className='md:col-start-5 md:col-end-13 col-start-1 col-end-13'>
            <article className='prose min-w-full mb-70'>
              <p><strong>Chinbozor</strong> - это место, где вы можете приобрести технику в рассрочку и с гарантией, а мы сделаем ваши покупки приятными и выгодными.</p>
              <p>Начните удивительный путь бесконечных покупок!</p>
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
