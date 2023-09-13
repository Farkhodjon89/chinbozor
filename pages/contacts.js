import { StaticDataSingleton } from '../utils/staticData'
import Layout from '../components/Layout/Layout'
import NavMenu from '../components/NavMenu/NavMenu'

const ContactsPage = ({
  categories
}) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/'
    },
    {
      name: 'Контакты',
      active: true
    }
  ]
  const menu = [
    {
      name: 'О Chinbozor',
      url: '/about'
    },
    {
      name: 'Контакты',
      url: '/contacts',
      active: true
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
          Контакты
        </h1>
        <div className='grid grid-cols-12 gap-30'>
          <div className='md:col-start-1 md:col-end-5 col-start-1 col-end-13'>
            <NavMenu items={menu} />
          </div>
          <div className='md:col-start-5 md:col-end-13 col-start-1 col-end-13'>
            <article className='prose min-w-full mb-70'>
              <p>
                <strong>Контактный номер:</strong><br />
                <a href='tel:+998970074400'>+998 98 117 89 98</a><br />
                (Режим работы оператора: с 10:00 до 20:00, без выходных)
              </p>
              <p>
                <strong>Социальные сети:</strong><br />
                Telegram-бот: <a href='https://t.me/chinbozor' target='_blank' rel='noreferrer'>@chinbozorcallcentr</a><br />
                Instagram: <a href='https://www.instagram.com/chinbozor.uz/' target='_blank' rel='noreferrer'>https://www.instagram.com/chinbozor.uz/</a><br />
                Facebook: <a href='https://www.facebook.com/Chinbozor.uz/' target='_blank' rel='noreferrer'>https://www.facebook.com/Chinbozor.uz/</a><br />
              </p>

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

export default ContactsPage
