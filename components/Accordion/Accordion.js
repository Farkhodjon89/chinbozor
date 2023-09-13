import React from 'react'
import { icons } from '../../public/static/fixture'

const Accordion = ({ text, date, img, active, setActive, id, onToggleAccordion }) => {
  return (
    <div className='container border border-gray-200'>
      <div className=' border border-gray-200 px-30 py-20  md:py-0 rounded  mb-24 flex text-14 text-gray-500 font-normal items-center justify-between'>
        <div className='md:flex items-center'>
          <p className='mr-24 mb-20 md:mb-0'>0003090</p>
          <p className='mr-24'>{date}</p>
          <img className='hidden lg:block' src={img} />
        </div>
        <div className='md:flex'>
          <p className='mr-0 md:mr-24 mb-20 md:mb-0'>2 товара на <span>4 230 960 UZS</span></p>
          <div className='flex md:flex'>
            <p>{text}</p>
            <span
              onClick={onToggleAccordion} className='ml-30'
              dangerouslySetInnerHTML={{ __html: active === id ? icons.chevronUp : icons.chevronDown }}
            />
          </div>
        </div>
      </div>
      <div className={`overflow-hidden px-15 md:px-30 ${(active === id ? 'h-500 opacity-1' : 'h-0 opacity-0')}`}>
        <div className='mb-36'>
          <h1 className='text-16 text-d-gray-400 mb-20 font-bold'>
            Персональные данные
          </h1>
          <div className='grid  grid-cols-1 md:grid-cols-2 text-14 font-normal text-gray-400'>
            <div>
              <p className='mb-16'>Заказчик: Джахон Эркинов</p>
              <p>Адрес: Яккасарайский район, улица Шота Руставели, <br />
                20 дом, квартира 8
              </p>
            </div>
            <div>
              <p className='mb-16'>Метод оплаты: Наличными или картой</p>
              <p>Метод доставки: Доставка курьером</p>
            </div>

          </div>
        </div>
        <div>
          <h1 className='text-16 text-d-gray-400 mb-20 font-bold'>
            Товары
          </h1>
          <div className='md:flex justify-between mb-35  '>
            <div className='mb-17 md:mb-0'>
              <p className='text-14 font-normal text-gray-500'>
                Наушники JBL FREE II (Black) JBL FREE II TWS BLK
              </p>
            </div>
            <div className='flex '>
              <p className='text-14 font-normal text-gray-500'>
                Черный
              </p>
              <span className='text-14 font-normal text-gray-500 ml-30'>
                2 шт
              </span>
              <span className='border border-f-red-400 rounded text-13 text-f-red-400 font-normal ml-20'>
                -20%
              </span>
              <p className='text-14 font-normal text-gray-500 ml-20 md:ml-50'>
                7 246 000 UZS
              </p>
            </div>
          </div>
          <div className='md:flex justify-between mb-35'>
            <div className='mb-17 md:mb-0'>
              <p className='text-14 font-normal text-gray-500'>
                Samsung Galaxy S21 2021 G991B 8/128GB Phantom Grey
              </p>
            </div>
            <div className='flex'>
              <p className='text-14 font-normal text-gray-500'>
                Серый
              </p>
              <span className='text-14 font-normal text-gray-500 ml-30'>
                1 шт
              </span>
              <span className='border border-f-red-400 rounded text-13 text-f-red-400 font-normal ml-20'>
                -20%
              </span>
              <p className='text-14 font-normal text-gray-500  ml-20 md:ml-50'>
                2 246 000 UZS
              </p>
            </div>
          </div>

        </div>
        <hr />
        <ul className='border-t border-gray-100 pt-32 mb-36 grid md:grid-cols-2 grid-cols-1 gap-30'>
          <li className='md:col-start-2 col-start-1 list-none'>
            <h3 className='text-16 leading-18 text-d-gray-400 font-medium mb-20'>К оплате</h3>
            <ul className='text-d-gray-200 text-14 leading-16'>
              <li className='mb-16 flex justify-between'>
                <div>Подытог</div>
                <div className='text-d-gray-300'>
                  9 492 000 UZS
                </div>
              </li>
              <li className='mb-16 flex justify-between'>
                <div>Цена без скидки</div>
                <div className='text-d-gray-300'>
                  12 720 000 UZS
                </div>
              </li>
              <li className='mb-16 flex justify-between'>
                <div>Скидка</div>
                <div className='text-f-red-400'>-3 228 000 UZS</div>
              </li>
              <li className='mb-16 flex justify-between'>
                <div className='text-f-green-500 '>Промокод</div>
                <div className='text-f-green-500'>-300 000 UZS</div>
              </li>
              <li className='flex justify-between text-d-gray-400 font-medium'>
                <div>Итого</div>
                <div>9 492 000 UZS
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Accordion
