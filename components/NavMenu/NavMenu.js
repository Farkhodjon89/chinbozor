import Link from 'next/link'

const NavMenu = ({ items }) => {
  return (
    <ul className='mb-20'>
      {items.map(({ url, name, active }, key) => (
        <li key={key} className='mb-14'>
          <Link href={url} legacyBehavior>
            <a
              className={`block border text-16 leading-18 px-20 py-14 rounded ${active ? 'text-d-gray-400 font-medium border-d-gray-400  bg-f-red-500 bg-opacity-5' : 'text-d-gray-300 border-white-200 bg-white-200 hover:border-f-red-500 hover:bg-f-red-500 hover:text-white-100'}`}
            >
              {name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavMenu
