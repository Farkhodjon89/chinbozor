import { icons } from '../../public/static/fixture'
import { useState } from 'react'

const AccordionList = ({ items }) => {
  const [active, setActive] = useState()
  return (
    <ul className=''>
      {items.map(({ title, content }, key) => (
        <li
          key={key}
          className='mb-24 border border-white-300 rounded hover:border-f-red-500 transition'
        >
          <button
            onClick={() => {
              active === key ? setActive('') : setActive(key)
            }}
            className='relative pl-32 z-10 pr-25 h-74 flex items-center justify-between text-16 leading-18 w-full group hover:bg-f-red-500'
          >
            <span className='text-d-gray-300 font-medium transition group-hover:text-white-100'>
              {title}
            </span>
            <i
              className='stroke-current transition text-d-gray-200 group-hover:text-white-100'
              dangerouslySetInnerHTML={{
                __html: active === key ? icons.arrowTop : icons.arrowBottom,
              }}
            />
          </button>
          <div
            className={`${
              active === key ? 'block' : 'hidden'
            } -mt-1 mx-32 py-32 text-15 leading-21 text-d-gray-300 border-t border-white-300`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </li>
      ))}
    </ul>
  )
}

export default AccordionList
