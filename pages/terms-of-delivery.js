import { StaticDataSingleton } from '../utils/staticData'
import Layout from '../components/Layout/Layout'
import NavMenu from '../components/NavMenu/NavMenu'

const TermsDeliveryPage = ({ categories }) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Условия доставки',
      active: true,
    },
  ]
  const menu = [
    {
      name: 'Часто задаваемые вопросы',
      url: '/faq',
    },
    {
      name: 'Условия пользования',
      url: '/terms-of-use',
    },
    {
      name: 'Условия доставки',
      url: '/terms-of-delivery',
      active: true,
    },
    {
      name: 'Рассрочка',
      url: '/installment',
    },
  ]

  return (
    <Layout categories={categories} breadcrumbs={breadcrumbs}>
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Условия доставки
        </h1>
        <div className='grid grid-cols-12 gap-30'>
          <div className='col-start-1 col-end-13 md:col-start-1 md:col-end-5'>
            <NavMenu items={menu} />
          </div>
          <div className='col-start-1 col-end-13 md:col-start-5 md:col-end-13'>
            <article className='prose min-w-full mb-70'>
              <p>
                <strong>
                  По городу Ташкент: <br />
                </strong>
                -В течение 8 часов 25 000 сум <br />
                -В течение 2 дней 15 000 сум
                <br />
                <br /> Заказ доставляется по адресу, указанному при оформлении
                заказа, после предварительного звонка оператора и подтверждения
                заказа. <br />
                <p>
                  Заказы, оформленные с 00:00 до 15:00 доставляются на следующий
                  рабочий день.
                  <br />
                  Заказы, оформленные с 15:01 до 23:59 доставляются через один
                  рабочий день.
                </p>
                Рабочие часы службы доставки: с 08:00 до 21:00. Без выходных
                <p>
                  <strong>
                    По Узбекистану – ПЛАТНАЯ (сумма зависит от региона
                    доставки):
                  </strong>
                  <br />
                  Срок - в течение 2 рабочих дней.
                </p>
              </p>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch(true)
  const categories = staticData.getRootCategories()

  return {
    props: {
      categories: categories,
    },
    revalidate: 60,
  }
}

export default TermsDeliveryPage
