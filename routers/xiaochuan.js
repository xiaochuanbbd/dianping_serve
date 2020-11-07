const express = require('express')
const XiaoChuanRouter = express.Router()
const fs = require('fs')
//拿shoptag的请求函数
const shopTags = require('../datas/xiaochuan/shopTaps/shopTap.json')
XiaoChuanRouter.get('/getshoptags', (request, response) => {
  response.send(shopTags)
})
//拿personal的请求函数
const personal = require('../datas/xiaochuan/personal/personal.json')
XiaoChuanRouter.get('/personalinfo', (request, response) => {
  response.send(personal)
})


//拿shoptagsList的数据
const shopTagsList = require('../datas/xiaochuan/shopTaps/shopTagsList.json')
XiaoChuanRouter.get('/shoptagslist', (request, response) => {
  response.send(shopTagsList)
})




//写入留言
XiaoChuanRouter.post('/writemessage', (request, response) => {
  let arrJSON = fs.readFileSync(__dirname + "/datas/writeMessage.json")
  let arr = JSON.parse(arrJSON.toString()) || []
  console.log(arr)
  let obj = {
    nickName,
    message,
    userFace
  } = request.body
  arr.push(obj)
  resultObj = JSON.stringify(arr)
  console.log(resultObj)
  fs.writeFile(__dirname + "/datas/writeMessage.json", resultObj, (err) => {
    if (err) {
      response.send({
        code:"502",
        msg:'写入失败'
      });
      throw err;
    } else {
      response.send({
        code:"200",
        msg:'写入成功'
      })
    }
  });
  // response.send('写入留言成功')



})

//读取留言
const writeMessage = require('./datas/writeMessage.json')
XiaoChuanRouter.get('/readmessage', (request, response) => {
  response.send(writeMessage)
})



module.exports = XiaoChuanRouter