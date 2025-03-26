import moment from 'moment'

export function changeDateFormat(data, format  = 'lll') {
  if (data) {
    return moment(data).format(format)
  }
  return '—'
}