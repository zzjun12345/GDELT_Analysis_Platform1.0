$(document).ready(function(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'),"dark");

 var  option = {
    title : {//标题
        text: 'attitude数据统计',
        subtext: '2021年'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {//对应图表上方
        data:['negative','positive','neutral','s-negative','e-positive']
    },
    toolbox: {//工具框
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [//x轴
        {
            type : 'category',
            data : ['20200325',
            '20200326',
            '20200327',
            '20200328',
            '20200329',
            '20200330',
            '20200331',
            '20200401',
            '20200402',
            '20200403',
            '20200404',
            '20200405',
            '20200406',
            '20200407',
            '20200408',
            '20200409',
            '20200410',
            '20200411',
            '20200412',
            '20200413',
            '20200414',
            '20200415',
            '20200416',
            '20200417',
            '20200418',
            '20200419',
            '20200420',
            '20200421',
            '20200422',
            '20200423']//对应院系数据
        }
    ],
    yAxis : [//y轴
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'negative',
            type:'bar',
            data:[],
             itemStyle: {
                normal: {
                    label : {
                        show: true, position: 'top'
                    }
                }
            }
 
        },
        {
            name:'positive',
            type:'bar',
            data:[],
             itemStyle: {
                normal: {
                    label : {
                        show: true, position: 'top'
                    }
                }
            }
 
        },
        {
            name:'neutral',
            type:'bar',
            data:[],
             itemStyle: {
                normal: {
                    label : {
                        show: true, position: 'top'
                    }
                }
            }
        },
        {
            name:'s-negative',
            type:'bar',
            data:[],
             itemStyle: {
                normal: {
                    label : {
                        show: true, position: 'top'
                    }
                }
            }
        },
        {
            name:'e-positive',
            type:'bar',
            data:[],
             itemStyle: {
                normal: {
                    label : {
                        show: true, position: 'top'
                    }
                }
            }
        }
    ]
};
 
//设置图表
myChart.setOption(option);
 
//获取和处理数据
$.ajax({
    async:false,
    url: "attitude.json",//json文件位置，文件名
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    // traditional:true,
    success: function(data) {//请求成功完成后要执行的方法 
       //给info赋值给定义好的变量
        var pData=data;
       for(var i=0;i<data.length;i++){
           console.log(pageData[i].name);
       }
    //    for(var i=0;i<data.length;i++){
    //        date[i]=data[i].date;
    //        typ[i]=data[i].type;
    //        number[i]=data[i].number;
    //    }
    //    alert(number[5]);
    var negativelist = [];
    var positivelist = [];
    var neutrallist = [];
    var snlist = [];
    var eplist = [];
    var datelist=[];
   
// 循环获取数据
for(var i=0;i<pData.length;i++){
    if(pData[i].type=='negative'){
        negativelist.push(pData[i].number);
        datelist.push(pData[i].name);
    }else if(pData[i].type=='positive') {
        positivelist.push(pData[i].number);
    }else if(pData[i].type=='neutral'){
        neutrallist.push(pData[i].number);
    }else if(pData[i].type=='severely negative') {
        snlist.push(pData[i].number);
    }else if(pData[i].type=='extremely positive') {
        eplist.push(pData[i].number)
    }
    alert(pData[1].type);
}

// 将数据添加到数据图表中
    myChart.setOption({
    xAxis: {
        //显示院系名称
        data: datelist
    },
        series: [{
            // 根据名字对应到相应的系列
            name: 'negative',
            data: negativelist
        },
        {
            // 根据名字对应到相应的系列
            name: 'positive',
            data: positivelist
        },
        {
            // 根据名字对应到相应的系列
            name: 'neutral',
            data: neutrallist
        },
        {
            // 根据名字对应到相应的系列
            name: 's-negative',
            data: snlist
        },
        {
            // 根据名字对应到相应的系列
            name: 'e-positive',
            data: eplist
        }]
    });
}
});
 
//myChart.hideLoading();
 
});
data={
    "20200325":[
    {"type":"extremely positive","number":"1562"},
    {"type":"negative","number":"69762"},
    {"type":"neutral","number":"32143"},
    {"type":"positive","number":"18241"},
    {"type":"severely negative","number":"26088"}
    ],
    "20200326":[
    {"type":"extremely positive","number":"1683"},
    {"type":"negative","number":"72657"},
    {"type":"neutral","number":"32065"},
    {"type":"positive","number":"18729"},
    {"type":"severely negative","number":"26859"},
    ],
    "20200327":[
    {"type":"extremely positive","number":"1466"},
    {"type":"negative","number":"69116"},
    {"type":"neutral","number":"30002"},
    {"type":"positive","number":"17983"},
    {"type":"severely negative","number":"24717"},
    ],
    "20200328":[
    {"type":"extremely positive","number":"857"},
    {"type":"negative","number":"47203"},
    {"type":"neutral","number":"19615"},
    {"type":"positive","number":"10602"},
    {"type":"severely negative","number":"17122"},
    ],
    "20200329":[
    {"type":"extremely positive","number":"735"},
    {"type":"negative","number":"44882"},
    {"type":"neutral","number":"15865"},
    {"type":"positive","number":"9719"},
    {"type":"severely negative","number":"15969"},
    ],
    "20200330":[
    {"type":"extremely positive","number":"1359"},
    {"type":"negative","number":"62681"},
    {"type":"neutral","number":"26732"},
    {"type":"positive","number":"16803"},
    {"type":"severely negative","number":"24361"},
    ],
    "20200331":[
    {"type":"extremely positive","number":"1660"},
    {"type":"negative","number":"74010"},
    {"type":"neutral","number":"32337"},
    {"type":"positive","number":"20152"},
    {"type":"severely negative","number":"25371"},
    ],
    "20200401":[
    {"type":"extremely positive","number":"1479"},
    {"type":"negative","number":"71987"},
    {"type":"neutral","number":"30873"},
    {"type":"positive","number":"19466"},
    {"type":"severely negative","number":"25163"},
    ],
    "20200402":[
    {"type":"extremely positive","number":"1769"},
    {"type":"negative","number":"70267"},
    {"type":"neutral","number":"30759"},
    {"type":"positive","number":"19214"},
    {"type":"severely negative","number":"27189"},
    ],
    "20200403":[
    {"type":"extremely positive","number":"1413"},
    {"type":"negative","number":"66857"},
    {"type":"neutral","number":"30307"},
    {"type":"positive","number":"18388"},
    {"type":"severely negative","number":"25315"},
    ],
    "20200404":[
    {"type":"extremely positive","number":"862"},
    {"type":"negative","number":"45998"},
    {"type":"neutral","number":"19904"},
    {"type":"positive","number":"11542"},
    {"type":"severely negative","number":"16602"},
    ],
    "20200405":[
    {"type":"extremely positive","number":"708"},
    {"type":"negative","number":"40962"},
    {"type":"neutral","number":"17473"},
    {"type":"positive","number":"9260"},
    {"type":"severely negative","number":"15219"},
    ],
    "20200406":[
    {"type":"extremely positive","number":"1374"},
    {"type":"negative","number":"59484"},
    {"type":"neutral","number":"26329"},
    {"type":"positive","number":"16371"},
    {"type":"severely negative","number":"23517"},
    ],
    "20200407":[
    {"type":"extremely positive","number":"1656"},
    {"type":"negative","number":"64596"},
    {"type":"neutral","number":"28927"},
    {"type":"positive","number":"19858"},
    {"type":"severely negative","number":"24905"},
    ],
    "20200408":[
    {"type":"extremely positive","number":"1622"},
    {"type":"negative","number":"63663"},
    {"type":"neutral","number":"29805"},
    {"type":"positive","number":"19302"},
    {"type":"severely negative","number":"24987"},
    ],
    "20200409":[
    {"type":"extremely positive","number":"1830"},
    {"type":"negative","number":"62597"},
    {"type":"neutral","number":"29674"},
    {"type":"positive","number":"20485"},
    {"type":"severely negative","number":"24393"},
    ],
    "20200410":[
    {"type":"extremely positive","number":"1389"},
    {"type":"negative","number":"54827"},
    {"type":"neutral","number":"27230"},
    {"type":"positive","number":"16868"},
    {"type":"severely negative","number":"20947"},
    ],
    "20200411":[
    {"type":"extremely positive","number":"817"},
    {"type":"negative","number":"40614"},
    {"type":"neutral","number":"17368"},
    {"type":"positive","number":"10888"},
    {"type":"severely negative","number":"15751"},
    ],
    "20200412":[
    {"type":"extremely positive","number":"936"},
    {"type":"negative","number":"35499"},
    {"type":"neutral","number":"14902"},
    {"type":"positive","number":"9015"},
    {"type":"severely negative","number":"14246"},
    ],
    "20200413":[
    {"type":"extremely positive","number":"1580"},
    {"type":"negative","number":"51204"},
    {"type":"neutral","number":"23233"},
    {"type":"positive","number":"15230"},
    {"type":"severely negative","number":"21389"},
    ],
    "20200414":[
    {"type":"extremely positive","number":"1759"},
    {"type":"negative","number":"60553"},
    {"type":"neutral","number":"28622"},
    {"type":"positive","number":"18573"},
    {"type":"severely negative","number":"24304"},
    ],
    "20200415":[
    {"type":"extremely positive","number":"1851"},
    {"type":"negative","number":"61480"},
    {"type":"neutral","number":"29855"},
    {"type":"positive","number":"20664"},
    {"type":"severely negative","number":"25000"},
    ],
    "20200416":[
    {"type":"extremely positive","number":"1679"},
    {"type":"negative","number":"62531"},
    {"type":"neutral","number":"29528"},
    {"type":"positive","number":"20601"},
    {"type":"severely negative","number":"25177"},
    ],
    "20200417":[
    {"type":"extremely positive","number":"1626"},
    {"type":"negative","number":"61727"},
    {"type":"neutral","number":"29337"},
    {"type":"positive","number":"19251"},
    {"type":"severely negative","number":"23710"},
    ],
    "20200418":[
    {"type":"extremely positive","number":"954"},
    {"type":"negative","number":"43235"},
    {"type":"neutral","number":"19636"},
    {"type":"positive","number":"12269"},
    {"type":"severely negative","number":"16459"},
    ],
    "20200419":[
    {"type":"extremely positive","number":"933"},
    {"type":"negative","number":"38024"},
    {"type":"neutral","number":"15480"},
    {"type":"positive","number":"9421"},
    {"type":"severely negative","number":"16256"},
    ],
    "20200420":[
    {"type":"extremely positive","number":"1585"},
    {"type":"negative","number":"55899"},
    {"type":"neutral","number":"25790"},
    {"type":"positive","number":"16730"},
    {"type":"severely negative","number":"25317"},
    ],
    "20200421":[
    {"type":"extremely positive","number":"2182"},
    {"type":"negative","number":"59843"},
    {"type":"neutral","number":"29396"},
    {"type":"positive","number":"19147"},
    {"type":"severely negative","number":"26043"},
    ],
    "20200422":[
    {"type":"extremely positive","number":"2106"},
    {"type":"negative","number":"62168"},
    {"type":"neutral","number":"30601"},
    {"type":"positive","number":"21531"},
    {"type":"severely negative","number":"25105"},
    ],
    "20200423":[
    {"type":"extremely positive","number":"2096"},
    {"type":"negative","number":"60972"},
    {"type":"neutral","number":"30610"},
    {"type":"positive","number":"22199"},
    {"type":"severely negative","number":"25085"},
    ]
    }