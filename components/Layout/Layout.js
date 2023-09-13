import Header from '../Header/Header'
import HeaderCheckout from '../HeaderCheckout/HeaderCheckout'
import Footer from '../Footer/Footer'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

const Layout = ({
  children,
  showFooter = true,
  showBreadcrumbs = true,
  headerStyle,
  categories,
  breadcrumbs
}) => {
  return (
    <>
      <section className='flex flex-col min-h-screen'>
        {headerStyle === 'checkout' ? <HeaderCheckout /> : <Header categories={categories} />}
        <main className='flex-grow'>
          {showBreadcrumbs ? <Breadcrumbs data={breadcrumbs} /> : null}
          {children}
        </main>
        {showFooter ? <Footer categories={categories} /> : null}
      </section>
    </>
  )
}

export default Layout
