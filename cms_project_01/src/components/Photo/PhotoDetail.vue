<template>
  <div>
    <div class="photo-little">
      <p>图片标题</p>
      <span>发起日期:2017-07-09</span>
      <span>0次浏览</span>
      <span>分类:民生经济</span>

      <div class="photo-desc">
        <p></p>
      </div>

      <!-- <Comment :cid = '$route.query.id' /> -->
    </div>
  </div>
</template>

<script>
export default {
    name:'PhotoDetail',
    data(){
        return{

        }
    }
};
</script>

<style scoped>
.photo-little p{
    font-size: 20px;
    font-weight: 600;
    color: #0F80FF;
    margin: 15px 0;
}
.photo-little span{
    padding: 10px 5px;
}
.photo-desc p{
    font-size: 18px;
    color: #333333;
}

</style>