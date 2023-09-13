import ProductItem from '../ProductItem/ProductItem'
import { nanoid } from 'nanoid'

const ProductList = ({ products, cols = 4 }) => {
  const productsElement = []
  for (const product of products) {
    productsElement.push(
      <li key={nanoid()} className='mb-14'>
        <ProductItem product={product} />
      </li>
    )
  }

  return (
    <ul className={`grid grid-cols-2 md:grid-cols-${cols} gap-y-1 gap-x-10 md:gap-30`}>
      {productsElement}
    </ul>
  )
}

export default ProductList
