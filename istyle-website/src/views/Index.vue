<template>
  <div>
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
          <div class="background">
            <img src="./../../static/indexbackground.jpg"/>
          </div>
          <div class="clear"></div>

          <div class="block">
            <span class="demonstration">每日推荐</span>
            <div class="clear"></div>
            <el-carousel trigger="click" class="carousel">
              <el-carousel-item v-for="(item,index) in slides" :key="index">
                <!--<h3 class="small">{{ item }}</h3>-->
                <img :src="item.src">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div> <!--遮罩板-->
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  /*背景图*/
  .background {
    position: absolute;
    top: -19.2px;
    z-index: -1;
    width: 100%;
  }

  .background img{
    width: 100%;
    height: 800px;
  }
  .footer {
    background-color: #000000;
    width: 100%;
    height: 300px;
    color: #FFFFFF;
    text-align: center;
    margin-top: 60px;
  }
  .clear{
    clear: both;
  }
  .block{
    margin-top: 765px;
  }
  .demonstration{
    color: #000000;
    float: left;
    margin: 0 0 20px 200px;
  }
  .carousel{
    width: 70%;
    margin-left: 200px;
    margin-bottom: 50px;
  }
  .carousel img{
    height:500px;
    width: 480px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #0f0f0f;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #0f0f0f;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  export default {
    data(){
      return {
        slides:[
          {src:'./../../static/slidebox1.jpg'},
          {src:'./../../static/slidebox2.jpeg'},
          {src:'./../../static/slidebox3.jpg'},
          {src:'./../../static/slidebox4.jpeg'},
          {src:'./../../static/slidebox5.jpg'},
          {src:'./../../static/slidebox6.jpeg'},
        ],
        overLayFlag:false,
        mdShow:false
      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter
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

    }
  }
</script>
