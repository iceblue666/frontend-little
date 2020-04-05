<template>
  <div>
    <Navbar title="商品列表"></Navbar>
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore
          :bottom-method="loadBottom"
          @bottom-status-change="handleBottomChange"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
          :auto-fill="autoFill"
        >
          <ul class="page-loadmore-list">
            <li v-for="(goods, index) in goodsList">
              <router-link :to='{name:"goods.detail",params:{id:goods.id}}'>
                <img :src="goods.img_url" alt />
                <div class="title">{{goods.title|controllShow(10)}}</div>
                <div class="desc">
                  <div class="sell">
                    <span>${{goods.sell_price}}</span>
                    <s>${{goods.market_price}}</s>
                  </div>
                  <div class="detail">
                    <div class="hot">热卖中</div>
                  </div>
                  <div class="count">剩余{{goods.stock_quantity}}件</div>
                </div>
              </router-link>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      page: this.$route.params.page,
      goodsList: [],
      allLoaded: false,
      wrapperHeight: 0,
      autoFill: false
    };
  },
  methods: {
    // 上拉加载事件
    loadBottom() {
      console.log("上拉");
      this.loadGoodsByPage();

      this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      console.log(status);
    },
    loadGoodsByPage() {
      this.$axios
        .get(`/api/getgoods/?pageindex=${this.page}`)
        .then(res => {
          // 小于6条数据代表数据加载完了
          if (res.data.messages.length < 6) {
            this.$toast("没有数据额");
            this.allLoaded = true;
          }
          if (this.page == 1) {
            this.goodsList = res.data.messages;
          } else {
            this.goodsList = this.goodsList.concat(res.data.messages);
          }
          this.page++;
        })
        .catch(err => {
          console.log("商品列表获取失败", err);
        });
    }
  },
  created() {
    this.loadGoodsByPage();
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>

<style scoped>
.page-loadmore-list {
  overflow: hidden;
  height: 100%;
  margin-bottom: 80px;
}

.page-loadmore-list li {
  width: 50%;
  float: left;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #ccc;
  /* box-shadow: 0 0 4px #666; */
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.deatil > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.deatil > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}

.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}

.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  transition: 0.2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate {
  transform: rotate(180deg);
}
</style>