<template>
    <div>
        <Navbar title="购物车"></Navbar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(shop,index) in shopCart" :key="shop.id">
                    <mt-switch></mt-switch>
                    <img src="" alt="" srcset="">
                    <div class="pay-calc">
                        <p>{{shop.title}}</p>
                        <div class="calc">
                            <span>${{shop.sell_price}}</span>
                            <span @click="substract(shop)">-</span>
                            <span>{{shop.count}}</span>
                            <span @click="add(shop)">+</span>
                            <a href="">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计（不含运费）：</p>
                <span>已经选择商品{{payment.count}}件，总价${{payment.total}}</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import GoodsTool from '@/GoodsTool'
    export default {
        name: 'Cart',
        data(){
            return{
                shopCart:[]
            }
        },
        computed: {
            payment(){
                let total = 0;
                let count = 0;
                this.shopCart.forEach((shop)=>{
                    count += shop.count;
                    total += shop.count*shop.sell_price;
                })
                return{
                    total,count
                }
            }
        },
        beforeRouteLeave (to, from, next) {
            // let res = confirm("确定离开吗？")
            // if(res){
            //     alert("成功保存");
            //     next();
            // }
            // else{
            //     next(false)
            // }
        },
        created() {
            this.shopCart.push({"count":GoodsTool.getTotalCount(),"id":1,"title":"三星手机 我们不生产手机，我们只是炸弹的搬运工","sell_price":3888})
        },
        methods: {
            substract(shop){
                shop.count--;
                console.log(this.shopCart);
            },
            add(shop){
                shop.count++;
                console.log(this.shopCart);
            }
        },
    }
</script>

<style scoped>
.pay-detail ul li{
    list-style: none;
    border-bottom: 1px solid rgba(0,0,0,.2);
    margin-bottom: 3px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3){
    display: inline-block;
}

.pay-calc p{
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1){
    line-height: 80px;
}

.pay-detail ul{
    padding-left: 5px;
    margin-top: 5px;
}

.calc:nth-child(1){
    color:red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)){
    border: 1px solid rgba(0,0,0,.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a{
    margin-left: 20px;
}

.show-1,
.show-2{
    display: inline-block;
    margin-left: 30px;
}

.show-price{
    background-color: rgba(0,0,0,.2);
}
</style>