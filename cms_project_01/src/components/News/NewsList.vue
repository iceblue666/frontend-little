<template>
  <div class="news">
    <Navbar title="新闻列表"></Navbar>
    <div class="newsList">
      <ul>
        <li v-for="(news, index) in newsList" :key="news.id">
          <router-link :to='{name:"detail",query:{id:news.id}}'>
            <div class="news_img">
              <img :src="news.img_url">
            </div>
            <div class="content">
              <p class="title">{{news.title}}</p>
              <div class="news_desc">
                <p class="summary">{{news.summary}}</p>
                <p>
                  <span class="praise">点赞数:{{news.click}}</span>
                  <span class="time">发表时间:{{news.time | converTime('YYYY-MM-DD')}}</span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.$axios
      .get("api/newslist")
      .then(res => {
        console.log(res.data.data);
        this.newsList = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #111111;
}
.news {
  width: 100%;
  padding-bottom: 55px;
}
.news .newsList {
  width: 100%;
  border-bottom: 1px solid #CCCCCC;
  font-size: 12px;
}
.news .newsList ul {
  display: flex;
  flex-wrap: wrap;
}
.news .newsList ul li {
    width: 100%;
  height: 100px;
  font-size: 14px;
  margin: 10px 2px;
  
}
.news .newsList ul li a {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
}
.news .newsList ul li a .news_img {
  width: 30%;
  
}
.content {
  width: 65%;
  margin-left: 5%;
}
.content .title {
  font-weight: 600;
  margin-bottom: 10px;
}
.summary {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.news_desc p {
  font-size: 12px;
}
.praise {
  position: absolute;
  bottom: 0;
}
.time {
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>