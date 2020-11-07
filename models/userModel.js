/* 
	该文件主要负责创建student模型，用于对students集合进行：增删改查
*/
const mongoose = require('mongoose')

//1.请来一个保安-----引入Schema模式对象
const {Schema} = mongoose

//2.制定一套进入你家的规则------创建具体的约束
const userSchema = new Schema({
	phone:{
		type:String, 
		required:true, 
		unique:true 
	},
	pwd:{
		type:String,
		required:true
	},
	nick_name:{
		type:String,
		required:true
	}
})

//3.告诉保安你制定的规则-------创建模型对象
const userModel = mongoose.model('users',userSchema)

module.exports = userModel
