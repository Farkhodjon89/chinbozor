import { nanoid } from 'nanoid'
import Link from 'next/link'
import { icons } from '../../public/static/fixture'

const CategoriesList = ({ categories }) => {
  const categoriesElement = []
  for (const cat of categories) {
    categoriesElement.push(
      <li key={nanoid()} className='mb-5'>
        <Link legacyBehavior href={cat.url}>
          <a className='block group'>
            <span
              className='bg-white-200 rounded flex items-center justify-center h-160 mb-17 group-hover:bg-f-red-200 transition'
            >
              <img src={cat.image?.sourceUrl} />
            </span>
            {cat.title &&
              <span className='flex items-center font-medium text-15 text-d-gray-400 leading-17 group-hover:underline transition'>
                {cat.title}
                <i className='ml-8' dangerouslySetInnerHTML={{ __html: icons.longArrowRight }} />
              </span>}
          </a>
        </Link>
      </li>
    )
  }

  return (
    <ul className='grid grid-cols-2 md:grid-cols-4 gap-30'>
      {categoriesElement}
    </ul>
  )
}

export default CategoriesList
