$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();      
    });

    function hamburger_cross() {

    if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
    } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
    }
}
$('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
});  
});
$("#ex1").slider({});
$("#ex2").slider({});
mapboxgl.accessToken = 'pk.eyJ1IjoiNzkwNDM2OTg2IiwiYSI6ImNrOGZiazd4eDAybjAzaHBuam5odms1ZzIifQ.l-zPukDWushMf1l5M0xDLg';
var content;
$.ajax({
    url:'json/content.json',
    type: "GET",
    dataType: "json", 
    success:function(data){
        content=data
        for(var i=1;i<=data.length;i++){
            var txt='<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio'+i+'"'+' value='+data[i-1]['name']+'><label class="form-check-label" for="inlineRadio'+i+'">'+data[i-1]['name']+'</label></div>'
            $("#content").append(txt) 
        }
    }
})
$('#datetimepicker').datetimepicker({
    format: 'yyyy-mm-dd',
    autoclose:true,//自动关闭
    minView:2,//最精准的时间选择为日期0-分 1-时 2-日 3-月 
    weekStart:0,
    language:'zh-CN'
 });
const reducers = (function createReducers(redux, keplerGl) {
    return redux.combineReducers({
      // mount keplerGl reducer
      keplerGl: keplerGl.keplerGlReducer.initialState({
        uiState: {
          readOnly: false,
          currentModal: null
        }
      })
    });
  }(Redux, KeplerGl));

  const middleWares = (function createMiddlewares(keplerGl) {
    return keplerGl.enhanceReduxMiddleware([
      // Add other middlewares here
    ]);
  }(KeplerGl));

  const enhancers = (function craeteEnhancers(redux, middles) {
    return redux.applyMiddleware(...middles);
  }(Redux, middleWares));

  const store = (function createStore(redux, enhancers) {
    const initialState = {};

    return redux.createStore(
      reducers,
      initialState,
      redux.compose(enhancers)
    );
  }(Redux, enhancers));
  var KeplerElement = (function makeKeplerElement(react, keplerGl, mapboxToken) {
    return function App() {
      var rootElm = react.useRef(null);
      var _useState = react.useState({
        width: window.innerWidth,
        height: window.innerHeight
      });
      var windowDimension = _useState[0];
      var setDimension = _useState[1];
      react.useEffect(function sideEffect(){
        function handleResize() {
          setDimension({width: window.innerWidth, height: window.innerHeight});
        };
        window.addEventListener('resize', handleResize);
        return function() {window.removeEventListener('resize', handleResize);};
      }, []);
      return react.createElement(
        'div',
        {style: {position: 'absolute', left: 0, width: '100vw', height: '100vh'}},
        react.createElement(keplerGl.KeplerGl, {
          mapboxApiAccessToken: mapboxToken,
          id: "map",
          width: windowDimension.width,
          height: windowDimension.height
        })
      )
    }
  }(React, KeplerGl, mapboxgl.accessToken));
  var availableTags=[]
var avtag=[]
  var head=['day',"eventcode","actor1countrycode","actor2countrycode","quadclass","goldsteinscale","avgtone","lng","lat","lng_1","lat_1","lng_2","lat_2"]   
  const app = (function createReactReduxProvider(react, reactRedux, KeplerElement) {
    return react.createElement(
      reactRedux.Provider,
      {store},
      react.createElement(KeplerElement, null)
    )
  }(React, ReactRedux, KeplerElement));
  (function render(react, reactDOM, app) {
    reactDOM.render(app, document.getElementById('app'));
  }(React, ReactDOM, app));
