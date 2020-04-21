let obj = {}

// {key:value}
// {商品id:商品数量}

obj.saveGoods = function(goodsList){
    window.localStorage.setItem('goodsList',JSON.stringify(goodsList))
}

obj.getGoodsList = function(){
    return JSON.parse(window.localStorage.getItem('goodsList')||'{}');
}

obj.add = function(goods){
    let goodsList = this.getGoodsList();
    if(goodsList[goods.id]){
        // 有则追加
        goodsList[goods.id]+=goods.num;
    }
    else{
        goodsList[goods.id]=goods.num;
    }
    this.saveGoods(goodsList);
}

obj.getTotalCount = function () {  
    let goodsList = this.getGoodsList();
    let values = Object.values(goodsList);

    let sum = 0;
    values.forEach(val => sum+=val);
    return sum;
}

export default obj;