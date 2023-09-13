import Layout from '../components/Layout/Layout'
import CartInfo from '../components/CartInfo/CartInfo'
import { connect } from 'react-redux'
import { icons } from '../public/static/fixture'
import {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
} from '../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../redux/actions/wishlistActions'
import Price from '../components/Price/Price'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { StaticDataSingleton } from '../utils/staticData'
import { LinkButton } from '../components/Button/Button'
import { hideCartModal } from '../redux/actions/modalActions'
import { useEffect } from 'react'

const Cart = ({
  cartItems,
  wishlistItems,
  addToCart,
  categories,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
  hideCartModal,
}) => {
  const breadcrumbs = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Каталог',
      url: '/shop',
    },
    {
      name: 'Корзина',
      active: true,
    },
  ]

  useEffect(() => {
    hideCartModal()
  }, [])

  const cartItemsElement = []
  if (cartItems.length > 0) {
    for (const item of cartItems) {
      const wishlistItem = wishlistItems.filter(
        (wishlistItem) => wishlistItem.id === item.id
      )[0]
      cartItemsElement.push(
        <li
          className='md:table-row flex flex-wrap border-b border-white-300 pb-26 mb-26 md:pb-0 md:mb-0 md:border-b-0'
          key={nanoid()}
        >
          <div className='md:table-cell'>
            <div className='flex'>
              <div className='text-center pr-15 pb-44 w-80 align-top'>
                <img className='max-h-72 inline' src={item.image.sourceUrl} />
              </div>
              <div className='px-15 pb-44 align-top'>
                <div className='text-15 leading-20 text-d-gray-400 mb-16'>
                  {item.name}
                </div>
                <div className='text-14 leading-16 text-d-gray-300'>
                  <label className='text-d-gray-200'>Цвет:</label>{' '}
                  {item.selectedProductColor}
                </div>
              </div>
            </div>
          </div>
          <div className='md:table-cell w-full md:w-auto align-top'>
            <div className='flex justify-between'>
              <div className='pr-40 md:pl-15 md:pr-15 md:pb-44 align-top md:w-auto w-full'>
                <label className='mb-17 text-15 leading-17 text-d-gray-300 block'>
                  Количество
                </label>
                <div className='flex justify-between items-center w-140 md:w-160'>
                  <button
                    className='flex items-center justify-center w-36 h-36 rounded-full border border-d-gray-200 stroke-current hover:text-f-red-400 text-d-gray-200 hover:border-f-red-400'
                    dangerouslySetInnerHTML={{ __html: icons.minus }}
                    onClick={() => decreaseQuantity(item)}
                  />
                  <div className='text-15 leading-17 text-d-gray-400'>
                    {item.quantity} шт
                  </div>
                  <button
                    className='flex items-center justify-center w-36 h-36 rounded-full bg-d-gray-400 stroke-current text-white-100 hover:bg-d-gray-300'
                    dangerouslySetInnerHTML={{ __html: icons.plus }}
                    onClick={() =>
                      addToCart(
                        item,
                        item.selectedProductColor,
                        item.selectedProductId
                      )
                    }
                  />
                </div>
              </div>
              <div className='md:table-cell md:px-15 md:pb-44 align-top'>
                <label className='mb-17 text-15 leading-17 text-d-gray-300 block'>
                  Цена
                </label>
                <Price
                  salePrice={item.woocsSalePrice}
                  price={item.woocsRegularPrice}
                />
              </div>
              <div className='md:table-cell pl-28 md:pb-44 align-middle text-right'>
                <div className='flex flex-col justify-between'>
                  <button
                    className={`stroke-current mb-24 hover:text-f-red-500 ${
                      wishlistItem
                        ? 'fill-current text-f-green-400'
                        : 'text-d-gray-200'
                    }`}
                    dangerouslySetInnerHTML={{ __html: icons.wishlist }}
                    onClick={
                      wishlistItem
                        ? () => deleteFromWishlist(item)
                        : () => addToWishlist(item)
                    }
                  />
                  <button
                    className='stroke-current text-d-gray-200 hover:text-f-red-400'
                    dangerouslySetInnerHTML={{ __html: icons.removeFromCart }}
                    onClick={() => deleteFromCart(item.selectedProductId)}
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      )
    }
  }
  return (
    <Layout breadcrumbs={breadcrumbs} categories={categories}>
      <div className='container'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Корзина
        </h1>
        {cartItems.length > 0 ? (
          <div className='lg:grid grid-cols-12 gap-30 mb-70'>
            <div className='col-start-1 col-end-9 mb-40 lg:mb-0'>
              <div className='w-full mb-16'>
                <ul className='table w-full'>{cartItemsElement}</ul>
              </div>
              <div className='inline-block'>
                <Link legacyBehavior href='/shop'>
                  <a className='font-medium text-16 leading-18 text-d-gray-400 flex items-center stroke-current hover:text-f-red-400'>
                    <span
                      className='mr-8'
                      dangerouslySetInnerHTML={{
                        __html: icons.longArrowLeft,
                      }}
                    />
                    Назад к покупкам
                  </a>
                </Link>
              </div>
            </div>
            <div className='col-start-9 col-end-13'>
              <div className='grid col-auto'>
                <CartInfo items={cartItems} delivery={0} />
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center mb-70'>
            <h2 className='text-16 leading-18 text-d-gray-400 mb-40'>
              Корзина пуста
            </h2>
            <Link href='/shop' passHref legacyBehavior>
              <LinkButton className='inline'>Начать покупки</LinkButton>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
export async function getStaticProps() {
  const staticData = new StaticDataSingleton()
  await staticData.checkAndFetch()

  const categories = staticData.getRootCategories()

  return {
    props: {
      categories,
    },
    revalidate: 60,
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, selectedProductColor, selectedProductId) => {
      dispatch(addToCart(item, selectedProductColor, selectedProductId))
    },
    decreaseQuantity: (item) => {
      dispatch(decreaseQuantity(item))
    },
    deleteFromCart: (item) => {
      dispatch(deleteFromCart(item))
    },
    addToWishlist: (item) => {
      dispatch(addToWishlist(item))
    },
    deleteFromWishlist: (item) => {
      dispatch(deleteFromWishlist(item))
    },
    hideCartModal: () => {
      dispatch(hideCartModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
