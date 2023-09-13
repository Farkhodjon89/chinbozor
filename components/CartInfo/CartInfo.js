import { getFormatPrice } from '../../utils/price'
import Link from 'next/link'
import { LinkButton } from '../Button/Button'

const CartInfo = ({ items, showButtons = true, setTotal, delivery }) => {
  let cartSubTotalPrice = 0
  let cartRetailPrice = 0
  let cartSalePrice = 0
  let cartTotalPrice = 0
  if (items.length > 0) {
    for (const item of items) {
      cartSubTotalPrice +=
        (item.woocsSalePrice ? item.woocsSalePrice : item.woocsRegularPrice) *
        item.quantity
      cartTotalPrice +=
        (item.woocsSalePrice ? item.woocsSalePrice : item.woocsRegularPrice) *
        item.quantity
      cartRetailPrice += item.woocsRegularPrice * item.quantity
      cartSalePrice += item.woocsSalePrice * item.quantity
    }
  }
  const total = cartTotalPrice + Number(delivery)
  if (setTotal) {
    setTotal(total)
  }
  return (
    <div className='bg-white-200 rounded p-32'>
      <div className='font-medium text-16 leading-18 text-d-gray-400 mb-20'>
        К оплате
      </div>
      <ul className={`${showButtons ? 'mb-32' : ''}`}>
        <li className='flex justify-between mb-16 text-14 leading-16'>
          <div className='text-d-gray-200'>Подытог</div>
          <div
            className='text-d-gray-300'
            dangerouslySetInnerHTML={{
              __html: getFormatPrice(cartSubTotalPrice),
            }}
          />
        </li>
        <li className='flex justify-between mb-16 text-14 leading-16'>
          <div className='text-d-gray-200'>Цена без скидки</div>
          <div
            className='text-d-gray-300'
            dangerouslySetInnerHTML={{
              __html: getFormatPrice(cartRetailPrice),
            }}
          />
        </li>
        <li className='flex justify-between mb-16 text-14 leading-16'>
          <div className='text-d-gray-200'>Скидка</div>
          <div
            className='text-f-red-300'
            // dangerouslySetInnerHTML={{ __html: getFormatPrice(cartSalePrice) }}
            dangerouslySetInnerHTML={{
              __html: getFormatPrice(cartRetailPrice - cartSubTotalPrice),
            }}
          />
        </li>
        <li className='flex justify-between mb-16 text-14 leading-16'>
          <div className='text-d-gray-200'>Доставка</div>
          <div
            className='text-d-gray-300'
            dangerouslySetInnerHTML={{ __html: getFormatPrice(delivery) }}
          />
        </li>
        <li className='flex justify-between mb-16 text-14 leading-16 font-medium'>
          <div className='text-d-gray-400'>Итого</div>
          <div
            className='text-d-gray-400'
            dangerouslySetInnerHTML={{ __html: getFormatPrice(total) }}
          />
        </li>
      </ul>
      {showButtons && (
        <div className='mb-12'>
          <Link href='/checkout' passHref legacyBehavior>
            <LinkButton className='w-full'>Оформить заказ</LinkButton>
          </Link>
          {/* <Button style='bordered' className='w-full'>У меня есть промокод</Button> */}
        </div>
      )}
    </div>
  )
}

export default CartInfo
