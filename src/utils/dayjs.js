import Vue from 'vue'
import dayjs from 'dayjs'

// dayjs默认语言是英文，需要配置中午，加载中午语言包
import 'dayjs/locale/zh-cn'
// 全局使用

// 配置使用处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))
// 模板过滤器，将管道符前的数据传入管道符后进行处理，然后返回处理后的值
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
