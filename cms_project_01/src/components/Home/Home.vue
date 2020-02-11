<template>
  <div id="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" class="swiper-fa">
      <mt-swipe-item v-for="(item, index) in imgs" :key="index" class="swiper">
        <img :src="item.img_url" alt />>
      </mt-swipe-item>
    </mt-swipe>
    <!--/ 轮播图 -->
    <!-- 九宫格 -->
    <div class="list">
      <ul>
        <li v-for="(grid, index) in grids" :key="grid.id">
          <router-link :to="grid.router">
            <img :src="grid.src" :alt="grid.title">
          </router-link>
          <p>{{grid.title}}</p>
        </li>
      </ul>
    </div>
    <!-- /九宫格 -->
  </div>
</template>

<script>
import src1 from "../../assets/logo.png";

var grids = [
  { id: 1, src: src1, title: "新闻资讯", router:{name:'news.list'}},
  { id: 2, src: src1, title: "图文分享", router:{name:'news.list'} },
  { id: 3, src: src1, title: "商品展示", router:{name:'news.list'} },
  { id: 4, src: src1, title: "资讯", router:{name:'news.list'} },
  { id: 5, src: src1, title: "留言反馈", router:{name:'news.list'} },
  { id: 6, src: src1, title: "联系我们", router:{name:'news.list'} }

];

export default {
  name: "Home",
  data() {
    return {
      imgs: [],
      grids:grids
    };
  },
  created() {
    this.$axios
      .get("api/home")
      .then(res => {
        // console.log(res);
        this.imgs = res.data.data;
        // console.log(this.imgs);
      })
      .catch(err => {
        console.log("轮播图异常", err);
      });
  }
};
</script>

<style lang="css" scoped>
.swiper-fa{
  height:250px;
}
.swiper {
  width: 100%;
  height: 250px;
}
.list {
  width: 100%;
  height: 100%;
}
.list ul {
  display: flex;
  flex-wrap: wrap;
}
.list ul li {
  width: 33%;
  height: 100px;
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
}
.list ul li a {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
.list ul li a img {
  width: 50px;
}
</style>