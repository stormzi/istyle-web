var express=require('express');
var router=express.Router();
var Styhouseuser=require('./../models/styhouseuser');
var Stylistuser=require('./../models/stylistuser');
var Order=require('./../models/order');

var uuid=require('uuid');  //生成id模块

router.post('/login',function (req,res,next) {
  var params={
    styhouseName:req.body.styhouseName,
    styhousePwd:req.body.styhousePwd
  }
  Styhouseuser.findOne(params,function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("styhouseId",doc.styhouseId,{
          path:'/',
          maxAge:1000*60*60  //1000毫秒*60*60=1小时
        });
        res.cookie("styhouseName",doc.styhouseName,{
          path:'/',
          maxAge:1000*60*60  //1000毫秒*60*60=1小时
        });
        //req.session.user=doc; 用session要用到对应的插件
        res.json({
          status:"0",
          mag:'',
          result:{
            styhouseName:doc.styhouseName
          }
        })
      }
    }
  })
});

//登出接口
router.post("/logout",function (req,res,next) {
  res.cookie("styhouseId","",{   //让值为空
    path:"/",
    maxAge:-1   //让生命周期失效
  });
  res.cookie("styhouseName","",{   //让值为空
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
  if(req.cookies.styhouseId){
    res.json({
      status:"0",
      msg:'',
      result:req.cookies.styhouseName
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
  var styhouseName=req.body.styhouseName;
  var styhousePwd=req.body.styhousePwd;
  var platform='888';
  var r1=Math.floor(Math.random()*10);  //通过Math.random随机出0-1的，*10就能取到0-10,Math.floor取到0-9
  var r2=Math.floor(Math.random()*10);
  var r3=Math.floor(Math.random()*10);
  var styhouseId=platform+r1+r2+r3;
  Styhouseuser.findOne({styhouseName:styhouseName},function (err,doc) {
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
        var user=new Styhouseuser({
          styhouseId:styhouseId,
          styhouseName:styhouseName,
          styhousePwd:styhousePwd,
          styhouseImage:'',
          generalAddress:'请完善资料',
          specificAddress:'',
          openTime:'',
          mealIntro:'',
          styhousePhone:'',
          salonindexShowOrNot:false,
          mealList:[],
          stylistList:[],
          orderList:[]
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

router.get("/showStyhouse",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId;
  Styhouseuser.findOne({styhouseId:styhouseId},function (error,doc) {
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
})
//造型屋注册功能实现
router.post("/updateStyhouse",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,
    styhouseName=req.body.styhouseName,
    generalAddress=req.body.generalAddress,
    specificAddress=req.body.specificAddress,
    openTime=req.body.openTime,
    mealIntro=req.body.mealIntro,
    styhousePhone=req.body.styhousePhone;
  console.log(typeof(generalAddress));
  Styhouseuser.updateMany({"styhouseId":styhouseId},{
    "styhouseName":styhouseName,
    "specificAddress":specificAddress,
    "openTime":openTime,
    "mealIntro":mealIntro,
    "styhousePhone":styhousePhone,
    "generalAddress":generalAddress,
    "salonindexShowOrNot":true
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      Stylistuser.update({"styhouseId":styhouseId},{
        "styhouseName":styhouseName,
        "generalAddress":generalAddress
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

router.post("/pushMeal",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,
      mealName=req.body.mealName,
      mealPrice=req.body.mealPrice,
      mealImage=req.body.mealImage,
      mealIntro=req.body.mealIntro;
  var meal={
    mealId:uuid.v1(),
    mealName:mealName,
    mealImage:mealImage,
    mealPrice:mealPrice,
    mealIntro:mealIntro
  };
  Styhouseuser.update({styhouseId:styhouseId},{$addToSet:{mealList:meal}},
    function (err,doc) {
      if(err){
        res.json({
          status:"1",
          msg:err.message
        })
      }else{
        res.json({
          status:"0",
          msg:''
        })
      }
    });
});

router.get("/showMeal",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId;
  Styhouseuser.findOne({styhouseId:styhouseId},function (error,doc) {
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
          result:doc.mealList
        });
      }
    }
  })
});

router.post("/updateMeal",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,
    mealId=req.body.mealId,
    mealName=req.body.mealName,
    mealPrice=req.body.mealPrice,
    mealIntro=req.body.mealIntro;
  Styhouseuser.updateMany({"styhouseId":styhouseId,"mealList.mealId":mealId},{
    "mealList.$.mealName":mealName,
    "mealList.$.mealPrice":mealPrice,
    "mealList.$.mealIntro":mealIntro
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
router.post("/delMeal",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,mealId=req.body.mealId;
  Styhouseuser.update({   //mongodb还可以通过update来删除,第一个空是条件,第二个空为要删掉的元素，通过pull,第三个空为回调
    styhouseId:styhouseId
  },{
    $pull:{
      'mealList':{
        'mealId':mealId
      }
    }
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


router.post("/submitStylist",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,
    stylistId=req.body.stylistId,
    stylistName=req.body.stylistName,
    maxOrderNum=req.body.maxOrderNum,
    canOrderTime=req.body.canOrderTime,
    stylistIntro=req.body.stylistDescription;
  Styhouseuser.findOne({styhouseId:styhouseId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      Styhouseuser.findOne({"styhouseId":styhouseId,"stylistList.stylistId":stylistId},function (err1,doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          if (doc1) {
            res.json({
              status: "1003",
              msg: "",
              result: "此造型师在造型屋已绑定，请到造型师管理去修改造型师"
            })
          } else {
            Stylistuser.updateMany({"stylistId": stylistId}, {
              "stylistName": stylistName,
              "maxOrderNum": maxOrderNum,
              "canOrderTime": canOrderTime,
              "stylistIntro": stylistIntro,
              "generalAddress":doc.generalAddress,
              "isBind":true,
              "salonindexShowOrNot":true,
              "styhouseName":doc.styhouseName,
              "styhouseId":styhouseId
            }, function (err2, doc2) {
              if (err2) {
                res.json({
                  status: '1',
                  msg: err2.message,
                  result: ''
                })
              } else if (doc2) {
                Stylistuser.findOne({"stylistId": stylistId}, function (err3, doc3) {
                  if (err3) {
                    res.json({
                      status: "1",
                      msg: err3.message
                    })
                  } else if(doc3){
                    doc.stylistList.push(doc3);
                    doc.save(function (err4, doc4) {
                      if (err4) {
                        res.json({
                          status: "1",
                          msg: err4.message
                        })
                      } else {
                        res.json({
                          status: '0',
                          msg: '',
                          result: 'suc'
                        })
                      }
                    });
                  }else{
                    res.json({
                      status: "1004",
                      msg: "",
                      result: "此造型师Id没有注册"
                    });
                  }
                });
              } else {
                res.json({
                  status: "1004",
                  msg: "",
                  result: "此造型师Id没有注册"
                })
              }
            });
          }
        }
      });
    }
  });
});
router.get("/showStylist",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId;
  Styhouseuser.findOne({styhouseId:styhouseId},function (error,doc) {
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
          result:doc.stylistList
        });
      }
    }
  })
});
router.post("/updateStylist",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,
    stylistId=req.body.stylistId,
    stylistName=req.body.stylistName,
    maxOrderNum=req.body.maxOrderNum,
    canOrderTime=req.body.canOrderTime,
    stylistIntro=req.body.stylistDescription;
  Styhouseuser.findOne({styhouseId:styhouseId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
            Stylistuser.updateMany({"stylistId": stylistId}, {
              "stylistName": stylistName,
              "maxOrderNum": maxOrderNum,
              "canOrderTime": canOrderTime,
              "stylistIntro": stylistIntro,
              "generalAddress":doc.generalAddress,
              "isBind":true,
              "salonindexShowOrNot":true,
              "styhouseName":doc.styhouseName,
              "styhouseId":styhouseId
            }, function (err2, doc2) {
              if (err2) {
                res.json({
                  status: '1',
                  msg: err2.message,
                  result: ''
                })
              } else{
                Styhouseuser.updateMany({"styhouseId":styhouseId,"stylistList.stylistId":stylistId},{
                  "stylistList.$.stylistName": stylistName,
                  "stylistList.$.maxOrderNum": maxOrderNum,
                  "stylistList.$.canOrderTime": canOrderTime,
                  "stylistList.$.stylistIntro": stylistIntro,
                }, function (err3, doc3) {
                  if (err3) {
                    res.json({
                      status: "1",
                      msg: err3.message
                    })
                  } else {
                    res.json({
                      status: "0",
                      msg: "",
                      result: ""
                    });
                  }
                });
              }
            });
    }
  });
});
router.post("/delStylist",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId,stylistId=req.body.stylistId;
  Styhouseuser.update({
    styhouseId:styhouseId
  },{
    $pull:{
      'stylistList':{
        'stylistId':stylistId
      }
    }
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      Stylistuser.updateMany({"stylistId": stylistId}, {
          "isBind":false,
          "styhouseName":'请在你所在的造型屋里绑定你的Id',
          "generalAddress":'请在你所在的造型屋里绑定你的Id',
          "styhouseId":'请在你所在的造型屋里绑定你的Id'
        },function (err1,doc1) {
            if(err1){
              res.json({
                status:'1',
                msg:err1.message,
                result:''
              });
            }else{
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              });
            }
      });
      }
  });
});

router.get("/showOrderMeal",function (req,res,next) {
  var styhouseId=req.cookies.styhouseId;
  Order.find({styhouseId:styhouseId},function (error,doc) {
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
          Styhouseuser.findOne({"styhouseId":styhouseId,"mealList.mealId":item.mealId},function (error1,doc1) {
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
  var styhouseId=req.cookies.styhouseId;
  Order.find({styhouseId:styhouseId},function (error,doc) {
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
          Styhouseuser.findOne({"styhouseId":styhouseId,"stylistList.stylistId":item.stylistId},function (error1,doc1) {
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
module.exports=router;
