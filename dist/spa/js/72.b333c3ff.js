(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[72,73,74],{a27d:function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("q-table",{attrs:{title:"",data:e.computedFileData,columns:e.fileColumns,"row-key":"id"},scopedSlots:e._u([{key:"body-cell-Action",fn:function(n){return[t("q-td",{attrs:{props:n}},[t("q-btn",{attrs:{icon:"visibility",size:"sm",flat:"",dense:""},on:{click:function(t){return e.openFileLink(n.row)}}})],1)]}}])})},l=[],i=(t("9911"),{name:"TableFileUploads",props:["filesData","isLoading"],computed:{computedFileData:function(){return this.filesData}},data:function(){return{fileColumns:[{name:"file_name",label:"File Name",field:"file_name",align:"left"},{name:"file_type_name",label:"File Type",field:"file_type_name",align:"left"},{name:"format",label:"Format",field:"format",align:"left"},{name:"Action",label:"View File",field:"Action",sortable:!1,align:"center"}]}},methods:{openFileLink:function(e){window.open(e.link,"_blank")}}}),o=i,s=t("2877"),c=t("eaac"),f=t("db86"),r=t("9c40"),d=t("eebe"),u=t.n(d),m=Object(s["a"])(o,a,l,!1,null,"61aa4251",null);n["default"]=m.exports;u()(m,"components",{QTable:c["a"],QTd:f["a"],QBtn:r["a"]})}}]);