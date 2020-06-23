<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
          <div class="topContent main">
            <img :src="'/static/uploadFiles/'+stylistInfo.stylistImage">
            <h5>{{stylistInfo.stylistName}}</h5>
            <span>fighting!!!</span>
            <div class="clear"></div>
            <button class="stylistBtn1" @click="tostyhouseDetail(styhouseInfo.styhouseId)">预约</button> <!--关注的留坑-->
            <button @click="toConsult(styhouseInfo.styhouseId)" class="stylistBtn2">咨询</button>
          </div>
          <div class="bottomContent main">
            <div class="-top">
              <ul>
                <li class="active">主页</li>
                <li onclick="">所在造型屋</li>
              </ul>
            </div>
            <div class="-bottom">
              <div class="-bottomCon stylistindex">
                <span>可预约时间：{{stylistInfo.canOrderTime}}</span>
                <div class="clear"></div>
                <div style="width:1000px; border:1px solid #666;"></div>
                <p>造型师简介></p>
                <div class="clear"></div>
                <span class="introduce">本人现在惠州OPPO零度造型（数码街店）担任高级理发师，擅长女生理发，染发，韩式发型。 05年毕业于Tony guy美发学院，06年参加日本春季流行发式研讨小组，07年进修于维尼沙宣美发学院。08年3月份开始分别旅行于日本、韩国、加拿大找寻发式未来发展趋势，9月新作获业内好评。08年10月份，参与创办北木造型Angel国际烫染会所。</span>
              </div>
              <div class="-bottomCon">
                <span class="fannum">营业时间：{{styhouseInfo.openTime}}</span>
                <div class="clear"></div>
                <div style="width:1000px; border:1px solid #666;"></div>
                <div class="clear"></div>
                <div class="fanCon">
                  <p>造型师简介></p>
                  <div class="clear"></div>
                  <span class="introduce">套餐简介：{{styhouseInfo.mealIntro}}</span>
                  <span class="introduce">具体地址：{{styhouseInfo.specificAddress}}</span>
                </div>
              </div>
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

  /*内容上半部分start*/
  .topContent{
    width: 1000px;
    background: url("./../../static/stylistbg5.jpg");
    background-size: cover;
    height: 300px;
    margin-top: 100px;
  }
  .topContent img{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 60px;
  }
  .topContent h5{
    margin: 0 auto;
    margin-top: 15px;
  }
  .topContent span{
    margin: 0 auto;
    margin-top: 15px;
    display: inline-block;
  }
  .topContent .stylistBtn1{
    float: left;
    margin: 20px  10px 20px 400px;
    background-color: #76cfee;
    outline: none;
    border: none;
    border-radius: 10%;
    padding: 4px;
    width: 80px;
    height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
  .topContent .stylistBtn2{
    float: left;
    margin: 20px  30px 20px 40px;
    background-color: #76cfee;
    outline: none;
    border: none;
    border-radius: 10%;
    padding: 4px;
    width: 80px;
    height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
  .topContent .stylistBtn1:hover{
    background-color: #5bc0de;
    color: #e3f3ff;
  }
  .topContent .stylistBtn2:hover{
    background-color: #5bc0de;
    color: #e3f3ff;
  }
  /*内容上半部分end*/

  /*内容下半部分主页start*/
  .bottomContent{
    width: 1000px;
    height: 500px;
  }
  .bottomContent .-top{
    width: 1000px;
    height: 40px;
    background-color: #fff;
    margin-top: 20px;
  }
  .bottomContent .active{
    border-bottom: #ffa52c solid 4px;
    width: 100px;
  }
  .bottomContent .-top ul{
    list-style: none;
    cursor: pointer;
  }
  .bottomContent .-top ul li:first-child{
    display: inline-block;
    float: left;
    text-align: center;
    margin: 10px 30px 10px 410px;
  }
  .bottomContent .-top ul li:nth-child(2){
    display: inline-block;
    float: left;
    text-align: center;
    margin: 10px 50px 10px 10px;
  }
  .bottomContent .-bottom{
    width: 1000px;
    height:400px;
    background-color: #fff;
    margin-top: 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .bottomContent .-bottom span{
    float: left;
    margin: 15px 20px;
    display: inline-block;
  }
  .bottomContent .-bottom span.introduce{
    width: 900px;
    overflow-wrap: normal;
    letter-spacing: inherit;
    text-align: left;
  }
  .bottomContent .-bottom p{
    float: left;
    margin: 80px 20px 50px 20px;
    display: inline-block;
  }
  /*内容下半部分粉丝start*/
  .bottomContent .-bottomCon{
    width: 1000px;
  }
  .-bottomCon .subscribeContent1 {
    width: 1000px;
    height: 150px;
    border-bottom: 1px solid #999999;
    margin: 0 auto;
  }
  .-bottom .-bottomCon .subscribeContent1 img {
    float: left;
    width: 80px;
    height: 80px;
    margin: 40px 0 20px 100px;
  }
  .-bottom .-bottomCon .subscribeContent1 p {
    float: left;
    width: 200px;
    margin: 40px 0 20px 20px;
  }
  .-bottomCon .subscribeContent1 span {
    float: left;
    display: inline-block;
  }
  .-bottomCon .subscribeContent1  button.privateChat {
    float: left;
    display: inline-block;
    margin-left: 120px;
    margin-top: 65px;
    background-color: #76cfee;
    outline: none;
    border: none;
    border-radius: 10%;
    width: 100px;
    height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
  .-bottomCon .subscribeContent1 button.subscribeOrNot {
    float: left;
    display: inline-block;
    margin-left: 220px;
    margin-top: 65px;
    padding: 0 10px;
    background-color: #76cfee;
    outline: none;
    border: none;
    border-radius: 10%;
    width: 100px;
    height: 35px;
    text-align: center;
    color: #FFFFFF;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import axios from 'axios'
  import $ from 'jquery'
  import 'jquery'
  export default {
    data(){
      return {
        note:{  /*背景设置*/
          backgroundImage:"url("+require("./../../static/stylistbg5.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        },
        styhouseInfo:{},
        stylistInfo:[],

        overLayFlag:false,
      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter
    },
    mounted(){    //mounted是生命周期的初始化函数，里面可以调用一些初始化的方法
      this.showStylist();
      this.init()
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
      init(){
        $('.bottomContent .-bottom .-bottomCon').first().show();
        $('.bottomContent .-bottom .-bottomCon').not($('.bottomContent .-bottom .-bottomCon').first()).hide();
        $('.bottomContent .-top ul li').click(function(){
          $(this).addClass('active');
          $('.bottomContent .-top ul li').not($(this)).removeClass('active');
          let idx = $(this).index('.bottomContent .-top ul li');
          if(!idx){
            $('.bottomContent .-bottom .-bottomCon').eq(idx).show();
            $('.bottomContent .-bottom .-bottomCon').not($('.bottomContent .-bottom .-bottomCon').eq(idx)).hide();
          }else{
            $('.bottomContent .-bottom .-bottomCon').eq(idx).show();
            $('.bottomContent .-bottom .-bottomCon').not($('.bottomContent .-bottom .-bottomCon').eq(idx)).hide();
          }
        });
      },

      showStylist(){
        var userId=document.cookie.indexOf("userId");
        var stylistId=sessionStorage.getItem('stylistId');
        if(userId>-1){
          axios.post("/users/showStylistDetail",{stylistId:stylistId}).then((response)=>{
            var res=response.data;
            if(res.status=="0") {
              this.stylistInfo=res.result.stylistInfo;
              this.styhouseInfo = res.result.styhouseInfo;
            }
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      tostyhouseDetail(styhouseId){
        sessionStorage.setItem('styhouseId',styhouseId);
        this.$router.push({
          path:"/styhouseDetail"
        });
      },
      toConsult(styhouseId){
        sessionStorage.setItem('styhouseId',styhouseId);
        sessionStorage.setItem('stylistId',sessionStorage.getItem('stylistId'));
        this.$router.push({
          path:"/onlineConsult"
        });
      }
    }
  }
</script>
