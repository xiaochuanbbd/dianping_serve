const express = require('express')
const app = express()
const port = 3003
const XiaoChuanRouter = require('./routers/xiaochuan')
const yuhongRouter = require('./routers/guoyuhong')
const WuLeiRouter = require('./routers/wulei')

//引入db模块---用于连接数据库
//const db = require('./db')
//引入student模型对象---用于增删改查用户
////const userModel = require('./models/userModel')
const db = require('./db')
//引入student模型对象---用于增删改查用户
const userModel = require('./models/userModel')

 
//引入md5加密
const md5 = require('md5')
// const sha1 = require('sha1')


//应用中间件
//解析请求体中urlencoded编码的参数为一个对象
app.use(express.urlencoded({
	extended: true
}))
//解析请求体中json编码的参数为一个对象
app.use(express.json())

app.use(XiaoChuanRouter)
app.use(yuhongRouter)
app.use(WuLeiRouter)
// 1.注册
app.post('/register', async (req, res) => {
	//获取客户端传递过来的：手机号、密码
	const {
		phone,
		pwd
	} = req.body
	if(!phone  || !pwd){
		res.send({
			code:502,
			data: '手机号或者密码不能为空'
		})
		return;
	}
	
	console.log(phone)
	// 1. 查询数据库是否有该用户
	let result = await userModel.findOne({phone})
	console.log('result', result)

	if(result){
		// 1.1 如果有
		res.send({
			code: 502,
			data: '该用户已注册'
		})
	}else {
		// 1.2 如果没有
		// 1.2.1 将该用户的数据存入至数据库
		let userInfo = await userModel.create({
			phone,
			pwd
		})
		// 1.2.2 返回注册的数据
		res.send({
			code: 200,
			data: '注册成功',
			profile: userInfo
		})
	}

	
})

// 2.登录
app.post('/login', async (req, res) => {
	//获取客户端传递过来的：手机号、密码
	const {
		phone,
		pwd
	} = req.body

	// 1.手机号 密码都不能为空
	if(!phone || !pwd){
		res.send({
			code:503,
			data: '手机号或者密码不能为空'
		})
		return;
	}

	// 2. 查询数据库是否有该用户
	
	//去数据库中查询该用户是否注册过
	const findResult = await userModel.findOne({
		phone,
		pwd,
	})

	//如果已经注册  
	if (findResult) {
		// req.session._id = findResult._id

		if(findResult){
			res.send({
				code: 20000,
				msg: '登录成功！',
				data: findResult
			})
		}else{
			res.send({
				code:20001,
				msg:'手机号 密码输入错误',
				data:{}
			})
		}
	} else {
		//登录失败
		res.send({
			code: 20001,
			msg: '该用户不存在，请注册！',
			data: {}
		})
	}
})

// 3.退出登录
app.get("/logout",(req,res)=>{
	res.send('退出登录成功')
})


app.listen(port, (err) => {
	if (err) {
		console.log('服务器启动失败', err);
	}
	console.log("服务器启动成功");
	console.log(`服务器地址：http://localhost:${port}`);
})