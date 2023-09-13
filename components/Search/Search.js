import { icons } from '../../public/static/fixture'
import Link from 'next/link'
import OutsideClicker from '../OutsideClicker/OutsideClicker'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { SEARCH_PRODUCTS } from '../../queries/products'
import client from '../../appolo/apollo-client'

let timeout

const Search = () => {
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loadProducts, { data, loading }] = useLazyQuery(SEARCH_PRODUCTS, { client })
  const outSideClickerCallBack = () => {
    setShowOnMobile(false)
    setShowSearchResults(false)
  }

  useEffect(() => {
    if (data && searchQuery.length) {
      setSearchResults(data.products.nodes)
    }
  }, [data])

  const searchData = e => {
    setSearchResults([])
    setSearchQuery(e.target.value)
    clearTimeout(timeout)
    if (e.target.value.length) {
      setShowSearchResults(true)
      timeout = setTimeout(() => {
        loadProducts({
          variables: {
            first: 10,
            search: e.target.value
          }
        })
      }, 500)
    } else {
      setShowSearchResults(false)
    }
  }

  const [showOnMobile, setShowOnMobile] = useState(false)

  return (
    <OutsideClicker callback={outSideClickerCallBack}>
      <div className='md:relative'>
        <div className='hidden md:block'>
          <input
            type='text'
            name='s'
            placeholder='Поиск по сайту'
            onFocus={() => searchQuery ? setShowSearchResults(true) : null}
            onChange={searchData}
            className='border border-gray-100 rounded h-48 w-512 px-18 py-10 outline-none text-15 placeholder-d-gray-300 focus:border-gray-300 hidden md:block'
          />
          <button
            dangerouslySetInnerHTML={{ __html: icons.search }}
            className='absolute right-12 top-1/2 transform -translate-y-1/2'
          />
        </div>
        <div className='md:hidden flex items-center'>
          <button
            dangerouslySetInnerHTML={{ __html: icons.search }}
            className=''
            onClick={() => setShowOnMobile(true)}
          />
          <div className={`absolute left-0 right-0 top-0 ${!showOnMobile ? 'hidden' : ''}`}>
            <input
              type='text'
              name='s'
              placeholder='Поиск по сайту'
              onFocus={() => searchQuery ? setShowSearchResults(true) : null}
              onChange={searchData}
              className='border border-gray-100 md:rounded h-76 w-full px-18 py-10 outline-none text-15 placeholder-d-gray-300 focus:border-gray-300'
            />
            <button
              dangerouslySetInnerHTML={{ __html: icons.close }}
              className='absolute right-10 top-1/2 -translate-y-1/2 transform stroke-current'
              onClick={() => setShowOnMobile(false)}
            />
          </div>
        </div>
        {showSearchResults &&
          <div className='absolute left-0 right-0 top-full bg-white-100 p-20 md:mt-10 border border-gray-100 md:rounded text-16 leading-20'>
            {loading && !searchResults.length
              ? (<div>Загрузка...</div>)
              : searchQuery.length && !searchResults.length
                ? (<div>Товары не найдены</div>)
                : searchResults.length
                  ? (
                    <div className='flex flex-col'>
                      {searchResults.map((product, key) => (
                        <Link legacyBehavior href={'/product/' + product.slug} key={key}>
                          <a className={`hover:text-f-green-500 ${key !== 0 ? 'mt-10' : ''}`}>{product.name}</a>
                        </Link>
                      ))}
                    </div>
                    )
                  : null}
          </div>}
      </div>
    </OutsideClicker>
  )
}

export default Search
