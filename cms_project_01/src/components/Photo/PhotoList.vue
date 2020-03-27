<template>
  <div class="photoList">
    <Navbar title="图文列表" /></Navbar>
    <div class="category-list">
      <ul>
        <li v-for="(category,index) in categoryList" @click="categoryHandler(category.id,index)">
            <a href="javascript:void(0);" :class='{active:index == currentIndex}'>{{category.title}}</a>
        </li>
      </ul>
    </div>

    <!-- 图片展示区域 -->
    <div class="photo-list">
      <ul>
        <li v-for="(item,index) in imgList" :key="item.id">
          <router-link :to='{name:"photo.detail",query:{id:item.id}}'>
            <img v-lazy="item.img_url"  />
          </router-link>
          <p>
            <span>{{item.title}}</span>
            <br />
            <span>{{item.zhaiyao}}</span>
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
      imgList:[],
      currentIndex:0
    };
  },
  methods:{
    categoryHandler(id, index){
        // console.log(id);
        this.$router.push({name:"photo.list",params:{categoryId:id}});
        this.currentIndex = index;
    },
    loadImgByCategoryId(id){
        this.$axios.get('api/getimages/'+id)
        .then(res=>{
          // console.log(res.data);
          this.imgList = res.data.data;

          if(this.imgList.length === 0){
            this.$toast({
              message:"没有图片",
              iconClass:'fa fa-times',
              duration:2000
            })
          }
        })
        .catch(err=>{
          console.log("图片加载失败",err);
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
    // 通过 `vm` 访问组件实例
    vm.loadImgByCategoryId(to.params.categoryId);
    vm.currentIndex = to.params.categoryId;
  })
  },
  beforeRouteUpdate (to,from,next){
    // console.log(to.params.categoryId);
    this.loadImgByCategoryId(to.params.categoryId);

    next();
  },
  created(){
      // this.loadImgByCategoryId(0);

      this.$axios.get('api/getimgcategory')
      .then( res=>{
          // console.log(res);
          this.categoryList = res.data.message;
          this.categoryList.unshift({"id":0,"title":"全部"});
          // console.log(res.data.message);
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
  /* height: 50px; */
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