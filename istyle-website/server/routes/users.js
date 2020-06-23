let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');
let User=require('../models/user');
let Stylistuser=require('./../models/stylistuser');
var Styhouseuser=require('./../models/styhouseuser');
var Order=require('./../models/order');
var Consult=require('./../models/consult');
var Hair=require('./../models/hair');

var uuid=require('uuid');  //生成id模块

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/istyle');

//监听有没有连接、出错、断开连接
mongoose.connection.on("connected",function () {
  console.log("mongodb connected success")
});

mongoose.connection.on("error",function () {
  console.log("mongodb connected fail")
});

mongoose.connection.on("disconnected",function () {
  console.log("mongodb connected disconnected")
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function (req,res,next) {
  var params={
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  User.findOne(params,function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60  //1000毫秒*60*60=1小时
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60  //1000毫秒*60*60=1小时
        });
        //req.session.user=doc; 用session要用到对应的插件
        res.json({
          status:"0",
          mag:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
});

//登出接口
router.post("/logout",function (req,res,next) {
  res.cookie("userId","",{   //让值为空
    path:"/",
    maxAge:-1   //让生命周期失效
  });
  res.cookie("userName","",{   //让值为空
    path:"/",
    maxAge:-1   //让生命周期失效
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});

router.get("/checkLogin",function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:"0",
      msg:'',
      result:req.cookies.userName
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});
//普通用户注册功能实现
router.post("/userRegister",function (req,res,next) {
  var userName=req.body.userName;
  var userPwd=req.body.userPwd;
  var platform='666';
  var r1=Math.floor(Math.random()*10);  //通过Math.random随机出0-1的，*10就能取到0-10,Math.floor取到0-9
  var r2=Math.floor(Math.random()*10);
  var r3=Math.floor(Math.random()*10);
  var userId=platform+r1+r2+r3;
  User.findOne({userName:userName},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'1001',
          msg:'',
          result:''
        });
      }else{
        var user=new User({
          userId:userId,
          userName:userName,
          userPwd:userPwd,
          userImage:'',
          photoNumber:'',
          userIntro:'',
          orderList:[],
          consultList:[],
          collectList:[]
        });
        user.save(function (err1,doc1) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:{}
            })
          }
        })
      }
    }
  });
});

router.get("/showStyhousesStylists",function (req,res,next) {
  Styhouseuser.find({},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        Stylistuser.find({},function (error1,doc1) {
          if(error1){
            res.json({
              status:'1',
              msg:error1.message,
              result:''
            });
          }else{
            if(doc1){
              var response={
                styhouses:doc,
                stylists:doc1
              };
              res.json({
                status:'0',
                msg:'',
                result:response
              });
            }
          }
        });
      }
    }
  });
});
router.post("/findStyhouseStylists",function (req,res,next) {
  var generalAddress=req.body.generalAddress;
  Styhouseuser.find({"salonindexShowOrNot":true,generalAddress:generalAddress},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
        Stylistuser.find({"salonindexShowOrNot":true,generalAddress:generalAddress},function (err1,doc1) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            });
          }else{
              var response={
                styhouses:doc,
                stylists:doc1
              };
              res.json({
                status:'0',
                msg:'',
                result:response
              });
          }
        });
    }
  });
});

router.post("/showStyhouseDetail",function (req,res,next) {
  var styhouseId=req.body.styhouseId;
  Styhouseuser.findOne({"styhouseId":styhouseId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc
        });
      }
    }
  })
});
router.post("/orderMeal",function (req,res,next) {
  var userId=req.cookies.userId;
  var styhouseId=req.body.styhouseId;
  var mealId=req.body.mealId;
  var orderTime=req.body.orderTime;
  var orderMeal=new Order({
    userId:userId,
    orderId:uuid.v1(),
    styhouseId:styhouseId,
    mealId:mealId,
    stylistId:'',
    orderTime:orderTime
  });
  orderMeal.save(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{}
      })
    }
  })
});
router.post("/orderStylist",function (req,res,next) {
  var userId=req.cookies.userId;
  var styhouseId=req.body.styhouseId;
  var stylistId=req.body.stylistId;
  var orderTime=req.body.orderTime;
  var orderMeal=new Order({
    userId:userId,
    orderId:uuid.v1(),
    styhouseId:styhouseId,
    mealId:'',
    stylistId:stylistId,
    orderTime:orderTime
  });
  orderMeal.save(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{}
      })
    }
  })
});

router.post("/showStylistDetail",function (req,res,next) {
  var stylistId=req.body.stylistId;
  Stylistuser.findOne({"stylistId":stylistId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        Styhouseuser.findOne({"styhouseId":doc.styhouseId},function (error1,doc1) {
          if(error1){
            res.json({
              status:'1',
              msg:error1.message,
              result:''
            });
          }else{
            if(doc1){
              var response={
                stylistInfo:doc,
                styhouseInfo:doc1
              };
              res.json({
                status:'0',
                msg:'',
                result:response
              });
            }
          }
        });
      }
    }
  })
});

