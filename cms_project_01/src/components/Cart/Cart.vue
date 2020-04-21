<template>
    <div>
        <div class="pay-detail">
            <ul>
                <li class="p-list">
                    <mt-switch></mt-switch>
                    <img src="" alt="" srcset="">
                    <div class="pay-calc">
                        <p>商品标题</p>
                        <div class="calc">
                            <span>$777</span>
                            <span>-</span>
                            <span>1</span>
                            <span>+</span>
                            <a href="">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计（不含运费）：</p>
                <span>已经选择商品1件，总价$888</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Cart'
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