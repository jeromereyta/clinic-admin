(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{"1b5d":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"row q-col-gutter-sm  q-pt-sm"},[t("div",{staticClass:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},[t("q-card",{staticStyle:{"background-color":"#38b1c5"}},[t("q-card-section",{staticClass:"text-h6 text-white"},[e._v("\n        Today's View\n      ")]),t("q-card-section",{staticClass:"q-pa-none"},[t("IEcharts",{staticStyle:{height:"250px"},attrs:{option:e.LineChart2,resizable:!0}})],1)],1)],1),t("div",{staticClass:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},[t("q-card",{staticStyle:{"background-color":"#ea4b64"}},[t("q-card-section",{staticClass:"text-h6 text-white"},[e._v("\n        Daily Sales\n      ")]),t("q-card-section",{staticClass:"q-pa-none"},[t("IEcharts",{staticStyle:{height:"250px"},attrs:{option:e.BarChart,resizable:!0}})],1)],1)],1),t("div",{staticClass:"col-lg-4 col-md-4 col-sm-12 col-xs-12"},[t("q-card",{staticStyle:{"background-color":"#1e88e5"}},[t("q-card-section",{staticClass:"text-h6 text-white"},[e._v("\n        Today's User Visit\n      ")]),t("q-card-section",{staticClass:"q-pa-none"},[t("IEcharts",{staticStyle:{height:"250px"},attrs:{option:e.LineChart,resizable:!0}})],1)],1)],1)])},s=[],l=t("ce44"),o={name:"CardCharts",components:{IEcharts:l["a"]},data:function(){return{BarChart:{tooltip:{show:!0},title:{show:!0,textStyle:{color:"rgba(0, 0, 0 , .87)",fontFamily:"sans-serif"}},grid:{containLabel:!0,bottom:"10%",top:"5%"},xAxis:{show:!1,type:"category",axisLine:{lineStyle:{color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisTick:{show:!0,alignWithLabel:!0,lineStyle:{show:!0,color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisLabel:{show:!1}},yAxis:{show:!1,type:"value",axisLine:{lineStyle:{color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisLabel:{show:!1},splitLine:{lineStyle:{type:"dashed"}},axisTick:{show:!0,lineStyle:{show:!0,color:"rgba(0, 0, 0 , .54)",type:"dashed"}}},series:[{type:"bar",barGap:"-100%",itemStyle:{normal:{color:"rgba(0,0,0,0.1)"}},barWidth:"50%"},{barWidth:"50%",type:"bar",itemStyle:{normal:{color:"#ffffff"}}}],dataset:{source:[{label:"0D",max:500,sales:220},{label:"1D",max:500,sales:182},{label:"2D",max:500,sales:191},{label:"3D",max:500,sales:234},{label:"4D",max:500,sales:290},{label:"5D",max:500,sales:330},{label:"6D",max:500,sales:310},{label:"7D",max:500,sales:123},{label:"8D",max:500,sales:442},{label:"9D",max:500,sales:321},{label:"10D",max:500,sales:90},{label:"11D",max:500,sales:149},{label:"12D",max:500,sales:210},{label:"13D",max:500,sales:122},{label:"14D",max:500,sales:133},{label:"15D",max:500,sales:334},{label:"16D",max:500,sales:198},{label:"17D",max:500,sales:123},{label:"18D",max:500,sales:125},{label:"19D",max:500,sales:220}]}},LineChart:{tooltip:{show:!0},title:{show:!0,textStyle:{color:"rgba(0, 0, 0 , .87)",fontFamily:"sans-serif"}},grid:{containLabel:!0,left:"0",bottom:"0",right:"0"},xAxis:{show:!1,type:"category",axisLine:{lineStyle:{color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisTick:{show:!0,alignWithLabel:!0,lineStyle:{show:!0,color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisLabel:{show:!1},boundaryGap:!1},yAxis:{show:!1,type:"value",axisLine:{lineStyle:{color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisLabel:{show:!1},splitLine:{lineStyle:{type:"dashed"}},axisTick:{show:!0,lineStyle:{show:!0,color:"rgba(0, 0, 0 , .54)",type:"dashed"}}},series:[{type:"line",areaStyle:{},smooth:!0}],dataset:{source:[{month:"Jan","Unique Visit":296,"Page View":548},{month:"Feb","Unique Visit":1181,"Page View":714},{month:"Mar","Unique Visit":235,"Page View":961},{month:"Apr","Unique Visit":294,"Page View":580},{month:"May","Unique Visit":765,"Page View":730},{month:"Jun","Unique Visit":412,"Page View":1249},{month:"Jul","Unique Visit":1125,"Page View":267},{month:"Aug","Unique Visit":800,"Page View":251},{month:"Sep","Unique Visit":948,"Page View":1043},{month:"Oct","Unique Visit":1046,"Page View":1118},{month:"Nov","Unique Visit":363,"Page View":573},{month:"Dec","Unique Visit":909,"Page View":283}]},color:["#2196f3"]},LineChart2:{tooltip:{show:!0},title:{show:!0,textStyle:{color:"rgba(0, 0, 0 , .87)",fontFamily:"sans-serif"}},grid:{containLabel:!0,left:"0",bottom:"0",right:"0"},xAxis:{show:!1,type:"category",axisLine:{lineStyle:{color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisTick:{show:!0,alignWithLabel:!0,lineStyle:{show:!0,color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisLabel:{show:!1},boundaryGap:!1},yAxis:{show:!1,type:"value",axisLine:{lineStyle:{color:"rgba(0, 0, 0 , .54)",type:"dashed"}},axisLabel:{show:!1},splitLine:{lineStyle:{type:"dashed"}},axisTick:{show:!0,lineStyle:{show:!0,color:"rgba(0, 0, 0 , .54)",type:"dashed"}}},series:[{type:"line",areaStyle:{},smooth:!1}],dataset:{source:[{month:"Jan","Unique Visit":296,"Page View":548},{month:"Feb","Unique Visit":1181,"Page View":714},{month:"Mar","Unique Visit":235,"Page View":961},{month:"Apr","Unique Visit":294,"Page View":580},{month:"May","Unique Visit":765,"Page View":730},{month:"Jun","Unique Visit":412,"Page View":1249},{month:"Jul","Unique Visit":1125,"Page View":267},{month:"Aug","Unique Visit":800,"Page View":251},{month:"Sep","Unique Visit":948,"Page View":1043},{month:"Oct","Unique Visit":1046,"Page View":1118},{month:"Nov","Unique Visit":363,"Page View":573},{month:"Dec","Unique Visit":909,"Page View":283}]},color:["#45c2c5"]}}}},n=o,r=t("2877"),c=t("f09f"),h=t("a370"),b=t("eebe"),d=t.n(b),y=Object(r["a"])(n,i,s,!1,null,null,null);a["default"]=y.exports;d()(y,"components",{QCard:c["a"],QCardSection:h["a"]})}}]);