import Router from 'next/router'
import NProgress from 'nprogress'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
import { store } from '../redux/store'
import '../styles/globals.scss'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

if (typeof window !== 'undefined') {
  const hours = 6
  const now = Date.now()
  const setupTime = localStorage.getItem('version')
  if (setupTime == null) {
    localStorage.clear()
    localStorage.setItem('version', now)
  } else if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear()
    localStorage.setItem('version', now)
  }
}

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

function OxxoApp ({ Component, pageProps }) {
  const store = useStore()
  return (
    <>
      <NextSeo
        title='Купить кухонный набор и аксессуары в Ташкенте | Сhinbozor.uz'
        description='Хотите подарить или купить кухонный набор или аксессуары для кухни в Ташкенте? Ножи, подставки, сито и многое другое в магазине Chinbozor!'
        openGraph={{
          images: [{ url: '/og-mage.jpg' }],
          url: 'https://chinbozor.uz/',
          title: 'Купить кухонный набор и аксессуары в Ташкенте | Сhinbozor.uz',
          site_name: 'Chinbozor',
          locale: 'ru_RU',
          type: 'website',
          description: 'Хотите подарить или купить кухонный набор или аксессуары для кухни в Ташкенте? Ножи, подставки, сито и многое другое в магазине Chinbozor!'
        }}
      />
      <Head>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon.png' />
        {process.env.NODE_ENV === 'production'
          ? (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                        ym(83589307, "init", {
                             clickmap:true,
                             trackLinks:true,
                             accurateTrackBounce:true,
                             webvisor:true
                         });
                        `
                }}
              />
              <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                  __html: `
                        {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "Chinbozor",
  "image": "https://chinbozor.uz/favicon.png",
  "@id": "chinbozor.uz",
  "url": "https://chinbozor.uz",
  "telephone": "+998 98 117 89 98",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tashkent",
    "addressLocality": "Tashkent",
    "postalCode": "100000",
    "addressCountry": "UZ"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  } 
}
                        `
                }}
              />
            </>
            )
          : null}
      </Head>
      <PersistGate persistor={store.__persistor}>{() => <Component {...pageProps} />}</PersistGate>
    </>
  )
}

export default store.withRedux(OxxoApp)
