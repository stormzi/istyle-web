<template>
<div class="header">
  <div class="navbar">
    <div class="navbar-left-container">
      <a href="/">
        <img class="navbar-brand-logo" src="./../assets/logo1.png"></a>
      <router-link to="/" class="navbar-link">首页</router-link>
      <a class="navbar-link" @click="loginOrNot1">发型设计</a>
      <a href="javascript:void(0)" class="navbar-link" @click="loginOrNot2">造型屋</a>
      <a href="javascript:void(0)" class="navbar-link" @click="loginOrNot3">测评</a>
    </div>
    <div class="navbar-right-container" style="display: flex;">
      <div class="navbar-menu-container">
        <!--<a href="/" class="navbar-link">我的账户</a>-->
        <a href="javascript:void(0)" class="navbar-link" @click="loginOrNot4">我的主页</a>
        <span class="navbar-link" v-text="'欢迎'+nickName+'登录istyle'" v-if="nickName"></span>
        <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!nickName">登录</a>
        <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag1=true" v-if="!nickName">注册</a>
        <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-if="nickName">登出</a>
      </div>
    </div>
  </div>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
    <div class="md-modal-inner">
      <div class="md-top">
        <button class="md-close" @click="loginModalFlag=false">Close</button>
      </div>
      <div class="md-content">
        <el-tabs type="border-card">
          <el-tab-pane label="普通用户">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="请输入用户名" data-type="loginname">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="loginUser">    <!--keyup代表键盘事件，enter代表enter键-->
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="loginUser()">登  录</a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="造型师">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" name="loginname" v-model="stylistName" class="regi_login_input regi_login_input_left" placeholder="请输入造型师名" data-type="loginname">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2"  name="password" v-model="stylistPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="loginStylist">    <!--keyup代表键盘事件，enter代表enter键-->
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="loginStylist()">登  录</a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="造型屋">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" name="loginname" v-model="styhouseName" class="regi_login_input regi_login_input_left" placeholder="请输入造型屋名" data-type="loginname">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2"  name="password" v-model="styhousePwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="loginStyhouse">    <!--keyup代表键盘事件，enter代表enter键-->
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="loginStyhouse()">登  录</a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag1}">
    <div class="md-modal-inner">
      <div class="md-top">
        <button class="md-close" @click="loginModalFlag1=false">Close</button>
      </div>
      <div class="md-content">
        <el-tabs type="border-card">
          <el-tab-pane label="普通用户">
            <div class="confirm-tips">
              <!--<div class="error-wrap">
                <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
              </div>-->
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="请输入用户名" data-type="loginname">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="registerUser">    <!--keyup代表键盘事件，enter代表enter键-->
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="registerUser()">注  册</a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="造型师">
            <div class="confirm-tips">
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" name="loginname" v-model="stylistName" class="regi_login_input regi_login_input_left" placeholder="请输入造型师名" data-type="loginname">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2"  name="password" v-model="stylistPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="registerStylist">    <!--keyup代表键盘事件，enter代表enter键-->
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="registerStylist()">注  册</a>
            </div>
          </el-tab-pane>
          <el-tab-pane label="造型屋">
            <div class="confirm-tips">
              <ul>
                <li class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <input type="text" tabindex="1" name="loginname" v-model="styhouseName" class="regi_login_input regi_login_input_left" placeholder="请输入造型屋名" data-type="loginname">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2"  name="password" v-model="styhousePwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="registerStyhouse">    <!--keyup代表键盘事件，enter代表enter键-->
                </li>
              </ul>
            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="registerStyhouse()">注  册</a>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>
<style>
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
  /*登录框样式*/
  .el-tabs__nav{
    width: 100%;
  }
  #tab-0,#tab-1,#tab-2{
    width: 33.33%;
  }
  #tab-0{
    margin-left: 0px;
  }