var codes={'a1c':'actor1code','a1n':'actor1name','a1cc':'actor1countrycode','a1kc':'actor1knowngroupcode',
'a1ec':'actor1ethniccode','a1rc1':'actor1religion1code','a1rc2':'actor1religion2code',
'a2c':'actor2code','a2n':'actor2name','a2cc':'actor2countrycode','a2kc':'actor2knowngroupcode',
'a2ec':'actor2ethniccode','a2rc1':'actor2religion1code','a2rc2':'actor2religion2code'
}
function chart(features){
    var country=[]
    var num={}
    var pass=0
    var opt=0
    var o_in=0
    var all=0
    var kind_d=[{value:0,name:'口头合作'},{value:0,name:'物质合作'},
    {value:0,name:'口头冲突'},{value:0,name:'物质冲突'}]
    for(var i=0;i<features.length;i++){
        var feature=features[i]['properties']
        if(feature['actor2countrycode']=='TWN'||feature['actor2countrycode']=='HKG'||feature['actor2countrycode']=='MAC'){
            features[i]['properties']['actor2countrycode']='CHN'
        }
        if(!num[feature['actor2countrycode']]){
            country.push(feature['actor2countrycode'])
            num[feature['actor2countrycode']]=[0,0,0,0,1]
            num[feature['actor2countrycode']][feature['quadclass']-1]=1
        }
        else{
            num[feature['actor2countrycode']][feature['quadclass']-1]+=1
            num[feature['actor2countrycode']][4]+=1
        }
        if(feature['actor1countrycode']=='TWN'||feature['actor1countrycode']=='HKG'||feature['actor1countrycode']=='MAC'){
            features[i]['properties']['actor1countrycode']='CHN'
        }
        if(!num[feature['actor1countrycode']]){
            country.push(feature['actor1countrycode'])
            num[feature['actor1countrycode']]=[0,0,0,0,1]
            num[feature['actor1countrycode']][feature['quadclass']-1]=1
        }
        else{
            num[feature['actor1countrycode']][feature['quadclass']-1]+=1
            num[feature['actor1countrycode']][4]+=1
        }
    }
    var max=0
    var mc=''
    for(var i=0;i<country.length;i++){
        if(num[country[i]][4]>max&&country[i]!='NaN'){
            max=num[country[i]][4]
            mc=country[i]
        }
    }
    var o_num=0
    for(var i=0;i<features.length;i++){
        var feature=features[i]['properties']
        if(feature['quadclass']==1){
            opt+=Math.abs(feature['goldsteinscale'])*0.75*Math.abs(feature['avgtone'])/100
            kind_d[0]['value']+=1
            if(feature['actor1countrycode']!='NaN'&&feature['actor1countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])*0.75
                o_num+=1
            }
            if(feature['actor2countrycode']!='NaN'&&feature['actor2countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])*0.75
                o_num+=1
            }
            all+=Math.abs(feature['goldsteinscale'])*0.75

        }
        if(feature['quadclass']==2){
            opt+=Math.abs(feature['goldsteinscale'])*Math.abs(feature['avgtone'])/100
            kind_d[1]['value']+=1
            if(feature['actor1countrycode']!='NaN'&&feature['actor1countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])
                o_num+=1
            }
            if(feature['actor2countrycode']!='NaN'&&feature['actor2countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])
                o_num+=1
            }
            all+=Math.abs(feature['goldsteinscale'])
        }
        if(feature['quadclass']==3){
            pass+=Math.abs(feature['goldsteinscale'])*0.7*Math.abs(feature['avgtone'])/100
            kind_d[2]['value']+=1
            if(feature['actor1countrycode']!='NaN'&&feature['actor1countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])*0.75
                o_num+=1
            }
            if(feature['actor2countrycode']!='NaN'&&feature['actor2countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])*0.75
                o_num+=1
            }
            all+=Math.abs(feature['goldsteinscale'])*0.75
        }
        if(feature['quadclass']==4){
            pass+=Math.abs(feature['goldsteinscale'])*Math.abs(feature['avgtone'])/100
            kind_d[3]['value']+=1
            if(feature['actor1countrycode']!='NaN'&&feature['actor1countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])
                o_num+=1
            }
            if(feature['actor2countrycode']!='NaN'&&feature['actor2countrycode']!=mc){
                o_in+=Math.abs(feature['goldsteinscale'])
                o_num+=1
            }
            all+=Math.abs(feature['goldsteinscale'])
        }
    }
    var country2=[]
    var datas=[[],[],[],[]]
    for(var i=0;i<country.length;i++){
           if(num[country[i]][4]>(o_num/20)&&country[i]!='NaN'&&country[i]!=mc){
               country2.push(country[i])
               datas[0].push(num[country[i]][0])
               datas[1].push(num[country[i]][1])
               datas[2].push(num[country[i]][2])
               datas[3].push(num[country[i]][3])
           } 
    }
    var myChart = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var option = {
        angleAxis: {
            type: 'category',
            data: country2,
        },
        radiusAxis: {
        },
        polar: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        series: [{
            type: 'bar',
            data: datas[0],
            coordinateSystem: 'polar',
            radius: '55%',
            center: ['50%', '60%'],
            name: '口头合作',
            stack: 'a'
        }, {
            type: 'bar',
            data: datas[1],
            coordinateSystem: 'polar',
            name: '物质合作',
            stack: 'a'
        }, {
            type: 'bar',
            data: datas[2],
            coordinateSystem: 'polar',
            name: '口头冲突',
            stack: 'a'
        },
        {
            type: 'bar',
            data: datas[3],
            coordinateSystem: 'polar',
            name: '物质冲突',
            stack: 'a'
        }],
        legend: {
            data: ['口头合作', '物质合作', '口头冲突','物质冲突']
        }
    };
    var option2= {
        title: {
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            data: ['口头合作', '物质合作', '口头冲突', '物质冲突']
        },
        series: [
            {
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: kind_d,
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
    myChart.setOption(option);
    myChart2.setOption(option2);
    var txt='区域消极指数：'+pass.toFixed(2)+',区域积极指数：'+opt.toFixed(2)+',积极/消极比：'+(opt/pass).toFixed(2)+'\n'+'其他国家影响比：'+(o_in/(2*(all))).toFixed(2)
    $("#txt").text(txt)

}
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    return array;
}
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-120, 50],
    zoom: 0,
    });
map.addControl(new mapboxgl.NavigationControl());
var filter=[]
var popup = new mapboxgl.Popup({
    closeButton: false
    });
     
var url='http://localhost:8080/geoserver/hubei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=hubei%3Avisualization&outputFormat=application%2Fjson&cql_filter=day='
var url2='http://localhost:8080/geoserver/Gdelt/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Gdelt%3Avisualization&outputFormat=application%2Fjson&cql_filter=day='
 function submit() {
       var times=$("#time").val()
       var time=times.split('-')
       if(map.getLayer('circles0')){
           for(var n=0;n<=9;n++){
            map.removeLayer('circles'+n)
            map.removeLayer('heatmap'+n)
            map.removeLayer('circles-highlighted'+n)
            map.removeSource('geodata'+n)
           }
           
       }
       $.mask_fullscreen()
       $.ajax({
        url:url2+"'"+time[0]+time[1]+time[2]+"'",
        //url:'json/features.json',
        type: "GET",
        dataType: "json", 
        success:function(data){
            // var obj=document.getElementById("txt");
            // obj.innerHTML(time[0]+time[1]+time[2]);
            $.mask_close_all();
            var canvas = map.getCanvasContainer();
 
// Variable to hold the starting xy coordinates
// when `mousedown` occured.
            var start;
 
// Variable to hold the current xy coordinates
// when `mousemove` or `mouseup` occurs.
            var current;
 
// Variable for the draw box element.
            var box;
 
// Add the source to query. In this example we're using
// county polygons uploaded as vector tiles
            var features=data['features']
            var num=features.length/10
            var datas=[{"type":"FeatureCollection","features":[]},{"type":"FeatureCollection","features":[]},
            {"type":"FeatureCollection","features":[]},{"type":"FeatureCollection","features":[]}
           ,{"type":"FeatureCollection","features":[]},{"type":"FeatureCollection","features":[]},{"type":"FeatureCollection","features":[]},
           {"type":"FeatureCollection","features":[]},{"type":"FeatureCollection","features":[]}
          ,{"type":"FeatureCollection","features":[]}]
            for(var i=0;i<features.length;i++){
                if(i<num){
                    datas[0]["features"].push(features[i])
                }
                else if(2*num>i>=num){
                    datas[1]["features"].push(features[i])
                }
                else if(2*num<=i<3*num){
                    datas[2]["features"].push(features[i])
                }
                else if(3*num<=i<4*num){
                    datas[3]["features"].push(features[i])
                }
                else if(5*num>i>=4*num){
                    datas[1]["features"].push(features[i])
                }
                else if(5*num<=i<6*num){
                    datas[2]["features"].push(features[i])
                }
                else if(6*num<=i<7*num){
                    datas[3]["features"].push(features[i])
                }
                else if(8*num>i>=7*num){
                    datas[1]["features"].push(features[i])
                }
                else if(8*num<=i<9*num){
                    datas[2]["features"].push(features[i])
                }
                else if(i=>9*num){
                    datas[4]["features"].push(features[i])
                }
            }
            for(var i=0;i<=9;i++){
            map.addSource('geodata'+i, {
                "type": "geojson",
                "data": datas[i],
                "buffer":0
                });
            map.addLayer({
                "id": "circles-highlighted"+i,
                "type": "circle",
                "source": "geodata"+i,
                'paint': {
                    'circle-color': '#B22222',
                    'circle-opacity': 1,
                    'circle-radius':5
                    },
                "filter": ["in", "eventcode", ""]
                });
            map.addLayer({
            'id': 'circles'+i,
            'type': 'circle',
            'source': 'geodata'+i,
            'paint': {
            'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'quadclass'],
            1,'#87CEFA',
            2,'#1E90FF',
            3,'#FFA07A',
            4,'#FF6347'
            ],
            'circle-opacity': 0.4,
            'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'goldsteinscale'],
            -10,10,
            0,0,
            10,10
            ]
            }
            },'circles-highlighted'+i);
            map.addLayer({
                "id": "heatmap"+i,
                 "type": "heatmap",
                "source": "geodata"+i,
                "maxzoom": 9,
                "visibility":false,
                "paint": {
                // Increase the heatmap weight based on frequency and property magnitude
                "heatmap-weight": [
                "interpolate",
                 ["linear"],
                ["get", "avgtone"],
                -10,1,
                0,0,
                10,1
                ],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 1,
                9, 3
                 ],
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
                ],
                    // Adjust the heatmap radius by zoom level
                "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["get", "goldsteinscale"],
                -10,10,
                0,0,
                10,10
                ],
                    // Transition from heatmap to circle layer by zoom level
                "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 1,
                9, 0
                ],
                }
                },'circles'+i);
                map.setLayoutProperty('heatmap'+i, 'visibility', 'none');
                map.setLayoutProperty('circles-highlighted'+i, 'visibility', 'none');
                map.setFilter('heatmap'+i, ['in','actor1code','CHN']);
                map.setFilter('circles'+i, ['in','actor1code','CHN']);
            }
            filter=['in','actor1code','CHN']
                 availableTags=[]
                for (var i = 0; i < data.features.length; i++) {
                        var feature = data.features[i];
                        availableTags.push('a1c:'+feature.properties.actor1code)
                        availableTags.push('a1n:'+feature.properties.actor1name)
                        availableTags.push('a1cc:'+feature.properties.actor1countrycode)
                        availableTags.push('a1kc:'+feature.properties.actor1knowngroupcode)
                        availableTags.push('a1ec:'+feature.properties.actor1ethniccode)
                        availableTags.push('a1rc1:'+feature.properties.actor1religion1code)
                        availableTags.push('a1rc2:'+feature.properties.actor1religion2code)
                        availableTags.push('a2c:'+feature.properties.actor2code)
                        availableTags.push('a2n:'+feature.properties.actor2name)
                        availableTags.push('a2cc:'+feature.properties.actor2countrycode)
                        availableTags.push('a2kc:'+feature.properties.actor2knowngroupcode)
                        availableTags.push('a2ec:'+feature.properties.actor2ethniccode)
                        availableTags.push('a2rc1:'+feature.properties.actor2religion1code)
                    availableTags.push('a2rc2:'+feature.properties.actor2religion2code)}
                    canvas.addEventListener('mousedown', mouseDown, true);
                    function mousePos(e) {
                            var rect = canvas.getBoundingClientRect();
                            return new mapboxgl.Point(
                            e.clientX - rect.left - canvas.clientLeft,
                            e.clientY - rect.top - canvas.clientTop
                            );
                        }
                             
                    function mouseDown(e) {
                            // Continue the rest of the function if the shiftkey is pressed.
                            if (!(e.shiftKey && e.button === 0)) return;
                             
                            // Disable default drag zooming when the shift key is held down.
                            map.dragPan.disable();
                             
                            // Call functions for the following events
                            document.addEventListener('mousemove', onMouseMove);
                            document.addEventListener('mouseup', onMouseUp);
                            document.addEventListener('keydown', onKeyDown);
                             
                            // Capture the first xy coordinates
                            start = mousePos(e);
                        }
                             
                    function onMouseMove(e) {
                            // Capture the ongoing xy coordinates
                            current = mousePos(e);
                             
                            // Append the box element if it doesnt exist
                            if (!box) {
                            box = document.createElement('div');
                            box.classList.add('boxdraw');
                            canvas.appendChild(box);
                            }
                             
                            var minX = Math.min(start.x, current.x),
                            maxX = Math.max(start.x, current.x),
                            minY = Math.min(start.y, current.y),
                            maxY = Math.max(start.y, current.y);
                             
                            // Adjust width and xy position of the box element ongoing
                            var pos = 'translate(' + minX + 'px,' + minY + 'px)';
                            box.style.transform = pos;
                            box.style.WebkitTransform = pos;
                            box.style.width = maxX - minX + 'px';
                            box.style.height = maxY - minY + 'px';
                        }
                             
                    function onMouseUp(e) {
                            // Capture xy coordinates
                            finish([start, mousePos(e)]);
                        }
                             
                    function onKeyDown(e) {
                        // If the ESC key is pressed
                        if (e.keyCode === 27) finish();
                        }
                    function finish(bbox) {
                                // Remove these events now that finish has been called.
                                document.removeEventListener('mousemove', onMouseMove);
                                document.removeEventListener('keydown', onKeyDown);
                                document.removeEventListener('mouseup', onMouseUp);
                                 
                                if (box) {
                                box.parentNode.removeChild(box);
                                box = null;
                                }
                                 
                                // If bbox exists. use this value as the argument for `queryRenderedFeatures`
                                if (bbox) {
                                var features = map.queryRenderedFeatures(bbox, {
                                layers: ['circles0','circles1','circles2','circles3','circles4','circles5','circles6','circles7','circles8','circles9']
                                });
                                }
                                 chart(features)
                                map.dragPan.enable();
                             }
             avtag=unique(availableTags)
     $('#self1').tagsInput({
        autocomplete:{
            source: avtag,minLength:2,autoFocus: true,delay: 500
          }
        }); 
        (function customize(keplerGl, store) {
            var csv=''
            for(var i=0;i<head.length;i++){
                csv=csv+head[i]+','
            }
            csv=csv+'\n'
            var feature=data['features']
            for(var i=0;i<feature.length;i++){
            try{
                for(var i2=0;i2<5;i2++){
                   csv=csv+feature[i]['properties'][head[i2]]+',' 
                }
                for(var i3=5;i3<7;i3++){
                    csv=csv+Math.abs(feature[i]['properties'][head[i3]])+','
                 }
                csv=csv+feature[i]["geometry"]["coordinates"][0]+','
                csv=csv+feature[i]["geometry"]["coordinates"][1]+','
                csv=csv+feature[i]['properties']["actor1geo_location"]["coordinates"][0]+','
                csv=csv+feature[i]['properties']["actor1geo_location"]["coordinates"][1]+','
                csv=csv+feature[i]['properties']["actor2geo_location"]["coordinates"][0]+','
                csv=csv+feature[i]['properties']["actor2geo_location"]["coordinates"][1]+','+'\n'
            }
            catch(err){
                continue
            }
            }
          const datasets ={info: {id: 'test_data', label: 'My Csv'},
          data:keplerGl.processCsvData(csv)}
          const config ={"version":"v1","config":{"visState":{"filters":[{"dataId":["test_data"],
          "id":"kq3mbwi2kd","name":["actor1countrycode"],"type":"multiSelect","value":["CHN"],
          "enlarged":false,"plotType":"histogram","yAxis":null}],"layers":[{"id":"znmo8jrs","type":"arc",
          "config":{"dataId":"test_data","label":"new layer","color":[130,154,227],
          "columns":{"lat0":"lat_1","lng0":"lng_1","lat1":"lat_2","lng1":"lng_2"},
          "isVisible":false,"visConfig":{"opacity":0.16,"thickness":0.9,
          "colorRange":{"name":"Ice And Fire 4","type":"diverging","category":"Uber",
          "colors":["#0198BD","#E8FEB5","#FEAD54","#D50255"]},"sizeRange":[0,10],"targetColor":null},
          "textLabel":[{"field":null,"color":[255,255,255],"size":18,"offset":[0,0],"anchor":"start","alignment":"center"}]},
          "visualChannels":{"colorField":{"name":"quadclass","type":"integer"},
          "colorScale":"quantize","sizeField":null,"sizeScale":"linear"}},
          {"id":"nswni4o","type":"hexagon","config":{"dataId":"test_data","label":"loumn","color":[218,112,191],
          "columns":{"lat":"lat","lng":"lng"},"isVisible":true,"visConfig":{"opacity":0.49,"worldUnitSize":46.4542,
          "resolution":8,"colorRange":{"name":"Ice And Fire 4","type":"diverging","category":"Uber","colors":["#0198BD","#E8FEB5","#FEAD54","#D50255"]},"coverage":1,"sizeRange":[0,750],"percentile":[0,99.55],
          "elevationPercentile":[0,100],"elevationScale":34.9,"colorAggregation":"average","sizeAggregation":"average","enable3d":true},
          "textLabel":[{"field":null,"color":[255,255,255],"size":18,"offset":[0,0],"anchor":"start","alignment":"center"}]},
          "visualChannels":{"colorField":{"name":"quadclass","type":"integer"},"colorScale":"quantize",
          "sizeField":{"name":"goldsteinscale","type":"real"},"sizeScale":"linear"}}],"interactionConfig":{"tooltip":{"fieldsToShow":{
          "test_data":["quadclass","goldsteinscale","avgtone","actor1countrycode","actor2countrycode"]},"enabled":true},"brush":{"size":0.5,"enabled":false},"coordinate":{
          "enabled":false}},"layerBlending":"normal","splitMaps":[],"animationConfig":{"currentTime":null,"speed":1}},"mapState":{
          "bearing":24,"dragRotate":true,"latitude":51.42482677741217,"longitude":-113.32932802341696,"pitch":50,"zoom":1.8315069272761153,
          "isSplit":false},"mapStyle":{"styleType":"dark","topLayerGroups":{"label":true},"visibleLayerGroups":{"label":true,"road":true,
          "border":false,"building":true,"water":true,"land":true},
          "threeDBuildingColor":[9.665468314072013,17.18305478057247,31.1442867897876],"mapStyles":{}}}};
        store.dispatch(keplerGl.addDataToMap({
          datasets:[datasets],
          config: config,
          options: {
            centerMap: false
          }
        }));
          }(KeplerGl, store))
          var earth_map = echarts.init(document.getElementById('earth_map'));
          var earth_data=[]
          for(var i=0;i<data.numberReturned;i++){
            if(jQuery.isEmptyObject(data.features[i].properties.actor1geo_location)||jQuery.isEmptyObject(data.features[i].properties.actor2geo_location)){}
            else{
                if(data.features[i].properties.quadclass==1){
                    earth_data.push({
                            coords:[data.features[i].properties.actor1geo_location.coordinates,data.features[i].properties.actor2geo_location.coordinates],
                            lineStyle:{color:'rgb(50, 50, 150)',opacity: 0.01}
                        })
                }
                if(data.features[i].properties.quadclass==2){
                    earth_data.push({
                            coords:[data.features[i].properties.actor1geo_location.coordinates,data.features[i].properties.actor2geo_location.coordinates],
                            lineStyle:{color:'rgb(0, 0, 255)',opacity: 0.04}
                        })
                }
                if(data.features[i].properties.quadclass==3){
                    earth_data.push({
                            coords:[data.features[i].properties.actor1geo_location.coordinates,data.features[i].properties.actor2geo_location.coordinates],
                            lineStyle:{color:'rgb(255, 165, 0)',opacity: 0.005}
                        })
                }
                else{
                    earth_data.push({
                            coords:[data.features[i].properties.actor1geo_location.coordinates,data.features[i].properties.actor2geo_location.coordinates],
                            lineStyle:{color:'rgb(255, 0, 0)',opacity: 0.005}
                        })
                }
            }
        }
        //console.log(final_data)
        //绘图
        earth_map.setOption({
        backgroundColor: '#000',
        globe: {
            baseTexture:'./assets/world.topo.bathy.200401.jpg',
            heightTexture:'./assets/bathymetry_bw_composite_4k.jpg',
        
            shading: 'lambert',
        
            light: {
                ambient: {
                    intensity: 0.5
                },
                main: {
                    intensity: 0.4
                }
            },
        
            viewControl: {
                autoRotate: false
            }
        },
        series: {
        
            type: 'lines3D',
        
            coordinateSystem: 'globe',
        
            effect: {
                show: true,
                trailWidth: 1,
                trailOpacity: 0.05,
                trailLength: 0.2,
                constantSpeed: 20
            },
            
            blendMode: 'lighter',
            data: earth_data
        }
        });
        
    }});
    document.getElementById('showdatetime').innerText = time[0]+"-"+time[1]+"-"+time[2];
};
var toggleableLayerIds = [ 'heatmap', 'circles', 'circles-highlighted'];
 
