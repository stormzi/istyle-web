<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>

          <div id="container" class="main">
            <div class="left">
              <div class="-top">
                <ul>
                  <li class="active hairsex" id="female" @click="changeSex1()">女</li>
                  <li class="hairsex" id="male" @click="changeSex2()">男</li>
                </ul>
              </div>
              <div class="-bottom">
                <ul class="select" @click="locationDesign1()">
                  <li class="select-list">
                    <dl id="select1">
                      <dt></dt>
                      <dd class="select-all selected height1"><a href="javascript:;">取消选择</a></dd>
                      <dd class="height1"><a href="javascript:;">短发</a></dd>
                      <dd class="height1"><a href="javascript:;">及肩</a></dd>
                      <dd class="height1"><a href="javascript:;">中长发</a></dd>
                      <dd class="height1"><a href="javascript:;">长发</a></dd>
                    </dl>
                  </li>
                  <li class="select-list">
                    <dl id="select2">
                      <dt></dt>
                      <dd class="select-all selected curl1"><a href="javascript:;">取消选择</a></dd>
                      <dd class="curl1"><a href="javascript:;">直发</a></dd>
                      <dd class="curl1"><a href="javascript:;">卷发</a></dd>
                    </dl>
                  </li>
                  <li class="select-list">
                    <dl id="select3">
                      <dt></dt>
                      <dd class="select-all selected color1"><a href="javascript:;">取消选择</a></dd>
                      <dd class="color1"><a href="javascript:;">深色</a></dd>
                      <dd class="color1"><a href="javascript:;">浅色</a></dd>
                    </dl>
                  </li>
                </ul>
                <ul class="select" @click="locationDesign1()">
                  <li class="select-list">
                    <dl id="select4">
                      <dt></dt>
                      <dd class="select-all selected height2"><a href="javascript:;">取消选择</a></dd>
                      <dd class="height2"><a href="javascript:;">短发</a></dd>
                      <dd class="height2"><a href="javascript:;">寸头</a></dd>
                      <dd class="height2"><a href="javascript:;">中长发</a></dd>
                      <dd class="height2"><a href="javascript:;">长发</a></dd>
                    </dl>
                  </li>
                  <li class="select-list">
                    <dl id="select5">
                      <dt></dt>
                      <dd class="select-all selected curl2"><a href="javascript:;">取消选择</a></dd>
                      <dd class="curl2"><a href="javascript:;">直发</a></dd>
                      <dd class="curl2"><a href="javascript:;">卷发</a></dd>
                    </dl>
                  </li>
                  <li class="select-list">
                    <dl id="select6">
                      <dt></dt>
                      <dd class="select-all selected color2"><a href="javascript:;">取消选择</a></dd>
                      <dd class="color2"><a href="javascript:;">深色</a></dd>
                      <dd class="color2"><a href="javascript:;">浅色</a></dd>
                    </dl>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right">
              <div class="content" v-for="(item,index) in photoInfo">
                <img v-lazy="'/static/hair/'+item.hairImage" alt="">
                <span>适宜肤色</span>
                <span>适宜脸型</span>
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
  dd a{
    color: #000000;
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
  #container{
    width: 1000px;
    height: 600px;
    background-color: #FFFFFF;
    margin-top: 50px;
    border-radius: 1%;
  }
  .left{
    height: 260px;
    width: 200px;
    float: left;
    margin: 45px 35px 0 30px;
    border: 5px solid lightsteelblue;
    border-radius: 2%;
  }
  ul{
    list-style: none;
  }
  .left .-top ul li{
    width: 95px;
    height: 25px;
    float: left;
    margin-bottom: 10px;
    margin-top: -1px;
    background-color: lightsteelblue;
  }
  .left .-top ul li.active{
    width: 95px;
    height: 20px;
    float: left;
    margin-top: -1px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .left .-bottom ul li{
    width: 195px;
    height: 60px;
    display: inline-block;
    border-bottom: 1px solid lightsteelblue;
    padding-bottom: 10px;
  }
  .left .-bottom ul li:first-child{
    width: 195px;
    height: 90px;
    padding-top: 5px;
    padding-bottom: 10px;
    display: inline-block;
  }
  .left .-bottom ul li dd{
    width: 80px;
    height: 22px;
    margin-top: 5px;
    float: left;
    margin-left: 10px;
    display: inline-block;
  }
  .left .-bottom ul li dd.selected a{
    color: steelblue;
  }
  .right{
    height: 500px;
    width: 700px;
    float: left;
    margin-top: 45px;
    border: 5px solid lightsteelblue;
    border-radius: 2%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .right::-webkit-scrollbar{  /*滚动条整体样式*/
    width: 4px;
    height: 200px;
  }
  .right::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: lightsteelblue;
  }
  .right::-webkit-scrollbar-track{/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .right .content{
    width: 200px;
    height: 230px;
    margin-top: 10px;
    border: 1px solid gray;
    float: left;
    margin-left: 20px;
  }
  .right .content img{
    width: 150px;
    height: 150px;
    margin: 10px 20px;
  }
  .right .content span{
    width: 200px;
    height: 25px;
    display: block;
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
          backgroundImage:"url("+require("./../../static/userIndexbackground.jpg")+")",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover"
        },

        /*category:[
          {
            items:[
              {name:'短发',active:false},
              {name:'及肩',active:false},
              {name:'中长发',active:false},
              {name:'长发',active:false},
            ]
          },
          {
            items:[
              {name:'直发',active:false},
              {name:'卷发',active:false}
            ]
          },
          {
            items:[
              {name:'深色',active:false},
              {name:'浅色',active:false}
            ]
          }
        ],
        category1:[
          {
            items:[
              {name:'短发',active:false},
              {name:'寸头',active:false},
              {name:'中长发',active:false},
              {name:'长发',active:false},
            ]
          },
          {
            items:[
              {name:'直发',active:false},
              {name:'卷发',active:false}
            ]
          },
          {
            items:[
              {name:'深色',active:false},
              {name:'浅色',active:false}
            ]
          }
        ],
        condition:[],
*/

        photoInfo:[],

        overLayFlag:false,
        mdShow:false
      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter
    },
    mounted(){    //mounted是生命周期的初始化函数，里面可以调用一些初始化的方法
      this.init();
      this.changeSex1();
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
        $('.left .-bottom .select').first().show();
        $('.left .-bottom .select').not($('.left .-bottom .select').first()).hide();
        $('.left .-top ul li').click(function(){
          $(this).addClass('active');
          $('.left .-top ul li').not($(this)).removeClass('active');
          var idx = $(this).index('.left .-top ul li');
          if(!idx){
            $('.left .-bottom .select').eq(idx).show();
            $('.left .-bottom .select').not($('.left .-bottom .select').eq(idx)).hide();
          }else{
            $('.left .-bottom .select').eq(idx).show();
            $('.left .-bottom .select').not($('.left .-bottom .select').eq(idx)).hide();
          }
        });
        $("#select1 dd").click(function() {
          $(this).addClass("selected").siblings().removeClass("selected");
          if ($(this).hasClass("select-all")) {
            $("#selectA").remove();
          } else {
            var copyThisA = $(this).clone();
            if ($("#selectA").length > 0) {
              $("#selectA a").html($(this).text());
            } else {
              $(".select-result dl").append(copyThisA.attr("id", "selectA"));
            }
          }
        });
        $("#select2 dd").click(function() {
          $(this).addClass("selected").siblings().removeClass("selected");
          if ($(this).hasClass("select-all")) {
            $("#selectB").remove();
          } else {
            var copyThisB = $(this).clone();
            if ($("#selectB").length > 0) {
              $("#selectB a").html($(this).text());
            } else {
              $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            }
          }
        });
        $("#select3 dd").click(function() {
          $(this).addClass("selected").siblings().removeClass("selected");
          if ($(this).hasClass("select-all")) {
            $("#selectC").remove();
          } else {
            var copyThisB = $(this).clone();
            if ($("#selectC").length > 0) {
              $("#selectC a").html($(this).text());
            } else {
              $(".select-result dl").append(copyThisB.attr("id", "selectC"));
            }
          }
        });
        $("#select4 dd").click(function() {
          $(this).addClass("selected").siblings().removeClass("selected");
          if ($(this).hasClass("select-all")) {
            $("#selectD").remove();
          } else {
            var copyThisB = $(this).clone();
            if ($("#selectD").length > 0) {
              $("#selectD a").html($(this).text());
            } else {
              $(".select-result dl").append(copyThisB.attr("id", "selectD"));
            }
          }
        });
        $("#select5 dd").click(function() {
          $(this).addClass("selected").siblings().removeClass("selected");
          if ($(this).hasClass("select-all")) {
            $("#selectE").remove();
          } else {
            var copyThisB = $(this).clone();
            if ($("#selectE").length > 0) {
              $("#selectE a").html($(this).text());
            } else {
              $(".select-result dl").append(copyThisB.attr("id", "selectE"));
            }
          }
        });
        $("#select6 dd").click(function() {
          $(this).addClass("selected").siblings().removeClass("selected");
          if ($(this).hasClass("select-all")) {
            $("#selectF").remove();
          } else {
            var copyThisB = $(this).clone();
            if ($("#selectF").length > 0) {
              $("#selectF a").html($(this).text());
            } else {
              $(".select-result dl").append(copyThisB.attr("id", "selectF"));
            }
          }
        });
        $("#selectA").on("click",
          function() {
            $(this).remove();
            $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
            console.log("on");
          });
        $("#selectB").on("click",
          function() {
            $(this).remove();
            $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
          });
        $("#selectC").on("click",
          function() {
            $(this).remove();
            $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
          });
        $("#selectD").on("click",
          function() {
            $(this).remove();
            $("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
          });
        $("#selectE").on("click",
          function() {
            $(this).remove();
            $("#select5 .select-all").addClass("selected").siblings().removeClass("selected");
          });
        $("#selectF").on("click",
          function() {
            $(this).remove();
            $("#select6 .select-all").addClass("selected").siblings().removeClass("selected");
          });
      },

      locationDesign1(){
        let hairSex=sessionStorage.getItem('hairSex');
        let height1=document.getElementsByClassName('height1');
        let hairLenght1=null;
        for(let i=0;i<height1.length;i++){
          if(height1[i].className.indexOf('selected')>-1){
            hairLenght1=i;
            break;
          }
        }
        let curl1=document.getElementsByClassName('curl1');
        let hairCurl1=null;
        for(let i=0;i<curl1.length;i++){
          if(curl1[i].className.indexOf('selected')>-1){
            hairCurl1=i;
            break;
          }
        }
        let color1=document.getElementsByClassName('color1');
        let hairColor1=null;
        for(let i=0;i<color1.length;i++){
          if(color1[i].className.indexOf('selected')>-1){
            hairColor1=i;
            break;
          }
        }
        let height2=document.getElementsByClassName('height2');
        let hairLenght2=null;
        for(let i=0;i<height2.length;i++){
          if(height2[i].className.indexOf('selected')>-1){
            hairLenght2=i;
            break;
          }
        }
        let curl2=document.getElementsByClassName('curl2');
        let hairCurl2=null;
        for(let i=0;i<curl2.length;i++){
          if(curl2[i].className.indexOf('selected')>-1){
            hairCurl2=i;
            break;
          }
        }
        let color2=document.getElementsByClassName('color2');
        let hairColor2=null;
        for(let i=0;i<color2.length;i++){
          if(color2[i].className.indexOf('selected')>-1){
            hairColor2=i;
            break;
          }
        }
        axios.post("/users/searchHair",{
          hairSex:hairSex,
          hairLenght1:hairLenght1,
          hairCurl1:hairCurl1,
          hairColor1:hairColor1,
          hairLenght2:hairLenght2,
          hairCurl2:hairCurl2,
          hairColor2:hairColor2
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.photoInfo=res.result;
          }
        })
      },
      changeSex1(){
        var hairSex='female';
        sessionStorage.setItem('hairSex',hairSex);
        axios.post("/users/searchSexHair",{
          hairSex:hairSex
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.photoInfo=res.result;
          }
        })
      },
      changeSex2(){
        var hairSex='male';
        sessionStorage.setItem('hairSex',hairSex);
        axios.post("/users/searchSexHair",{
          hairSex:hairSex
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.photoInfo=res.result;
          }
        })
      }

      /*      handle(index,key){
              var count=0;
              var item=this.category[index].items;
              item.filter(function(v,i){
                if(i==key){
                  v.active=true;
                  this.condition.filter(function(v2,i){
                    if(v.name==v2.name){
                      this.condition.splice(i,1);
                      count--;
                    }
                  });
                  Vue.set(this.condition,count++,v);
                }
              });

            },
            remove(index){
              var count=0;
              var item=this.category[index].items;
              item.filter(function (v1,key) {
                v1.active=false;
                this.condition.filter(function(v2,i){
                  if(v1.name==v2.name){
                    this.condition.splice(i,1);
                    count--;
                  }
                });
              });
            }*/
    }
  }
</script>
