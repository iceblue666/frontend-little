<template>
  <div class="detail">
    <Navbar title="商品详情"></Navbar>
    <div class="outer-swiper">
      <MySwiper url="api/getlunbo" myHeight="250px"></MySwiper>
    </div>
    <div class="product-desc">
      <ul>
        <li>
          <span>商品标题</span>
        </li>
        <li class="price-li">
          市场价:
          <s>$9999</s>销售价:
          <span style="font-size:18px;">$5</span>
        </li>
        <li class="number-li">
          购买数量：
          <span @click="substract">-</span>
          <span>{{picknumber}}</span>
          <span @click="add">+</span>
        </li>
        <li>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="ballHandle">加入购物车</mt-button>
        </li>
      </ul>
    </div>
    <transition @after-enter="ballAfterEnter" name="ball">
      <div class="ball" v-if="isExist"></div>
    </transition>
    <div class="product-props">
      <ul>
        <li>商品参数</li>
        <li>商品货号：11111123</li>
        <li>库存情况：999件</li>
        <li>上架时间：2015-03-23</li>
      </ul>
    </div>
    <div class="product-info">
      <ul>
        <li>
          <mt-button type="primary" size="large" plain @click.native="showPhotoInfo">图文介绍</mt-button>
        </li>
        <li>
          <mt-button type="danger" size="large" plain @click.native="shopComment">商品评论</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GoodsTool from '@/GoodsTool'
export default {
  name: "GoodsDetail",
  data() {
    return {
      picknumber: 1,
      isExist: false
    };
  },
  created() {},
  methods: {
    shopComment() {
      this.$router.push({
        name: "goods.comment",
        query: {
          id: this.$route.params.id
        }
      });
    },
    showPhotoInfo() {
      this.$router.push({
        name: "photo.info",
        query: {
          id: this.$route.params.id
        }
      });
    },
    substract() {
      if (this.picknumber === 1) return;

      this.picknumber--;
    },
    add() {
      this.picknumber++;
    },
    ballHandle() {
      this.isExist = true;
    },
    ballAfterEnter() {
      this.isExist = false;
      this.$bus.$emit("sendPickNum", this.picknumber);

      GoodsTool.add({
        id:1,
        num:this.picknumber
      })
    }
  }
};
</script>

<style scoped>
.detail {
  margin-bottom: 100px;
}

.ball-enter-active {
  animation: bonuce-in 1s;
}

.ball-leave {
  opacity: 0;
}

@keyframes bonuce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}

.swiper {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  border-radius: 15px;
}

.outer-swiper,
.product-desc,
.product-info,
.product-props {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 3px;
}

.outer-swiper ul,
.product-desc ul,
.product-info ul,
.product-props ul {
  padding: 0;
}

.product-desc ul li,
.product-info ul li,
.product-props ul li {
  list-style: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}

.product-desc ul > :nth-child(1) span {
  color: blue;
  font-size: 18px;
  font-weight: bold;
}

.product-desc ul > :nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
  padding-left: 10px;
}

.price-li span {
  color: red;
  font-size: 25px;
}

.price-li s {
  margin-right: 16px;
}

.number-li span {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
}

.product-props ul > :nth-child(1) {
  text-align: left;
}

.product-props ul:not(:nth-child(1)) {
  margin-left: 40px;
}

.product-info ul {
  margin-bottom: 70px;
  padding: 0 5px;
}

.number-li span {
  text-align: center;
}

.number-li > :nth-child(2) {
  width: 40px;
}

.ball {
  border-radius: 50%;
  background-color: red;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 440px;
  left: 120px;
  display: inline-block;
  z-index: 9999;
}
</style>