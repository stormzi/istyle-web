<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item,index) in slides" :key="index">
              <video :title="item.videoTitle" controls loop><source :src="item.videoUrl">您的浏览器不支持HTML5视频播放，请升级浏览器。</video>
            </el-carousel-item>
          </el-carousel>

          <div id="wrapper" class="main">
            <div class="box" v-for="(item,index) in videos">
              <video controls width="500px" height="300px" :src="item.src">您的浏览器不支持HTML5视频播放，请升级浏览器。</video>
              <p>{{item.title}}</p>
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
  .el-carousel{
    margin-top: 50px;
  }
  .el-carousel__item video {
    width: 100%;
    height:100%;
  }

  #wrapper {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
  }
  #wrapper p {
    float: left;
    font-family: helvetica;
    font-weight: bold;
    font-size: 15px;
    color: #FFFFFF;
    height: 15px;
    width: 500px;
    margin: 5px 0 100px 20px ;
    text-align: left;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  #wrapper .box{
    width: 500px;
    height: 320px;
    float: left;
    margin: 20px 20px 20px 60px;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  export default {
    data(){
      return {
        note:{  /*背景设置*/
          backgroundImage:"url("+require("./../../static/bg2.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        },
        slides:[
          {"videoTitle":'10分钟快速出门妆容减龄又可爱美妆教程', "videoUrl":'./../../static/video/10分钟快速出门妆容减龄又可爱美妆教程-_标清.mp4'},
          {"videoTitle":'Ta说购了-网红润发精油测评,亲测护发精油居然效果惊人!', "videoUrl":'./../../static/video/Ta说购了-网红润发精油测评,%20亲测护发精油居然效果惊人!-_标清.mp4'},
          {"videoTitle":'你每天都在用的护肤品真的适合你么？史上超全水乳套装测评！', "videoUrl":'./../../static/video/你每天都在用的护肤品真的适合你么？史上超全水乳套装测评！-_标清.mp4'},
          {"videoTitle":'潮流穿搭：如何买到LV秀款包？测评两款LV最新秀款包包、软饼包、圆筒包"', "videoUrl":'./../../static/video/潮流穿搭：如何买到LV秀款包？测评两款LV最新秀款包包、软饼包、圆筒包-_标清.mp4'},
          {"videoTitle":'美妆教程：Pony教你画都市丽人妆容，气场十足！', "videoUrl":'./../../static/video/美妆教程：Pony教你画都市丽人妆容，气场十足！-_标清.mp4'},
        ],
        videos:[
          {"src":'./../../static/video/大嘴博士测评平价护肤品，拯救“贫民窟”女孩！-_标清.mp4',title:'大嘴博士测评平价护肤品，拯救“贫民窟”女孩！'},
          {"src":'./../../static/video/张雨绮推荐的护肤品开箱测评!-_标清.mp4',title:'张雨绮推荐的护肤品开箱测评!'},
          {"src":'./../../static/video/美发教程---夏日编发-_标清.mp4',title:'美发教程---夏日编发'},
          {"src":'./../../static/video/潮流穿搭：春季时尚穿搭教程，微胖女生也可以穿出女神范儿-_标清.mp4',title:'潮流穿搭：春季时尚穿搭教程，微胖女生也可以穿出女神范儿'},
          {"src":'./../../static/video/本末测评：1万和49的风衣有啥区别？清华和北服小姐姐教你穿搭！-_标清.mp4',title:'本末测评：1万和49的风衣有啥区别？清华和北服小姐姐教你穿搭！'},
          {"src":'./../../static/video/护发素能代替甘油做泥吗？做的泥区别在哪，测评有答案，无硼砂-_标清.mp4',title:'护发素能代替甘油做泥吗？做的泥区别在哪，测评有答案，无硼砂'},
          {"src":'./../../static/video/张雨绮推荐的护肤品开箱测评!-_标清.mp4',title:'张雨绮推荐的护肤品开箱测评!'},
          {"src":'./../../static/video/开学季的护肤品开箱测评-_标清.mp4',title:'开学季的护肤品开箱测评'},
          {"src":'./../../static/video/平价风衣测评合集%20-%20九套风衣穿搭%20-%20秋冬必备单品%20-%20严重踩雷单品拔草%20【不辣不辣】-_标清.mp4',title:'平价风衣测评合集-九套风衣穿搭-秋冬必备单品-严重踩雷单品拔草【不辣不辣】'},
          {"src":'./../../static/video/国货大理石眼影盘测评+教程分享-_标清.mp4',title:'国货大理石眼影盘测评+教程分享'},
          {"src":'./../../static/video/国外时尚美妆：小姐姐的时尚美发教程，是不是很漂亮-_标清.mp4',title:'国外时尚美妆：小姐姐的时尚美发教程，是不是很漂亮'},
          {"src":'./../../static/video/兰蔻塑颜全套护肤品大测评-_标清.mp4',title:'兰蔻塑颜全套护肤品大测评'},
          {"src":'./../../static/video/4套初春大衣穿搭教程，简约风时尚%20大方，很适合逛街%20回头率很高-_标清.mp4',title:'4套初春大衣穿搭教程，简约风时尚大方，很适合逛街回头率很高'},
          {"src":'./../../static/video/[AskWenWen] DIY染色调色美发教程 奶奶灰 金发教程-_标清.mp4',title:'[AskWenWen] DIY染色调色美发教程 奶奶灰 金发教程'},
          {"src":'./../../static/video/贵妇娇兰护肤品全套测评来咯-_标清.mp4',title:'贵妇娇兰护肤品全套测评来咯'},
          {"src":'./../../static/video/穿搭教程：学会这些穿搭小知识，做整条街最靓的仔-_标清.mp4',title:'穿搭教程：学会这些穿搭小知识，做整条街最靓的仔'},
          {"src":'./../../static/video/初春黛珂单色眼影测评教程,%20手残画也能出超美眼妆-_标清.mp4',title:'初春黛珂单色眼影测评教程,手残画也能出超美眼妆'},
          {"src":'./../../static/video/旧衣穿出新鲜感%20%20%20创意穿搭教程%20%20颠覆你的时尚观-_标清.mp4',title:'旧衣穿出新鲜感-创意穿搭教程-颠覆你的时尚观'},
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
      }
    }
  }
</script>
