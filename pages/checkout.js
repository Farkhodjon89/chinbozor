import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { connect } from 'react-redux'
import Layout from '../components/Layout/Layout'
import { icons } from '../public/static/fixture'
import CheckoutForm from '../components/CheckoutForm/CheckoutForm'
import Button from '../components/Button/Button'
import CartInfo from '../components/CartInfo/CartInfo'
import { useRouter } from 'next/router'

const Checkout = ({ cartItems }) => {
  const router = useRouter()
  const host = useMemo(() => 'https://chinbozor.uz', [])
  const lineItems = []
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      contactsDelivery: {
        country: 'UZ',
      },
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [payment, setPayment] = useState(null)
  const [order, setOrder] = useState()
  const [total, setTotal] = useState(0)
  const watchDelivery = watch('delivery')
  if (watchDelivery) {
    dirtyFields.delivery = true
  }

  for (const product of cartItems) {
    lineItems.push({
      product_id: product.databaseId,
      name: product.name,
      price: product.woocsSalePrice
        ? product.woocsSalePrice
        : product.woocsRegularPrice,
      quantity: product.quantity,
      variation_id: product.variations && product.selectedProductId,
    })
  }

  const paymentMethodsTitle = {
    cod: 'Наличными или картой',
    installments: 'В рассрочку',
    zoodpay: 'ZoodPay',
    clickuz: 'Click',
    payme: 'Payme',
  }

  const paymentTypes = [
    {
      label: 'Наличными или картой',
      value: 'cash',
      type: 'radio',
      name: 'cash',
    },
    {
      icon: icons.clickLogoBig,
      value: 'click',
      type: 'radio',
      name: 'click',
    },
    {
      icon: icons.paymeLogoBig,
      value: 'payme',
      type: 'radio',
      name: 'payme',
    },
    {
      image: <img src='/kapitalbank.png' style={{ height: 50 }} />,
      value: 'apelsin',
      type: 'radio',
      name: 'apelsin',
    },
  ]

  const contactFields = [
    {
      label: 'Имя*',
      name: 'contact.firstName',
      placeholder: 'Введите ваше имя',
      type: 'text',
      register: register,
      required: true,
      error: errors.contact?.firstName,
    },
    {
      label: 'Фамилия*',
      name: 'contact.lastName',
      placeholder: 'Введите вашу фамилию',
      type: 'text',
      register: register,
      required: true,
      error: errors.contact?.lastName,
    },
    {
      label: 'Номер телефона*',
      name: 'contact.phone',
      placeholder: '+998',
      type: 'phone',
      control: control,
      register: register,
      required: true,
      error: errors.contact?.phone,
    },
  ]

  const deliveryContactFields = [
    {
      label: 'Страна*',
      name: 'contactsDelivery.country',
      placeholder: 'Выберите из списка',
      type: 'select',
      register: register,
      required: true,
      error: errors.contactsDelivery?.country,
      options: [
        {
          name: 'Узбекистан',
          value: 'UZ',
        },
      ],
    },
    {
      label: 'Город*',
      name: 'contactsDelivery.city',
      placeholder: 'Выберите из списка',
      type: 'select',
      register: register,
      required: true,
      error: errors.contactsDelivery?.city,
      options: [
        {
          name: 'Ташкент',
          value: 'Ташкент',
        },
        {
          name: 'Ташкентская область',
          value: 'Ташкентская область',
        },
        {
          name: 'Андижан',
          value: 'Андижан',
        },
        {
          name: 'Бухара',
          value: 'Бухара',
        },
        {
          name: 'Фергана',
          value: 'Фергана',
        },
        {
          name: 'Джиззах',
          value: 'Джиззах',
        },
        {
          name: 'Наманган',
          value: 'Наманган',
        },
        {
          name: 'Навои',
          value: 'Навои',
        },
        {
          name: 'Карши',
          value: 'Карши',
        },
        {
          name: 'Самарканд',
          value: 'Самарканд',
        },
        {
          name: 'Гулистан',
          value: 'Гулистан',
        },
        {
          name: 'Термез',
          value: 'Термез',
        },
        {
          name: 'Хорезм',
          value: 'Хорезм',
        },
        {
          name: 'Нукус',
          value: 'Нукус',
        },
      ],
    },
    {
      label: 'Адрес*',
      name: 'contactsDelivery.address',
      placeholder: 'Введите ваш адрес',
      type: 'text',
      row: 'full',
      register: register,
      required: true,
      error: errors.contactsDelivery?.address,
    },
    {
      label: 'Комментарии к заказу',
      placeholder: 'Введите свои пожелания или комментарии',
      name: 'contactsDelivery.notes',
      register: register,
      type: 'text',
      row: 'full',
    },
    {
      label: 'Тариф доставки',
      name: 'contactsDelivery.rate',
      placeholder: 'Выберите из списка',
      type: 'select',
      register: register,
      row: 'full',
      required: true,
      error: errors.contactsDelivery?.rate,
      options: [
        {
          name: 'В течение 8 часов (25 000 сум)',
          value: 25000,
        },
        {
          name: 'В течение 2 дней (15 000 сум)',
          value: 15000,
        },
      ],
    },
  ]

  const formFields = [
    {
      step: 'payment',
      sectionName: 'Метод оплаты',
      fields: paymentTypes,
    },
    {
      step: 'contact',
      sectionName: 'Контактные данные',
      fields: contactFields,
    },
    /* {
      step: 'delivery',
      sectionName: 'Способ получения',
      fields: deliveryTypes
    }, */
    {
      step: 'contactsDelivery',
      sectionName: 'Данные для доставки',
      fields: deliveryContactFields,
    },
  ]

  const makeOrder = async (data) => {
    setIsLoading(true)

    const orderData = {
      set_paid: false,
      currency: 'UZS',
      status: payment === 'cash' ? 'processing' : 'pending',
      payment_method_title: payment,
      payment_method: payment,
      line_items: lineItems,
      total,
      billing: {
        country: data.contactsDelivery.country,
        city: data.contactsDelivery.city,
        address_1: data.contactsDelivery.address,
        first_name: data.contact.firstName,
        last_name: data.contact.lastName,
        phone: data.contact.phone,
      },
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Доставка курьером',
          total: String(watch('contactsDelivery.rate')) || '0',
        },
      ],
      customer_note: data.contactsDelivery.notes && data.contactsDelivery.notes,
    }

    if (data.contact.email) {
      orderData.billing.email = data.contact.email
    }

    const response = await axios.post('/api/order', { order: orderData })

    if (payment !== 'cash') {
      setOrder(response.data?.order)
      const form = document.querySelector(`#${payment}-form`)
      if (form) {
        form.submit()
      }
      localStorage.clear()
      return
    }
    if (response.data.status) {
      localStorage.clear()
      window.location.assign(
        `https://chinbozor.uz/order/${response.data?.order?.order_key}`
      )
    } else {
      setIsLoading(false)
      alert(response.data.message)
    }
  }

  return (
    <Layout headerStyle='checkout' showFooter={false} showBreadcrumbs={false}>
      <form id='apelsin-form' method='GET' action='https://payment.apelsin.uz'>
        <input
          type='hidden'
          name='cash'
          value='b7cbffbbe2ab45279849c4beaf90b0e3'
        />
        <input
          type='hidden'
          name='redirectUrl'
          value={`${host}/order/${order?.order_key}`}
        />
        <input type='hidden' name='amount' value={Number(order?.total) * 100} />
      </form>
      <form id='payme-form' method='post' action='https://checkout.paycom.uz'>
        <input type='hidden' name='merchant' value='62da34a739c675be34e31802' />
        <input type='hidden' name='amount' value={Number(order?.total) * 100} />
        <input type='hidden' name='account[order_id]' value={order?.id} />
        <input type='hidden' name='lang' value='ru' />
        <input
          type='hidden'
          name='callback'
          value={`${host}/order/${order?.order_key}`}
        />
      </form>
      <form
        id='click-form'
        method='get'
        action='https://my.click.uz/services/pay'
      >
        <input type='hidden' name='merchant_id' value='16343' />
        <input type='hidden' name='transaction_param' value={order?.id} />
        <input type='hidden' name='service_id' value='23499' />
        <input type='hidden' name='amount' value={Number(order?.total)} />
        <input
          type='hidden'
          name='return_url'
          value={`${host}/order/${order?.order_key}`}
        />
      </form>
      <div className='container mb-75'>
        <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
          Оформление заказа
        </h1>
        {cartItems.length > 0 ? (
          <div className='lg:grid grid-cols-12 gap-30'>
            <div className='col-start-1 col-end-8'>
              <CheckoutForm
                sections={formFields}
                setPayment={setPayment}
                payment={payment}
                errors={errors}
                dirtyFields={dirtyFields}
                total={total}
              />
              <div className='pl-60 md:pl-96 mb-36'>
                <Button
                  className='px-60'
                  disabled={!isValid || !isDirty || isLoading}
                  onClick={handleSubmit(makeOrder)}
                >
                  Оформить заказ
                </Button>
              </div>
            </div>
            <div className='col-start-9 col-end-13'>
              <CartInfo
                items={cartItems}
                showButtons={false}
                setTotal={setTotal}
                delivery={Number(watch('contactsDelivery.rate')) || 0}
              />
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <h2 className='text-16 leading-18 text-d-gray-400 mb-20'>
              Корзина пуста
            </h2>
            <Link href='/shop'>
              <Button>Начать покупки</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  }
}

export default connect(mapStateToProps)(Checkout)
