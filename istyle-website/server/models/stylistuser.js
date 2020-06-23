let mongoose = require('mongoose');  //先获取一个mongoose对象，mongoose获取之前要先安装
let userSchema = new mongoose.Schema({
  "stylistId":String, //定义字段
  "stylistName":String,
  "stylistPwd":String,
  "styhouseName":String,
  "generalAddress":'',
  "styhouseId":String,
  "photoNumber":String,
  "stylistIntro":String,
  "maxOrderNum":String,
  "canOrderTime":String,
  "stylistImage":String,
  "orderNum":String,
  "isBind":Boolean,
  "salonindexShowOrNot":Boolean,
  "orderList":Array,
  "consultList":Array
});             //拿到mongoose以后要创建一个schema模型,这里直接写，没有像goods.js那样抽出来;模型的字段也要和数据库的字段对应起来，否则查的时候可能查不到

module.exports=mongoose.model("Stylistuser",userSchema,"stylistusers");   //导出,定义一个模型，与数据库的信息关联
//module.exports=mongoose.model("User",userSchema,"users") 数据库集合名称必须要带s，如果不带s，需要重新指定一个集合的名称,与数据库集合进行关联
