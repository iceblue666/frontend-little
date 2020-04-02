<template>
    <div>
        <div class="page-loadmore">
            <div class="page-loadmore-wrapper">
                <ul class="page-loadmore-list">
                    <li v-for="(goods, index) in goodsList" :key="goods.id">
                        <a href="javascript:void(0)">
                            <img :src="goods.img_url" alt="">
                            <div class="title">{{goods.title}}</div>
                            <div class="desc">
                                <div class="sell">
                                    <span>${{goods.sell_price}}</span>
                                    <s>${{goods.market_price}}</s>
                                </div>
                                <div class="detail">
                                    <div class="hot">热卖中</div>
                                </div>
                                <div class="count">
                                    剩余{{goods.stock_quantity}}件
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoodsList',
        data(){
            return{
                page:this.$route.params.page,
                goodsList:[]
            }
        },
        created() {
            this.$axios.get(`/api/getgoods/?pageindex=${this.page}`)
            .then(res=>{
                console.log(res);
                this.goodsList = res.data.messages;
            })
            .catch(err=>{
                console.log('商品列表获取失败',err);
            })
        },
    }
</script>

<style scoped>
.page-loadmore-list{
    overflow: hidden;
    height: 100%;
    margin-bottom: 80px;
}

.page-loadmore-list li{
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

.sell > span{
    float: left;
    color: red;
    text-align: left;
}

.deatil > .hot{
    float: left;
    text-align: left;
    font-size: 15px;
}

.deatil > .count{
    float: right;
    text-align: right;
    font-size: 15px;
}

.detail{
    overflow: hidden;
}

.desc{
    color: rgba(92,92,92,.8);
    background-color: rgba(0,0,0,.2);
}

img{
    height: 200px;
}

.page-loadmore-listitem{
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.page-loadmore-listitem:first-child{
    border-top: 1px solid #eee;
}

.page-loadmore-wrapper{
    overflow: scroll;
}

.mint-loadmore-bottom span{
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate{
    transform: rotate(180deg);
}

</style>