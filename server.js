const express = require('express')
const app = express()
const port = 3003
const XiaoChuanRouter = require('./routers/xiaochuan')
//引入db模块---用于连接数据库
//const db = require('./db')
//引入student模型对象---用于增删改查用户
////const userModel = require('./models/userModel')

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
app.post('/register', async (request, response) => {
	//获取客户端传递过来的：邮箱、密码、昵称
	const {
		email,
		pwd,
		nick_name
	} = request.body
	//去数据库中查询该用户是否注册过
	const findResult = await userModel.findOne({
		email
	})
	//若未注册
	if (!findResult) {
		await userModel.create({
			email,
			pwd: md5(pwd),
			nick_name
		})
		response.send({
			code: 20000,
			msg: '注册成功！',
			data: {}
		})
	} else {
		response.send({
			code: 20001,
			msg: '用户已注册！',
			data: {}
		})
	}
})

app.post('/login', async (request, response) => {
	//获取客户端传递过来的：邮箱、密码、昵称
	const {
		email,
		pwd
	} = request.body
	//去数据库中查询该用户是否注册过
	const findResult = await userModel.findOne({
		email,
		pwd: md5(pwd)
	})
	//若登录成功
	if (findResult) {
		request.session._id = findResult._id
		response.send({
			code: 20000,
			msg: '登录成功！',
			data: findResult
		})
	} else {
		//登录失败
		response.send({
			code: 20001,
			msg: '登录失败！',
			data: {}
		})
	}
})
//测试代码
app.get('/test', (req, res) => res.send('Hello World!'))

app.listen(port, (err) => {
	if (err) {
		console.log('服务器启动失败', err);
	}
	console.log("服务器启动成功");
	console.log(`服务器地址：http://localhost:${port}`);
})