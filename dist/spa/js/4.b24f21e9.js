(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{6865:function(e,t,r){"use strict";r("9cdf")},"9cdf":function(e,t,r){},f894:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-card",[r("q-card-section",[r("div",{staticClass:"text-h6 text-grey-8"},[e._v("\n        Category Procedure List\n        "),r("q-btn",{staticClass:"float-right text-capitalize text-indigo-8 shadow-3",attrs:{label:"Create Category",icon:"add"},on:{click:function(t){e.categoryForm=!0}}})],1)]),r("q-card-section",{staticClass:"q-pa-none"},[r("q-table",{attrs:{title:"",data:e.computedCategories,columns:e.columns,"row-key":"id",filter:e.filter},scopedSlots:e._u([{key:"top-right",fn:function(){return[e.show_filter?r("q-input",{attrs:{filled:"",borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[r("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!1,4009527860),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}):e._e(),r("q-btn",{staticClass:"q-ml-sm",attrs:{icon:"filter_list",flat:""},on:{click:function(t){e.show_filter=!e.show_filter}}})]},proxy:!0},{key:"body-cell-Action",fn:function(e){return[r("q-td",{attrs:{props:e}})]}}])}),e.isLoading?r("q-linear-progress",{attrs:{query:"",size:"10px",color:"blue"}}):e._e()],1),r("q-dialog",{model:{value:e.categoryForm,callback:function(t){e.categoryForm=t},expression:"categoryForm"}},[r("q-card",{staticStyle:{width:"500px","max-width":"100vw",height:"500px","max-height":"100vw"}},[r("q-card-section",[r("h5",[e._v(" Create Category Procedure")]),r("q-form",{staticClass:"q-gutter-md"},[r("q-input",{attrs:{filled:"",label:"Category Name*","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.category.name,callback:function(t){e.$set(e.category,"name",t)},expression:"category.name"}}),r("q-input",{attrs:{filled:"",label:"Description *","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.category.description,callback:function(t){e.$set(e.category,"description",t)},expression:"category.description"}}),r("div",{staticClass:"row"},[r("div",{staticClass:"block",staticStyle:{"margin-right":"9%",width:"30%"}},[r("q-select",{attrs:{options:e.types,label:"Type *"},model:{value:e.category.type,callback:function(t){e.$set(e.category,"type",t)},expression:"category.type"}})],1)]),r("div",[r("q-btn",{attrs:{label:"Submit",color:"primary"},on:{click:function(t){return e.createCategoryProcedure()}}}),r("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Cancel",color:"primary",flat:""},on:{click:function(t){e.categoryForm=!1}}})],1)],1)],1),r("q-inner-loading",{attrs:{showing:e.createLoading}},[r("q-spinner-grid",{attrs:{size:"200px",color:"pink"}})],1)],1)],1),r("q-dialog",{attrs:{"transition-show":"scale"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[r("q-card",{staticClass:"bg-red-4 text-white",staticStyle:{width:"300px"}},[r("q-card-section",[r("div",{staticClass:"text-h6"},[e._v("Error")])]),r("q-card-section",{staticClass:"q-pt-none"},[r("ul",e._l(e.errorMessages,(function(t){return r("li",{key:t},[e._v("\n              "+e._s(t)+"\n            ")])})),0)]),r("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"right"}},[r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK"}})],1)],1)],1)],1)},o=[],s=(r("b0c0"),{name:"TableCategoryProcedures",data:function(){return{data:[],category:{},categoryForm:!1,createLoading:!1,isLoading:!1,filter:"",types:["Laboratory","Consultation","Others"],show_filter:!1,columns:[{name:"id",label:"ID",field:"id",sortable:!0,align:"left"},{name:"name",required:!0,label:"Name",align:"left",field:function(e){return e.name},format:function(e){return"".concat(e)},sortable:!0},{name:"description",label:"Description",field:"description",align:"left"},{name:"type",label:"Type",field:"type",align:"left"},{name:"Action",label:"",field:"Action",sortable:!1,align:"center"}],error:!1,errorMessages:[]}},created:function(){this.getCategoryProcedures()},computed:{computedCategories:function(){var e;return null!==(e=this.$store.state.categoryProcedures.categoryProcedures)&&void 0!==e?e:[]}},methods:{createCategoryProcedure:function(){var e=this;this.createLoading=!0,this.$store.dispatch("categoryProcedures/add",this.category).then((function(t){e.createLoading=!1,401===t.status?e.$router.push("/UsersAdmin"):t.status>201?e.processError(t.data):(e.category={},e.categoryForm=!1)}))},getCategoryProcedures:function(){var e=this;0===this.computedCategories.length&&(this.isLoading=!0,this.$store.dispatch("categoryProcedures/list").then((function(t){e.isLoading=!1,401===t.status&&e.$router.push("/UsersAdmin")})))},processError:function(e){for(var t in this.errorMessages=[],e){var r=e[t];for(var a in r)this.errorMessages.push(r[a])}this.error=!0}}}),i=s,n=(r("6865"),r("2877")),c=r("f09f"),l=r("a370"),d=r("9c40"),u=r("eaac"),g=r("27f9"),p=r("0016"),f=r("db86"),y=r("6b1d"),m=r("24e8"),h=r("0378"),b=r("ddd8"),q=r("74f7"),C=r("981c"),v=r("4b7e"),w=r("7f67"),x=r("eebe"),k=r.n(x),_=Object(n["a"])(i,a,o,!1,null,"d8e3b59a",null);t["default"]=_.exports;k()(_,"components",{QCard:c["a"],QCardSection:l["a"],QBtn:d["a"],QTable:u["a"],QInput:g["a"],QIcon:p["a"],QTd:f["a"],QLinearProgress:y["a"],QDialog:m["a"],QForm:h["a"],QSelect:b["a"],QInnerLoading:q["a"],QSpinnerGrid:C["a"],QCardActions:v["a"]}),k()(_,"directives",{ClosePopup:w["a"]})}}]);