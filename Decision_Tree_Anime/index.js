// const data = [{
//         title: "天气",
//         data: ["晴", "晴", "晴", "有风", "有风", "雨", "雨", "雨", "有风", "有风"],
//         categories: ["晴", "有风", "雨"]
//     },
//     {
//         title: "父母是否到访",
//         data: ["是", "是", "是", "否", "否", "否", "是", "是", "否", "否"],
//         categories: ["是", "否"]
//     },
//     {
//         title: "资金是否充裕",
//         data: ["否", "是", "是", "是", "是", "否", "否", "是", "否", "否"],
//         categories: ["是", "否"]
//     },

// ]

// const result = {
//     title: "周末活动",
//     data: ["出去玩", "出去玩", "出去玩", "出去玩", "出去玩", "待在宿舍", "待在宿舍", "待在宿舍", "待在宿舍", "待在宿舍"],
//     categories: ["出去玩", "待在宿舍"]
// }

// const data = [
    // {
    //     title:"学历",
    //     data : ["本科","本科","本科","本科","研究生","大专","本科","研究生","本科","研究生","本科","研究生","研究生","研究生","大专"],
    //     categories:["本科","研究生","大专"]
    // },
    // {
    //     title:"性格",
    //     data : ["外向","外向","内向","外向","内向","内向","外向","外向","外向","内向","外向","内向","外向","内向","外向"],
    //     categories:["外向","内向"]
    // },
    // {
    //     title:"成绩",
    //     data : ["好","好","中","中","好","中","中","差","中","中","好","好","中","中","好"],
    //     categories:["好","中","差"]
    // },
    // {
    //     title:"项目有无",
    //     data : ["有","无","无","无","有","无","有","无","无","有","无","无","有","有","有"],
    //     categories:["有","无"]
    // }


// ]

// const result = {
//     title: "是否被录用",
//     data: ["是","是","否","否","是","否","是","否","否","否","否","是","是","是","否"],
//     categories: ["是","否"]
// }

const data = [
    {
        title:"学历",
        data : ["本科","本科","本科","本科","研究生","大专","本科","研究生","本科","研究生","本科","研究生","研究生","研究生","大专"],
        categories:["本科","研究生","大专"]
    },
    {
        title:"性格",
        data : ["外向","外向","内向","外向","内向","内向","外向","外向","外向","内向","外向","内向","外向","内向","外向"],
        categories:["外向","内向"]
    },
    {
        title:"成绩",
        data : ["好","好","中","中","好","中","中","差","中","中","好","好","中","中","好"],
        categories:["好","中","差"]
    },
    {
        title:"项目有无",
        data : ["有","无","无","无","有","无","有","无","无","有","无","无","有","有","有"],
        categories:["有","无"]
    }
]

const result = {
    title:"是否被录用",
    data : ["录用","录用","不录用","不录用","录用","不录用","录用","不录用","不录用","录用","录用","录用","录用","录用","不录用"],
    categories:["录用","不录用"]
}

var HashNum = 101;

var TreeDataNode = {
    "name": "根节点",
    "HashNum": 100,
    "children": []
};

var goal;

// 构建所有对象，需要拿数据可以直接用obj.实现
var obj = [];
for (let i = 0; i < data[0].data.length; i++) {
    var o = {
        idx: i
    }
    for (let j = 0; j < data.length; j++) {
        o[data[j].title] = data[j].data[i];
    }
    o[result.title] = result.data[i];
    obj.push(o);
}

console.log(obj);
class TreeNode {
    /**
     * 树节点
     * @param {Array} arr 节点含有的数据的id集合
     * @param {Array} hasSearched 表示有哪些属性已经被遍历了
     * @param {number} depth 当前遍历过几层
     */
    constructor(arr, hasSearched, depth) {
        this.nodeData = arr;
        this.search = hasSearched;
        this.depth = depth;
    }

    /**
     * Gini计算熵
     * @param {*} arr 分类后的id数组
     */
    Gini(arr) {
        var sum = 0;
        for (let x of arr) {
            sum += x.length;
        }
        if(sum === 0) return 0;
        let ret = 1;

        for (let num of arr) {
            ret -= (num.length / sum) ** 2;
        }
        return ret;
    }

