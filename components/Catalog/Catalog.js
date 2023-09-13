import React, { useEffect, useReducer, useRef } from 'react'
import {
  filterVariables,
  reducer,
  sortProducts,
  catalog,
} from '../../utils/catalog'
import { useLazyQuery } from '@apollo/react-hooks'
import { PRODUCTS } from '../../queries/products'
import client from '../../appolo/apollo-client'
import ProductsFilter from '../ProductsFilter/ProductsFilter'
import Loader from '../Loader/Loader'
import InfiniteScroll from 'react-infinite-scroller'
import ProductList from '../ProductList/ProductList'
import { useRouter } from 'next/router'

const initialState = {
  filters: {},
  sortValue: '',
  products: null,
  pageInfo: null,
}

const CatalogMain = ({ pageInfo, products, categories, category, colors }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    pageInfo,
    products,
  })

  const filterValues = (type, value) => {
    const arrayValuesFor = ['colors', 'featured']

    if (value === '' || value == null) {
      const filters = { ...state.filters }
      delete filters[type]

      dispatch({
        type: 'SET_FILTERS',
        filters,
      })

      return
    }

    if (arrayValuesFor.includes(type)) {
      let options = state.filters[type] || []

      if (options.includes(value)) {
        options = options.filter((x) => x !== value)
      } else {
        options = [...options, value]
      }

      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: type,
        value: options,
      })
    } else {
      dispatch({
        type: 'SET_FILTER_VALUE',
        filter: type,
        value: value,
      })
    }
  }

  const [loadProducts, { data, loading }] = useLazyQuery(PRODUCTS, { client })

  const loadMore = () => {
    if (!loading && state.pageInfo.hasNextPage) {
      loadProducts({
        variables: {
          categories: category && [category.slug],
          after: state.pageInfo.endCursor,
          // onSale: router.query.onSale === 'sale' ? true : undefined,
          onSale: router.query.onSale === 'sale',
          ...filterVariables(state.filters),
        },
      })
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_PRODUCTS_AND_PAGE_INFO',
        products: [...state.products, ...data.products.nodes],
        pageInfo: data.products.pageInfo,
      })
    }
  }, [data])

  const useIsMount = () => {
    const isMountRef = useRef(true)

    useEffect(() => {
      isMountRef.current = false
    }, [])

    return isMountRef.current
  }

  const isMount = useIsMount()

  if (typeof window !== 'undefined') {
    useEffect(() => {
      const { filters } = catalog.init()

      if (Object.keys(filters).length) {
        dispatch({
          type: 'SET_FILTERS',
          filters: filters,
        })
      }
    }, [window.location.search])
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = catalog.buildQuery({}, state.filters)
      const location = `${window.location.pathname}${query ? '?' : ''}${query}`
      window.history.replaceState(null, '', location)
    }

    if (!isMount) {
      loadProducts({
        variables: {
          categories: category && [category.slug],
          ...filterVariables(state.filters),
        },
      })
    }
  }, [state.filters])

  useEffect(() => {
    if (!state.products.length) {
      return
    }

    dispatch({
      type: 'SET_PRODUCTS',
      products: sortProducts(state.products, state.sortValue),
    })
  }, [state.sortValue])

  return (
    <div className='container'>
      <h1 className='text-24 leading-28 text-d-gray-400 font-bold mb-38'>
        Каталог
      </h1>
      <div className='grid grid-cols-12 gap-30 mb-70'>
        <div className='hidden md:block col-start-1 col-end-4'>
          <ProductsFilter
            categories={categories}
            category={category}
            colors={colors}
            active={state.filters}
            filterValues={filterValues}
          />
        </div>
        <div className='col-start-1 md:col-start-4 col-end-13'>
          {loading && !state.products.length ? (
            <Loader />
          ) : !state.products.length ? (
            <div className=''> Товары не найдены </div>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={!loading && state.pageInfo.hasNextPage}
              initialLoad={false}
            >
              <ProductList cols={3} products={state.products} />
              {loading && <Loader />}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  )
}

export default CatalogMain
