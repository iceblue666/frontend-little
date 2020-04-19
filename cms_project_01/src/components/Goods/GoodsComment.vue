<template>
    <div>
        <Navbar title='商品评论' />
        <Comment :cid='$route.query.id' />
    </div>
</template>

<script>
    export default {
        name:"GoodsComment",
        created(){
            window.scrollTo(0,0);
        }
    }
</script>

<style scoped>

</style>