let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  "hairSex":String,
  "hairLenght1":Number,
  "hairCurl1":Number,
  "hairColor1":Number,
  "hairLenght2":Number,
  "hairCurl2":Number,
  "hairColor2":Number,
  "hairImage":String
});

module.exports=mongoose.model("Hair",userSchema,"hairs");   //导出,定义一个模型，与数据库的信息关联
//module.exports=mongoose.model("User",userSchema,"users") 数据库集合名称必须要带s，如果不带s，需要重新指定一个集合的名称,与数据库集合进行关联
