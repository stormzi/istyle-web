<template>
  <div class="note" :style="note">
    <el-row>
      <el-col :xs="2" :sm="4" :md="8" :lg="9" :xl="11" style="width: 100%;">
        <div class="grid-content">
          <nav-header style="background-color: transparent;padding: 15px 20px 10px 20px;color: #FFFFFF"></nav-header>
          <div class="container main">
                <p>
                  <label id="upBtn1">选择图片：<input type="file" id="changeHead2" onchange="input2.value=this.value" style="display: none" name="image" accept="image/*"></label>
                  <input type="text" id="input2" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 250px; height: 30px;">
                </p>
                <p><label for="height">身高:</label><input type="text" class="input1" id="height" name="height" placeholder="请输入您的身高" /></p>
                <p><label for="weight">体重:</label><input type="text" class="input2" id="weight" name="weight" placeholder="请输入您的体重"/></p>
                <p><label for="style">穿衣风格:</label><!--<input type="text" class="input3" id="style" name="style" placeholder="如简约、潮流、韩范等" />-->
                    <textarea name="style" class="input3" id="style" cols="30" rows="10" placeholder="如简约、潮流、韩范等"></textarea></p>
                <p><label for="question">问题描述:</label><!--<input type="text" class="input4" id="question" name="question" placeholder="请描述一下您的问题" />-->
                    <textarea name="question" class="input4" id="question" cols="30" rows="10" placeholder="请描述一下您的问题"></textarea>
                </p>
            <p><input type="button" @click="onlineConsult()" class="submit" value="咨询"/></p>
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
    width: 100px;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;

    border-radius: 8px;
    margin-left: 10px;
    margin-right: 100px;
    padding: 10px 5px 10px 10px;
  }
  p{
    margin-bottom: 30px;
  }

  .container{
    width: 1000px;
    height: 600px;
    padding-top: 100px;
  }
  .container p{
    width: 1000px;
    text-align: center;
    height: 34px;
    padding-bottom: 30px;
  }
  .container p:nth-child(4){
    width: 1000px;
    text-align: center;
    height: 100px;
    padding-bottom: 30px;
  }
  .container .input1{
    width: 300px;
    float: right;
    margin-right: 220px;
    margin-left: -200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
  }
  .container .input2{
    width: 300px;
    float: right;
    margin-right: 220px;
    margin-left: -200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
  }
  .container .input3{
    width: 300px;
    float: right;
    margin-right: 220px;
    margin-left: -180px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
  }
  .container .input4{
    width: 300px;
    float: right;
    margin-right: 220px;
    margin-left: -180px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #5bc0de;
  }
  .container label{
    width: 34px;
    vertical-align: middle;
    text-align: right;
  }
  .container img{
    display: inline-block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  #changeheadPortrait{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 10px;
    border-radius: 8px;
    margin-right: 10px;
    margin-left: 110px;
  }
  .container .submit{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 280px;
    margin-top: 120px;
  }
  .container .submit:hover{
    outline: none;
    background-color: #FFFFFF;
    border: 1px solid #3ACA7A;
    color: #5bc0de;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 280px;
    margin-top: 120px;
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

        overLayFlag:false,
      }
    },
    components:{
      NavHeader:NavHeader,
      NavFooter:NavFooter
    },
    mounted(){

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

      submitQuestionImg(consultId){
        var file=document.getElementById('changeHead2').files[0];
        let form_data =new FormData();
        form_data.append('image',file);
        form_data.append('consultId',consultId);
        axios.post('/upload/image_upload_submitquestion',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          this.toUser();
        })
      },
      onlineConsult(){
        var stylistId=sessionStorage.getItem('stylistId');
        var styhouseId=sessionStorage.getItem('styhouseId');
        let img=document.getElementById('input2').value;
        let height=document.getElementById('height').value;
        let weight=document.getElementById('weight').value;
        let style=document.getElementById('style').value;
        let question=document.getElementById('question').value;
        if(img && height && weight && style && question){
          axios.post("/users/onlineConsult",{
            stylistId:stylistId,
            styhouseId:styhouseId,
            height:height,
            weight:weight,
            style:style,
            question:question
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              alert("咨询成功");
              this.submitQuestionImg(res.result); /*先上传图片获得图片路径再存数据库*/
            }
          });
        }else{
          alert("咨询失败，部分内容未输入，请输入完整");
        }
      },
      toUser(){
        this.$router.push({
          path:"/user"
        });
      }
    }
  }
</script>