router.post("/onlineConsult",function (req,res,next) {
  var userId=req.cookies.userId;
  var styhouseId=req.body.styhouseId;
  var stylistId=req.body.stylistId;
  var height=req.body.height;
  var weight=req.body.weight;
  var style=req.body.style;
  var specificQuestion=req.body.question;
  var time=new Date();
  var consultId=uuid.v1();
  var onlineConsult=new Consult({
    consultId:consultId,
    stylistId:stylistId,
    styhouseId:styhouseId,
    userId:userId,
    question:{
      "height":height,
      "weight":weight,
      "style":style,
      "specificQuestion":specificQuestion,
      "questionImage":''
    },
    replay:{},
    replayStatus:false,
    time:time
  });
  onlineConsult.save(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:consultId
      })
    }
  })
});

router.post("/checkConsult",function (req,res,next) {
  var consultId=req.body.consultId;
  Consult.findOne({consultId:consultId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc
        });
      }
    }
  })
});

//个人主页
router.get("/showUser",function (req,res,next) {
  var userId=req.cookies.userId;
  User.findOne({userId:userId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc
        });
      }
    }
  })
});
router.post("/updateUser",function (req,res,next) {
  var userId=req.cookies.userId,
    userName=req.body.userName,
    userIntro=req.body.userIntro,
    photoNumber=req.body.photoNumber;
  User.updateMany({"userId":userId},{
    "userName":userName,
    "userIntro":userIntro,
    "photoNumber":photoNumber
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
});
router.get("/showConsult",function (req,res,next) {
  var userId=req.cookies.userId;
  Consult.find({userId:userId,replayStatus:false},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        let consultInfo=[];
        var info={};
        doc.forEach((item)=>{
          Stylistuser.findOne({stylistId:item.stylistId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                info={consultList:item,stylist:{"stylistName":doc1.stylistName,"stylistImage":doc1.stylistImage}};
                consultInfo.push(info);
              }
            }
          });
        });
        setTimeout( function timer(){
          res.json({
            status:'0',
            msg:'',
            result:consultInfo
          });
        },100);

      }
    }
  })
});

router.get("/showDealConsult",function (req,res,next) {
  var userId=req.cookies.userId;
  Consult.find({userId:userId,replayStatus:true},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        let consultInfo=[];
        var info={};
        doc.forEach((item)=>{
          Stylistuser.findOne({stylistId:item.stylistId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                info={consultList:item,stylist:{"stylistName":doc1.stylistName,"stylistImage":doc1.stylistImage}};
                consultInfo.push(info);
              }
            }
          });
        });
        setTimeout( function timer(){
          res.json({
            status:'0',
            msg:'',
            result:consultInfo
          });
        },100);

      }
    }
  })
});
router.get("/showOrderMeal",function (req,res,next) {
  var userId=req.cookies.userId;
  Order.find({userId:userId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        let orderMealInfo=[];
        doc.forEach((item)=>{
          Styhouseuser.findOne({"styhouseId":item.styhouseId,"mealList.mealId":item.mealId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                orderMealInfo.push({orderList:item,meal:doc1.mealList});
              }
            }
          });
        });
        setTimeout( function timer(){
          res.json({
            status:'0',
            msg:'',
            result:orderMealInfo
          });
        },100);
      }
    }
  })
});
router.get("/showOrderStylist",function (req,res,next) {
  var userId=req.cookies.userId;
  Order.find({userId:userId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        let orderStylistInfo=[];
        doc.forEach((item)=>{
          Styhouseuser.findOne({"styhouseId":item.styhouseId,"stylistList.stylistId":item.stylistId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                orderStylistInfo.push({orderList:item,stylist:doc1.stylistList});
              }
            }
          });
        });
        setTimeout( function timer(){
          res.json({
            status:'0',
            msg:'',
            result:orderStylistInfo
          });
        },100);
      }
    }
  })
});
router.post("/delOrder",function (req,res,next) {
  var orderId=req.body.orderId;
  Order.deleteOne({
    orderId:orderId
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  });
});

router.post("/searchSexHair",function (req,res,next) {
  var hairSex=req.body.hairSex;
  Hair.find({
    hairSex:hairSex
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc
      })
    }
  });
});
router.post("/searchHair",function (req,res,next) {
  var hairSex=req.body.hairSex;
  var hairLenght1=req.body.hairLenght1;
  var hairCurl1=req.body.hairCurl1;
  var hairColor1=req.body.hairColor1;
  var hairLenght2=req.body.hairLenght2;
  var hairCurl2=req.body.hairCurl2;
  var hairColor2=req.body.hairColor2;
  if(hairSex=='female'){
    Hair.find({
      hairSex:hairSex,
      hairLenght1:hairLenght1,
      hairCurl1:hairCurl1,
      hairColor1:hairColor1
    },function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          status:'0',
          msg:'',
          result:doc
        })
      }
    });
  }else{
    Hair.find({
      hairSex:hairSex,
      hairLenght2:hairLenght2,
      hairCurl2:hairCurl2,
      hairColor2:hairColor2
    },function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          status:'0',
          msg:'',
          result:doc
        })
      }
    });
  }

});
module.exports = router;
