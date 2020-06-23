<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <div class="header" style="background-color: transparent;padding: 15px 20px 0 20px;color: #FFFFFF">
            <div class="navbar">
              <div class="navbar-left-container">
                <a href="/">
                  <img class="navbar-brand-logo" src="./../assets/logo1.png"></a>
              </div>
              <div class="navbar-right-container" style="display: flex;">
                <div class="navbar-menu-container">
                  <span class="navbar-link" v-text="'欢迎'+nickName+'造型师登录istyle'" v-if="nickName"></span>
                  <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-if="nickName">登出</a>
                </div>
              </div>
            </div>
          </div>

          <div class="container main">
            <h5>用户咨询内容</h5>
            <div id="myConsul">
              <p style="height: 70px"><label class="myphoto">咨询照片:</label><img :src="'/static/uploadFiles/'+consultInfo.questionImage"/></p><div class="clear"></div>
              <p><span class="salonname">我的基本信息:{{consultInfo.height}}，{{consultInfo.weight}}</span></p><div class="clear"></div>
              <p><span class="address">我的穿衣风格描述:{{consultInfo.style}}<!--平时多可爱俏皮风，平时多可爱俏皮风，平时多可爱俏皮风--></span></p><div class="clear"></div>
              <p><span class="meal">本次咨询问题描述：{{consultInfo.specificQuestion}}<!--下周要参加同学聚会，想换个造型，不介意剪短发或者染头发--></span></p><div class="clear"></div>
            </div>
            <h5>回复咨询</h5>
            <div id="stylist_answer">
              <p>
                <label id="upBtn1">选择图片：<input type="file" id="changeHead2" onchange="input2.value=this.value" style="display: none" name="image" accept="image/*"></label>
                <input type="text" id="input2" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 250px; height: 30px;">
              </p>
              <p><label for="question">回复内容:</label>
                <textarea name="question" class="" id="question" cols="36" rows="10" placeholder="请填写具体回复内容" >
            </textarea>
              </p>
              <div class="clear"></div>
              <p><input type="button" @click="answerConsult()/*; a()*/" class="submit" value="回复"/></p>
          </div>
        </div>
        </div>
      </el-col>
    </el-row>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div> <!--遮罩板-->
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  a {
    text-decoration: none;
    color: #fff;
  }
  .footer-row1 a{
    color: #000000;
  }
  .footer{
    background-color: transparent;
    color: #000000;
  }
  #upBtn1{
    display: inline-block;
    width: 80px;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    text-align: center;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: -80px;
    padding: 10px 5px 10px 10px;
  }
  p{
    margin-bottom: 30px;
  }

  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
    color: #666;
    height: 60px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 40px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 25px 20px 10px 20px;

  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
    padding-top: 5px;
  }
  .navbar-brand-logo {
    margin-top: 10px;
    width: 50px;
    height:50px;
    border-radius: 50%;
  }
  .header a, .footer a {
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 5px;
  }
  .navbar-link {
    padding-left: 15px;
  }


  .container{
    width: 1000px;
    /*height: 800px;*/
    padding-top: 50px;
  }
  .container p{
    width: 500px;
    text-align: center;
    padding-bottom: 30px;
    float: left;
    margin-left: 130px;
  }
  .container h5{
    width: 500px;
    text-align: left;
    padding-bottom: 5px;
    margin-left: 200px;
    margin-bottom: 5px;
  }
  .container label{
    float: left;
    display: inline-block;
    overflow-wrap: normal;
    text-align: left;
  }
  .container span{
    float: left;
    display: inline-block;
    width: 500px;
    overflow-wrap: normal;
    text-align: left;
  }
  .container img{
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-left: -260px;
  }
  #myConsul {
    margin-left: 20%;
    border: 2px solid beige;
    width: 800px;
    /*height: 300px;*/
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #myConsul img{
    margin-bottom: 10px;
  }
  #stylist_answer{
    margin-left: 20%;
    border: 2px solid beige;
    width: 860px;
    padding: 40px 0 40px 0;
    /*height: 300px;*/
    /*padding: 30px;*/
    border-radius: 5px;
    overflow-y: auto;
    overflow-x: hidden;
  }


  /*滚动条样式*/
  #myConsul::-webkit-scrollbar{  /*滚动条整体样式*/
    width: 4px;
    height: 200px;
  }
  #myConsul::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  #myConsul::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  #stylist_answer::-webkit-scrollbar{  /*滚动条整体样式*/
    width: 4px;
    height: 200px;
  }
  #stylist_answer::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  #stylist_answer::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }



  #stylist_answer p{
    width: 600px;
    text-align: center;
    /*height: 34px;*/
    /*padding-bottom: 30px;*/
  }
  .container .input1{
    width: 300px;
    float: right;
    margin-right: 130px;
    margin-left: -150px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
  }
  /*.container .input2{
      width: 300px;
      float: right;
      margin-right: 220px;
      margin-left: -200px;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #5bc0de;
  }*/
  /*.container .input3{
      width: 300px;
      float: right;
      margin-right: 220px;
      margin-left: -180px;
      height: 100px;
      border-radius: 5px;
      border: 1px solid #5bc0de;
  }*/
  .container .input4{
    float: right;
    margin-right: 132px;
    margin-left: -160px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
  }
  #stylist_answer label{
    margin-left: 28px;
    width: 130px;
    /*    vertical-align: middle;
        text-align: right;*/
  }
  #changeheadPortrait{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 10px;
    border-radius: 8px;
    margin-right: 10px;
    margin-left: -225px;
  }
  .container .submit{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 10px;
    margin-top: 50px;
  }
  .container .submit:hover{
    outline: none;
    background-color: #FFFFFF;
    border: 1px solid #3ACA7A;
    color: #5bc0de;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 10px;
    margin-top: 50px;
  }
