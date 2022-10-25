import moment from 'moment'

export const fromNowFilter = {
  filters: {
    // fromNow(datetime) {
    //   return datetime ? moment(datetime).fromNow() : '-'
    // }
    fromNow(datetime) {
      if (!datetime) {
        return '-'
      } else {
        return moment(datetime).fromNow()
      }
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://fakeimg.pl/350x220/DFDFDF/?text=No+Image'
    }
  }
}