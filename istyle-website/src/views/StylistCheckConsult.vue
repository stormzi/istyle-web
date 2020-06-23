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
            <h5>咨询内容</h5>
            <div id="myConsul">
              <p><label class="myphoto">咨询照片</label><img :src="'/static/uploadFiles/'+consultInfo.question.questionImage"/></p><div class="clear"></div>
              <p><span class="salonname">我的基本信息:{{consultInfo.question.height}}，{{consultInfo.question.weight}}</span></p><div class="clear"></div>
              <p><span class="address">我的穿衣风格描述:{{consultInfo.question.style}}</span></p><div class="clear"></div>
              <p><span class="meal">本次咨询问题描述：{{consultInfo.question.specificQuestion}}</span></p><div class="clear"></div>
            </div>
            <h5>造型师回复内容</h5>
            <div id="stylist_answer">
              <p><label class="myphoto">回复照片：</label><img :src="'/static/uploadFiles/'+consultInfo.replay.answerImage"/></p><div class="clear"></div>
              <p><span class="address">回复内容:{{consultInfo.replay.replayContent}}</span></p><div class="clear"></div>
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
    height: 800px;
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
    margin-left: 120px;
    margin-bottom: 5px;
  }
  /*.container p:nth-child(4){
      width: 1000px;
      text-align: center;
      height: 100px;
      padding-bottom: 30px;
  }*/
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
    margin-left: 12%;
    border: 2px solid beige;
    width: 800px;
    /*height: 300px;*/
    padding: 30px;
    border-radius: 5px;
    margin-bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #stylist_answer{
    margin-left: 12%;
    border: 2px solid beige;
    width: 800px;
    /*height: 300px;*/
    padding: 30px;
    margin-bottom: 100px;
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
      this.checkConsult()
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

      checkConsult(){
        var stylistId=document.cookie.indexOf("stylistId");
        if(stylistId>-1){
          var consultId=sessionStorage.getItem('consultId');
          axios.post("/stylists/checkConsult",{"consultId":consultId}).then((response)=>{
            let res=response.data;
            this.consultInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      }
    }
  }
</script>
