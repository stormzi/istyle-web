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
          <span class="navbar-link" v-text="'欢迎'+nickName+'造型屋登录istyle'" v-if="nickName"></span>
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
                        <p><img :src="'/static/uploadFiles/'+styhouseInfo.styhouseImage"/></p>
                        <p><span class="salonname">造型屋Id：{{styhouseInfo.styhouseId}}</span></p>
                        <p><span class="salonname">造型屋名：{{styhouseInfo.styhouseName}}</span></p>
                        <p><span class="address">大致地址：{{styhouseInfo.generalAddress}}</span></p>
                        <p><span class="address">具体地址：{{styhouseInfo.specificAddress}}</span></p>
                        <p><span class="meal">套餐简介：{{styhouseInfo.mealIntro}}</span></p>
                        <p><span class="time">营业时间：{{styhouseInfo.openTime}}</span></p>
                        <p><span class="phone">联系电话：{{styhouseInfo.styhousePhone}}</span></p>
                      </div>
                      <input type="button" id="editorBtn1" @click="editor2()" value="编辑"/>
                    </div>
                    <div class="updateInfo" style="display: block">
                      <form action="" method="post" id="form">
                        <div class="clear"></div>
                        <div id="updateContent1">
                          <p>
                            <label id="upBtn2">选择图片：<input type="file" id="changeHead3" onchange="input3.value=this.value" style="display: none" name="image" accept="image/*"></label>
                            <input type="text" id="input3" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 180px; height: 30px;">
                            <input type="button" id="changeheadPortrait3" @click="submitStyhouseImg()" value="上传图片">
                          </p>
                          <p><label for="salonName">造型屋名：</label><input type="text" class="input1" id="salonName" name="salonName" placeholder="请输入造型屋名" /></p>
                          <p><label for="time">营业时间：</label><input type="text" class="input4" id="time" name="time" placeholder="如：周五到周六 8:00-22:00" /></p>
                          <p><label for="phone">联系电话：</label><input type="text" class="input5" id="phone" name="phone" placeholder="请输入联系电话" /></p>
                          <p><label style="margin-right: -280px">大致地址：</label><area-select style="float: right;margin-right: 15px" type="text" :level="2" v-model="selected" :data="data1"></area-select></p>
                          <p><label for="address">具体地址：</label><textarea name="address" class="input2" id="address" cols="30" rows="10" placeholder="请输入你具体地址(最多25字)"></textarea></p>
                          <p><label for="meal">套餐简介：</label><textarea name="meal" class="input3" id="meal" cols="30" rows="10" placeholder="请输入套餐简介(最多25字)"></textarea></p>
                        </div>
                        <p><input type="button" @click="updateStyhouse();showStyhouse()" id="submit" value="保存"/></p>

                      </form>
                    </div>

                  </div>
                </div>
              </li>
              <li>
                <button class="left" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>套餐发布</span></button>
                <div class="right">
                  <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                    <span>套餐发布</span>
                  </div>
                  <div class="rightBottomCollect">
                    <div class="updateContent1">
