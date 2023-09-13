import {nanoid} from 'nanoid'
import moment from 'moment'
import {icons} from '../../public/static/fixture'

const Footer = ({categories}) => {
  const widgets = [
    {
      name: 'Категории',
      links: categories.map(({name, slug}) => {
        return {
          name: name,
          url: `/shop/${slug}`
        }
      })
    },
    {
      name: 'О компании',
      links: [
        {
          name: 'О Chinbozor',
          url: '/about'
        },
        {
          name: 'Контакты',
          url: '/contacts'
        },
        {
          name: 'Публичная оферта',
          url: '/public-offer'
        }
      ]
    },
    {
      name: 'Помощь',
      links: [
        {
          name: 'Часто задаваемые вопросы',
          url: '/faq'
        },
        {
          name: 'Условия пользования',
          url: '/terms-of-use'
        },
        {
          name: 'Условия доставки',
          url: '/terms-of-delivery'
        },
        {
          name: 'Рассрочка',
          url: '/installment'
        }
      ]
    }
  ]

  const widgetsElement = []

  for (const widget of widgets) {
    const links = []
    if (widget.links) {
      for (const link of widget.links) {
        links.push(
            <li className='mb-16' key={nanoid()}>
              <a href={link.url} className='text-d-gray-200 hover:text-f-red-400'>{link.name}</a>
            </li>
        )
      }
    }
    widgetsElement.push(
        <div key={nanoid()}>
          <h4 className='text-d-gray-300 font-medium mb-20'>{widget.name}</h4>
          <ul>{links}</ul>
        </div>
    )
  }

  return (
      <footer className='flex-shrink'>
        <div className='bg-white-200 pt-56 pb-40'>
          <div className='container text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-30 text-15 leading-17'>
            {widgetsElement}
            <div>
              <h4 className='text-d-gray-300 font-medium mb-20'>Контакты</h4>
              <div className='mb-16'>
                <a href='tel:+998 98 117 89 98' className='text-15 leading-17 text-d-gray-200 hover:text-f-red-400'>+998 98 117 89 98</a>
              </div>
              <ul className='flex justify-center md:justify-start'>
                <li className='mr-16 '>
                  <a
                      href='https://t.me/chinbozor'
                      target='_blank'
                      rel='noreferrer'
                      className='fill-current text-d-gray-200 hover:text-f-red-400'
                      dangerouslySetInnerHTML={{__html: icons.telegram}}
                  />
                </li>
                <li className='mr-16'>
                  <a
                      href='https://www.instagram.com/chinbozor.uz/'
                      target='_blank'
                      rel='noreferrer'
                      className='fill-current text-d-gray-200 hover:text-f-red-400'
                      dangerouslySetInnerHTML={{__html: icons.instagram}}
                  />
                </li>
                <li className='mr-16'>
                  <a
                      href='https://www.facebook.com/Chinbozor.uz/'
                      target='_blank'
                      rel='noreferrer'
                      className='fill-current text-d-gray-200 hover:text-f-red-400'
                      dangerouslySetInnerHTML={{__html: icons.facebook}}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='bg-d-gray-400'>
          <div className='container flex-col md:flex-row py-30 flex justify-between items-center'>
            <div
                className='mb-28 md:m-0 text-12 leading-14 text-white-100 font-light'>&copy; {moment().format('YYYY')} Chinbozor.
              Все права защищены
            </div>
            <ul className='mb-28 md:m-0 flex items-center'>
              <li className='mx-10 md:mx-25 fill-current text-white-100'
                  dangerouslySetInnerHTML={{__html: icons.clickLogo}}/>
              <li className='mx-10 md:mx-25 fill-current text-white-100'
                  dangerouslySetInnerHTML={{__html: icons.paymeLogo}}/>
              <li className='mx-10 md:mx-25 fill-current text-white-100'
                  dangerouslySetInnerHTML={{__html: icons.visaLogo}}/>
            </ul>
            <div className='text-12 leading-14 text-white-100 flex items-center text-12 leading-14'>
              <span className='mr-9 text-white-100'>Сайт разработан компанией</span>
              <a
                  href='https://billz.io/online-store' target="_blank" rel="nofollow, noreferrer"
                  className='flex items-center fill-current text-white-100 transition hover:text-billz'
              >
                <span className='mr-5' dangerouslySetInnerHTML={{__html: icons.billzLogo}}/>
                <span dangerouslySetInnerHTML={{__html: icons.billzText}}/>
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
