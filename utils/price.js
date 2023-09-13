export const getFormatPrice = (price, currency = true) => {
  let result = parseInt(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  if (currency) {
    result += ' <span class="text-14">UZS</span>'
  }
  return result
}

// export const getDiscountPrice = product =>
//   Math.round(((parseInt(product.regularPrice) - parseInt(product.salePrice)) * 100) / parseInt(product.regularPrice))
