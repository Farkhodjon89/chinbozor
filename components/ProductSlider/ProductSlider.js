import ProductItem from '../ProductItem/ProductItem'
import { nanoid } from 'nanoid'
import { icons } from '../../public/static/fixture'
import Slick from 'react-slick'

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className='left-6 absolute text-d-gray-400 stroke-current w-44 h-44 bg-opacity-20 bg-white-100  top-1/2 z-10 flex items-center justify-center rounded-full focus:outline-none outline-none'
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: icons.arrowLeft }}
    />
  )
}

const NextArrow = ({ onClick }) => {
  return (
    <button
      className='right-6 absolute text-d-gray-400 stroke-current w-44 h-44 bg-opacity-20 bg-white-100  top-1/2  z-10 flex items-center justify-center rounded-full focus:outline-none outline-none'
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: icons.arrowRight }}
    />
  )
}

const settings = {
  dots: false,
  infinite: true,
  autoPlay: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  className: 'mx-auto mb-72',
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
}

const ProductSlider = ({ products, cols = 4 }) => {
  const productsElement = []
  for (const product of products) {
    productsElement.push(
      <div key={nanoid()} className='mb-14'>
        <ProductItem product={product} />
      </div>
    )
  }

  return (
    // <ul className={`grid grid-cols-2 md:grid-cols-${cols} gap-y-1 gap-x-10 md:gap-30`}>
    <Slick {...settings}>{productsElement}</Slick>
    //</ul>
  )
}

export default ProductSlider
