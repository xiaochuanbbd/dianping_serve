const express = require('express')
const yuhongRouter = express.Router()


const hotList = require('../datas/guoyuhong/hotList/hotList.json')
yuhongRouter.get('/gethotList',(request,response)=>{
  response.send(hotList)
})

const typeItem = require('../datas/guoyuhong/typeOutList/typeOutList.json')
yuhongRouter.get('/gettypeItem',(request,response) => {
  response.send(typeItem)
})

const foodDatas = require('../datas/guoyuhong/foods/foods.json')
yuhongRouter.get('/getfoodDatas',(request,response) => {
  response.send(foodDatas)
})

const orderItems = require('../datas/guoyuhong/order/order.json')
yuhongRouter.get('/getorderItems',(request,response) => {
  response.send(orderItems)
})

const studyItems = require('../datas/guoyuhong/study/study.json')
yuhongRouter.get('/getstudyItems',(request,response) => {
  response.send(studyItems)
})

module.exports = yuhongRouter