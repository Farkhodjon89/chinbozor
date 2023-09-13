import React from 'react'
import Link from 'next/link'
import { getFormatPrice } from '../../utils/price'
import { icons } from '../../public/static/fixture'
import Button, { LinkButton } from '../Button/Button'

const OrderMain = ({ order }) => {
  return (
    <div className='max-w-540 p-15 mx-auto mb-115'>
      <div className='border border-f-green-500 bg-f-green-500 bg-opacity-5 rounded text-center py-32 px-30 mb-36'>
        <div className='stroke-current text-f-green-500 flex mb-18 justify-center' dangerouslySetInnerHTML={{ __html: icons.radioCheckedBig }} />
        <div className='text-24 leading-28 text-d-green-400 font-bold mb-24'>Благодарим за покупку, {order.billing.firstName}!</div>
        <div className='text-14 leading-14 text-d-gray-300 mb-16'>Номер заказа: <strong className='text-d-gray-400 font-medium'>{order.databaseId}</strong></div>
        <div className='text-14 leading-14 text-d-gray-300'>Дата заявки: <strong className='text-d-gray-400 font-medium'>{new Date(order.date).toLocaleDateString()}</strong></div>
      </div>
      <h3 className='text-16 leading-18 text-d-gray-400 font-medium mb-20'>Персональные данные</h3>
      <ul className='text-14 leading-16 text-d-gray-200 grid grid-cols-1 md:grid-cols-2 gap-16 mb-36'>
        <li>Заказчик: <span className='text-d-gray-300'>{`${order.billing.firstName} ${order.billing.lastName}`}</span></li>
        <li>Метод оплаты: <span className='text-d-gray-300'>{order.paymentMethodTitle}</span></li>
        <li>Адрес: <span className='text-d-gray-300'>{`${order.billing.city}, ${order.billing.address1}`}</span></li>
        <li>Метод доставки: <span className='text-d-gray-300'>Доставка курьером</span></li>
      </ul>
      <h3 className='text-16 leading-18  text-d-gray-400 font-medium mb-20'>Товары</h3>
      <div className='table text-14 leading-16 text-d-gray-300 w-full mb-32'>
        {order.lineItems.nodes.map(({ product, total, quantity }, key) => (
          <div className='table-row' key={key}>
            <div className='table-cell'>{product.name}</div>
            <div className='px-15 table-cell'>{quantity} шт</div>
            <div className='text-right table-cell' dangerouslySetInnerHTML={{ __html: getFormatPrice(total) }} />
          </div>
        ))}
      </div>
      <ul className='border-t border-gray-100 pt-32 mb-36 grid md:grid-cols-2 grid-cols-1 gap-30'>
        <li className='md:col-start-2 col-start-1'>
          <h3 className='text-16 leading-18 text-d-gray-400 font-medium mb-20'>К оплате</h3>
          <ul className='text-d-gray-200 text-14 leading-16'>
            <li className='mb-16 flex justify-between'>
              <div>Подытог</div>
              <div className='text-d-gray-300' dangerouslySetInnerHTML={{ __html: getFormatPrice(order.subtotal) }} />
            </li>
            <li className='mb-16 flex justify-between'>
              <div>Скидка</div>
              <div className='text-f-red-400'>0 UZS</div>
            </li>
            <li className='flex justify-between text-d-gray-400 font-medium'>
              <div>Итого</div>
              <div dangerouslySetInnerHTML={{ __html: getFormatPrice(order.total) }} />
            </li>
          </ul>
        </li>
        <li>
          <Link href='/shop' passHref legacyBehavior>
            <LinkButton className='w-full'>Продолжить покупки</LinkButton>
          </Link>
        </li>
        <li>
          <Link href='/' passHref legacyBehavior>
            <LinkButton className='w-full' style='bordered'>Вернутся на главную</LinkButton>
          </Link>
        </li>
      </ul>
      <div className='text-center text-15 leading-21 text-d-gray-200'>Если у Вас возникнут какие-либо дополнительные вопросы, пожалуйста свяжитесь с нашей командой поддержки по телефону: <a href='tel:+998 98 117 89 98' className='text-d-gray-300 font-medium hover:underline'>+998 98 117 89 98</a></div>
    </div>
  )
}

export default OrderMain
