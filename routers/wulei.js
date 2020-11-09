const express = require('express')
const WuLeiRouter = express.Router()

//搜索请求数据
const searchTags = require('../datas/wulei/searchs/search.json')
WuLeiRouter.get('/getsearchtags',(request,response)=>{
  response.send(searchTags)
})

//论坛请求数据
const communityTags = require('../datas/wulei/community/community.json')
WuLeiRouter.get('/getcommunitytags',(request,response)=>{
  response.send(communityTags)
})

module.exports = WuLeiRouter
