var express=require('express');
var router=express.Router();
var fs=require('fs');
var multer=require('multer');

var path=require('path');//路径管理模块
var formidable=require('formidable');//处理表单模块
var uuid=require('uuid');  //生成id模块

var Styhouseuser=require('./../models/styhouseuser');
var Stylistuser=require('./../models/stylistuser');
var User=require('./../models/user');
var Consult=require('./../models/consult');

// 控制允许接收的文件类型（4.3.3）
function fileFilter (req, file, cd) {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" ||file.mimetype == "image/jpg"){
    cd(null, true);
  }else{
    req.error = "不允许上传" + file.mimetype + "类型的文件！";
    cd(null, false);
  }
}

// 设置缓存路径和文件过滤器（4.3）
var upload = multer({ dest: './uploadFiles/tmp/', fileFilter: fileFilter});

// 响应请求
/*更新用户图片*/
router.post('/image_upload_user', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var userId=req.cookies.userId;
        User.updateOne({"userId":userId},{
          "userImage":fileName,
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            console.log(response);
            res.json(response);
          }
        })
      }
    });
  });
});

/*更新造型屋图片*/
router.post('/image_upload_styhouse', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var styhouseId=req.cookies.styhouseId;
        Styhouseuser.updateOne({"styhouseId":styhouseId},{
          "styhouseImage":fileName,
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            console.log(response);
            res.json(response);
          }
        })
      }
    });
  });
});

/*发布套餐图片*/
router.post('/image_upload_submitmeal', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        console.log(response);
        res.json(response);
      }
    });
  });
});

/*更新套餐图片*/
router.post('/image_upload_updatemeal', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var styhouseId=req.cookies.styhouseId;
        var mealId=req.body.mealId;
        Styhouseuser.updateOne({"styhouseId":styhouseId,"mealList.mealId":mealId},{
          "mealList.$.mealImage":fileName
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            console.log(response);
            res.json(response);
          }
        })
      }
    });
  });
});

/*发布造型师图片*/
router.post('/image_upload_updatestylist', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var styhouseId=req.cookies.styhouseId;
        var stylistId=req.body.stylistId;
        Styhouseuser.updateOne({"styhouseId":styhouseId,"stylistList.stylistId":stylistId},{
          "stylistList.$.stylistImage":fileName
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            Stylistuser.updateOne({"stylistId":stylistId},{
              "stylistImage":fileName
            },function (err2,doc1) {
              if(err2){
                res.json({
                  status:'1',
                  msg:err2.message,
                  result:''
                })
              }else{
                console.log(response);
                res.json(response);
              }
            });
          }
        })
      }
    });
  });
});

/*更新造型师主页造型师图片*/
router.post('/image_upload_stylist', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var stylistId=req.cookies.stylistId;
        Stylistuser.updateOne({"stylistId":stylistId},{
          "stylistImage":fileName,
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            var styhouseId=req.cookies.styhouseId;
            Styhouseuser.updateOne({"styhouseId":styhouseId,"stylistList.stylistId":stylistId},{
              "stylistList.$.stylistImage":fileName,
            },function (err2,doc1) {
              if(err2){
                res.json({
                  status:'1',
                  msg:err2.message,
                  result:''
                })
              }else{
                console.log(response);
                res.json(response);
              }
            });
          }
        })
      }
    });
  });
});

/*发布咨询*/
router.post('/image_upload_submitquestion', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var consultId=req.body.consultId;
        Consult.updateOne({"consultId":consultId},{
          "question.questionImage":fileName
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            console.log(response);
            res.json(response);
          }
        })
      }
    });
  });
});
/*回复咨询*/
router.post('/image_upload_submitanswer', upload.array('image'), function (req, res) {
  // 文件信息
  if(!req.files[0]){
    console.log(req.error);
    res.send(req.error);
    return;
  }else{
    console.log(req.files[0]);
  }
  // 存储并响应客户端
  let fileName = uuid.v1()+'.jpg';
  var des_file = /*__dirname*/'../../static' + "/uploadFiles/" + fileName;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if(err){
        console.log(err);
      }else{
        var response = {
          message: 'File uploaded successfully',
          filename: fileName
        };
        var consultId=req.body.consultId;
        Consult.updateOne({"consultId":consultId},{
          "replay.answerImage":fileName
        },function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1.message,
              result:''
            })
          }else{
            console.log(response);
            res.json(response);
          }
        })
      }
    });
  });
});



router.post('/uploadImg', function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.uploadDir = '../server/uploads';
  form.parse(req, (error, fields, files) => {
    if(error){
      res.json({
        status:false,
        msg:'解析图片错误！'
      })
    }
    let result=[];
    for(let key in files){  // 遍历上传文件对象
      let obj={};
      let file = files[key];
      let fileName = uuid.v1()+'.jpg';  // 借助uuid模块重新生成唯一id。
      let newPath = form.uploadDir+'/uploads' + fileName;
      fs.renameSync(file.path, newPath); // 新路径替换旧路径。
      obj.status='ok';
      obj.name=newPath;
      result.push(obj);
    }
    res.json({
      status:'ok',
      data:result
    })
  })
});

module.exports=router;
