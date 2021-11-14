import JsSHA from 'jssha'

const getAuthHeader = () => {
  const AppID = process.env.TRX_ID
  const AppKey = process.env.TRX_KEY
  const GMTString = new Date().toUTCString()
  const ShaObj = new JsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
  return { Authorization, 'X-Date': GMTString }
}

export default ({ $axios }) => {
  $axios.onRequest((config) => {
    config.headers = getAuthHeader()
  })
}
