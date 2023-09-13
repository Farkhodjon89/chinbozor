import Link from 'next/link'
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
import { icons } from '../../public/static/fixture'
import Price from '../Price/Price'
import { plural } from '../../utils'
import { showCartModal } from '../../redux/actions/modalActions'

const AddToCartComponent = ({
  product,
  addToCart,
  selectedProductId,
  selectedProductColor,
  showCartModal,
}) => {
  return (
    <div
      className={`mt-auto flex ${
        product.woocsSalePrice ? 'items-center' : 'items-end'
      }`}
    >
      <Price
        price={product.woocsRegularPrice}
        salePrice={product.woocsSalePrice}
      />
      <div className='ml-auto opacity-0 group-hover:opacity-100 transition'>
        <button
          className='flex items-center justify-center w-44 h-44 rounded-full bg-f-red-500 stroke-current text-white-100 hover:bg-f-red-400'
          dangerouslySetInnerHTML={{ __html: icons.addToCart }}
          onClick={() => {
            addToCart(product, selectedProductColor, selectedProductId)
            showCartModal()
          }}
        />
      </div>
    </div>
  )
}

const ModifyCartComponent = ({
  product,
  addToCart,
  decreaseQuantity,
  cartItem,
  selectedProductId,
  selectedProductColor,
}) => {
  if (!cartItem) {
    return null
  }
  return (
    <div className='flex items-center justify-between opacity-0 group-hover:opacity-100 transition absolute bottom-0 left-0 right-0 bg-white-100'>
      {cartItem.quantity > 1 ? (
        <button
          className='flex items-center justify-center w-44 h-44 rounded-full border border-d-gray-200 stroke-current hover:text-f-red-400 text-d-gray-200 hover:border-f-red-400'
          dangerouslySetInnerHTML={{ __html: icons.minus }}
          onClick={() => decreaseQuantity(cartItem)}
        />
      ) : (
        <button
          className='flex items-center justify-center w-44 h-44 rounded-full border border-f-red-400 stroke-current hover:text-white-100 text-f-red-400 hover:bg-f-red-400'
          dangerouslySetInnerHTML={{ __html: icons.removeFromCart }}
          onClick={() => decreaseQuantity(cartItem)}
        />
      )}
      <div className='text-center'>
        <strong className='text-16 leading-18 font-medium mb-5 text-d-gray-400'>
          {cartItem.quantity}{' '}
          {plural(cartItem.quantity, 'штука', 'штуки', 'штук')}
        </strong>
        <div className='text-d-gray-100 text-13 leading-15'>В корзине</div>
      </div>
      <button
        className='flex items-center justify-center w-44 h-44 rounded-full bg-f-red-500 stroke-current text-white-100 hover:bg-f-red-400'
        dangerouslySetInnerHTML={{ __html: icons.plus }}
        onClick={() =>
          addToCart(product, selectedProductColor, selectedProductId)
        }
      />
    </div>
  )
}

const ProductItem = ({
  product,
  cartItems,
  decreaseQuantity,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  showCartModal,
}) => {
  const cartItem = cartItems.filter((cartItem) => cartItem.id === product.id)[0]
  const selectedProductId = product.variations
    ? product.variations.nodes[0].databaseId
    : product.databaseId
  const selectedProductColor = product.variations
    ? product.variations.nodes[0].color?.nodes[0]?.value
    : product.paColors.nodes[0]?.name

  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0]

  return (
    <div className='h-full flex flex-col group relative'>
      <div className='mb-10 relative'>
        <Link href={'/product/' + product.slug} legacyBehavior>
          <a className='h-280 flex justify-center items-center'>
            <ul className='absolute left-10 top-10'>
              {product.isNew ? (
                <li className='text-white-100 px-6 py-2 rounded bg-f-blue-500 text-13 leading-17 mb-5 text-center'>
                  Новинка
                </li>
              ) : null}
              {product.isSale ? (
                <li className='text-white-100 px-6 py-2 rounded bg-f-red-400 text-13 leading-17 mb-5 text-center'>
                  Акция
                </li>
              ) : null}
            </ul>
            <img src={product.image.sourceUrl} className='max-h-180' />
          </a>
        </Link>
        <ul className='absolute right-10 top-10 opacity-0 group-hover:opacity-100 transition'>
          <li className='mb-10'>
            <button
              className={`stroke-current hover:text-f-red-400 ${
                wishlistItem ? 'fill-current text-f-red-400' : 'text-d-gray-200'
              }`}
              onClick={
                wishlistItem
                  ? () => deleteFromWishlist(product)
                  : () => addToWishlist(product)
              }
              dangerouslySetInnerHTML={{ __html: icons.wishlist }}
            />
          </li>
          {/* <li className='mb-10'>
            <button
              className='stroke-current text-d-gray-200 hover:text-f-green-400'
              dangerouslySetInnerHTML={{ __html: icons.compare }}
            />
          </li> */}
        </ul>
      </div>
      <h4 className='text-15 leading-20 mb-15'>
        <Link legacyBehavior href={'/product/' + product.slug}>
          <a
            className='text-d-gray-400'
            dangerouslySetInnerHTML={{ __html: product.name }}
          />
        </Link>
      </h4>
      <AddToCartComponent
        product={product}
        addToCart={addToCart}
        selectedProductId={selectedProductId}
        selectedProductColor={selectedProductColor}
        showCartModal={showCartModal}
      />
      <ModifyCartComponent
        product={product}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        cartItem={cartItem}
        selectedProductId={selectedProductId}
        selectedProductColor={selectedProductColor}
      />
    </div>
  )
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
    showCartModal: () => {
      dispatch(showCartModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
