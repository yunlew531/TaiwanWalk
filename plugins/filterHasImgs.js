const filterHasImgs = data => data.filter(item => item.Picture.PictureUrl1)

export default (app, inject) => inject('filterHasImgs', filterHasImgs)
