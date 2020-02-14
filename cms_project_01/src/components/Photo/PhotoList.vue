<template>
  <div class="photoList">
    <div class="category-list">
      <ul>
        <li v-for="(category,index) in categoryList">
            <a href="">{{category.title}}</a>
        </li>
      </ul>
    </div>

    <!-- 图片展示区域 -->
    <div class="photo-list">
      <ul>
        <li v-for="(item,index) in imgList" :key="item.id">
          <a href>
            <img src alt />
          </a>
          <p>
            <span>图片标题</span>
            <br />
            <span>图片摘要</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoList",
  data() {
    return {
      categoryList:[],
      imgList:[]
    };
  },
  created(){
      this.$axios.get('api/getimgcategory')
      .then( res=>{
          console.log(res);
          this.categoryList = res.data.message;
          console.log(res.data.message);
      })
      .catch(err=>{
          console.log('分类信息错误',err);
      })
      
  }
};
</script>

<style scoped>
.category-list {
  width: 100%;
  height: 40px;
  overflow: hidden;
}
.category-list ul {
  width: 100%;
  height: 50px;
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
}
.category-list ul li {
  display: inline-block;
  width: 25%;
  height: 100%;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}
.category-list ul li a{
    text-decoration: none;
    font-size: 16px;
}
.category-list ul li a.active{
    color: #FC0280;
}
.photo-list ul li{
    width: 100%;
    position: relative;
}
.photo-list ul li a{
    display:block;
    width: 100%;
}
.photo-list ul li a img{
    width: 100%;
}
.photo-list ul li p {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px 0;
}
.photo-list ul li p span {
  color: #e6e6e6;
  font-size: 16px;
}
.photoList {
  padding-bottom: 100px;
}
image[lazy="laoding"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.icon-meiyoutupian {
  width: 50px;
  height: 50px;
}
</style>