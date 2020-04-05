<template>
    <mt-swipe :auto="4000" :style="{height:myHeight}">
        <mt-swipe-item v-for="(item,index) in imgs" class="swiper">
            <img :src="item.img_url || item.src" alt="" :style="{height:myHeight}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        name:"MySwiper",
        data(){
            return{
                imgs:[]
            }
        },
        props:['url','myHeight'],
        created(){
            this.$axios.get(this.url)
            .then(res=>{
                // console.log(res);
                this.imgs = res.data.messages;
            })
            .catch(err=>{
                console.log("轮播图异常", err);
            })
        }
    }
</script>

<style scoped>

</style>