import pthReq from '@/api/pth-req'

export const apiGetActivities = (qty = 100) => pthReq.get(`/v2/Tourism/Activity?$top=${qty}&$skip=100`)
