import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { nanoid } from 'nanoid'
import { addToCart, deleteFromCart } from '../../redux/actions/cartActions'
import { addToRecentViewedlist } from '../../redux/actions/recentViewedActions'
import {
  addToWishlist,
  deleteFromWishlist,
} from '../../redux/actions/wishlistActions'
import { icons } from '../../public/static/fixture'
import Price from '../Price/Price'
import BlockWrapper from '../BlockWrapper/BlockWrapper'
import ProductList from '../ProductList/ProductList'
import ImageGallery from 'react-image-gallery'
import Button from '../Button/Button'
import { showCartModal } from '../../redux/actions/modalActions'

const ProductCard = ({
  product,
  cartItems,
  wishlistItems,
  addToCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishlist,
  addToRecentViewedlist,
  recentViewedItems,
  showCartModal,
}) => {
  useEffect(() => {
    addToRecentViewedlist(product)
  }, [product])
  const [selectedProductId, setSelectedProductId] = useState(
    product.variations
      ? product.variations.nodes[0].databaseId
      : product.databaseId
  )

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variations
      ? product.variations.nodes[0].color &&
          product.variations.nodes[0].color.nodes[0]?.value
      : product.paColors.nodes[0]?.name
  )

  const [selectedProductImage, setSelectedProductImage] = useState(
    product.variations
      ? product.variations.nodes[0].image.sourceUrl
      : product.image.sourceUrl
  )

  const [activeTab, setActiveTab] = useState('about')

  const cartItem = cartItems.filter(
    (cartItem) => cartItem.selectedProductId === selectedProductId
  )[0]
  // const wishlistItem = wishlistItems.filter(wishlistItem => wishlistItem.id === product.id)[0]

  const galleryImages = product.galleryImages.nodes.map(({ sourceUrl }) => ({
    original: sourceUrl,
    thumbnail: sourceUrl,
  }))

  const images = [
    {
      original: selectedProductImage,
      thumbnail: selectedProductImage,
    },
    ...galleryImages,
  ]

  const productParams = [
    {
      name: 'Товар',
      value: 'В наличии',
    },
    {
      name: 'Артикул',
      value: product.sku,
    },
  ]

  const paVariants = [
    {
      name: 'Бренд',
      gqlObject: 'paBrands',
    },
    {
      name: 'Цвет',
      gqlObject: 'paColors',
    },
    {
      name: 'Тип конструкции',
      gqlObject: 'paConstructionTypes',
    },
    {
      name: 'Мощность охлаждения',
      gqlObject: 'paCoolingCapacities',
    },
    {
      name: 'Тип разморозки',
      gqlObject: 'paDefrostTypes',
    },
    {
      name: 'Диагональ',
      gqlObject: 'paDiagonals',
    },
    {
      name: 'Тип матрицы экрана',
      gqlObject: 'paDisplayMatricesType',
    },
    {
      name: 'Разрешение дисплея',
      gqlObject: 'paDisplayResolutions',
    },
    {
      name: 'Сканер отпечатков пальцев',
      gqlObject: 'paFingerprintScanners',
    },
    {
      name: 'Расположение морозильной камеры',
      gqlObject: 'paFreezerLayouts',
    },
    {
      name: 'Передняя камера',
      gqlObject: 'paFrontCameras',
    },
    {
      name: 'Жесткий диск',
      gqlObject: 'paHardDiskDrives',
    },
    {
      name: 'Жесткий диск объем',
      gqlObject: 'paHardDiskDriveVolumes',
    },
    {
      name: 'Перенавешиваемая дверь',
      gqlObject: 'paHingedDoors',
    },
    {
      name: 'Встроенная память',
      gqlObject: 'paInternalMemories',
    },
    {
      name: 'Тип загрузки',
      gqlObject: 'paLoadTypes',
    },
    {
      name: 'Основная камера',
      gqlObject: 'paMainCameras',
    },
    {
      name: 'Производитель',
      gqlObject: 'paManufacturers',
    },
    {
      name: 'Макс загрузка',
      gqlObject: 'paMaxLoads',
    },
    {
      name: 'Максимальный объем карт памяти',
      gqlObject: 'paMaxMemoryCards',
    },
    {
      name: 'Модель',
      gqlObject: 'paModels',
    },
    {
      name: 'Количество ядер',
      gqlObject: 'paNumberOfCores',
    },
    {
      name: 'Полезный объем',
      gqlObject: 'paPerformableVolumes',
    },
    {
      name: 'Процессор',
      gqlObject: 'paProcessors',
    },
    {
      name: 'Тип',
      gqlObject: 'paProductTypes',
    },
    {
      name: 'ОЗУ',
      gqlObject: 'paRams',
    },
    {
      name: 'Разрешение',
      gqlObject: 'paResolutions',
    },
    {
      name: 'Формат экрана',
      gqlObject: 'paScreenFormats',
    },
    {
      name: 'Технология экрана',
      gqlObject: 'paScreenTechnologies',
    },
    {
      name: 'Обслуживаемая площадь',
      gqlObject: 'paServicedAreas',
    },
    {
      name: 'Smart TV',
      gqlObject: 'paSmartTvs',
    },
    {
      name: 'Поддержка 3D',
      gqlObject: 'paSupport3ds',
    },
    {
      name: 'Видеокарта',
      gqlObject: 'paVideoCards',
    },
    {
      name: 'Режим работы',
      gqlObject: 'paWorkModes',
    },
  ]

  for (const param of paVariants) {
    if (product[param.gqlObject]?.nodes.length > 0) {
      productParams.push({
        name: param.name,
        value: product[param.gqlObject].nodes.map((val) => val.name).join(', '),
      })
    }
  }

  const productParamsElement = []

  for (const param of productParams) {
    productParamsElement.push(
      <li key={nanoid()} className='mb-16'>
        {`• ${param.name}: `}
        <span className='text-d-gray-300'>{param.value}</span>
      </li>
    )
  }

  const tabs = [
    {
      id: 'delivery',
      name: 'Доставка и оплата',
      content: `
<strong>По городу Ташкент – БЕСПЛАТНАЯ:</strong><br/>
Заказ доставляется по адресу, указанному при оформлении заказа, после предварительного звонка оператора и подтверждения заказа.<br/><br/>
Заказы, оформленные с 00:00 до 15:00 доставляются на следующий рабочий день.<br/>
Заказы, оформленные с 15:01 до 23:59 доставляются через один рабочий день.<br/><br/>
Рабочие часы службы доставки: с 15:00 до 21:00. Без выходных<br/><br/>
<strong>По Узбекистану – ПЛАТНАЯ (сумма зависит от региона доставки):</strong><br/><br/>
Срок - в течение 7 рабочих дней.
`,
    },
    // {
    //   id: 'about',
    //   name: 'Фото',
    //   content: product.description
    // }
  ]

  const tabsElement = []

  for (const tab of tabs) {
    tabsElement.push(
      <li className='mr-32' key={nanoid()}>
        <button
          className={`text-15 leading-17 pt-27 pb-25 border-b-2 border-transparent ${
            tab.id === activeTab
              ? 'text-d-gray-400 font-medium border-f-red-500'
              : 'text-gray-400'
          }`}
          onClick={() => {
            setActiveTab(tab.id)
          }}
        >
          {tab.name}
        </button>
      </li>
    )
  }

  const tabsContentElement = []

  for (const tab of tabs) {
    tabsContentElement.push(
      <div
        key={nanoid()}
        className={`text-15 leading-21 text-d-gray-300 ${
          tab.id !== activeTab ? 'hidden' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: tab.content }}
      />
    )
  }

  const colorElement = []

  if (product.variations) {
    for (const i in product.variations.nodes) {
      const variation = product.variations.nodes[i]
      console.log(variation.color)
      const isActive = selectedProductColor === variation.color.nodes[0].value
      colorElement.push(
        <li key={nanoid()}>
          <button
            className='rounded-full w-32 h-32 mr-14 relative'
            style={{
              backgroundColor: variation.color?.nodes[0].color
                ? variation.color.nodes[0].color
                : 'red',
            }}
            onClick={() => {
              setSelectedProductColor(variation.color.nodes[0].value)
              setSelectedProductId(variation.databaseId)
              setSelectedProductImage(variation.image.sourceUrl)
            }}
          >
            <span
              className={`border-d-gray-400 border rounded-full absolute inset-0 ${
                isActive ? 'block' : 'hidden'
              }`}
            />
            <span
              className={`border-white-100 border-3 rounded-full absolute inset-1 ${
                isActive ? 'block' : 'hidden'
              }`}
            />
          </button>
        </li>
      )
    }
  }

  const brand =
    product.paBrands?.nodes.length > 0 ? product.paBrands?.nodes[0].name : null

  return (
    <>
      <div className='lg:flex  mb-50 container'>
        <div className='w-full lg:w-8/12 mr-30'>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showNav={false}
            showFullscreenButton={false}
            autoPlay={false}
            thumbnailPosition='left'
          />
        </div>
        <div className=' w-full lg:w-4/12'>
          <div className='mb-32 flex justify-between items-center'>
            <h1
              className='text-24 leading-28 font-bold text-d-gray-400'
              dangerouslySetInnerHTML={{ __html: product.name }}
            />
            <ul className='flex'>
              <li className='ml-25'>
                <button
                  className='stroke-current text-d-gray-200 hover:text-f-red-500'
                  dangerouslySetInnerHTML={{ __html: icons.wishlist }}
                />
              </li>
              {/* <li className='ml-25'>
                <button
                  className='stroke-current text-d-gray-200 hover:text-f-green-500'
                  dangerouslySetInnerHTML={{ __html: icons.compare }}
                />
              </li> */}
            </ul>
          </div>
          <div className='flex lg:flex-row  flex-col '>
            {/*<div className='flex-1 order-2 lg:order-1'>*/}
            {/*  /!*<h3 className='text-16 leading-18 font-medium text-d-gray-400 mb-20'>*!/*/}
            {/*  /!*  О товаре*!/*/}
            {/*  /!*</h3>*!/*/}
            {/*  /!*<ul className='text-14 leading-16 text-d-gray-200 mb-32'>*!/*/}
            {/*  /!*  {productParamsElement}*!/*/}
            {/*  /!*</ul>*!/*/}
            {/*  <div className='mb-20'>*/}
            {/*    /!*<Link href={`/shop?filter_brands=${brand}`}>*!/*/}
            {/*    /!*  <a*!/*/}
            {/*    /!*    className='text-16 leading-18 font-medium text-d-gray-400 underline'*!/*/}
            {/*    /!*  >*!/*/}
            {/*    /!*    Все товары {brand}*!/*/}
            {/*    /!*  </a>*!/*/}
            {/*    /!*</Link>*!/*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className=' hidden lg:block lg:order-2 mx-60' />*/}
            <div className='flex-1 order-1 lg:order-3'>
              <Price
                price={product.woocsRegularPrice}
                salePrice={product.woocsSalePrice}
                className='mb-26'
              />
              {colorElement.length > 0 && (
                <div className='mb-32'>
                  <label className='text-d-gray-300 text-15 leading-17 mb-12 block'>
                    Цвет
                  </label>
                  <ul className='flex'>{colorElement}</ul>
                </div>
              )}
              <div className='mb-16'>
                <Button
                  className='w-full mb-20'
                  onClick={
                    cartItem
                      ? () => deleteFromCart(selectedProductId)
                      : () => {
                          addToCart(
                            product,
                            selectedProductColor,
                            selectedProductId
                          )
                          showCartModal()
                        }
                  }
                >
                  {cartItem ? 'В корзине' : 'Добавить в корзину'}
                </Button>
                {/* <Button className='w-full mb-20' style='bordered'>
                  Купить в рассрочку
                </Button> */}
              </div>
              {/* <div className='text-14 leading-16 text-d-gray-300 mb-16'>
                В рассрочку от
                <strong className='text-15 leading-17 font-medium text-d-gray-400'>
                  &nbsp;230 000 UZS
                </strong>
                &nbsp;/ мес
              </div> */}
              <div className='text-14 leading-16 text-d-gray-300'>
                <strong className='text-15 leading-17 font-medium text-d-gray-400'>
                  Доставка по городу Ташкент: <br />
                  -В течение 8 часов 25 000 сум
                  <br />
                  -В течение 2 дней 15 000 сум
                  <br />
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='md:bg-white-200 bg-white-100 z-10 fixed md:mb-36 md:relative bottom-0 left-0 right-0'>
        <div className='container flex justify-between items-center'>
          <div>
            <ul className='hidden  md:flex'>{tabsElement}</ul>
          </div>
          <div className='flex items-center'>
            <Price
              price={product.woocsRegularPrice}
              salePrice={product.woocsSalePrice}
              className='mr-32'
            />
            <Button
              className='min-w-205'
              onClick={
                cartItem
                  ? () => deleteFromCart(selectedProductId)
                  : () => {
                      addToCart(
                        product,
                        selectedProductColor,
                        selectedProductId
                      )
                      showCartModal()
                    }
              }
            >
              {cartItem ? 'В корзине' : 'Добавить в корзину'}
            </Button>
          </div>
        </div>
      </div>
      <div className='container mb-70'>{tabsContentElement}</div>
      {product.related.nodes && (
        <BlockWrapper className='mb-70' title='Вам также может понравиться'>
          <ProductList products={product.related.nodes} />
        </BlockWrapper>
      )}
      {recentViewedItems.length > 0 && (
        <BlockWrapper
          className='mb-70'
          title='Вы недавно смотрели'
          link='/recently-viewed'
          linkName='Посмотреть все'
          key={product.id}
        >
          <ProductList products={recentViewedItems.slice(0, 4)} />
        </BlockWrapper>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    recentViewedItems: state.recentViewedData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, selectedProductColor, selectedProductId) => {
      dispatch(addToCart(item, selectedProductColor, selectedProductId))
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
    addToRecentViewedlist: (item) => {
      dispatch(addToRecentViewedlist(item))
    },
    showCartModal: () => {
      dispatch(showCartModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