</style>
<script>
  import NavFooter from '@/components/NavFooter.vue'
  import axios from 'axios'
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        note:{  /*背景设置*/
          backgroundImage:"url("+require("./../../static/stylistbg5.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        },

        consultInfo:[],

        overLayFlag:false,
      }
    },
    components:{
      NavFooter:NavFooter
    },
    computed:{
      ...mapState(['nickName'])
    },
    mounted(){
      this.checkLogin();
      this.showSpecificConsult()
    },
    methods:{
      showFilterPop(){ //响应式的遮罩层显示
        this.filterBy=true;
        this.overLayFlag=true;
      },
      closePop(){ //响应式的遮罩层关闭
        this.filterBy=false;
        this.overLayFlag=false;
      },

      checkLogin(){
        axios.get("/stylists/checkLogin").then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            //this.nickName=res.result; 用Vuex而不用赋值方法
            this.$store.commit("updateUserInfo",res.result);
          } else{
            if(this.$route.path!="/"){
              this.$router.push("/");
            }
          }
        })
      },
      logOut(){
        axios.post("/stylists/logout").then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            //this.nickName='';
            this.$store.commit("updateUserInfo",'');
            this.$router.push({
              path:"/"
            })
          }
        })
      },

      showSpecificConsult(){
        var stylistId=document.cookie.indexOf("stylistId");
        if(stylistId>-1){
          var consultId=sessionStorage.getItem('consultId');
          axios.post("/stylists/showSpecificConsult",{"consultId":consultId}).then((response)=>{
            let res=response.data;
            this.consultInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      submitAnswerImg(consultId){
        var file=document.getElementById('changeHead2').files[0];
        let form_data =new FormData();
        form_data.append('image',file);
        form_data.append('consultId',consultId);
        axios.post('/upload/image_upload_submitanswer',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          this.toUser();
        })
      },
      answerConsult(){
        var consultId=sessionStorage.getItem('consultId');
        let img=document.getElementById('input2').value;
        let replayContent=document.getElementById('question').value;
        if(img && question){
          axios.post("/stylists/answerConsult",{
            consultId:consultId,
            replayContent:replayContent
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              alert("咨询成功");
              this.submitAnswerImg(res.result); /*先上传图片获得图片路径再存数据库*/
            }
          });
        }else{
          alert("咨询失败，部分内容未输入，请输入完整");
        }
      },
      toUser(){
        this.$router.push({
          path:"/stylistUser"
        });
      }
    }
  }
</script>
