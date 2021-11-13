import axios from 'axios'

const ptxReq = axios.create({
  baseURL: process.env.TRX_URL
})

export default ptxReq
