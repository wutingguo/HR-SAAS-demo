import dayjs from 'dayjs'
export const formatTime = (val, str = 'YYYY-MM-DD') => {
  return dayjs(val).format(str)
}