    GiniSpilt(arr) {
        // [天气[晴[id,id],[id]],[有风[id],[id,id]],[雨[id],[id,id]] ]
        var ret = 0;
        var sum = 0;
        for (let x of arr) {
            for (let y of x) {
                sum += y.length;
            }
        }

        for (let x of arr) {
            var num = 0;
            for (let y of x) {
                num += y.length;
            }
            ret += num / sum * this.Gini(x);
        }

        return ret.toFixed(2);
    }

    /**
     * 
     * @param { Number } category 属性的id编号
     */
    CategorySpilt(categoryid) {
        // CateSpilt的数据结构: 
        // 三种未访问过的属性[ [天气[晴[id,id,id],[]],[有风],[雨]], [父母], [资金] ] X
        // [天气[晴id,id,id],[有风id,id,id],[雨id,id,id] ]

        const categoryName = data[categoryid].title;
        const categoryAll = data[categoryid].categories;

        var CaseSpilt = [];
        for (let i = 0; i < categoryAll.length; i++) {
            CaseSpilt.push([]);
        }

        for (var i of this.nodeData) {
            let index = categoryAll.indexOf(obj[i][categoryName]);
            CaseSpilt[index].push(i);
        }


        return CaseSpilt;
    }

    ResultSpilt(arr) {
        const ResultAll = result.categories;

        for (let i in arr) {
            var a = arr[i];
            var part = [];
            for (let t = 0; t < ResultAll.length; t++) {
                part.push([]);
            }
            for (let idx of a) {
                var index = ResultAll.indexOf(obj[idx][result.title]);
                part[index].push(idx);
            }

            arr[i] = part;
        }

        return arr;
    }

    FinalExc() {
        var minGini = 100;
        var retArr = [];
        var GiniSpiltAll = [];
        var attrid = 0;
        for (let i in this.search) {
            i = parseInt(i);
            if (this.search[i] === 0) {
                var cate = this.CategorySpilt(i);
                var res = this.ResultSpilt(cate);
                var cntsum = this.GiniSpilt(res);
                console.log(data[i].title, cntsum);
                if (cntsum < minGini) {
                    minGini = cntsum;
                    retArr = res;
                    attrid = i;
                }
            } else {
                GiniSpiltAll.push(100);
            }
        }
        this.search[attrid] = 1;
        return {
            ret: [...retArr],
            hasSearched: [...this.search],
            depth: this.depth + 1,
            attrid: attrid
        };

    }

}




function init() {
    var initArr = [];
    var hasSearched = [];

    for (let i = 0; i < obj.length; i++) {
        initArr.push(i);
    }
    for (let i = 0; i < data.length; i++) {
        hasSearched.push(0);
    }
    DFS(initArr, hasSearched, 1, 100, -1, -1)
}

function DFS(initArr, hasSearched, depth, father, last_cycle_attrid, last_cycle_cateid) {
    var fatheridx = HashNum;
    console.log("DFSinit", initArr, hasSearched, depth);
    // if(depth === data.length) return;

    var o = new TreeNode(initArr, hasSearched, depth);

    var nextFloor = o.FinalExc();

    generateOriginNode(initArr, hasSearched, depth, HashNum++, father, nextFloor.attrid, last_cycle_attrid, last_cycle_cateid);

    console.log("nextFloor", nextFloor, nextFloor.depth);
    for (var temp_j in nextFloor.ret) {
        nextdata = nextFloor.ret[temp_j];
        var check = nextdata.filter((item) => {
            return item.length !== 0;
        })
        // 判断叶子节点
        if (check.length === 1) {
            var result_id;
            for (let temp_i in nextdata) {
                if (nextdata[temp_i].length !== 0) {
                    result_id = temp_i;
                    break;
                }
            }
            check = check[0];
            generateLeavesNode(check, nextFloor.hasSearched, nextFloor.depth, HashNum++, fatheridx, result_id, nextFloor.attrid, temp_j);
            continue;
        }
        else if(check.length === 0){
            continue;
        }
        var nextdatacon = [];
        for (let x of nextdata) {
            nextdatacon = nextdatacon.concat(x);
        }
        DFS([...nextdatacon], [...nextFloor.hasSearched], nextFloor.depth, fatheridx, nextFloor.attrid, temp_j);
    }

   
}

init();

function SearchTreeNodeByNameId(obj, HashNum) {
    if (obj.HashNum === HashNum) goal = obj;
    else {
        obj.children.forEach(element => {
            SearchTreeNodeByNameId(element, HashNum);
        });
    }
}

