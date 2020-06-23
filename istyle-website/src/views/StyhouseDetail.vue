<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
          <!--造型屋详情页上半部分-介绍-->
          <div class="salonIntroduce main">
            <div class="salonTopLeft">
              <h5>{{styhouseInfo.styhouseName}}</h5><br>
              <!--<span style="color: orangered">3452人评论</span>-->
              <div style="width:500px; border:1px solid #666;"></div>
              <span>{{styhouseInfo.specificAddress}}</span><br>
              <span>{{styhouseInfo.mealIntro}}</span><br>
              <span>电话：{{styhouseInfo.styhousePhone}}</span><br>
              <span>营业时间：{{styhouseInfo.openTime}}</span>
              <div style="width:983px; border:1px solid #666;"></div>
              <span>提供wifi</span>&nbsp;&nbsp;
              <span>提供免费车位</span>
            </div>
            <div class="salonTopRight">
              <img :src="'/static/uploadFiles/'+styhouseInfo.styhouseImage" alt="">
            </div>
            <div class="clear"></div>

            <div class="salonTopBottom">

            </div>
          </div>
          <div class="clear"></div>
          <!--造型屋套餐部分-->
          <span class="orderSpan">优惠套餐</span>
          <div class="clear"></div>
          <div class="salonMeal main">
            <div id="showSalonMeal">
              <div v-for="(item,index) in mealInfo">
                <div class="clear"></div>
                <div class="mealContent">
                  <img :src="'/static/uploadFiles/'+item.mealImage"/>
                  <p>
                    <span>{{item.mealName}}</span><br />
                    <span style="color: orange;padding-top: 20px">{{item.mealPrice}}</span>
                  </p>
                  <button class='order' @click='showOrderMeal(item.mealId)'>立即预约</button>
                </div>
              </div>
            </div>
            <div id="updateSalonMeal">
              <p><label>预约时间选择：</label>
                <el-date-picker
                @change="orderMeal()"
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              </p>
            </div>
          </div>

          <span class="orderSpan">造型师</span>
          <div class="clear"></div>
          <div class="salonMeal1 main">
            <div id="showSalonStylist">
              <div v-for="(item,index) in stylistInfo">
                <div class="clear"></div>
                <div class="mealContent">
                  <img :src="'/static/uploadFiles/'+item.stylistImage"/>
                  <p>
                    <span>姓名：{{item.stylistName}}</span>  <span>可预约人数：{{item.maxOrderNum}}</span> <br />
                    <span >可预约时间：{{item.canOrderTime}}</span>
                  </p>
                  <button class='order' @click='toStylistDetail(item.stylistId)'>查看造型师</button>
                  <button class='order' @click='showOrderStylist(item.stylistId)'>立即预约</button>
                </div>
              </div>
            </div>
            <div id="updateSalonStylist">
              <p><label>预约时间选择：</label>
                <el-date-picker
                  @change="orderStylist();"
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </p>
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
  .footer{
    background-color: transparent;
    color: #FFFFFF;
  }
  .salonIntroduce::-webkit-scrollbar { width:10px; height:2px; background:#ccc; border-radius:10px;/*外层轨道*/}
  .salonIntroduce::-webkit-scrollbar-thumb{ display:block; width:6px; margin:0 auto; border-radius: 2px; background:#999999;/*内层轨道*/}
  #updateSalonMeal,#updateSalonStylist{
    display: none;
  }

  /*造型屋详情页上半部分-介绍start*/
  .salonIntroduce{
    width: 1000px;
    height: 240px;
    background-color: #FFFFFF;
    margin-top: 50px;
    border-radius: 1%;
  }
  .salonIntroduce .salonTopLeft{
    float: left;
    text-align: left;
    margin: 15px;
    width: 650px;
  }
  .salonIntroduce .salonTopLeft h5, .salonIntroduce .salonTopLeft span{
    margin-top: 3px;
    margin-bottom: 3px;
    display: inline-block;
    font-size: 14px;
    padding-top: 6px;
    padding-bottom: 2px;
  }
  .salonIntroduce .salonTopRight{
    width: 400px;
    height: 135px;
    float: right;
    margin-left: -100px;
    margin-top: 15px;
  }
  .salonIntroduce .salonTopRight img{
    width: 200px;
    height: 135px;
    margin: 10px 10px 10px 0;
  }
  /*造型屋详情页上半部分-介绍end*/


  /*造型屋详情页的套餐部分start*/
  .orderSpan{
    float: left;
    color: #FFFFFF;
    display: inline-block;
    margin: 50px 0 1px 150px;
  }
  .salonMeal{
    width: 1000px;
    height: 500px;
    background-color: #FFFFFF;
    margin-top: 20px;
    border-radius: 1%;
    /*overflow-y: scroll;*/
    overflow-y: auto;
    overflow-x: hidden;
  }
  .salonMeal::-webkit-scrollbar { width:10px; height:2px; background:#ccc; border-radius:10px;/*外层轨道*/}
  .salonMeal::-webkit-scrollbar-thumb{ display:block; width:6px; margin:0 auto; border-radius: 2px; background:#999999;/*内层轨道*/}
  .salonMeal .mealContent{
    width: 1000px;
    height: 150px;
    border-bottom: 1px solid #999999;
    margin: 0 auto;
  }
  .salonMeal img {
    float: left;
    width: 80px;
    height: 80px;
    margin: 40px 0 20px 100px;
  }
  .salonMeal p {
    float: left;
    width: 200px;
    margin: 40px 0 20px 50px;
  }
  .salonMeal span {
    float: left;
  }
  .salonMeal button.order {
    float: left;
    display: inline-block;
    margin-left: 280px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  /*造型屋详情页的套餐部分end*/
  .salonMeal1{
    width: 1000px;
    height: 500px;
    background-color: #FFFFFF;
    margin-top: 20px;
    border-radius: 1%;
    /*overflow-y: scroll;*/
    overflow-y: auto;
    overflow-x: hidden;
  }
  .salonMeal1::-webkit-scrollbar { width:10px; height:2px; background:#ccc; border-radius:10px;/*外层轨道*/}
  .salonMeal1::-webkit-scrollbar-thumb{ display:block; width:6px; margin:0 auto; border-radius: 2px; background:#999999;/*内层轨道*/}
  .salonMeal1 .mealContent{
    width: 1000px;
    height: 150px;
    border-bottom: 1px solid #999999;
    margin: 0 auto;
  }
  .salonMeal1 img {
    float: left;
    width: 80px;
    height: 80px;
    margin: 40px 0 20px 100px;
  }
  .salonMeal1 p {
    float: left;
    width: 350px;
    margin: 40px 50px 0 50px;
  }
  .salonMeal1 span {
    float: left;
    margin: 10px;
  }
  .salonMeal1 button.order {
    float: left;
    display: inline-block;
    margin-left: 40px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  .salonMeal1 button#order {
    float: left;
    display: inline-block;
    margin-left: 40px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  #updateSalonStylist p{
    float: left;
    width: 350px;
    margin: 100px 50px 0 50px;
  }
  #updateSalonStylist .order{
    float: left;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 150px;
    margin-left: 350px;
    margin-top: 20px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
  }
  #updateSalonMeal .order{
    float: left;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 150px;
    margin-left: 350px;
    margin-top: 20px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
  }

  #updateSalonMeal p{
    float: left;
    width: 350px;
    margin: 100px 50px 0 50px;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        note:{  /*背景设置*/
          backgroundImage:"url("+require("./../../static/userIndexbackground.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        },
        styhouseInfo:{},
        mealInfo:[],
        stylistInfo:[],
        mealId:'',
        stylistId:'',
        value1:'',

        overLayFlag:false,
      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter
    },
    mounted(){    //mounted是生命周期的初始化函数，里面可以调用一些初始化的方法
      this.showStyhouse();
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

      showStyhouse(){
        var userId=document.cookie.indexOf("userId");
        var styhouseId=sessionStorage.getItem('styhouseId');
        if(userId>-1){
          axios.post("/users/showStyhouseDetail",{styhouseId:styhouseId}).then((response)=>{
            var res=response.data;
            if(res.status=="0") {
              this.styhouseInfo=res.result;
              this.mealInfo = res.result.mealList;
              this.stylistInfo = res.result.stylistList;
            }
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      showOrderMeal(mealId){
        let hidden=document.getElementById('showSalonMeal');
        hidden.style.display="none";
        let obj=document.getElementById('updateSalonMeal');
        obj.style.display="block";
        this.mealId=mealId;
      },
      orderMeal(){
        let hidden=document.getElementById('showSalonMeal');
        hidden.style.display="none";
        let obj=document.getElementById('updateSalonMeal');
        obj.style.display="block";
        var styhouseId=sessionStorage.getItem('styhouseId');
        axios.post("/users/orderMeal",{"styhouseId":styhouseId,"mealId":this.mealId,"orderTime":this.value1}).then((response)=>{
          var res=response.data;
          if(res.status=="0") {
            alert("预约成功");
            let hidden=document.getElementById('showSalonMeal');
            hidden.style.display="block";
            let obj=document.getElementById('updateSalonMeal');
            obj.style.display="none";
          }
        })
      },
      showOrderStylist(stylistId){
        let hidden=document.getElementById('showSalonStylist');
        hidden.style.display="none";
        let obj=document.getElementById('updateSalonStylist');
        obj.style.display="block";
        this.stylistId=stylistId;
      },
      orderStylist(){
        var styhouseId=sessionStorage.getItem('styhouseId');
        axios.post("/users/orderStylist",{"styhouseId":styhouseId,"stylistId":this.stylistId,"orderTime":this.value1}).then((response)=>{
          var res=response.data;
          if(res.status=="0") {
            alert("预约成功");
            let hidden=document.getElementById('showSalonStylist');
            hidden.style.display="block";
            let obj=document.getElementById('updateSalonStylist');
            obj.style.display="none";
          }
        })
      },
      toStylistDetail(stylistId){
        sessionStorage.setItem('stylistId',stylistId);
        this.$router.push({
          path:"/stylistDetail"
        });
      }
    }
  }
</script>
