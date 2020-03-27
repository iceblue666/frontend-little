<template>
  <div class="photo-detail">
    <Navbar title="图文详情" /></Navbar>
    <div class="photo-little">
      <p>{{imgInfo.title}}</p>
      <span>发起日期:{{imgInfo.add_time | converTime('YYYY-MM-DD')}}</span>
      <span>{{imgInfo.click}}次浏览</span>
      <span>分类:民生经济</span>

        <!-- <ul>
            <li v-for="(thumImg,index) in thumImgs" :key="index">
                <a href="javascript:void(0)">
                    <img :src="thumImg.src" alt=""/>
                </a>
            </li>
        </ul> -->

        <vue-preview :slides="thumImgs"></vue-preview>

      <div class="photo-desc">
        <p>{{imgInfo.content}}</p>
      </div>

      <Comment :cid = '$route.query.id' />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoDetail",
  data() {
    return {
        imgInfo:{},
        thumImgs:[]
    };
  },
  created() {

      let id = this.$route.query.id;
    var getImageInfo = ()=> {
      return this.$axios.get("api/getimageinfo/"+id);
    }

    var getThumImages = ()=> { // 如果使用普通函数，this为undefined
      return this.$axios.get("api/getthumimages/"+id);
    }
    this.$axios.all([getImageInfo(), getThumImages()]).then(
      this.$axios.spread((acct, perms)=> {
        // 两个请求现在都执行完成
        console.log(acct);
        console.log(perms);
        this.imgInfo = acct.data.data;
        this.thumImgs = perms.data.data;

        this.thumImgs.forEach((item, index)=>{
          item.w = 600;
          item.h = 400;
          item.msrc = item.src;
        })
      })
    );

  }
};
</script>

<style scoped>
.photo-detail{
    width: 100%;
    margin-bottom: 60px;
}
.photo-little p {
  font-size: 20px;
  font-weight: 600;
  color: #0f80ff;
  margin: 15px 0;
}
.photo-little span {
  padding: 10px 5px;
}
.photo-desc p {
  font-size: 18px;
  color: #333333;
}
</style>