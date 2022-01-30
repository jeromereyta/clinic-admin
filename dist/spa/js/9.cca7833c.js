(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"1f7a":function(e,t,r){},"713bc":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-card",[r("q-card-section",[r("div",{staticClass:"text-h6 text-grey-8"},[e._v("\n        Procedure List\n        "),r("q-btn",{staticClass:"float-right text-capitalize text-indigo-8 shadow-3",attrs:{label:"Create Procedure",icon:"add"},on:{click:function(t){e.procedureForm=!0}}})],1)]),r("q-card-section",{staticClass:"q-pa-none"},[r("q-table",{attrs:{title:"",data:e.computedProcedures,columns:e.columns,"row-key":"id",filter:e.filter},scopedSlots:e._u([{key:"top-right",fn:function(){return[e.show_filter?r("q-input",{attrs:{filled:"",borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[r("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!1,4009527860),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}):e._e(),r("q-btn",{staticClass:"q-ml-sm",attrs:{icon:"filter_list",flat:""},on:{click:function(t){e.show_filter=!e.show_filter}}})]},proxy:!0},{key:"body-cell-Action",fn:function(e){return[r("q-td",{attrs:{props:e}})]}}])}),e.isLoading?r("q-linear-progress",{attrs:{query:"",size:"10px",color:"blue"}}):e._e()],1),r("q-dialog",{model:{value:e.procedureForm,callback:function(t){e.procedureForm=t},expression:"procedureForm"}},[r("q-card",{staticStyle:{width:"500px","max-width":"100vw",height:"500px","max-height":"100vw"}},[r("q-card-section",[r("h5",[e._v(" Create Procedure")]),r("q-form",{staticClass:"q-gutter-md"},[r("q-input",{attrs:{filled:"",label:"Procedure Name*","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.procedure.name,callback:function(t){e.$set(e.procedure,"name",t)},expression:"procedure.name"}}),r("q-input",{attrs:{filled:"",label:"Description *","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.procedure.description,callback:function(t){e.$set(e.procedure,"description",t)},expression:"procedure.description"}}),r("q-input",{attrs:{filled:"",label:"Price *","lazy-rules":"",type:"number",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.procedure.price,callback:function(t){e.$set(e.procedure,"price",t)},expression:"procedure.price"}}),r("div",{staticClass:"row"},[r("div",{staticClass:"block",staticStyle:{"margin-right":"9%",width:"100%"}},[r("q-select",{attrs:{options:e.computedCategories,label:"Category *","option-label":"name"},model:{value:e.procedure.selected_category,callback:function(t){e.$set(e.procedure,"selected_category",t)},expression:"procedure.selected_category"}})],1)]),r("div",[r("q-btn",{attrs:{label:"Submit",color:"primary"},on:{click:function(t){return e.createProcedure()}}}),r("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Cancel",color:"primary",flat:""},on:{click:function(t){e.procedureForm=!1}}})],1)],1)],1),r("q-inner-loading",{attrs:{showing:e.createLoading}},[r("q-spinner-grid",{attrs:{size:"200px",color:"pink"}})],1)],1)],1),r("q-dialog",{attrs:{"transition-show":"scale"},model:{value:e.error,callback:function(t){e.error=t},expression:"error"}},[r("q-card",{staticClass:"bg-red-4 text-white",staticStyle:{width:"300px"}},[r("q-card-section",[r("div",{staticClass:"text-h6"},[e._v("Error")])]),r("q-card-section",{staticClass:"q-pt-none"},[r("ul",e._l(e.errorMessages,(function(t){return r("li",{key:t},[e._v("\n              "+e._s(t)+"\n            ")])})),0)]),r("q-card-actions",{staticClass:"bg-white text-teal",attrs:{align:"right"}},[r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK"}})],1)],1)],1)],1)},a=[],s=(r("7db0"),r("d81d"),r("b0c0"),{name:"TableProcedures",data:function(){return{data:[],procedure:{selected_category:null},procedureForm:!1,createLoading:!1,error:!1,errorMessages:[],isLoading:!1,filter:"",show_filter:!1,columns:[{name:"id",label:"ID",field:"id",sortable:!0,align:"left"},{name:"name",required:!0,label:"Name",align:"left",field:function(e){return e.name},format:function(e){return"".concat(e)},sortable:!0},{name:"description",label:"Description",field:"description",align:"left"},{name:"category",label:"Category",field:"category_name",align:"left"},{name:"Action",label:"",field:"Action",sortable:!1,align:"center"}]}},created:function(){this.getProcedures()},computed:{computedProcedures:function(){var e,t=this;return null!==(e=this.$store.state.procedures.procedures.map((function(e){var r=t.computedCategories.find((function(t){return t.id===e.category_procedure_id}));return void 0!==r&&(e.category_name=r.name),e})))&&void 0!==e?e:[]},computedCategories:function(){var e;return null!==(e=this.$store.state.categoryProcedures.categoryProcedures)&&void 0!==e?e:[]}},methods:{createProcedure:function(){var e=this;this.createLoading=!0,this.procedure.category_procedure_id=this.procedure.selected_category.id,this.$store.dispatch("procedures/add",this.procedure).then((function(t){e.createLoading=!1,401===t.status?e.$router.push("/UsersAdmin"):t.status>200?e.processError(t.data):(e.category={},e.procedureForm=!1)}))},getProcedures:function(){var e=this;0===this.computedProcedures.length&&(this.isLoading=!0,this.$store.dispatch("procedures/list").then((function(t){e.isLoading=!1,401===t.status&&e.$router.push("/UsersAdmin")}))),0===this.computedCategories.length&&(this.isLoading=!0,this.$store.dispatch("categoryProcedures/list").then((function(t){e.isLoading=!1,401===t.status&&e.$router.push("/UsersAdmin")})))},processError:function(e){for(var t in this.errorMessages=[],e){var r=e[t];for(var o in r)this.errorMessages.push(r[o])}this.error=!0}}}),i=s,n=(r("94e7"),r("2877")),c=r("f09f"),l=r("a370"),d=r("9c40"),u=r("eaac"),p=r("27f9"),f=r("0016"),g=r("db86"),m=r("6b1d"),h=r("24e8"),b=r("0378"),y=r("ddd8"),q=r("74f7"),v=r("981c"),_=r("4b7e"),C=r("7f67"),w=r("eebe"),x=r.n(w),P=Object(n["a"])(i,o,a,!1,null,"5ba78032",null);t["default"]=P.exports;x()(P,"components",{QCard:c["a"],QCardSection:l["a"],QBtn:d["a"],QTable:u["a"],QInput:p["a"],QIcon:f["a"],QTd:g["a"],QLinearProgress:m["a"],QDialog:h["a"],QForm:b["a"],QSelect:y["a"],QInnerLoading:q["a"],QSpinnerGrid:v["a"],QCardActions:_["a"]}),x()(P,"directives",{ClosePopup:C["a"]})},"94e7":function(e,t,r){"use strict";r("1f7a")}}]);