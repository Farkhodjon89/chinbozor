import { StaticDataSingleton } from '../utils/staticData'
import Layout from '../components/Layout/Layout'
import NavMenu from '../components/NavMenu/NavMenu'

const TermsUsePage = ({
  categories
}) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/'
    },
    {
      name: 'Условия пользования',
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
      url: '/terms-of-use',
      active: true
    },
    {
      name: 'Условия доставки',
      url: '/terms-of-delivery'
    },
    {
      name: 'Рассрочка',
      url: '/installment'
    }
  ]

  return (
    <Layout
      categories={categories}
      breadcrumbs={breadcrumbs}
    >
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Условия пользования
        </h1>
        <div className='grid grid-cols-12 gap-30'>
          <div className='col-start-1 col-end-13 md:col-start-1 md:col-end-5'>
            <NavMenu items={menu} />
          </div>
          <div className='col-start-1 col-end-13 md:col-start-5 md:col-end-13'>
            <article className='prose min-w-full mb-70'>
              <p><strong>Возврат товаров надлежащего качества:</strong><br />Покупатель вправе отказаться от заказанного Товара надлежащего качества до его получения, а также после получения — в течение 10 календарных дней. Возврат или обмен товара возможны, когда: сохранены его товарный вид (упаковка, ярлыки), потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного товара (товарный или кассовый чек). В случае отказа от Товара надлежащего качества Покупатель обязан возместить Продавцу расходы, понесенные в результате доставки Товара.</p>
              <p><strong>Возврат товаров ненадлежащего качества:</strong><br />Покупатель, при получении товара ненадлежащего качества и обнаружении скрытых недостатков, если данные недостатки не были оговорены Продавцом, вправе по своему выбору потребовать от Продавца:</p>
              <p>
                a. замены на товар аналогичной марки (модели, артикула);<br />
                b. замены на такой же товар другой марки (модели, артикула) с соответствующим перерасчетом покупной цены;<br />
                c. соразмерного уменьшения покупной цены;<br />
                d. незамедлительного безвозмездного устранения недостатков товара;<br />
                e. возмещения расходов на устранение недостатков товаров.<br />
                Все вышеуказанные случаи рассматриваются авторизованными сервисными центрами.
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

export default TermsUsePage
