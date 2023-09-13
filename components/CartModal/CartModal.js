import { connect } from 'react-redux'
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
} from '../../redux/actions/cartActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { hideCartModal } from '../../redux/actions/modalActions'
import { icons } from '../../public/static/fixture'
import Price from '../Price/Price'
import { LinkButton } from '../Button/Button'
import OutsideClicker from '../OutsideClicker/OutsideClicker'
import { useEffect } from 'react'
import Link from 'next/link'

const CartModalItems = ({
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
}) => (
  <>
    <ul className='mb-6 max-h-screen-50 overflow-y-auto oxxo-scroll'>
      {cartItems.map((item, key) => {
        const wishlistItem = wishlistItems.filter(
          (wishlistItem) => wishlistItem.id === item.id
        )[0]
        return (
          <li
            key={key}
            className={`border-white-300 ${
              key === 0 ? 'pb-26' : 'py-26 border-t'
            }`}
          >
            <div className='flex mb-27'>
              <div className='w-65 mr-24 flex items-center justify-center'>
                <img className='max-h-72' src={item.image?.sourceUrl} />
              </div>
              <div>
                <div className='text-15 leading-20 text-d-gray-400 mb-16'>
                  {item.name}
                </div>
                <div className='text-14 leading-16 text-d-gray-300'>
                  <label className='text-d-gray-200'>Цвет:</label>{' '}
                  {item.selectedProductColor}
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='w-140'>
                <label className='mb-17 text-15 leading-17 text-d-gray-300 block'>
                  Количество
                </label>
                <div className='flex justify-between items-center'>
                  <button
                    className='flex items-center justify-center w-36 h-36 rounded-full border border-d-gray-200 stroke-current hover:text-f-red-400 text-d-gray-200 hover:border-f-red-400'
                    dangerouslySetInnerHTML={{ __html: icons.minus }}
                    onClick={() => decreaseQuantity(item)}
                  />
                  <div className='text-15 leading-17 text-d-gray-400'>
                    {item.quantity} шт
                  </div>
                  <button
                    className='flex items-center justify-center w-36 h-36 rounded-full bg-f-red-500 stroke-current text-white-100 hover:bg-f-red-400'
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
              <div className=''>
                <label className='mb-17 text-15 leading-17 text-d-gray-300 block'>
                  Цена
                </label>
                <Price
                  salePrice={item.woocsSalePrice * item.quantity}
                  price={item.woocsRegularPrice * item.quantity}
                />
              </div>
              <div className='flex flex-col justify-between'>
                <button
                  className={`stroke-current hover:text-f-red-400 ${
                    wishlistItem
                      ? 'fill-current text-f-red-500'
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
          </li>
        )
      })}
    </ul>
    <div className='mb-20'>
      <Link href='/cart' passHref legacyBehavior>
        <LinkButton style='bordered'>Перейти в корзину</LinkButton>
      </Link>
    </div>
    <Link href='/checkout' passHref legacyBehavior>
      <LinkButton>Оформить заказ</LinkButton>
    </Link>
  </>
)

const CartModal = ({
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  addToWishlist,
  deleteFromWishlist,
  modalState,
  hideCartModal,
}) => {
  useEffect(() => {
    hideCartModal()
  }, [])
  const outSideClickerCallBack = () => hideCartModal()
  return (
    <>
      <div
        className={`fixed h-screen top-full left-0 right-0 bg-d-gray-400 bg-opacity-50 z-40 ${
          !modalState.cart ? 'hidden' : ''
        }`}
      />
      <OutsideClicker callback={outSideClickerCallBack}>
        <div
          className={`absolute min-h-screen md:min-h-full left-0 md:left-auto right-0 top-full p-30 bg-white-100 md:w-405 z-50 ${
            !modalState.cart ? 'hidden' : ''
          }`}
        >
          <div className='container'>
            <button
              className='text-d-gray-200 stroke-current absolute right-30 top-32'
              dangerouslySetInnerHTML={{ __html: icons.close }}
              onClick={() => hideCartModal()}
            />
            <h4 className='text-24 leading-28 text-d-gray-400 font-bold mb-20'>
              Корзина
            </h4>
            {cartItems.length > 0 ? (
              <CartModalItems
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
                decreaseQuantity={decreaseQuantity}
                addToWishlist={addToWishlist}
                deleteFromWishlist={deleteFromWishlist}
              />
            ) : (
              <div className='text-16 leading-20'>Корзина пустая</div>
            )}
          </div>
        </div>
      </OutsideClicker>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    modalState: state.modalState,
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

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
