import { nanoid } from 'nanoid'
import Link from 'next/link'

const links = [
  {
    name: 'Условия доставки',
    url: '/terms-of-delivery',
  },
  {
    name: 'Акции',
    url: '/shop/?onSale=sale',
  },
]

const linksElement = []

for (const link of links) {
  linksElement.push(
    <li className='mr-26' key={nanoid()}>
      <Link href={link.url} legacyBehavior>
        <a className='text-d-gray-300 hover:text-f-red-400'>{link.name}</a>
      </Link>
    </li>
  )
}

const langs = [
  {
    name: 'Ўзб',
    url: '#',
  },
  {
    name: 'Рус',
    url: '#',
    active: true,
  },
]

const langsElement = []

// for (const lang of langs) {
//   langsElement.push(
//     <li className='ml-12' key={nanoid()}>
//       <a href={lang.url} className={`hover:text-d-green-200 ${lang.active ? 'text-d-green-400' : 'text-d-gray-100'}`}>{lang.name}</a>
//     </li>
//   )
// }

const TopBar = () => {
  return (
    <div className='bg-white-200 py-7'>
      <div className='container flex flex-wrap justify-between text-14'>
        <div className='hidden md:flex'>
          <ul className='flex'>{linksElement}</ul>
        </div>
        <div className='flex '>
          <div className='ml-10'>
            <a className='text-d-gray-400 mr-30'>
              Адрес: Chinni bozori 7-ряд 16-магазин, Абу-Сахий 6-ряд
              286-магазин&nbsp;
            </a>
            <a
              href='tel:+998 98 117 89 98'
              className='text-d-gray-400 hover:text-f-red-400'
            >
              +998 98 117 89 98
            </a>
          </div>
          {langsElement.length > 0 && (
            <ul className='flex ml-14 text-12'>{langsElement}</ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
