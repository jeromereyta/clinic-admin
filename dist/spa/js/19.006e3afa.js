(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19,31,32],{"3f49":function(a,t,e){"use strict";e.r(t);var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"col-lg-6 col-md-6 col-sm-12 col-xs-12"},[e("q-card",{staticClass:"my-card"},[e("div",{staticStyle:{width:"60%",height:"50%"}},[e("q-img",{staticStyle:{"padding-top":"15px"},attrs:{src:"https://i.pinimg.com/originals/64/dc/12/64dc12b3dea9667d618cf26306aa097f.gif",height:"50"}}),e("q-card-section",[e("div",{staticClass:"text-h6"},[a._v("Currently in Progress")]),e("div",{staticClass:"text-subtitle2"},[a._v(a._s(a.patient_name))]),e("div",{staticClass:"text-subtitle2"},[a._v(a._s(a.patient_code))])]),e("q-card-actions",{attrs:{align:"center"}})],1)])],1)},s=[],n={name:"CardProfile",computed:{patient_name:function(){return this.$store.state.queues.patient_name},patient_code:function(){return this.$store.state.queues.patient_code}}},c=n,o=e("2877"),i=e("f09f"),d=e("068f"),l=e("a370"),u=e("4b7e"),f=e("9c40"),m=e("eebe"),p=e.n(m),b=Object(o["a"])(c,r,s,!1,null,"cd5902a8",null);t["default"]=b.exports;p()(b,"components",{QCard:i["a"],QImg:d["a"],QCardSection:l["a"],QCardActions:u["a"],QBtn:f["a"]})},"727f":function(a,t,e){"use strict";e.r(t);var r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("q-card",[e("q-card-section",[e("div",{staticClass:"text-h6 text-grey-8"},[a._v("\n      Custom Grid View\n    ")])]),e("q-separator"),e("q-card-section",{staticClass:"q-pa-none"},[e("q-table",{attrs:{grid:"",data:a.data,columns:a.columns,"hide-bottom":""},scopedSlots:a._u([{key:"item",fn:function(a){return[e("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3"},[e("card-profile",{attrs:{avatar:a.row.avatar,name:a.row.name,des:a.row.des}})],1)]}}])})],1)],1)},s=[],n=e("3f49"),c={name:"TableCustomGrid",components:{CardProfile:n["default"]},data:function(){return{columns:[{name:"Name",label:"Name",field:"name",sortable:!0,align:"left"},{name:"Crated Date",label:"Crated Date",field:"Crated_Date",sortable:!0,align:"left"},{name:"Project",label:"Project",field:"Project",sortable:!0,align:"left"},{name:"Action",label:"",field:"Action",sortable:!1,align:"center"}],data:[{name:"Pratik Patel",Crated_Date:"15/3/2020",Project:"Quasar Admin",avatar:"https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",progress:80,des:"Solutions Developer"},{name:"Mayank Patel",Crated_Date:"10/2/2018",Project:"Quasar QDraggableTree",avatar:"https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4",progress:50,des:"Solutions Developer"},{name:"Mayur Patel",Crated_Date:"10/2/2018",Project:"Quasar Shopping",avatar:"https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4",progress:100,des:"Solutions Developer"},{name:"Jeff Galbraith",Crated_Date:"10/2/2019",Project:"Quasar QMarkdown",avatar:"https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4",progress:60,des:"Solutions Developer"},{name:"Pratik Patel",Crated_Date:"10/1/2020",Project:"Quasar QGrid",avatar:"https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",progress:30,des:"Solutions Developer"}]}}},o=c,i=e("2877"),d=e("f09f"),l=e("a370"),u=e("eb85"),f=e("eaac"),m=e("eebe"),p=e.n(m),b=Object(i["a"])(o,r,s,!1,null,"121ea3c7",null);t["default"]=b.exports;p()(b,"components",{QCard:d["a"],QCardSection:l["a"],QSeparator:u["a"],QTable:f["a"]})}}]);