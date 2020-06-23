//mongoDB不同于其他数据库，把购物车和地址都归到用户表里去了,而没有重新再建表
let mongoose = require('mongoose');  //先获取一个mongoose对象，mongoose获取之前要先安装
let userSchema = new mongoose.Schema({
  "userId":String, //定义字段
  "userName":String,
  "userPwd":String,
  "userImage":String,
  "photoNumber":String,
  "userIntro":String,
  "orderList":Array,
  /* [ {
    "orderId":String,
    "orderImage":String,
    "stylistId":String,
    "styhouseId":String,
    "orderTime":String
    }
  ],*/
  "consultList":[
    {
      "consultId":String,
      "styhouseImage":String,
      "height":String,
      "weight":String,
      "style":String,
      "question":String
    }
  ],
  "collectList":[
    {
       "stylistId":String,
       "stylistName":String,
       "stylistImage":String
    },{
      "styhouseId":String,
      "styhouseName":String,
      "styhouseImage":String
    }
  ]
});             //拿到mongoose以后要创建一个schema模型,这里直接写，没有像goods.js那样抽出来;模型的字段也要和数据库的字段对应起来，否则查的时候可能查不到

module.exports=mongoose.model("User",userSchema);   //导出,定义一个模型，与数据库的信息关联
//module.exports=mongoose.model("User",userSchema,"users") 数据库集合名称必须要带s，如果不带s，需要重新指定一个集合的名称,与数据库集合进行关联

//弄好以后就去服务端的route建路由让她去访问，调这个接口
//弄好路由以后就去前端写axios
