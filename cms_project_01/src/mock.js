const Mock = require('mockjs');

const Random = Mock.Random;

const produceNewsData = function () {
    let articles = [];
    for(let i = 0; i < 15; i++){
        let newArticleObject = {
            img_url: Random.dataImage('100x100','mock图片'),
            title: Random.csentence(5, 30),
            summary: Random.csentence(10,30),
            click: 0,
            time:Random.date() + ' ' + Random.time()
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