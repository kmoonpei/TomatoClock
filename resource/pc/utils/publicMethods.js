import format from 'date-fns/format'
import getTime from 'date-fns/get_time'

export default {
  //获取今天时间的字符串格式“YYYY-MM-DD”
  getTodayDate() {
    let today = format(new Date(), 'YYYY-MM-DD')
    return today
  },
  //获取今天零点的时间戳
  getToday() {
    let day = new Date()
    return new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()
  },
  //将数据写入localStorage
  writeLocalStorage(key,something) {
    localStorage.setItem(key,JSON.stringify(something))
  },
  //根据key读取localStorage的数据
  readLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
  }

}
