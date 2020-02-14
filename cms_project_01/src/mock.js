const Mock = require('mockjs');

const Random = Mock.Random;

const imgcategoryList = [{title:'明星美女'},{title:'空间设计'},{title:'户型装修'},{title:'广告摄影'},{title:'摄影技术'},{title:'拍摄手法'}]

const produceNewData = function () {
    let newArticleObject = {
        id:1,
        img_url: Random.dataImage('100x100','mock图片'),
        title: Random.csentence(5, 30),
        summary: Random.csentence(10,30),
        click: Random.natural(10,1000),
        time:Random.date() + ' ' + Random.time(),
        add_time:Random.date() + ' ' + Random.time(),
        content:Random.cparagraph( 50, 200)
    }
    return {
        data:newArticleObject
    }
} 

const produceNewsData = function () {
    let articles = [];
    for(let i = 1; i <= 15; i++){
        let newArticleObject = {
            id:i,
            img_url: Random.dataImage('100x100','mock图片'),
            title: Random.csentence(5, 30),
            summary: Random.csentence(10,30),
            click: Random.natural(10,1000),
            time:Random.date() + ' ' + Random.time(),
            add_time:Random.date() + ' ' + Random.time(),
            content:Random.cparagraph( 50, 200)
        }
        articles.push(newArticleObject);
    }
    return {
        data:articles
    }
}

const produceHomeData = function () {
    let Images = [];
    for(let i = 0; i < 3; i++){
        let newHomeObject = {
            img_url: Random.dataImage('375x250','mock图片'),
        }
        Images.push(newHomeObject);
    }
    return {
        data:Images
    }
}



Mock.mock('api/newslist','get',produceNewsData);
Mock.mock('api/home','get',produceHomeData);
Mock.mock(/api\/getnew\/./,'get',produceNewData);
Mock.mock('api/getimgcategory','get',{message:imgcategoryList})