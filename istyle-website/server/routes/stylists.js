var express=require('express');
var router=express.Router();
var Stylistuser=require('./../models/stylistuser');
var Styhouseuser=require('./../models/styhouseuser');
var Consult=require('./../models/consult');
var Order=require('./../models/order');
let User=require('../models/user');

router.post('/login',function (req,res,next) {
  var params={
    stylistName:req.body.stylistName,
    stylistPwd:req.body.stylistPwd
  }
  Stylistuser.findOne(params,function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("stylistId",doc.stylistId,{
          path:'/',
          maxAge:1000*60*60  //1000毫秒*60*60=1小时
        });
        res.cookie("stylistName",doc.stylistName,{
          path:'/',
          maxAge:1000*60*60  //1000毫秒*60*60=1小时
        });
        //req.session.user=doc; 用session要用到对应的插件
        res.json({
          status:"0",
          mag:'',
          result:{
            stylistName:doc.stylistName
          }
        })
      }
    }
  })
});

//登出接口
router.post("/logout",function (req,res,next) {
  res.cookie("stylistId","",{   //让值为空
    path:"/",
    maxAge:-1   //让生命周期失效
  });
  res.cookie("stylistName","",{   //让值为空
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
  if(req.cookies.stylistId){
    res.json({
      status:"0",
      msg:'',
      result:req.cookies.stylistName
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});


router.post("/userRegister",function (req,res,next) {
  var stylistName=req.body.stylistName;
  var stylistPwd=req.body.stylistPwd;
  var platform='999';
  var r1=Math.floor(Math.random()*10);  //通过Math.random随机出0-1的，*10就能取到0-10,Math.floor取到0-9
  var r2=Math.floor(Math.random()*10);
  var r3=Math.floor(Math.random()*10);
  var stylistId=platform+r1+r2+r3;
  Stylistuser.findOne({stylistName:stylistName},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.json({
          status:'1001',
          msg:'用户名已存在',
          result:''
        });
      }else{
        var user=new Stylistuser({
          stylistId:stylistId,
          stylistName:stylistName,
          stylistPwd:stylistPwd,
          stylistImage:'',
          styhouseName:'请在你所在的造型屋里绑定你的Id',
          generalAddress:'请在你所在的造型屋里绑定你的Id',
          styhouseId:'请在你所在的造型屋里绑定你的Id',
          photoNumber:'请完善资料',
          stylistIntro:'',
          maxOrderNum:'',
          canOrderTime:'',
          isBind:false,
          salonindexShowOrNot:false,
          orderNum:'',
          orderList:[],
          consultList:[]
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

router.get("/showStylist",function (req,res,next) {
  var stylistId=req.cookies.stylistId;
  Stylistuser.findOne({stylistId:stylistId},function (error,doc) {
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

router.post("/updateStylist",function (req,res,next) {
  var stylistId=req.cookies.stylistId,
    stylistName=req.body.stylistName,
    stylistIntro=req.body.stylistIntro,
    canOrderTime=req.body.specificAddress,
    photoNumber=req.body.openTime;
  Stylistuser.updateMany({"stylistId":stylistId},{
    "stylistName":stylistName,
    "stylistIntro":stylistIntro,
    "canOrderTime":canOrderTime,
    "photoNumber":photoNumber,
    "salonindexShowOrNot":true
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      Styhouseuser.update({"styhouseId":styhouseId,"stylistList.stylistId":stylistId},{
        "stylistList.$.stylistName":stylistName,
        "stylistList.$.stylistIntro":stylistIntro,
        "stylistList.$.canOrderTime":canOrderTime
      },function (err1,doc1) {
        if(err1){
          res.json({
            status:'1',
            msg:err1.message,
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
    }
  })
});

router.get("/showConsult",function (req,res,next) {
  var stylistId=req.cookies.stylistId;
  Consult.find({stylistId:stylistId,replayStatus:false},function (error,doc) {
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
          User.findOne({userId:item.userId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                info={consultList:item,user:doc1};
                console.log(info);
                consultInfo.push({consultList:item,user:doc1});
                console.log(consultInfo);
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
  var stylistId=req.cookies.stylistId;
  Consult.find({stylistId:stylistId,replayStatus:true},function (error,doc) {
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
          User.findOne({userId:item.userId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                info={consultList:item,user:doc1};
                console.log(info);
                consultInfo.push({consultList:item,user:doc1});
                console.log(consultInfo);
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

router.get("/showOrder",function (req,res,next) {
  var stylistId=req.cookies.stylistId;
  Order.find({stylistId:stylistId},function (error,doc) {
    if(error){
      res.json({
        status:'1',
        msg:error.message,
        result:''
      });
    }else{
      if(doc){
        let orderInfo=[];
        doc.forEach((item)=>{
          User.findOne({userId:item.userId},function (error1,doc1) {
            if(error1){
              res.json({
                status:'1',
                msg:error1.message,
                result:''
              });
            }else{
              if(doc1){
                orderInfo.push({orderList:item,user:doc1});
              }
            }
          });
        });
        setTimeout( function timer(){
          res.json({
            status:'0',
            msg:'',
            result:orderInfo
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

router.post("/showSpecificConsult",function (req,res,next) {
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
          result:doc.question
        });
      }
    }
  })
});
router.post("/answerConsult",function (req,res,next) {
  var consultId=req.body.consultId;
  var replayContent=req.body.replayContent;
  Consult.update({"consultId":consultId},{
    "replay":{
      "replayContent":replayContent,
      "answerImage":''
    },
    "replayStatus":true
  },function (err1,doc1) {
    if(err1){
      res.json({
        status:'1',
        msg:err1.message,
        result:''
      })
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

module.exports=router;