for (var i = 0; i < toggleableLayerIds.length; i++) {
var id = toggleableLayerIds[i];
 
var link = document.createElement('a');
link.href = '#';
if(i==0||i==2){link.className = ''}
else{
link.className = 'active';}
link.textContent = id; 
link.onclick = function (e) {
    for(var i=0;i<=9;i++){
var clickedLayer = this.textContent+i;
e.preventDefault();
e.stopPropagation(); 
var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
if (visibility === 'visible') {
map.setLayoutProperty(clickedLayer, 'visibility', 'none');
this.className = '';
} else {
this.className = 'active';
map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
}
}
};
 
var layers = document.getElementById('menu');
layers.appendChild(link);
}
var state=0
var num=1
map.on('mousemove', 'circles0', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.   
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted0', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles0'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+features['sourceurl']+'</a>'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles1', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name. 
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted1', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles1'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles2', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted2', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles2'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles3', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted3', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles3'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles4', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted4', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles4'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles5', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.

    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted5', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles5'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles6', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.
  
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted6', ['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles6'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles7', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name. 
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted7',['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles7'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles8', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.  
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted8',['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles8'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('mousemove', 'circles9', function(e) {
    // Change the cursor style as a UI indicator.
    if(state==0){
    map.getCanvas().style.cursor = 'pointer';
    // Single out the first found feature.
    var feature = e.features[0];
    // Query the counties layer visible in the map. Use the filter
    // param to only collect results that share the same county name.
    // Add features that share the same county name to the highlighted layer.
    map.setFilter('circles-highlighted9',['all', ['in', 'eventcode', feature.properties.eventcode],filter]);
    var f=map.queryRenderedFeatures(e.point,{ layers: ['circles9'] })
    var n=0
    var max=0
    for(var i3=0;i3<f.length;i3++){
           if(Math.abs(f[i3]['properties']['goldsteinscale'])>max){
               max=Math.abs(f[i3]['properties']['goldsteinscale'])
               n=i3
           }
    }
    var features = f[n]['properties'];
    num=0
    var soure=''
    for(var i=0;i<features['sourceurl'].length;i++){
            soure=soure+features['sourceurl'][i]
            num=num+1
            if(num>=15){
                soure=soure+'\n'
                num=0
            }
    }
    var d='actor1code:'+features['actor1code']+'\n'+'actor2code:'+features['actor2code']+'\n'+'eventcode:'+features['eventcode']+'\n'+
    '<a href="'+features['sourceurl']+'" target="_blank" class="ex-up">'+soure+'</a>'+'\n'
    d=d+' <button class="btn btn-primary" type="submit" onclick="creatcloud()">submit</button>'
    document.getElementById('features').innerHTML = d;
}});
map.on('click', function (e) {
      if(state==0){
          state=1
      }
      else{
          state=0
      }
    })