<!--                      <p>
                        <label class="upBtn">选择图片<input type="file" ref='chooseImg' id="changeHead1" style="display: none" name="avatar" accept="image/*"></label>
                        <input type="button" id="changeheadPortrait1" @click="submitMealImg()" value="上传图片">
                      </p>-->
                      <p>
                        <label id="upBtn">选择图片：<input type="file" id="changeHead1" onchange="input1.value=this.value" style="display: none" name="image" accept="image/*"></label>
                        <input type="text" id="input1" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 230px; height: 30px;">
                        <!--<input type="button" id="changeheadPortrait1" @click="submitMealImg()" value="上传图片">-->
                      </p>
                      <p><label for="mealName">套餐名字：</label><input type="text" class="input1" id="mealName" name="mealName" placeholder="请输入套餐名字" /></p>
                      <p><label for="price">套餐价格：</label><input type="text" class="input1" id="price" name="price" placeholder="请输入套餐价格" /></p>
                      <p><label for="description">套餐介绍：</label><input type="text" class="input1" id="description" name="description" placeholder="请输入套餐简介，不超过50字" /></p>
                    </div>
                    <p><input type="button" @click="pushMeal()" id="submit1" value="提交"/></p>
                  </div>
                </div>
              </li>
              <li>
                <button class="left" @click="mealShow()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>套餐管理</span></button>
                <div class="right">
                  <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                    <span class="mealNum">套餐数({{mealInfo.length}})</span>
                  </div>
                  <div class="rightBottomSubscribe">
                    <div id="showMeal">
                      <div v-for="(item,index) in mealInfo">
                        <div class="clear"></div>
                        <div class="mealContent">
                          <img :src="'/static/uploadFiles/'+item.mealImage"/>
                          <p>
                            <span>{{item.mealName}}</span><br />
                            <span style="width: 280px;overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">{{item.mealIntro}}</span>
                            <span style="color: orange;">{{item.mealPrice}}</span>
                          </p>
                          <button class='order' @click='updateMealShow(item.mealId)'>修改套餐</button>
                          <button class='order' @click='mealDel(item.mealId)'>删除套餐</button>
                        </div>
                      </div>
                    </div>
                    <div id="updateMeal">
                      <div class="updateContent1">
                        <p>
                          <label id="upBtn3">选择图片：<input type="file" id="changeHead4" onchange="input4.value=this.value" style="display: none" name="image" accept="image/*"></label>
                          <input type="text" id="input4" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 180px; height: 30px;">
                          <input type="button" id="changeheadPortrait4" @click="updateMealImg()" value="上传图片">
                        </p>
                        <p><label for="changemealName">套餐名字：</label><input type="text" class="input1" id="changemealName" name="changemealName" placeholder="请输入套餐名字" /></p>
                        <p><label for="changeprice">套餐价格：</label><input type="text" class="input1" id="changeprice" name="changeprice" placeholder="请输入套餐价格" /></p>
                        <p><label for="changedescription">套餐介绍：</label><input type="text" class="input1" id="changedescription" name="changedescription" placeholder="请输入套餐简介，不超过50字" /></p>
                      </div>
                      <p><input type="button" @click="updateMeal()" id="submit3" value="提交"/></p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button class="left" onclick="" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>造型师发布</span></button>
                <div class="right">
                  <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                    <span>造型师发布</span>
                  </div>
                  <div class="rightBottomMyfan">
                    <div class="updateContent1">
                      <p>
                        <label id="upBtn1">选择图片：<input type="file" id="changeHead2" onchange="input2.value=this.value" style="display: none" name="image" accept="image/*"></label>
                        <input type="text" id="input2" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 250px; height: 30px;">
                        <!--<input type="button" id="changeheadPortrait2" @click="submitStylistImg()" value="上传图片">-->
                      </p>
                      <p><label for="stylistId">造型师Id：</label><input type="text" class="input1" id="stylistId" name="stylistId" placeholder="请绑定造型师Id" /></p>
                      <p><label for="stylistName">造型师名字：</label><input type="text" class="input1" id="stylistName" name="stylistName" placeholder="请输入造型师名字" /></p>
                      <p><label for="ordertime">最大可预约人数：</label><input type="text" class="input1" id="ordertime" name="ordertime" placeholder="请输入最大可预约人数" /></p>
                      <p><label for="changestyscription2">造型师介绍：</label><input type="text" class="input1" id="changestyscription2" name="changestyscription2" placeholder="请输入造型师简介，不超过20字" /></p>
                      <p><label for="test1">可预约时间：</label><input type="text" class="demo-input" placeholder="如：周五到周六 8:00-22:00" id="test1"></p>
                    </div>
                    <p><input type="button" @click="pushStylist()" id="submit2" value="提交"/></p>
                  </div>
                </div>
              </li>
              <li>
                <button class="left" @click="stylistShow()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>造型师管理</span></button>
                <div class="right">
                  <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                    <span>造型师数({{stylistInfo.length}})</span>
                  </div>
                  <div class="rightBottomOrder">
                    <div id="showstylist">
                      <div v-for="(item,index) in stylistInfo">
                        <div class="clear"></div>
                        <div class="mealContent">
                          <img :src="'/static/uploadFiles/'+item.stylistImage"/>
                          <p>
                            <span class="stylistName">姓名：{{item.stylistName}}</span> <span class="orderNum">最大可预约人数：{{item.maxOrderNum}}</span><br />
                            <span class="orderTime">可预约时间：{{item.canOrderTime}}</span>
                            <span style="text-align: left;width: 270px;overflow: hidden;white-space:nowrap;text-overflow: ellipsis;">{{item.stylistIntro}}<!--黄造型师可以打造百变造型，风格多变，会认真听取顾客的意见--></span>
                          </p>
                          <button class='order' @click='updateStylistShow(item.stylistId)'>修改造型师</button>
                          <button class='order' @click='stylistDel(item.stylistId)'>删除造型师</button>
                        </div>
                      </div>
                    </div>
                    <div id="updatestylist">
                      <div class="updateContent1">
                        <p>
                          <label id="upBtn4">选择图片：<input type="file" id="changeHead5" onchange="input5.value=this.value" style="display: none" name="image" accept="image/*"></label>
                          <input type="text" id="input5" style="margin-right:10px;border-radius: 5px; border: 1px solid #5bc0de; width: 180px; height: 30px;">
                          <input type="button" id="changeheadPortrait5" @click="updateStylistImg()" value="上传图片">
                        </p>
                        <p><label for="changestylistName">造型师名字：</label><input type="text" class="input1" id="changestylistName" name="changestylistName" placeholder="请输入造型师名字" /></p>
                        <p><label for="changeordertime">最大可预约人数：</label><input type="text" class="input1" id="changeordertime" name="changeordertime" placeholder="请输入最大可预约人数" /></p>
                        <p><label for="changestyscription">造型师介绍：</label><input type="text" class="input1" id="changestyscription" name="changestyscription" placeholder="请输入造型师简介，不超过20字" /></p>
                        <p><label for="test2">可预约时间：</label><input type="text" class="demo-input" placeholder="如：周五到周六 8:00-22:00" id="test2"></p>
                      </div>
                      <p><input type="button" @click="updateStylist()" class="submit4" value="提交"/></p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button class="left" @click="showOrderMeal()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>预约套餐</span></button>
                <div class="right">
                  <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                    <span>预约数({{orderMealInfo.length}})</span>
                  </div>
                  <div class="rightBottomOrder">
                    <div id="showstylist1">
                      <div v-for="(item,index) in orderMealInfo">
                        <div class="clear"></div>
                        <div class="mealContent">
                          <img :src="'/static/uploadFiles/'+item.meal[0].mealImage"/>
                          <p style="margin-top: 40px">
                            <span class="stylistName">{{item.meal[0].mealName}}</span><br />
                            <span class="orderTime">预约时间：{{item.orderList.orderTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                          </p>
                          <button class='order' @click='delOrder(item.orderList.orderId)'>删除预约</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button class="left" @click="showOrderStylist()" style="border: 0; background-color: transparent; outline: none; width: 150px;height: 43px; overflow: hidden;"><span>预约造型师</span></button>
                <div class="right">
                  <div class="rightTop tit">  <!--tit是为了写小竖线的样式-->
                    <span>预约数({{orderStylistInfo.length}})</span>
                  </div>
                  <div class="rightBottomOrder">
                    <div id="showstylist2">
                      <div v-for="(item,index) in orderStylistInfo">
                        <div class="clear"></div>
                        <div class="mealContent">
                          <img :src="'/static/uploadFiles/'+item.stylist[0].stylistImage"/>
                          <p style="margin-top: 40px">
                            <span class="stylistName">{{item.stylist[0].stylistName}}</span><br />
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
  /*地址控件样式*/
  .area-selected-trigger{
    padding-top: 0!important;
  }
  .area-select.medium{
    height: 35px!important;
    width: 130px!important;
    border: 1px solid #5bc0de!important;
  }

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
  .rightBottomInformation .addContent1{
    height: 300px;
  }
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
  .rightBottomInformation #changeheadPortrait3{
    outline: none;
    background-color: #5bc0de;
    width: 80px;
    border: none;
    color: #FFFFFF;
    padding: 8px 12px 8px 8px;
    border-radius: 8px;
  }
  #upBtn2{
    display: inline-block;
    width: 100px;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    margin-left: 100px;
    border-radius: 8px;
    margin-right: 8px;
    padding-left: 5px;
  }
  .rightBottomInformation #updateContent1 p:first-child{
    margin-top: 100px;
  }
  .rightBottomInformation #updateContent1 p{
    width: 800px;
  }
 .rightBottomInformation #updateContent1 input:nth-child(4),.rightBottomInformation #updateContent1 input:nth-child(5){
    width: 250px;
  }
  .rightBottomInformation #updateContent1 span{
    margin-left: 50px;
  }
  .input1,.input4,.input5,.updateContent1 input{
    width: 250px;
    margin-right:-100px;
    border-radius: 5px;
    border: 1px solid #5bc0de!important;
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
    margin-top: 30px;
  }
  #submit:hover{
    outline: none;
    background-color: #FFFFFF;
    border: 1px solid #3ACA7A;
    color: #5bc0de;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 120px;
    margin-top: 30px;
  }
  /*套餐发布start*/
  #upBtn{
    display: inline-block;
    width: 100px;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    margin-left: 110px;
    border-radius: 8px;
    margin-right: 8px;
    padding-left: 5px;
  }
  .rightBottomCollect #changeheadPortrait1{
    outline: none;
    background-color: #5bc0de;
    width: 80px;
    border: none;
    color: #FFFFFF;
    padding: 8px 12px 25px 8px;
    border-radius: 8px;
  }
  .rightBottomCollect .updateContent1 p:first-child{
    margin-top: 100px;
  }
  .rightBottomCollect .updateContent1 p{
    width: 800px;
    margin-bottom: 50px;
  }
  .rightBottomCollect .updateContent1 input:nth-child(3),.rightBottomInformation .updateContent1 input:nth-child(4),.rightBottomInformation .updateContent1 input:nth-child(5){
    width: 250px;
  }
  .rightBottomCollect .updateContent1 span{
    margin-left: 50px;
  }
  .rightBottomCollect label {
    display: inline-block;
    /*margin-left: 0.5%;*/
    width: 11%;
    text-align: right;
    /*vertical-align: middle;*/
    margin-right: 5px;
  }
  #submit1{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 100px;
    margin-top: 30px;
  }
  /*套餐发布end*/
  /*套餐管理start*/
  .rightBottomSubscribe{
    width: 800px;
    height: 500px;
    background-color: #FFFFFF;
    margin-top: 20px;
    border-radius: 1%;
  }
  .rightBottomSubscribe .mealContent{
    width: 800px;
    height: 150px;
    border-bottom: 1px solid #999999;
    margin: 0 auto;
  }
  .rightBottomSubscribe img {
    float: left;
    width: 80px;
    height: 80px;
    margin: 40px 0 20px 100px;
  }
  .rightBottomSubscribe .mealContent p {
    float: left;
    width: 250px;
    margin: 20px 0 20px 20px;
  }
  .rightBottomSubscribe span {
    float: left;
    text-align: left;
  }
  .rightBottomSubscribe button.order {
    width: 100px;
    height: 45px;
    float: left;
    display: inline-block;
    margin-left: 50px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  .rightBottomSubscribe button#order {
    float: left;
    display: inline-block;
    margin-left: 80px;
    margin-top: 65px;
    color: #FFFFFF;
    background-color: #FF9800;
    border: none;
    border-radius: 5%;
    padding: 5px;
  }
  /*套餐管理中的套餐修改：*/
  #upBtn3{
    display: inline-block;
    width: 100px!important;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    margin-left: 20px;
    border-radius: 8px;
    margin-right: 8px;
    padding-left: 5px;
  }
  #changeheadPortrait4{
    outline: none;
    background-color: #5bc0de;
    width: 100px!important;
    border: none;
    color: #FFFFFF;
    padding: 8px 12px 28px 8px;
    border-radius: 8px;
  }
  #updateMeal{
    display: none;
  }
  #updateMeal .updateContent1 p:first-child{
    margin-top: 100px;
  }
  #updateMeal .updateContent1 p{
    width: 800px;
    margin-bottom: 50px;
  }
  #updateMeal .updateContent1 input:nth-child(3),.rightBottomInformation .updateContent1 input:nth-child(4),.rightBottomInformation .updateContent1 input:nth-child(5){
    width: 250px;
  }
  #updateMeal .updateContent1 span{
    margin-left: 50px;
  }
  #updateMeal label {
    display: inline-block;
    /*margin-left: 0.5%;*/
    width: 11%;
    text-align: right;
    /*vertical-align: middle;*/
    margin-right: 5px;
  }
  #updateMeal #submit3{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 360px;
    margin-top: 30px;
  }
  /*套餐管理end*/


  /*造型师发布start*/
  #upBtn1{
    display: inline-block;
    width: 100px;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    margin-left: 145px;
    border-radius: 8px;
    margin-right: 8px;
    padding-left: 5px;
  }
  .rightBottomMyfan #changeheadPortrait2{
    outline: none;
    background-color: #5bc0de;
    border: none;
    width: 80px;
    color: #FFFFFF;
    padding: 8px 12px 25px 8px;
    border-radius: 8px;
  }
  .rightBottomMyfan .updateContent1 p:first-child{
    margin-top: 100px;
  }
  .rightBottomMyfan .updateContent1 p{
    width: 800px;
    margin-bottom: 20px;
  }
  .rightBottomMyfan .updateContent1 input:nth-child(3),.rightBottomInformation .updateContent1 input:nth-child(4),.rightBottomInformation .updateContent1 input:nth-child(5){
    width: 250px;
  }
  .rightBottomMyfan .updateContent1 span{
    margin-left: 50px;
  }
  .rightBottomMyfan label {
    display: inline-block;
    /*margin-left: 0.5%;*/
    width: 18%;
    text-align: right;
    /*vertical-align: middle;*/
    margin-right: 5px;
  }
  #submit2{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 380px;
    margin-top: 30px;
  }
  /*造型师发布end*/
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
    margin: 40px 10px 20px 60px;
    border-radius: 50%;
  }
  .rightBottomOrder p {
    float: left;
    width: 350px;
    margin: 10px 0 0 10px;
  }
  .rightBottomOrder span {
    float: left;
  }
  .rightBottomOrder .orderNum {
    margin-left: 20px;
  }
  .rightBottomOrder button.order {
    width: 100px!important;
    height:50px!important;
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
  .rightBottomOrder button#order {
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
  /*造型师管理中的造型师修改：*/
  #upBtn4{
    display: inline-block;
    width: 100px!important;
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    margin-left: 70px;
    border-radius: 8px;
    margin-right: 8px;
    padding-left: 5px;
  }
  #changeheadPortrait5{
    outline: none;
    background-color: #5bc0de;
    width: 100px!important;
    border: none;
    color: #FFFFFF;
    padding: 8px 12px 28px 8px;
    border-radius: 8px;
  }
  #updatestylist{
    display: none;
  }
  #updatestylist .updateContent1 p:first-child{
    margin-top: 100px;
  }
  #updatestylist .updateContent1 p{
    width: 780px;
    margin-bottom: 50px;
    margin-right: 100px;
  }
  #updatestylist .updateContent1 input:nth-child(1),#updatestylist .updateContent1 input:nth-child(2){
    width: 250px;
  }
  #updatestylist .updateContent1 span{
    margin-left: 20px;
  }
  #updatestylist label {
    display: inline-block;
    /*margin-left: 0.5%;*/
    width: 18%;
    text-align: right;
    /*vertical-align: middle;*/
    margin-right: 5px;
  }
  #updatestylist .submit4{
    outline: none;
    background-color: #5bc0de;
    border: none;
    color: #FFFFFF;
    padding: 8px 50px;
    border-radius: 8px;
    margin-left: 380px;
    margin-top: 20px;
    text-align: center;
  }
  .demo-input {
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
  import { pca, pcaa } from 'area-data';
  export default {
    data(){
      return{
        data1:pcaa, /*地址控件*/
        styhouseName:'',
        styhousePwd:'',
        styhouseInfo:[],
        mealInfo:[],
        mealId:'',
        stylistInfo:[],
        stylistId:'',
        orderMealInfo:[],
        orderStylistInfo:[],

        selected:[],  /*地址控件*/
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
      this.showStyhouse();
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
          console.log(this.selected);
        });
      },
      checkLogin(){
        axios.get("/styhouses/checkLogin").then((response)=>{
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
        axios.post("/styhouses/logout").then((response)=>{
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
      showStyhouse(){
        var styhouseId=document.cookie.indexOf("styhouseId");
        if(styhouseId>-1){
          axios.get("/styhouses/showStyhouse").then((response)=>{
            let res=response.data;
            this.styhouseInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      editor2(){
        let hidden=document.getElementById('showInformation');
        hidden.style.display="none";
        let obj=document.getElementById('form');
        obj.style.display="block";
      },
      submitStyhouseImg(){
        var file=document.getElementById('changeHead3').files[0];
        let form_data =new FormData();
        form_data.append('image',file);
        axios.post('/upload/image_upload_styhouse',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          alert('上传成功！');
        })
      },
      updateStyhouse(){
        let hidden=document.getElementById('form');
        hidden.style.display="none";
        let obj=document.getElementById('showInformation');
        obj.style.display="block";

        let salonName=document.getElementById('salonName').value;
        let address=document.getElementById('address').value;
        let meal=document.getElementById('meal').value;
        let time=document.getElementById('time').value;
        let phone=document.getElementById('phone').value;
        let generalAddress=this.selected.join("-");
        if(salonName && address && meal && time && phone){
          axios.post("/styhouses/updateStyhouse",{
            styhouseName:salonName,
            generalAddress:generalAddress,
            specificAddress:address,
            openTime:time,
            mealIntro:meal,
            styhousePhone:phone
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              this.$store.commit("updateUserInfo",res.result);
              this.showStyhouse();
            }
          })
        }else{
          alert("修改失败，部分内容未输入，请输入完整");
        }
      },
      submitMealImg(){
        var file=document.getElementById('changeHead1').files[0];
        let form_data =new FormData();
        form_data.append('image',file);
        axios.post('/upload/image_upload_submitmeal',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          console.log(res.data);
          var pushMealImage=res.data.filename;
          var mealName=document.getElementById('mealName').value;
          var price=document.getElementById('price').value;
          var description=document.getElementById('description').value;
          axios.post("/styhouses/pushMeal",{
            mealName:mealName,
            mealImage:pushMealImage,
            mealPrice:price,
            mealIntro:description
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              alert("发布成功");
            }
          })
        })
      },
      pushMeal(){
        var pushMealImg=document.getElementById('input1').value;
        var mealName=document.getElementById('mealName').value;
        var price=document.getElementById('price').value;
        var description=document.getElementById('description').value;
        if(pushMealImg && mealName && price && description){
          this.submitMealImg(); /*先上传图片获得图片路径再存数据库*/
        }else{
          alert("发布失败，部分内容未输入，请输入完整");
        }
      },
      mealShow(){
        axios.get("/styhouses/showMeal").then((response)=>{
          let res=response.data;
          this.mealInfo=res.result;
        })
        let hidden=document.getElementById('updateMeal');
        hidden.style.display="none";
        let obj=document.getElementById('showMeal');
        obj.style.display="block";
      },
      updateMealShow(mealId){
        let hidden=document.getElementById('showMeal');
        hidden.style.display="none";
        let obj=document.getElementById('updateMeal');
        obj.style.display="block";
        this.mealId=mealId;
      },
      updateMealImg(){
        var file=document.getElementById('changeHead4').files[0];
        var mealId=this.mealId;
        let form_data =new FormData();
        form_data.append('image',file);
        form_data.append('mealId',mealId);
        axios.post('/upload/image_upload_updatemeal',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          alert('上传成功！');
          this.mealShow();
        })
      },
      updateMeal(){
        let hidden=document.getElementById('updateMeal');
        hidden.style.display="none";
        let obj=document.getElementById('showMeal');
        obj.style.display="block";

        var mealName=document.getElementById('changemealName').value;
        var price=document.getElementById('changeprice').value;
        var description=document.getElementById('changedescription').value;
        if(mealName && price && description){
          axios.post("/styhouses/updateMeal",{
            mealId:this.mealId,
            mealName:mealName,
            mealPrice:price,
            mealIntro:description
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              this.mealShow();
            }
          })
        }else{
          alert("修改失败，部分内容未输入，请输入完整");
        }
      },
      mealDel(mealId){
        axios.post("/styhouses/delMeal",{
          mealId:mealId
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.mealShow();
          }
        })
      },

      submitStylistImg(){
        var file=document.getElementById('changeHead2').files[0];
        var stylistId=this.stylistId;
        let form_data =new FormData();
        form_data.append('image',file);
        form_data.append('stylistId',stylistId);
        axios.post('/upload/image_upload_updatestylist',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          alert("上传成功");
        })
      },
      pushStylist(){
        var pushStylistImg=document.getElementById('input2').value;
        var stylistId=document.getElementById('stylistId').value;
        var stylistName=document.getElementById('stylistName').value;
        let maxOrderNum=document.getElementById('ordertime').value;
        let canOrderTime=document.getElementById('test1').value;
        var stylistDescription=document.getElementById('changestyscription2').value;
        if(pushStylistImg && stylistId && stylistName && maxOrderNum && canOrderTime && stylistDescription){
          axios.post("/styhouses/submitStylist",{
            stylistId:stylistId,
            stylistName:stylistName,
            maxOrderNum:maxOrderNum,
            canOrderTime:canOrderTime,
            stylistDescription:stylistDescription
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              alert("发布成功");
              this.stylistId=stylistId;
              this.submitStylistImg(); /*先上传图片获得图片路径再存数据库*/
            }else if(res.status=="1003"){
              alert("此造型师在造型屋已绑定，请到造型师管理去修改造型师");
            }else if(res.status=="1004"){
              alert("发布失败，此造型师Id没有注册");
            }
          });
        }else{
          alert("发布失败，部分内容未输入，请输入完整");
        }
      },
      stylistShow(){
        axios.get("/styhouses/showStylist").then((response)=>{
          let res=response.data;
          console.log(res.result);
          this.stylistInfo=res.result;
        });
        let hidden=document.getElementById('updatestylist');
        hidden.style.display="none";
        let obj=document.getElementById('showstylist');
        obj.style.display="block";
      },
      updateStylistShow(stylistId){
        let hidden=document.getElementById('showstylist');
        hidden.style.display="none";
        let obj=document.getElementById('updatestylist');
        obj.style.display="block";
        this.stylistId=stylistId;
      },
      updateStylistImg(){
        var file=document.getElementById('changeHead5').files[0];
        var stylistId=this.stylistId;
        let form_data =new FormData();
        form_data.append('image',file);
        form_data.append('stylistId',stylistId);
        axios.post('/upload/image_upload_updatemeal',form_data,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res)=>{
          alert('上传成功！');
          this.stylistShow();
        })
      },
      updateStylist(){
        let hidden=document.getElementById('updatestylist');
        hidden.style.display="none";
        let obj=document.getElementById('showstylist');
        obj.style.display="block";

        let stylistName=document.getElementById('changestylistName').value;
        let maxOrderNum=document.getElementById('changeordertime').value;
        let stylistDescription=document.getElementById('changestyscription').value;
        let canOrderTime=document.getElementById('test2').value;
        if(stylistName && maxOrderNum && stylistDescription && canOrderTime){
          axios.post("/styhouses/updateStylist",{
            stylistId:this.stylistId,
            stylistName:stylistName,
            maxOrderNum:maxOrderNum,
            canOrderTime:canOrderTime,
            stylistDescription:stylistDescription
          }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
              this.stylistShow();
            }
          });
        }else{
          alert("修改失败，部分内容未输入，请输入完整");
        }
      },
      stylistDel(stylistId){
        axios.post("/styhouses/delStylist",{
          stylistId:stylistId
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.stylistShow();
          }
        })
      },
      showOrderMeal(){
        var styhouseId=document.cookie.indexOf("styhouseId");
        if(styhouseId>-1){
          axios.get("/styhouses/showOrderMeal").then((response)=>{
            let res=response.data;
            this.orderMealInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      showOrderStylist(){
        var styhouseId=document.cookie.indexOf("styhouseId");
        if(styhouseId>-1){
          axios.get("/styhouses/showOrderStylist").then((response)=>{
            let res=response.data;
            this.orderStylistInfo=res.result;
          })
        }else{
          this.$router.push({
            path:"/"
          });
        }
      },
      delOrder(orderId){
        axios.post("/styhouses/delOrder",{
          orderId:orderId
        }).then((response)=>{
          let res=response.data;
          if(res.status=="0"){
            this.showOrderStylist();
            this.showOrderMeal();
          }
        })
      }

    }
/*    watch:{
      'tab':function(){
        this.$nextTick(function(){
          $(function(){
            /!*左侧导航栏start*!/
            $('.verticalNav .right').first().show();

            $('.verticalNav .box2>ul>li').click(function(){
              $(this).addClass('active');
              $('.verticalNav .box2>ul>li').not($(this)).removeClass('active');

              idx = $(this).index('.verticalNav .box2>ul>li');
              $('.verticalNav .right:eq(idx)').show();
              $('.verticalNav .right').not($('.verticalNav .right:eq(idx)')).hide();
            });
          })
        })
      }
    }*/
  }
</script>
