const Mock = require('mockjs');

const Random = Mock.Random;

const imgcategoryList = [{id:1,title:'明星美女'},{id:2,title:'空间设计'},{id:3,title:'户型装修'},{id:4,title:'广告摄影'},{id:5,title:'摄影技术'},{id:6,title:'拍摄手法'}]

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

const producePhotoData = function() {
    let Images = [];
    // for(let i = 1; i <= Random.integer(6, 10); i++) {
    //     let newPhotoObject = {
    //         id:i,
    //         img_url: Random.dataImage('375x250','mock图片'),
    //         title:Random.csentence(5,15),
    //         zhaiyao:Random.cparagraph(3,6),
    //     }
    //     Images.push(newPhotoObject);
    // }
    return{
        data:Images
    }
};

const produceImageInfoData = function () {


        let newImageInfoObject = {
            id:1,
            img_url: Random.dataImage('100x100','mock图片'),
            title: Random.csentence(5, 30),
            summary: Random.csentence(10,30),
            click: Random.natural(10,1000),
            time:Random.date() + ' ' + Random.time(),
            add_time:Random.date() + ' ' + Random.time(),
            content:Random.cparagraph( 10, 50)
        }

    
    return {
        data:newImageInfoObject
    }
}

const produceThumImagesData = function() {
    let Images = [];
    for(let i = 1; i <= Random.integer(4, 9); i++) {
        let ThumImagesObject = {
            src:Random.dataImage('300x225','mock图片')
        }
        Images.push(ThumImagesObject);
    }
    return{
        data:Images
    }
};

Mock.mock('api/newslist','get',produceNewsData);
Mock.mock('api/home','get',produceHomeData);
Mock.mock(/api\/getnew\/./,'get',produceNewData);
Mock.mock('api/getimgcategory','get',{message:imgcategoryList});
Mock.mock(/api\/getimages/,'get',producePhotoData);
// Mock.mock('api/getimages/0','get',producePhotoData);
// Mock.mock('api/getimages/1','get',producePhotoData);
Mock.mock(/api\/getimageinfo/,'get',produceImageInfoData);
Mock.mock(/api\/getthumimages/,'get',produceThumImagesData);