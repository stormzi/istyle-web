<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
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
              <p><label class="myphoto">照片</label><img :src="'/static/uploadFiles/'+consultInfo.replay.answerImage"/></p><div class="clear"></div>
              <p><span class="address">回复内容:{{consultInfo.replay.replayContent}}</span></p><div class="clear"></div>
              <p><input type="button" @click="toStyhouseDetail(consultInfo.stylistId)" class="submit" value="预约该造型师"/></p>
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
  .container .submit{
    outline: none;
    background-color: #5bc0de;
    border: 1px solid #5bc0de;
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
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import axios from 'axios'
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
      NavHeader:NavHeader,
      NavFooter:NavFooter
    },
    mounted(){
      this.checkConsult();
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

      checkConsult(){
        var userId=document.cookie.indexOf("userId");
        if(userId>-1){
          var consultId=sessionStorage.getItem('consultId');
          axios.post("/users/checkConsult",{"consultId":consultId}).then((response)=>{
            let res=response.data;
            this.consultInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      toStyhouseDetail(stylistId){
        sessionStorage.setItem('stylistId',stylistId);
        this.$router.push({
          path:"/stylistDetail"
        });
      }
    }
  }
</script>
