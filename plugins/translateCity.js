import cities from '@/assets/json/city.json'

const chineseToEng = text => cities.data.filter(city => city.chinese === text)[0].eng

export default (app, inject) => {
  inject('translateCity', {
    chineseToEng
  })
}
