import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/Input/Input'
import { icons } from '../../public/static/fixture'
import Button, { LinkButton } from '../../components/Button/Button'
import { StaticDataSingleton } from '../../utils/staticData'
import { PersonalCabinet } from '../../components/Account/PersonalCabinet'

const Index = ({ categories }) => {
  const INPUTS = [
    {
      name: 'Имя'
    },
    {
      name: 'Фамилия'
    },
    {
      name: 'Номер Телефона'
    },
    {
      name: 'Эл почта'
    }
  ]
  return (
    <>
      <Head>
        <title>OXXO - Cart Page</title>
      </Head>
      <Layout categories={categories}>
        <PersonalCabinet>
          <ul className='grid grid-cols-1 md:grid-cols-2 gap-30 pt-32 block'>
            {INPUTS.map(({ name }, i) => (
              <li key={i}>
                <Input label={name} placeholder={name} />
              </li>
            ))}
            <Button>Внести изменения</Button>
          </ul>
        </PersonalCabinet>
      </Layout>
    </>
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

export default Index
