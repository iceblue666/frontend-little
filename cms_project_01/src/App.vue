<template>
  <div id="app">
    <!--顶部栏 区域-->
    <mt-header fixed title="信息管理">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!--路由组件 出口-->
    <router-view/>

    <!--底部栏 区域-->
    <div class="tabBar">
      <ul>
        <li v-for="(tab, index) in tabs" :key="tab.id">
          <router-link :to="tab.routerName" @click.native="changeHash(index)" :class='{"link-active":index === currentIndex}'>
            <img :src="tab.imgSrc">
            <mt-badge size="small" color="#FC0107" v-if="index === 2">{{CartNum}}</mt-badge>
            <p>{{tab.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- <mt-tabbar v-model="selected" :fixed = true>
      <mt-tab-item id="Home">
        <img slot="icon" src="./assets/shouye.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="Vip">
        <img slot="icon" src="./assets/huangguan.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="Cart">
        <img slot="icon" src="./assets/goumai.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="Search">
        <img slot="icon" src="./assets/chazhao.png">
        查找
      </mt-tab-item>
    </mt-tabbar>-->
  </div>
</template>

<script>
import index from "./assets/shouye.png";
import vip from "./assets/huangguan.png";
import shopcart from "./assets/goumai.png";
import search from "./assets/chazhao.png";
import GoodsTool from '@/GoodsTool'
let tabs = [
  { id: 1, title: "首页", imgSrc: index, routerName: { name: 'home' } },
  { id: 2, title: "会员", imgSrc: vip, routerName: { name: 'vip' } },
  { id: 3, title: "购物车", imgSrc: shopcart, routerName: { name: 'cart' } },
  { id: 4, title: "查找", imgSrc: search, routerName: { name: 'search' } }
];

export default {
  name: "App",
  data() {
    return {
      selected: "",
      tabs: tabs,
      currentIndex:0,
      CartNum:0
    };
  },
  methods:{
    changeHash(index){
      this.currentIndex = index;
    }
  },
  watch: {
    selected: function(newV, oldV) {
      console.log(newV);

      this.$router.push({ name: this.selected });
    }
  },
  created(){
    this.$bus.$on('sendPickNum', (data)=>{
      this.CartNum += data;
    })

    this.CartNum = GoodsTool.getTotalCount();
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.tabBar {
  width: 100%;
  height: 55px;
  background: #CCC;
  position: fixed;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  background-color: #fafafa;
  z-index: 10;
}
.tabBar ul{
  width: 100%;
  overflow: hidden;
}
.tabBar ul li{
  float: left;
  width: 25%;
  height: 55px;
  text-align: center;
}
.tabBar ul li a{
  display: inline-block;
  width:100%;
  padding-top: 10px;
  position: relative;
}
.tabBar ul li a.link-active{
  background-color: #04c2c8;
}
.tabBar ul li p{
  font-size: 12px;
}
.tabBar ul li a img{
  width:25px;
}
.mint-badge.is-size-small{
  position: absolute;
  top:0;
  right: 10px;
}
</style>
