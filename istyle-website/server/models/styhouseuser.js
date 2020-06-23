let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
  "styhouseId":String, //定义字段
  "styhouseName":String,
  "styhousePwd":String,
  "styhouseImage":String,
  "generalAddress":'',
  "specificAddress":String,
  "openTime":String,
  "mealIntro":String,
  "styhousePhone":String,
  "salonindexShowOrNot":Boolean,
  "mealList":Array,
  "stylistList":[
    {
      "stylistId":String,
      "stylistImage":String,
      "stylistName":String,
      "maxOrderNum":String,
      "canOrderTime":String,
      "stylistIntro":String
    }
  ],
  "orderList":Array
});
module.exports=mongoose.model("Styhouseuser",userSchema,"styhouseusers");

