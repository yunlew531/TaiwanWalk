const getRandomInt = max => Math.floor(Math.random() * max)

const getRamdomArr = (length, maxNum) => {
  const randomNums = []
  while (randomNums.length < length) {
    const num = getRandomInt(maxNum)
    if (!randomNums.includes(num)) {
      randomNums.push(num)
    }
  }
  return randomNums
}

export default ({ app }, inject) => {
  inject('getRandom', {
    getRandomInt,
    getRamdomArr
  })
}