</style>
<script>
  import './../assets/css/base.css'
  import './../assets/css/login.css'
  import './../assets/css/login-register.css'
  import axios from 'axios' //from不用加路径，会自动从node_module里面去加载
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
        userName:'',
        userPwd:'',
        styhouseName:'',
        styhousePwd:'',
        stylistName:'',
        stylistPwd:'',
        errorTip:false,
        //nickName:false,
        loginModalFlag:false,
        loginModalFlag1:false
      }
    },
    computed:{
      ...mapState(['nickName'])
    },
    mounted(){    //mounted是生命周期的初始化函数，里面可以调用一些初始化的方法
      this.checkLogin();
    },
    methods:{
      checkLogin(){
        axios.get("/users/checkLogin").then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            //this.nickName=res.result; 用Vuex而不用赋值方法
            this.$store.commit("updateUserInfo",res.result);
          }else{         /*如果未登录，且url的path不是/的，就自动跳转到/*/
                      if(this.$route.path!="/"){
                        this.$router.push("/");
                      }
          }
        })
      },
      loginUser(){
        if(!this.userName || !this.userPwd){
          this.errorTip=true;
          return;
        }
        axios.post("/users/login",{   //get必须要用param
          userName:this.userName,
          userPwd:this.userPwd
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.$router.go(0);  //location.reload()
            this.errorTip=false;
            this.loginModalFlag=false;
            //this.nickName=res.result.userName;
            this.$store.commit("updateUserInfo",res.result.userName);
          }else{
            this.errorTip=true;
          }
        })
      },
      loginStylist(){
        if(!this.stylistName || !this.stylistPwd){
          this.errorTip=true;
          return;
        }
        axios.post("/stylists/login",{   //get必须要用param
          stylistName:this.stylistName,
          stylistPwd:this.stylistPwd
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.$router.push({
              path:"/stylistUser"
            });
            this.errorTip=false;
            this.loginModalFlag=false;
            //this.nickName=res.result.userName;
            this.$store.commit("updateUserInfo",res.result.stylistName);
          }else{
            this.errorTip=true;
          }
        })
      },
      loginStyhouse(){
        if(!this.styhouseName || !this.styhousePwd){
          this.errorTip=true;
          return;
        }
        axios.post("/styhouses/login",{   //get必须要用param
          styhouseName:this.styhouseName,
          styhousePwd:this.styhousePwd
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.$router.push({
              path:"/styhouseUser"
            });
            this.errorTip=false;
            this.loginModalFlag=false;
            //this.nickName=res.result.userName;
            this.$store.commit("updateUserInfo",res.result.styhouseName);
          }else{
            this.errorTip=true;
          }
        })
      },
      logOut(){
        axios.post("/users/logout").then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            //this.nickName='';
            this.$store.commit("updateUserInfo",'');
            this.$router.go(0);
          }
        })
      },
      registerUser(){
        axios.post("/users/userRegister",{
          userName:this.userName,
          userPwd:this.userPwd
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.loginModalFlag=false;
            alert("注册成功")
          }else{
            if(res.status=='1001'){
              alert("用户名已存在")
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      registerStyhouse(){
        axios.post("/styhouses/userRegister",{
          styhouseName:this.styhouseName,
          styhousePwd:this.styhousePwd
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.loginModalFlag=false;
            alert("注册成功");
          }else{
            if(res.status=='1001'){
              alert("用户名已存在")
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      registerStylist(){
        axios.post("/stylists/userRegister",{
          stylistName:this.stylistName,
          stylistPwd:this.stylistPwd
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.loginModalFlag=false;
            alert("注册成功，请在您所在造型屋完成造型师绑定")
          }else{
            if(res.status=='1001'){
              alert("用户名已存在")
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      openCenter() {  /*消息提示组件*/
        this.$message({
          message: '请先登录普通用户',
          center: true
        });
      },
      loginOrNot1(){
        if(document.cookie.indexOf("userId")>-1){
          this.$router.push({
            path:"/hairDesign"
          })
        }else{
          this.loginModalFlag=true;
          this.openCenter();
        }
      },
      loginOrNot2(){
        if(document.cookie.indexOf("userId")>-1){
          this.$router.push({
            path:"/styhouses"
          })
        }else{
          this.loginModalFlag=true;
          this.openCenter();
        }
      },
      loginOrNot3(){
        if(document.cookie.indexOf("userId")>-1){
          this.$router.push({
            path:"/evaluate"
          })
        }else {
          this.loginModalFlag = true;
          this.openCenter();
        }
      },
      loginOrNot4(){
        if(document.cookie.indexOf("userId")>-1){
          this.$router.push({
            path:"/user"
          })
        }else{
          this.loginModalFlag=true;
          this.openCenter();
        }
      }

    }
  }
</script>
