// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// exports.main = async (event, context) => {
//   return event.userInfo
// }


// exports.main = async (event, context) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(event.a + event.b)
//     }, 3000)
//   })
// }


const db = cloud.database()
exports.main = async (event, context) => {
  return db.collection('pictureID').get()
}