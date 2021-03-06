// 全局过滤器入口文件
import Vue from 'vue'
import moment from 'moment'
Vue.filter('dataFormat', val => moment(val).format('YYYY-MM-DD hh:mm:ss'))
