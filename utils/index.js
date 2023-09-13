export const moveArrayElement = (input, from, to) => {
  let numberOfDeletedElm = 1

  const elm = input.splice(from, numberOfDeletedElm)[0]

  numberOfDeletedElm = 0

  input.splice(to, numberOfDeletedElm, elm)
}

export const plural = (number, one, two, five) => {
  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return five
  }
  n %= 10
  if (n === 1) {
    return one
  }
  if (n >= 2 && n <= 4) {
    return two
  }
  return five
}
