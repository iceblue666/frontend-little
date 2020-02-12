<template>
  <div class="news">
    <div class="newsList">
      <ul>
        <li v-for="(news, index) in newsList" :key="news.id">
          <a href="#">
            <div class="news_img">
              <img :src="news.img_url">
            </div>
            <div class="content">
              <p class="title">{{news.title}}</p>
              <div class="news_desc">
                <p class="summary">{{news.summary}}</p>
                <p>
                  <span class="praise">点赞数:{{news.click}}</span>
                  <span class="time">发表时间:{{news.time}}</span>
                </p>
              </div>
            </div>
          </a>
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
  color: rgb(0, 0, 0);
}
.news {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 55px;
}
.news .newsList {
  width: 100%;
  border-bottom: 1px solid #CCCCCC;
  font-size: 12px;
}

.news .newsList ul li {
    position: relative;
  
}
.news .newsList ul li a {
  display: block;
  width: 100%;
  height: 150px;
  color: #808080;
  display: flex;
  text-decoration: none;
}
.news .newsList ul li a .news_img {
  width: 30%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.news .newsList ul li a img{
  width: 100px;
  height: 80px;
  background-color: red;
  border-radius: 3px;

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
  right: 0;
}
</style>