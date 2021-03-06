import Mock from 'mockjs'

// 导入json数据
import data from './data.json'



// 如果没有该baseURL，想要获取Mockjs数据时，其请求的URL地址则必须是路径，不能携带其他ip地址和端口号
// const baseURL = 'http://192.168.2.150:4000'
// const baseURL = 'http://127.0.0.1:4000'
const baseURL = 'http://timecrush.cn:8887'

    
/**
 * mock()的第一个参数是URL路径，第二个参数是返回的json数据对象
 * 当前端发送Ajax请求时，Mockjs会拦截所配置的URL路径并返回数据
 */

// 模拟商家食品的接口
Mock.mock(baseURL + '/goods', { code: 0, data: data.goods })
// 模拟用户评论的接口
Mock.mock(baseURL + '/rate', { code: 0, data: data.ratings })
// 模拟商家信息的接口
Mock.mock(baseURL + '/info', { code: 0, data: data.info })