function filter2(){
    filter=['all']
    var cl=['any']
    for (var i=1;i<5;i++){
        var id='class'+i;
        var state=$("#"+id).is(':checked')
        if(state==true){
            cl.push(['in','quadclass',i])
        }
    }
    if(cl.length>1){
        filter.push(cl)
    }
    var yxl=$("#ex1").val().split(',')
    var yq=$("#ex2").val().split(',')
    var num1=parseFloat(yxl[0])
    var num2=parseFloat(yxl[1])
    var num3=parseFloat(yq[0])
    var num4=parseFloat(yq[1])
    filter.push(['>=','goldsteinscale',num1])
    filter.push(['<=','goldsteinscale',num2])
    filter.push(['>=','avgtone',num3])
    filter.push(['<=','avgtone',num4])
    for (var i=1;i<=content.length;i++){
        var id='inlineRadio'+i;
        var state=$("#"+id).is(':checked')
        if(state==true){
            filter.push(content[i-1]['filter'])
            console.log(content[i-1]['filter'])
            break
        }
    }
    var fc=['any']
    for (var i=1;i<=num;i++){
        var self=$("#self"+i).val()
        if(self){
        var selfs=self.split(",")
        var fn=['all']
        for(var i2=0;i2<selfs.length;i2++){
            var code=selfs[i2].split(":")
            fn.push(['in',codes[code[0].toLowerCase()],code[1]])
        }
        if(fn.length>1){
        fc.push(fn)
        }
    }
}
    if(fc.length>1){
    filter.push(fc)}
    for(var i=0;i<=9;i++){
    map.setFilter('heatmap'+i, filter);
    map.setFilter('circles'+i, filter);
    var z=map.getFilter('circles-highlighted'+i);
    map.setFilter('circles-highlighted'+i,['all',filter,z])
    }
}
function add(){
    if(availableTags.length==0){
        for(var i2=0;i2<=9;i2++){
    var data=map.querySourceFeatures('geodata'+i2)
    for (var i = 0; i < data.length; i++) {
        var feature = data[i]['properties'];
        availableTags.push('a1c:'+feature['actor1code'])
        availableTags.push('a1n:'+feature['actor1name'])
        availableTags.push('a1cc:'+feature['actor1countrycode'])
        availableTags.push('a1kc:'+feature['actor1knowngroupcode'])
        availableTags.push('a1ec:'+feature['actor1ethniccode'])
        availableTags.push('a1rc1:'+feature['actor1religion1code'])
        availableTags.push('a1rc2:'+feature['actor1religion2code'])
        availableTags.push('a2c:'+feature['actor2code'])
        availableTags.push('a2n:'+feature['actor2name'])
        availableTags.push('a2cc:'+feature['actor2countrycode'])
        availableTags.push('a2kc:'+feature['actor2knowngroupcode'])
        availableTags.push('a2ec:'+feature['actor2ethniccode'])
        availableTags.push('a2rc1:'+feature['actor2religion1code'])
        availableTags.push('a2rc2:'+feature['actor2religion2code'])}
        avtag=unique(availableTags)
    }
}    

    var txt='<input id="self'+(num+1)+'"'+' class="form-control" name="self" type="text" value="">'
    $("#self"+num).after(txt)
    $('.form-control').tagsInput({
        autocomplete:{
            source: avtag,minLength:2,autoFocus: true,delay:500
          }
        });
    num=num+1
}
function change(){
    var ck=$('#map').hasClass();
    if(ck=$('#map').hasClass('col-md-9')){
        $('#map').removeClass('col-md-9')
        $('#map').addClass('col-md-7')
        $("#menu").css("right","400px");
    }
    else{
        $('#map').removeClass('col-md-7')
        $('#map').addClass('col-md-9')
        $("#menu").css("right","200px");
    }
}
var urls=[]
var word={}
function get(url){
    $.ajax({
        type : 'GET',
        url:url,
        dataType:'html',
        success:function (response) {
            var text = $(response).find('p').text();
            var text2=text.replace(/[\|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|||\-|\_|\+|\=|\||\\|||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")
            var words=text2.split(' ')
            var data={}
            var normal=['to','in','on','the','for','and','is','are','was','were','of','from','','be','its','by','my','your','or','and','we','he','she','our','as','not','will','that','a','an','do','did','with','his','her','it','have','has','at','in','on','up','to']
            for(var i=0;i<words.length;i++){
                if(!data[words[i].toLowerCase()]){
                    data[words[i].toLowerCase()]=1
                }
                else{
                    data[words[i].toLowerCase()]+=1
                }
            }
            for(var key in data){
                if(data[key]>words.length/150){
                    var num=0
                    for(var i2=0;i2<normal.length;i2++){
                        if(normal[i2]==key){
                            break
                        }
                        num+=1
                    }
                    if(num>=normal.length){
                        if(!word[key]){
                            word[key]=data[key]
                        }
                        else{
                            word[key]+=data[key]
                        }
                    }
                }
            }
            num_get+=1
            if(num_get==state){
                var c_data=[]
                for(var key in word){
                    c_data.push({'name':key,'value':word[key]})
                }
                var chart3 = echarts.init(document.getElementById('chart3'));
                chart3.setOption({
                    series: [{
                        type: 'wordCloud',
                
                
                        shape: 'circle',
                
                
                
                        left: 'center',
                        top: 'center',
                        width: '70%',
                        height: '80%',
                        right: null,
                        bottom: null,
                
                        sizeRange: [12, 60],
                
                        rotationRange: [-90, 90],
                        rotationStep: 45,
                
                        gridSize: 8,
                        drawOutOfBound: false,
                        textStyle: {
                            normal: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                // Color can be a callback function or a color string
                                color: function () {
                                    // Random color
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                
                        // Data is an array. Each array item must have name and value property.
                        data: c_data
                    }]
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            num_get+=1
            if(num_get==state){
                var c_data=[]
                for(var key in word){
                    c_data.push({'name':key,'value':word[key]})
                }
                var chart3 = echarts.init(document.getElementById('chart3'));
                chart3.setOption({
                    series: [{
                        type: 'wordCloud',
                
                
                        shape: 'circle',
                

                
                        left: 'center',
                        top: 'center',
                        width: '70%',
                        height: '80%',
                        right: null,
                        bottom: null,
                
                        sizeRange: [12, 60],
                
                        rotationRange: [-90, 90],
                        rotationStep: 45,
                
                        gridSize: 8,
                        drawOutOfBound: false,
                        textStyle: {
                            normal: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                // Color can be a callback function or a color string
                                color: function () {
                                    // Random color
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                
                        // Data is an array. Each array item must have name and value property.
                        data: c_data
                    }]
                });
            }
        }
    })
    
}
function geturl(){
    for(var i=0;i<=9;i++){
        var filter3=map.getFilter('circles-highlighted'+i)
        var data=map.querySourceFeatures('geodata'+i, {
            filter: filter3
            })
        for(var i2=0;i2<data.length;i2++){
             urls.push(data[i2]['properties']['sourceurl'])
        }
    }
}
var num_get=0
var state=10
function creatcloud(){
    urls=[]
    word={}
    geturl()
    num_get=0
    state=10
    urls=unique(urls)
    if(url.length<10){
        state=urls.length
    }
    for(var i=0;i<state;i++){
           get(urls[i])
    }
}
