import Head from 'next/head'
import Layout from '../../components/Layout/Layout'
import { StaticDataSingleton } from '../../utils/staticData'
import { PersonalCabinet } from '../../components/Account/PersonalCabinet'
import Accordion from '../../components/Accordion/Accordion'
import React, { useState } from 'react'

const Order = ({ categories }) => {
  const [active, setActive] = useState()

  const onToggleAccordion = (id) => {
    id === active ? setActive('') : setActive(id)
  }

  const content = [
    {
      id: 1,
      text: 'Доставлен',
      date: '30 ноября 20:00',
      img: '/tmp/clock.png'
    },
    {
      id: 2,
      text: 'В процессе',
      date: '29 ноября 20:00',
      img: '/tmp/laptop.png'
    },
    {
      id: 3,
      text: 'Отменен',
      date: '29 ноября 20:00',
      img: '/tmp/laptop.png'
    }
  ]
  return (
    <>
      <Head>
        <title>OXXO - Cart Page</title>
      </Head>
      <Layout categories={categories}>
        <PersonalCabinet>
          {content.map(
            ({ text, date, img, id }) => <Accordion id={id} active={active} onToggleAccordion={() => onToggleAccordion(id)} text={text} date={date} img={img} />)}
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

export default Order
