let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  "orderId":String,
  "userId":String,
  "stylistId":String,
  "mealId":String,
  "styhouseId":String,
  "orderTime":String
});

module.exports=mongoose.model("Order",userSchema,"orders");   //导出,定义一个模型，与数据库的信息关联
//module.exports=mongoose.model("User",userSchema,"users") 数据库集合名称必须要带s，如果不带s，需要重新指定一个集合的名称,与数据库集合进行关联
