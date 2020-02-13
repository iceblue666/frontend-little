<template>
    <div class="header">
        <h3 @click="goBack" class="back"><</h3>
        <h3 class="desc_title">
            {{title}}
        </h3>
    </div>
</template>

<script>
export default {
    name:'Navbar',
    props:['title'],
    data(){
        return {

        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="css" scoped>

</style>