require.config({
    baseUrl:"js",
    paths:{
        "jquery":["https://cdn.bootcss.com/jquery/3.5.0/jquery.js"]
    }
})

require(["jquery"],function($){
    console.log('首页');
    $('body').append("牛啊")
})