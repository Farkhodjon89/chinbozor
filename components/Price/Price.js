import { getFormatPrice } from '../../utils/price'

const Price = ({ price, salePrice, className }) => {
  let salePercent = 0
  if (salePrice) {
    salePercent = Math.round(100 - salePrice / price * 100)
  }

  return (
    <div className={className}>
      {salePercent > 0 &&
        <div className='flex mb-4'>
          <div
            className='text-f-red-400 border rounded border-f-red-400 text-13 leading-17 px-4 mr-6'
          >{`-${salePercent}%`}
          </div>
          <div
            className='text-13 leading-15 text-d-gray-100 line-through'
            dangerouslySetInnerHTML={{ __html: getFormatPrice(price, false) }}
          />
        </div>}
      <div
        className='text-16 leading-18 font-medium text-d-gray-400 whitespace-nowrap'
        dangerouslySetInnerHTML={{ __html: salePrice ? getFormatPrice(salePrice) : getFormatPrice(price) }}
      />
    </div>
  )
}

export default Price
