import { StaticDataSingleton } from '../utils/staticData'
import Layout from '../components/Layout/Layout'
import NavMenu from '../components/NavMenu/NavMenu'
import AccordionList from '../components/AccordionList/AccordionList'

export default function FaqPage({ categories }) {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Часто задаваемые вопросы',
      active: true,
    },
  ]
  const menu = [
    {
      name: 'Часто задаваемые вопросы',
      url: '/faq',
      active: true,
    },
    {
      name: 'Условия пользования',
      url: '/terms-of-use',
    },
    {
      name: 'Условия доставки',
      url: '/terms-of-delivery',
    },
    {
      name: 'Рассрочка',
      url: '/installment',
    },
  ]

  const faq = [
    {
      title: 'Что с моим заказом, как я могу его отследить?',
      content:
        'Вы можете узнать статус заказа в личном кабинете, авторизовавшись на сайте, либо обратиться по номеру горячей линии <strong>+998 98 117 89 98</strong>',
    },
    {
      title: 'Как продлить заказ?',
      content:
        'можете узнать статус заказа в личном кабинете, авторизовавшись на сайте, либо обратиться по номеру горячей линии <strong>+998 98 117 89 98</strong>',
    },
    {
      title: 'Как я могу вернуть или обменять товар?',
      content:
        'узнать статус заказа в личном кабинете, авторизовавшись на сайте, либо обратиться по номеру горячей линии <strong>+998 98 117 89 98</strong>',
    },
    {
      title: 'Нужно ли регистрироваться на сайте для оформления покупки?',
      content:
        'заказа в личном кабинете, авторизовавшись на сайте, либо обратиться по номеру горячей линии <strong>+998 98 117 89 98</strong>',
    },
  ]

  return (
    <Layout categories={categories} breadcrumbs={breadcrumbs}>
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Часто задаваемые вопросы
        </h1>
        <div className='grid grid-cols-12 gap-30'>
          <div className='col-start-1 col-end-13 md:col-start-1 md:col-end-5'>
            <NavMenu items={menu} />
          </div>
          <div className='col-start-1 col-end-13 md:col-start-5 md:col-end-13'>
            <AccordionList items={faq} />
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
