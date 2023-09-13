import Link from 'next/link'
import { icons } from '../../public/static/fixture'
import { nanoid } from 'nanoid'

const HeaderCheckout = () => {
  const langs = [
    {
      name: 'Ўзб',
      url: '#'
    },
    {
      name: 'Рус',
      url: '#',
      active: true
    }
  ]

  const langsElement = []

  /* for (const lang of langs) {
    langsElement.push(
      <li className='ml-12' key={nanoid()}>
        <a
          href={lang.url}
          className={`hover:text-f-green-500 ${lang.active ? 'text-f-green-500' : 'text-white-100'}`}
        >{lang.name}
        </a>
      </li>
    )
  } */

  return (
    <header className='bg-white-200 mb-56'>
      <div className='container py-20 flex items-center justify-between'>
        <div>
          <Link href='/' legacyBehavior>
            <a dangerouslySetInnerHTML={{ __html: icons.logo }} />
          </Link>
        </div>
        <div className='flex items-center'>
          <div>
            <a href='tel:+998 98 117 89 98' className='text-d-gray-400 hover:text-f-red-400 text-14 leading-16'>+998 98 117 89 98</a>
          </div>
          {langsElement.length > 0 &&
            <ul className='flex ml-14 text-12'>
              {langsElement}
            </ul>}
        </div>
      </div>
    </header>
  )
}

export default HeaderCheckout
