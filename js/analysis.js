var date=[];
var typ=[];
var number=[];
$.ajax({
    async:false,
    url: "json/attitude.json",//json文件位置，文件名
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    // traditional:true,
    success: function(data) {//请求成功完成后要执行的方法 
       //给info赋值给定义好的变量
       var pageData=data;
       for(var i=0;i<data.length;i++){
           console.log(pageData[i].name);
       }
       for(var i=0;i<data.length;i++){
           date[i]=data[i].date;
           typ[i]=data[i].type;
           number[i]=data[i].number;
       }
    //    alert(number[5]);
    }
})

var day1=[]
var country=[]
var num=[]
var index1=[]
$.ajax({
    async:false,
    url: "json/countryindex.json",//json文件位置，文件名
    type: "GET",//请求方式为get
    dataType: "json", //返回数据格式为json
    // traditional:true,
    success: function(data) {//请求成功完成后要执行的方法 
       //给info赋值给定义好的变量
       var pageData=data;
       for(var i=0;i<data.length;i++){
    	   console.log(pageData[i].name);
       }
       for(var i=0;i<data.length;i++){
           day1[i]=data[i].date;
           country[i]=data[i].country;
           num[i]=data[i].num;
           index1[i]=data[i].avgindex;
       }
    //    alert(number[5]);
    }
})

function newrelation(){
var myChart2=echarts.init(document.getElementById('gexfgraph'));
myChart2.showLoading();
var rtime=document.getElementById("rdate");
var sindex=rtime.selectedIndex;
var rdate=rtime.options[sindex].value;//得到日期
var graphname='gexf/2020'+rdate+'gexf.gexf';
$.get(graphname, function (xml) {
    myChart2.hideLoading();
    var graph = echarts.dataTool.gexf.parse(xml);
    //jquery得到xml中节点信息
    var categories = [];
    var catcountry=['大影响力国家','较大影响力国家','中等影响力国家','中小影响力国家','小影响力国家']
    for (var i = 0; i < 5; i++) {
        categories[i] = {
            name: catcountry[i]
        };
    }
    graph.nodes.forEach(function (node) {
        //alert(node.attributes.modularity_class);
        node.itemStyle = null;
        var mclass=node.attributes.modularity_class;
        if(mclass<2){
        var fcountry=node.attributes.country;
        fimg="image://Flag/"+fcountry+".png";
        node.symbol = fimg;
        }
        else{
            //node.symbol="image://http://d.lanrentuku.com/down/png/1101/paradise_fruit/apple512.png";
        }
        //node.symbol = "image://http://d.lanrentuku.com/down/png/1101/paradise_fruit/apple512.png";
        node.value = node.attributes.nodenumber;
        node.symbolSize /= 1.5;
        node.label = {
            show: node.symbolSize > 10
        };
        node.category = node.attributes.modularity_class;//这里给出了种类分类的方式，根据modularity_class分类
    });
    graph.links.forEach(function (link) {
        link.itemStyle = null;
        //var lnumber= link.attributes.edgenumber;
        link,label=""
        link.value = "none";
        // var c1=link.attributes.counrty1;
        // var c2=link.attributes.counrty2;
        //alert(link.attributes.edgenumber);
    });
    option = {
        title: {
            text: 'Country Relation',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [{
            //selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        animationDuration: 10000,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                name: 'Country',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                focusNodeAdjacency: true,
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                },
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };

    myChart2.setOption(option);
}, 'xml');
}
function selectattitude(){
var myselect=document.getElementById("date");
var sindex=myselect.selectedIndex;
var mydate=myselect.options[sindex].value;//得到日期
var myChart3 = echarts.init(document.getElementById("attitudechart"));
var tdtype=[];
var tdnumber=[];
var inf=0;
for(i=0;i<date.length;i++){
    if(date[i]==mydate){
        tdtype[inf]=typ[i];
        tdnumber[inf]=number[i];
        inf++;
    }
}
// alert(tdnumber[inf-1]);
option = {
title: {
    text: 'GDELT单日事件态度统计',
    subtext: '',
    left: 'center'
},
tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
},
legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
},
series: [
    {
        name: '事件态度',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
]
};
for(i=0;i<tdtype.length;i++){
option.legend.data[i]=tdtype[i];
option.series[0].data[i]={value:tdnumber[i],name:tdtype[i]};
}
myChart3.setOption(option);
}

function sorting(){
    var myselect=document.getElementById("rankdate");
    var sindex=myselect.selectedIndex;
    var mydate=myselect.options[sindex].value;//得到日期
    var tdcountry=[];
    var tdnumber=[];
    var tdaindex=[];
    var inf=0;
    //var mydate1='2020'+mydate;
    
    for(i=0;i<country.length;i++){
        if(day1[i]==mydate){
            tdcountry[inf]=country[i];
            tdnumber[inf]=num[i];
            tdaindex[inf]=index1[i];
            inf++;
        }
    }
    //alert(tdcountry[0])
    for(i=0;i<inf-1;i++){//冒泡排序
        for(j=0;j<inf-i-1;j++){
            if(tdaindex[j]<tdaindex[j+1]){
               temp1=tdaindex[j];
               tdaindex[j]=tdaindex[j+1];
               tdaindex[j+1]=temp1;
               temp2=tdnumber[j];
               tdnumber[j]=tdnumber[j+1];
               tdnumber[j+1]=temp2;
               temp3=tdcountry[j];
               tdcountry[j]=tdcountry[j+1];
               tdcountry[j+1]=temp3;
            }
        }
    }
    //alert(tdaindex[5])
    for(i=1;i<11;i++){
        // if(tdnumber[i-1]>3){
        var zmax=document.getElementById("z"+i);
        var number=tdaindex[i-1]*1000;
        var number=Math.round(number);
        var number=number/1000;
        var ans="country:"+tdcountry[i-1]+",index:"+number;
        // if(province3[i-1]!=""){
        //     ans=province3[i-1]+','+nation3[i-1]+":"+recoverdata[i-1];
        // }
        // else{
        //     ans=nation3[i-1]+":"+recoverdata[i-1];
        // }
        zmax.innerText=ans;
        }
    // }
}