function generateOriginNode(initArr, hasSearched, depth, HashNum, father, attrid, last_cycle_attrid, last_cycle_cateid) {

    SearchTreeNodeByNameId(TreeDataNode, father);
    if (last_cycle_attrid === -1 && last_cycle_cateid === -1) {
        goal.children.push({
            "name": data[attrid].title,
            "HashNum": HashNum,
            "children": [],
            "containArr": initArr,
            "hasSearched":hasSearched
        });
    } else {
        console.log(attrid);
        goal.children.push({
            "name": data[attrid].title + "(" + data[last_cycle_attrid].categories[last_cycle_cateid] + ")",
            "HashNum": HashNum,
            "children": [],
            "containArr": initArr,
            "hasSearched":hasSearched
        });
    }

}

function generateLeavesNode(initArr, hasSearched, depth, HashNum, father, result_id, attrid, temp_j) {
    SearchTreeNodeByNameId(TreeDataNode, father);
    goal.children.push({
        "name": result.categories[result_id] + "(" + data[attrid].categories[temp_j] + ")",
        "HashNum": HashNum,
        "children": [],
        "containArr": initArr,
        "hasSearched":hasSearched
    });
}


// console.log(obj);

// function countCategories(data, categories, categoriesName) {
//     // console.log(data,categories)
//     var ret = [];
//     for (let i = 0; i < categories.length; i++) {
//         let o = {
//             num: 0,
//             gini: []
//         }
//         for (let j = 0; j < result.categories.length; j++) {
//             o.gini.push([]);
//         }
//         ret.push(o);
//     }

//     // console.log(ret);
//     // 统计所有分类下（如晴天，雨天）每个的结果（比如出门、不出门）的id
//     for (let i of data) {
//         let attr = obj[i][categoriesName];
//         let loc_res = obj[i][result.title];
//         ret[categories.indexOf(attr)].num++;
//         ret[categories.indexOf(attr)].gini[result.categories.indexOf(loc_res)].push(i);
//     }

//     // console.log(ret);
//     var ginisplit = 0;
//     for (let i = 0; i < ret.length; i++) {
//         let giniarr = [];
//         for(let j = 0;j < ret[i].gini.length;j++){
//             giniarr.push(ret[i].gini[j].length);
//         }
//         ginisplit += (ret[i].num / data.length) * Gini(giniarr);
//     }

//     return {
//         res: ginisplit.toFixed(2),
//         class: ret
//     };
// }



// function calculate() {
//     var init = [];
//     for(let i = 0; i < obj.length; i++){
//         init.push(i);
//     }
//     for (let i = 0; i < data.length; i++) {
//         console.log(data[i].title, countCategories(init, data[i].categories,data[i].title));
//     }
// }


// calculate();












var myChart = echarts.init(document.getElementById('treeMap'))

// myChart.showLoading();

//     myChart.hideLoading();

myChart.setOption(option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [{
        type: 'tree',

        data: [TreeDataNode],

        left: '2%',
        right: '2%',
        top: '8%',
        bottom: '20%',

        symbol: 'emptyCircle',

        orient: 'vertical',

        expandAndCollapse: true,

        label: {
            position: 'top',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 20
        },
        initialTreeDepth: 10,
        leaves: {
            label: {
                position: 'bottom',
                rotate: 0,
                verticalAlign: 'middle',
                align: 'left'
            }
        },

        animationDurationUpdate: 750
    }]
});


function showArr(arr) {
    $list_tr = $(".list_data_line");
    for(let i = 0; i < obj.length; i++){
        $($list_tr[i]).removeClass("highlight");
    }
    arr.forEach((x)=>{
        $($list_tr[x]).addClass("highlight");
    })
}



myChart.on('mouseover', function (params) {
    console.log(params);
    if (params.data.HashNum !== 100)
        showArr(params.data.containArr);
})



function Listinit(){
    $list_thead = $("#list-thead");
    $list_tbody = $("#list-tbody");
    html_head = "<tr>";
    html_head += `<th>Id</th>`;
    for(let x of data){ 
        html_head += `<th>${x.title}</th>`;
    }
    html_head += `<th>${result.title}</th>`;
    html_head += "</tr>";

    $list_thead.html("");
    $list_thead.append(html_head);
    
    html_body = "";
    for(let x of obj){
        html_body += "<tr class='list_data_line'>";
        for(let index in x){
 
            html_body += `<td>${x[index]}</td>`;
        }

        html_body += "</tr>";
    }
    $list_tbody.html("");
    $list_tbody.append(html_body);
}

Listinit();