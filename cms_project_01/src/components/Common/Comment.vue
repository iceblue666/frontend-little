<template>
    <div class="tmp1">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a>返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="50" rows="10" v-model="commentContent"></textarea>
                </li>
                <li>
                    <mt-button type='primary' size='large' @click="commentHandler">评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment, index) in comments">
                    {{comment.user_name}}:{{comment.content}} {{comment.add_time | relativeTime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" @click="loadMore">加载更多</mt-button>
        </div>

    </div>
</template>

<script>
    export default {
        name:'Comment',
        props:['cid'],
        data(){
            return{
                comments:[],
                page:1,
                commentContent:''
            }
        },
        methods:{
            // 加载更多评论
            loadMore(){
                if(this.page === 1){
                    this.comments = [];
                }
                this.$axios.get(`api/getcomments/${this.cid}?pageindex=${this.page}`)
                .then(res => {
                    console.log(res.data);
                    if(res.data.messages.length === 0){
                        this.$toast('没有数据');
                    }

                    this.comments.push(...res.data.messages);
                    this.page++;
                })
                .catch(err => {
                    console.log('获取评论分页数据失败', err);
                })
            },
            // 发表评论
            commentHandler(){

                this.$axios.post(`api/postcomment/${this.cid}`, this.commentContent)
                .then(res => {
                    console.log(res);
                    this.$toast(res.data.messages);

                    this.commentContent = '';
                    this.page = 1;
                    this.loadMore();
                })
                .catch(err => {
                    console.log('发表评论失败',err);
                })
            }
        },
        created(){

            this.page = this.$route.query.page || '1';
            this.loadMore();

        }
    }
</script>

<style scoped>
.tmp1{
    margin-bottom: 100px;
}

.photo-comment > div span:nth-child(1){
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2){
    float: right;
}

.photo-comment{
    height: 30px;
    border-bottom: 1px solid rgba(0,0,0,.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment{
    padding: 5 5;
}

.txt-comment textarea{
    margin-right: 5px;
}

.comment-list li{
    border-bottom: 1px solid rgba(0,0,0,.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li{
    list-style: none;
}

ul{
    margin: 0;
    padding: 0;
}

textarea {
    width: 98%;
    margin-left: 1%;
}
</style>