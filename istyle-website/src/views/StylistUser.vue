<template>
  <div class="note" :style="note">
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

    <div class="main">
      <div class="line clear"></div>

      <div class="contain">
        <div class="verticalNav">
          <div class="box1">
            <div class="box2">
              <ul>
                <span>造型屋主页</span>
                <li class="active">
                  <div class="left">
                    <span>基本信息</span>
                  </div>
                  <div class="right">
                    <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                      <span>基本信息</span>
                    </div>
                    <div class="rightBottomInformation">
                      <div class="showInformation" id="showInformation">
                        <div class="addContent1">
                          <p><img :src="'/static/uploadFiles/'+stylistInfo.stylistImage"/></p><div class="clear"></div>
                          <p><span class="salonname">造型师名字：{{stylistInfo.stylistName}}</span></p><div class="clear"></div>
                          <p><span class="salonId">造型师Id：{{stylistInfo.stylistId}}</span></p><div class="clear"></div>
                          <p><span class="styhouseName">所在造型屋：{{stylistInfo.styhouseName}}</span></p><div class="clear"></div>
                          <p><span class="canOrderTime">可预约时间：{{stylistInfo.canOrderTime}}</span></p><div class="clear"></div>
                          <p><span class="meal">造型师简介：{{stylistInfo.stylistIntro}}<!--本人在流行造型屋任职，擅长做时尚烫染造型--></span></p><div class="clear"></div>
                          <p><span class="phone">联系电话：{{stylistInfo.photoNumber}}</span></p><div class="clear"></div>
                        </div>
                        <input type="button" id="editorBtn1" @click="editor1()" value="编辑"/>
                      </div>
                      <div class="updateInfo" style="display: block">
                        <form action="" method="post" id="form">
                          <div class="clear"></div>
                          <div id="updateContent1">
                            <p>
                              <label id="upBtn1">选择图片：<input type="file" id="changeHead1" onchange="input1.value=this.value" style="display: none" name="image" accept="image/*"></label>
                              <input type="text" id="input1" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 180px; height: 30px;">
                              <input type="button" id="changeheadPortrait1" @click="submitStylistImg()" value="上传图片">
                            </p>
                            <p><label for="salonName">造型师名：</label><input type="text" class="input1" id="salonName" name="salonName" placeholder="请输入造型屋名" /></p>
                            <p><label for="meal">简介：</label><textarea name="meal" class="input3" id="meal" cols="30" rows="10" placeholder="请输入套餐简介(最多25字)"></textarea></p>
                            <p><label for="canOrderTime">可预约时间：</label><input type="text" class="input1" id="canOrderTime" name="salonName" placeholder="如：周五到周六 8:00-22:00" /></p>
                            <p><label for="phone">联系电话：</label><input type="text" class="input5" id="phone" name="phone" placeholder="请输入联系电话" /></p>
                          </div>
                          <p><input type="button" @click="updateStylist()" id="submit" value="保存"/></p>
                        </form>
                      </div>

                    </div>
                  </div>
                </li>
                <li>
                  <button class="left" @click="showConsult()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>待处理咨询</span></button>
                  <div class="right">
                    <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                      <span>待处理咨询数({{consultInfo.length}})</span>
                    </div>
                    <div class="rightBottomOrder">
                      <div id="showstylist">
                        <div v-for="(item,index) in consultInfo">
                          <div class="clear"></div>
                          <div class="mealContent">
                            <img :src="'/static/uploadFiles/'+item.user.userImage"/>
                            <p>
                              <span class="stylistName">{{item.user.userName}}</span><br />
                              <span class="orderTime">发起咨询时间：{{item.consultList.time | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                            </p>
                            <button class='order1' @click='toAnswerConsult(item.consultList.consultId)'>查看咨询并回复</button>
                          </div>
                        </div>
                        </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button class="left" @click="showDealConsult()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>已处理咨询</span></button>
                  <div class="right">
                    <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                      <span>已处理咨询数({{consultInfo1.length}})</span>
                    </div>
                    <div class="rightBottomOrder">
                      <div id="showstylist1">
                        <div v-for="(item,index) in consultInfo1">
                          <div class="clear"></div>
                          <div class="mealContent">
                            <img :src="'/static/uploadFiles/'+item.user.userImage"/>
                            <p>
                              <span class="stylistName">{{item.user.userName}}</span><br />
                              <span class="orderTime">发起咨询时间：{{item.consultList.time | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                            </p>
                            <button class='order' @click='toCheckConsult(item.consultList.consultId)'>查看咨询</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button class="left" @click="showOrder()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>用户预约</span></button>
                  <div class="right">
                    <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                      <span>预约数({{orderInfo.length}})</span>
                    </div>
                    <div class="rightBottomOrder">
                      <div id="showstylist2">
                        <div v-for="(item,index) in orderInfo">
                          <div class="clear"></div>
                          <div class="mealContent">
                            <img :src="'/static/uploadFiles/'+item.user.userImage"/>
                            <p>
                              <span class="stylistName">{{item.user.userName}}</span><br />
                              <span class="orderTime">预约时间：{{item.orderList.orderTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                            </p>
                            <button class='order' @click='delOrder(item.orderList.orderId)'>删除预约</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
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

  /*container部分*/
  /*滚动条样式*/
  .right::-webkit-scrollbar{  /*滚动条整体样式*/
    width: 4px;
    height: 200px;
  }
  .right::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .right::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  /*展示信息start*/
  .rightBottomInformation .addContent1 p:first-child{
    margin-top: 50px;
    margin-left: 340px;
  }
  .rightBottomInformation .addContent1 p{
    float: left;
  }
  .rightBottomInformation .addContent1 span{
    float: left;
    margin-left: 250px;
    display: inline-block;
    width: 500px;
    overflow-wrap: normal;
    text-align: left;
  }
  .rightBottomInformation .addContent1 img{
    display: inline-block;
    width: 140px;
    height: 120px;
    margin-top: 20px;
    border-radius: 5%;
  }
  .rightBottomInformation #editorBtn1{
    width: 12%;
    /*display: block;*/
    margin: 0 auto;
    margin-top: 30px;
    color: #FFFFFF;
    height: 32px;
    background-color: #5bc0de;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    transition: .5s;   /*把鼠标指针悬停在 div 元素上，它的外观会逐渐改变*/
    cursor: pointer;
  }
  /*
  展示信息end
  */
  /*
  修改信息start
  */
  .rightBottomInformation #updateContent1 p:first-child{
    margin-top: 100px;
  }
  .rightBottomInformation #updateContent1 p{
    width: 800px;
  }
  .rightBottomInformation #updateContent1 input:nth-child(3),.rightBottomInformation #updateContent1 input:nth-child(4),.rightBottomInformation #updateContent1 input:nth-child(5){
    width: 250px;
  }
  .rightBottomInformation #updateContent1 span{
    margin-left: 50px;
  }
  .input1,.input4,.input5{
    width: 250px;
    margin-right:-100px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
    height: 30px;
  }
  .input2,.input3{
    width: 250px;
    margin-right: -100px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
    margin-top: 10px;
  }
  #submit{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 120px;
    margin-top: 50px;
  }
  #submit:hover{
    outline: none;
    background-color: #FFFFFF;
    border: 1px solid #3ACA7A;
    color: #5bc0de;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 120px;
    margin-top: 50px;
  }

  /*造型师管理start*/
  .rightBottomOrder{
    width: 800px;
    height: 500px;
    background-color: #FFFFFF;
    margin-top: 20px;
    border-radius: 1%;
  }
  .rightBottomOrder .mealContent{
    width: 800px;
    height: 150px;
    border-bottom: 1px solid #999999;
    margin: 0 auto;
  }
  .rightBottomOrder img {
    float: left;
    width: 80px;
    height: 80px;
    margin: 40px 0 20px 100px;
    border-radius: 50%;
  }
  .rightBottomOrder p {
    float: left;
    width: 350px;
    margin: 35px 10px 0 60px;
  }
  .rightBottomOrder span {
    text-align: left;
    float: left;
  }
  .rightBottomOrder .orderNum {
    margin-left: 20px;
  }
  .rightBottomOrder button.order {
    float: left;
    display: inline-block;
    margin-left: 20px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  .rightBottomOrder button.order1 {
    float: left;
    display: inline-block;
    margin-left: 20px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  .demo-input{
    width: 250px;
    margin-right: -100px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
    height: 30px;
  }
</style>
<script>
  import './../assets/css/base.css'
  import './../assets/css/login.css'
  import './../assets/css/login-register.css'
  import axios from 'axios' //from不用加路径，会自动从node_module里面去加载
  import $ from 'jquery'
  import 'jquery'
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
        stylistInfo:[],
        consultInfo:[],
        consultInfo1:[],
        consultId:'',
        orderInfo:[],

        //nickName:false,
        note:{  /*背景设置*/
          backgroundImage:"url("+require("./../../static/userIndexbackground.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        }
      }
    },
    computed:{
      ...mapState(['nickName'])
    },
    mounted(){    //mounted是生命周期的初始化函数，里面可以调用一些初始化的方法
      this.checkLogin();
      this.init();
      this.showStylist();
    },
    methods:{
      init(){
        /*左侧导航栏start*/
        $('.verticalNav .right').first().show();

        $('.verticalNav .box2>ul>li').click(function(){
          $(this).addClass('active');
          $('.verticalNav .box2>ul>li').not($(this)).removeClass('active');

          let idx = $(this).index('.verticalNav .box2>ul>li');
          $('.verticalNav .right').eq(idx).show();
          $('.verticalNav .right').not($('.verticalNav .right').eq(idx)).hide();
        });
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
      showStylist(){
        var stylistId=document.cookie.indexOf("stylistId");
        if(stylistId>-1){
          axios.get("/stylists/showStylist").then((response)=>{
            let res=response.data;
            this.stylistInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      editor1(){
        let hidden=document.getElementById('showInformation');
        hidden.style.display="none";
        let obj=document.getElementById('form');
        obj.style.display="block";
      },
      submitStylistImg(){
        var file=document.getElementById('changeHead1').files[0];
        let form_data =new FormData();
        form_data.append('image',file);
        axios.post('/upload/image_upload_stylist',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          alert('上传成功！');
        })
      },
      updateStylist(){
        let hidden=document.getElementById('form');
        hidden.style.display="none";
        let obj=document.getElementById('showInformation');
        obj.style.display="block";

        let salonName=document.getElementById('salonName').value;
        let meal=document.getElementById('meal').value;
        let canOrderTime=document.getElementById('canOrderTime').value;
        let phone=document.getElementById('phone').value;
        if(salonName && meal && canOrderTime && phone){
          axios.post("/stylists/updateStylist",{
            stylistName:salonName,
            stylistIntro:meal,
            canOrderTime:canOrderTime,
            photoNumber:phone
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              this.$store.commit("updateUserInfo",salonName);
              this.showStylist();
            }
          })
        }else{
          alert("修改失败，部分内容未输入，请输入完整");
        }
      },
      showConsult(){
        var stylistId=document.cookie.indexOf("stylistId");
        if(stylistId>-1){
          axios.get("/stylists/showConsult").then((response)=>{
            let res=response.data;
            this.consultInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      toAnswerConsult(consultId){
        sessionStorage.setItem('consultId',consultId);
        this.$router.push({
          path:"/answerConsult"
        });
      },
      showDealConsult(){
        var stylistId=document.cookie.indexOf("stylistId");
        if(stylistId>-1){
          axios.get("/stylists/showDealConsult").then((response)=>{
            let res=response.data;
            this.consultInfo1=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      toCheckConsult(consultId){
        sessionStorage.setItem('consultId',consultId);
        this.$router.push({
          path:"/stylistCheckConsult"
        });
      },
      showOrder(){
        var stylistId=document.cookie.indexOf("stylistId");
        if(stylistId>-1){
          axios.get("/stylists/showOrder").then((response)=>{
            let res=response.data;
            this.orderInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      delOrder(orderId){
        axios.post("/stylists/delOrder",{
          orderId:orderId
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.showOrder();
          }
        })
      }
    }
  }
</script>
