/* 
	该文件负责连接数据库
*/
//引入mongoose
const mongoose = require('mongoose')
const PORT = 27017
const URL = 'localhost'
const DB_NAME = 'education'

//使用mongoose连接数据库
mongoose.connect(`mongodb://${URL}:${PORT}/${DB_NAME}`,{
	useNewUrlParser: true, //使用最新的url解析器
	useUnifiedTopology: true, //使用一个新的数据结构
	useCreateIndex:true,//使用一个新的索引器
})

module.exports =  new Promise((resolve)=>{
	//监测数据库的连接状态
	mongoose.connection.on('open',(error)=>{
		if(error) {
			console.log('数据库连接异常',error);
		}
		else {
			console.log(`位于${URL}主机上,端口号为：${PORT}的数据库连接成功了，操作的是${DB_NAME}库`);
			resolve()
		}
	})
})
