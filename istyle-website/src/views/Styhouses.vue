<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
          <div id="container" class="main">
            <div style="float:left;margin-top: 50px; margin-left: 20px">
              <area-select @change="findStyhouseStylists()" type="text" :level="2" v-model="selected" :data="data1"></area-select>
            </div>
            <div class="clear"></div>
            <div style="float:left;margin-top: 30px; margin-left: 30px;"><h5>周边热门发型屋推荐</h5></div>
            <div class="clear"></div>
            <div class="salonIndex">
              <div class="box1" v-for="(item,index) in styhouseInfo">
                <img :src="'/static/uploadFiles/'+item.styhouseImage"/>
                <div class="box1_1">
                  <h5>{{item.styhouseName}}造型屋</h5><br />
                  <span class="address">地址：{{item.specificAddress}}</span><br />
                  <span class="package">{{item.mealIntro}}</span><br/>
                  <el-row>
                    <el-button plain @click="toStyhouseDetail(item.styhouseId)">查看详情</el-button>
                    <el-button plain @click="toStyhouseDetail(item.styhouseId)">预约造型师</el-button>
                  </el-row>
                </div>
              </div>
<!--              <div class="box1">
                <img src="./../../static/salonpho2.jpg"/>
                <div class="box1_1">
                  <h5>潮流造型（港惠店）</h5><br />
                  <span class="address">地址：广东省惠州市惠城区港惠二楼5号</span><br />
                  <span class="package">洗剪吹单人套餐55元，韩国进口美发单人套餐399元</span><br/>
                  <a href="">查看详情>></a><button style="float: right;color: #FF0000;border: 1px solid #000000;outline: none;background-color:#FFFFFF;padding: 2px;margin: 18px">预约发型师</button>
                </div>
              </div>
              <div class="box1">
                <img src="./../../static/salonpho3.jpg"/>
                <div class="box1_1">
                  <h5>前沿造型（惠州学院店）</h5><br />
                  <span class="address">地址：广东省惠州市演达大道46号惠州学院内</span><br />
                  <span class="package">洗剪吹学生套餐25元，潮流烫染发单人套餐166元</span><br/>
                  <a href="">查看详情>></a><button style="float: right;color: #FF0000;border: 1px solid #000000;outline: none;background-color:#FFFFFF;padding: 2px;margin: 18px">预约发型师</button>
                </div>
              </div>
              <div class="box1">
                <img src="./../../static/salonpho3.jpg"/>
                <div class="box1_1">
                  <h5>时尚造型屋（马庄分店）</h5><br />
                  <span class="address">地址：广东省惠州市演达大道马庄村35号</span><br />
                  <span class="package">杀马特洗剪吹单人套餐35元，韩国进口美发单人套餐298元</span><br/>
                  <a href="">查看详情>></a><button style="float: right;color: #FF0000;border: 1px solid #000000;outline: none;background-color:#FFFFFF;padding: 2px;margin: 18px">预约发型师</button>
                </div>
              </div>
              <div class="box1">
                <img src="./../../static/salonpho3.jpg"/>
                <div class="box1_1">
                  <h5>BIG STAR大明星造型（山水华府店）</h5><br />
                  <span class="address">地址：广东省惠州市演达大道山水华府66号</span><br />
                  <span class="package">时尚烫发套餐88元，精油头发护理156元</span><br/>
                  <a href="">查看详情>></a><button style="float: right;color: #FF0000;border: 1px solid #000000;outline: none;background-color:#FFFFFF;padding: 2px;margin: 18px">预约发型师</button>
                </div>
              </div>
              <div class="box1">
                <img src="./../../static/salonpho3.jpg"/>
                <div class="box1_1">
                  <h5>前沿造型（惠州学院店）</h5><br />
                  <span class="address">地址：广东省惠州市演达大道46号惠州学院内</span><br />
                  <span class="package">洗剪吹学生套餐25元，潮流烫染发单人套餐166元</span><br/>
                  <a href="">查看详情>></a><button style="float: right;color: #FF0000;border: 1px solid #000000;outline: none;background-color:#FFFFFF;padding: 2px;margin: 18px">预约发型师</button>
                </div>
              </div>
              <div class="box1">
                <img src="./../../static/salonpho3.jpg"/>
                <div class="box1_1">
                  <h5>BIG STAR大明星造型（东平店）</h5><br />
                  <span class="address">地址：东平桥东惠城区东平坡路57号二楼</span><br />
                  <span class="package">BIG STAR大明星洗剪吹单人套餐35元，BIG STAR大明星韩国进口美发单人套餐196元</span><br/>
                  <a href="">查看详情>></a><button style="float: right;color: #FF0000;border: 1px solid #000000;outline: none;background-color:#FFFFFF;padding: 2px;margin: 18px">预约发型师</button>
                </div>
              </div>-->
            </div>

            <div class="stylist">
              <h5>热门造型师</h5>
              <div class="clear"></div>
              <div class="stylistAdd">
                <div @click="tostylistDetail(item.stylistId)" v-for="(item,index) in stylistInfo" class="box2" style="width: 120px; height: 120px;background:url('./../../static/stylistBackground.png') center;">
                  <img :src="'/static/uploadFiles/'+item.stylistImage"/>
                  <div class="box2_2">
                    <span><b>{{item.stylistName}}</b></span>
                  </div>
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
  #container{
    width: 1000px;
    height: 1000px;
    background-color: #FFFFFF;
    margin-top: 70px;
    border-radius: 1%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .footer{
    background-color: transparent;
    color: #FFFFFF;
  }
  .el-button{
    margin-top: 20px;
    padding: 3px 20px 25px 20px;
    height:40px;
  }

  /*滚动条样式*/#container::-webkit-scrollbar{  /*滚动条整体样式*/
             width: 4px;
             height: 200px;
           }
  #container::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  #container::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  /*滚动条样式*/.stylist::-webkit-scrollbar{  /*滚动条整体样式*/
             width: 4px;
             height: 200px;
           }
  .stylist::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .stylist::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }


  #container .salonIndex{
    float: left;
    width: 650px;
    height: 800px;
    margin-left: 50px;
    margin-top: 50px;
  }
  #container .stylist{
    float: left;
    width: 200px;
    height: 680px;
    margin-left: 50px;
    margin-top: 50px;
    border: 1px solid #999999;
    border-radius: 1%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #container .salonIndex .box1{
    width: 650px;
    height: 200px;
    margin: 0 auto;
    border: 1px solid #999999;
    /*margin-top: 20px;*/
    border-radius: 1%;
  }
  #container .salonIndex img{
    float: left;
    width: 200px;
    height: 150px;
    margin: 20px 20px 0 20px;
  }
  #container .salonIndex .box1 .box1_1{
    float: left;
    position: relative;
  }
  #container .salonIndex .box1 span{
    display: inline-block;
    float: left;
    margin-top: 10px;
    /*text-autospace: 40;*/
  }
  #container .salonIndex .box1 h5{
    display: inline-block;
    float: left;
    margin-top: 30px;
    /*text-autospace: 40;*/
  }
  #container .salonIndex .box1 a{
    display: inline-block;
    float: left;
    margin-top: 20px;
    margin-left: 10px;
    color: #000000;
    /*text-autospace: 40;*/
  }
  #container .salonIndex .address,#container .salonIndex .package{
    width: 280px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
    text-align: left;
  }
  /*右边的热门造型师*/
  #container .stylist h5{
    float: left;
    margin: 20px;
  }
  #container .stylist .box2{
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-bottom: 1px solid #999999;
    margin-top: 20px;
    padding-bottom: 10px;
  }
  #container .stylist img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 30px 20px 0 20px;
    text-align: center;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import axios from 'axios'
  import { pca, pcaa } from 'area-data';
  export default {
    data(){
      return {
        data1:pcaa,
        selected:[],  /*地址控件*/
        note:{  /*背景设置*/
          backgroundImage:"url("+require("./../../static/userIndexbackground.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        },
        styhouseInfo:[],
        stylistInfo:[],

        overLayFlag:false,
      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter
    },
    mounted(){    //mounted是生命周期的初始化函数，里面可以调用一些初始化的方法
      this.showStyhousesStylists();
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

      showStyhousesStylists(){
        var userId=document.cookie.indexOf("userId");
        if(userId>-1){
          axios.get("/users/showStyhousesStylists").then((response)=>{
            var res=response.data;
            if(res.status=="0") {
              this.styhouseInfo = res.result.styhouses;
              this.stylistInfo = res.result.stylists;
            }
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      findStyhouseStylists(){
        axios.post("/users/findStyhouseStylists",{
          generalAddress:this.selected.join("-")
        }).then((response)=>{
          var res=response.data;
          if(res.status=="0"){
            this.styhouseInfo=res.result.styhouses;
            this.stylistInfo=res.result.stylists;
          }
        })
      },
      toStyhouseDetail(styhouseId){
        sessionStorage.setItem('styhouseId',styhouseId);
        this.$router.push({
          path:"/styhouseDetail"
        });
      },
      tostylistDetail(stylistId){
        sessionStorage.setItem('stylistId',stylistId);
        this.$router.push({
          path:"/stylistDetail"
        });
      }
    }
  }
</script>
