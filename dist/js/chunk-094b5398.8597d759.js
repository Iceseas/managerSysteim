(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-094b5398"],{"1dde":function(t,e,a){var i=a("d039"),n=a("b622"),s=a("2d00"),o=n("species");t.exports=function(t){return s>=51||!i((function(){var e=[],a=e.constructor={};return a[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"2aa3":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"showTable_box"},[a("div",{staticClass:"Icontainer",staticStyle:{display:"flex","flex-direction":"column"}},[a("div",{staticClass:"IcontainerTopRow"},[a("div",{staticClass:"IcontainerTopTitle"},[t._v("查询列表")]),a("div",{staticClass:"IcontainerTopBtns"},[a("Button",{staticClass:"marginR10",attrs:{type:"primary"},on:{click:t.searchFn}},[t._v("查询")]),a("Button",{attrs:{type:"primary"},on:{click:t.resetFn}},[t._v("重置")])],1)]),a("div",{staticClass:"searchFormBody"},[a("Form",{ref:"formList",attrs:{"label-colon":!0,model:t.FormData.data,rules:t.FormData.rules,"label-width":100}},[a("Row",[a("Col",{attrs:{span:6}},[a("FormItem",{attrs:{label:"模糊搜索",prop:"kw"}},[a("Input",{attrs:{clearable:"",placeholder:"章节/难度"},model:{value:t.FormData.data.kw,callback:function(e){t.$set(t.FormData.data,"kw",e)},expression:"FormData.data.kw"}})],1)],1)],1)],1)],1)]),a("div",{staticClass:"Icontainer"},[a("div",{staticClass:"IcontainerTopRow"},[a("div",{staticClass:"IcontainerTopTitle"},[t._v("数据列表")]),a("div",{staticClass:"IcontainerTopBtns"},[a("Button",{staticClass:"marginR10",attrs:{type:"primary"},on:{click:function(e){return t.addNewQuestion()}}},[t._v("添加")]),a("Button",{attrs:{type:"error"},on:{click:t.delDatas}},[t._v("批量删除")])],1)]),a("Table",{attrs:{height:t.table.height,stripe:"",border:"",columns:t.table.columns,loading:t.table.loading,data:t.table.tableData},on:{"on-selection-change":t.handleSelect},scopedSlots:t._u([{key:"difficulty",fn:function(e){var i=e.row;e.index;return["简单"===i.difficulty?a("Tag",{attrs:{size:"large",color:"green"}},[t._v("简单")]):"较难"===i.difficulty?a("Tag",{attrs:{size:"large",color:"gold"}},[t._v("较难")]):a("Tag",{attrs:{size:"large",color:"red"}},[t._v("困难")])]}},{key:"action",fn:function(e){var i=e.row;e.index;return[a("Button",{staticClass:"marginR10",attrs:{type:"info"},on:{click:function(e){return t.showFn(i)}}},[t._v("查看")]),a("Button",{staticClass:"marginR10",attrs:{type:"success"},on:{click:function(e){return t.editFn(i)}}},[t._v("修改")]),a("Button",{attrs:{type:"error"},on:{click:function(e){return t.delFn(i)}}},[t._v("删除")])]}}])})],1),a("Page",{attrs:{total:t.table.total,current:t.FormData.data.page,"page-size":t.FormData.data.pageSize,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.pageChange,"on-page-size-change":t.pageSizeChange}}),a("singleQsForm",{ref:"singleQsForm",on:{callBack:t.handleQsCallBack}})],1)},n=[],s=(a("a15b"),a("d81d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Modal",{attrs:{width:"660"},model:{value:t.modalData.modalBoolean,callback:function(e){t.$set(t.modalData,"modalBoolean",e)},expression:"modalData.modalBoolean"}},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-size":"20px"}},[t._v(t._s(t.modalData.title))])]),a("div",[a("Form",{ref:"formList",attrs:{"label-colon":!0,model:t.FormData.data,rules:t.FormData.rules,"label-width":100}},[a("FormItem",{attrs:{label:"问题",prop:"Question"}},[a("Input",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,type:"textarea",autosize:"",placeholder:"请输入问题"},model:{value:t.FormData.data.Question,callback:function(e){t.$set(t.FormData.data,"Question",e)},expression:"FormData.data.Question"}})],1),a("FormItem",{attrs:{label:"选项一",prop:"Item1"}},[a("Input",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请输入选项1内容"},model:{value:t.FormData.data.Item1,callback:function(e){t.$set(t.FormData.data,"Item1",e)},expression:"FormData.data.Item1"}})],1),a("FormItem",{attrs:{label:"选项二",prop:"Item2"}},[a("Input",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请输入选项2内容"},model:{value:t.FormData.data.Item2,callback:function(e){t.$set(t.FormData.data,"Item2",e)},expression:"FormData.data.Item2"}})],1),a("FormItem",{attrs:{label:"选项三",prop:"Item3"}},[a("Input",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请输入选项3内容"},model:{value:t.FormData.data.Item3,callback:function(e){t.$set(t.FormData.data,"Item3",e)},expression:"FormData.data.Item3"}})],1),a("FormItem",{attrs:{label:"选项四",prop:"Item4"}},[a("Input",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请输入选项4内容"},model:{value:t.FormData.data.Item4,callback:function(e){t.$set(t.FormData.data,"Item4",e)},expression:"FormData.data.Item4"}})],1),a("FormItem",{attrs:{label:"答案",prop:"Answer"}},[a("Select",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请选择"},model:{value:t.FormData.data.Answer,callback:function(e){t.$set(t.FormData.data,"Answer",e)},expression:"FormData.data.Answer"}},[a("Option",{attrs:{value:"A"}},[t._v("A")]),a("Option",{attrs:{value:"B"}},[t._v("B")]),a("Option",{attrs:{value:"C"}},[t._v("C")]),a("Option",{attrs:{value:"D"}},[t._v("D")])],1)],1),a("FormItem",{attrs:{label:"知识点",prop:"KN"}},[a("Input",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请输入涉及知识点"},model:{value:t.FormData.data.KN,callback:function(e){t.$set(t.FormData.data,"KN",e)},expression:"FormData.data.KN"}})],1),a("FormItem",{attrs:{label:"难度",prop:"difficulty"}},[a("RadioGroup",{model:{value:t.FormData.data.difficulty,callback:function(e){t.$set(t.FormData.data,"difficulty",e)},expression:"FormData.data.difficulty"}},[a("Radio",{attrs:{disabled:t.isDisabled,label:"简单"}},[t._v("简单")]),a("Radio",{attrs:{disabled:t.isDisabled,label:"较难"}},[t._v("较难")]),a("Radio",{attrs:{disabled:t.isDisabled,label:"困难"}},[t._v("困难")])],1)],1),a("FormItem",{attrs:{label:"涉及章节",prop:"Chapter"}},[a("Select",{staticStyle:{width:"95%"},attrs:{disabled:t.isDisabled,placeholder:"请选择"},model:{value:t.FormData.data.Chapter,callback:function(e){t.$set(t.FormData.data,"Chapter",e)},expression:"FormData.data.Chapter"}},[a("Option",{attrs:{value:"Ch1"}},[t._v("第一章")]),a("Option",{attrs:{value:"Ch2"}},[t._v("第二章")]),a("Option",{attrs:{value:"Ch3"}},[t._v("第三章")]),a("Option",{attrs:{value:"Ch4"}},[t._v("第四章")]),a("Option",{attrs:{value:"Ch5"}},[t._v("第五章")]),a("Option",{attrs:{value:"Ch6"}},[t._v("第六章")]),a("Option",{attrs:{value:"Ch7"}},[t._v("第七章")]),a("Option",{attrs:{value:"Ch8"}},[t._v("第八章")]),a("Option",{attrs:{value:"Ch9"}},[t._v("第九章")]),a("Option",{attrs:{value:"Ch10"}},[t._v("第十章")]),a("Option",{attrs:{value:"Ch11"}},[t._v("第十一章")])],1)],1)],1)],1),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{size:"large"},on:{click:t.closeModal}},[t._v("取消")]),a("Button",{attrs:{type:"primary",size:"large"},on:{click:t.addNewQS}},[t._v("确定")])],1)])}),o=[],r={data:function(){return{modalData:{title:"添加单选题",modalBoolean:!1},nowType:"",isDisabled:!1,FormData:{rules:{Question:[{required:!0,message:"不能为空",trigger:"blur"}],Item1:[{required:!0,message:"不能为空",trigger:"blur"}],Item2:[{required:!0,message:"不能为空",trigger:"blur"}],Answer:[{required:!0,message:"不能为空",trigger:"change"}],KN:[{required:!0,message:"不能为空",trigger:"blur"}],Chapter:[{required:!0,message:"不能为空",trigger:"change"}],difficulty:[{required:!0,message:"不能为空",trigger:"change"}]},data:{Question:"",Item1:"",Item2:"",Item3:"",Item4:"",Answer:"",KN:"",Chapter:"",difficulty:""}}}},methods:{init:function(t,e){this.nowType=t,"edit"===t?(this.$refs.formList.resetFields(),this.isDisabled=!1,this.modalData.title="更新选择题",this.FormData.data=e):"add"===t?(this.isDisabled=!1,this.$refs.formList.resetFields(),this.modalData.title="添加选择题"):"show"===t&&(this.isDisabled=!0,this.FormData.data=e,this.modalData.title="查看选择题"),this.modalData.modalBoolean=!0},closeModal:function(){this.modalData.modalBoolean=!1,this.isDisabled=!1},addNewQS:function(){var t=this;this.$refs.formList.validate((function(e){if(!e)return t.$Message.destroy(),void t.$Message.error("请按要求填写");t.$emit("callBack",t.FormData.data,t.nowType),t.modalData.modalBoolean=!1,t.isDisabled=!1}))}}},l=r,c=a("2877"),d=Object(c["a"])(l,s,o,!1,null,null,null),u=d.exports,g=a("4ec3"),m={data:function(){return{FormData:{data:{kw:"",pageSize:20,page:1},rules:{}},table:{total:0,loading:!1,height:"515",columns:[{title:"序号",type:"index",width:80,align:"center"},{title:"问题",align:"center",tooltip:!0,key:"Question"},{title:"选项1",align:"center",tooltip:!0,width:"100",key:"Item1"},{title:"选项2",align:"center",tooltip:!0,width:"100",key:"Item2"},{title:"选项3",align:"center",tooltip:!0,width:"100",key:"Item3"},{title:"选项4",align:"center",tooltip:!0,width:"100",key:"Item4"},{title:"知识点",align:"center",width:"200",tooltip:!0,key:"KN"},{title:"章节",align:"center",tooltip:!0,width:"100",key:"Chapter"},{title:"难度",align:"center",width:"100",slot:"difficulty",tooltip:!0,key:"difficulty"},{title:"答案",align:"center",width:"100",tooltip:!0,key:"Answer"},{title:"操作",slot:"action",width:280,align:"center"}],tableData:[]},ids:"",chapterList:[{key:"Ch1",value:"Ch1",label:"第一章"},{key:"Ch2",value:"Ch2",label:"第二章"},{key:"Ch3",value:"Ch3",label:"第三章"},{key:"Ch4",value:"Ch4",label:"第四章"},{key:"Ch5",value:"Ch5",label:"第五章"},{key:"Ch6",value:"Ch6",label:"第六章"},{key:"Ch7",value:"Ch7",label:"第七章"},{key:"Ch8",value:"Ch8",label:"第八章"},{key:"Ch9",value:"Ch9",label:"第九章"},{key:"Ch10",value:"Ch10",label:"第十章"},{key:"Ch11",value:"Ch11",label:"第十一章"}],selectionItems:[]}},mounted:function(){this.getList()},methods:{addNewQuestion:function(){this.$refs.singleQsForm.init("add",{})},searchFn:function(){this.FormData.data.page=1,this.getList()},showFn:function(t){var e=this;g["c"].getSingleData({_id:t._id}).then((function(t){e.Message("success",t.data.msg),e.$refs.singleQsForm.init("show",t.data.data[0])})).catch((function(t){e.Message("error",t.data.msg)}))},resetFn:function(){this.$refs.formList.resetFields()},editFn:function(t){var e=this;g["c"].getSingleData({_id:t._id}).then((function(t){e.Message("success",t.data.msg),e.$refs.singleQsForm.init("edit",t.data.data[0])})).catch((function(t){e.Message("error",t.data.msg)}))},handleQsCallBack:function(t,e){var a=this;"add"===e?(this.table.loading=!0,g["c"].addSingleData({Question:t.Question,Item1:t.Item1,Item2:t.Item2,Item3:t.Item3,Item4:t.Item4,KN:t.KN,Chapter:t.Chapter,difficulty:t.difficulty,Answer:t.Answer}).then((function(t){a.Message("success",t.data.msg),a.getList(),a.table.loading=!1})).catch((function(t){a.Message("error",t.data.msg),a.getList(),a.table.loading=!1}))):"edit"===e&&(this.table.loading=!0,g["c"].updateSingleList({_id:t._id,Question:t.Question,Item1:t.Item1,Item2:t.Item2,Item3:t.Item3,Item4:t.Item4,KN:t.KN,Chapter:t.Chapter,difficulty:t.difficulty,Answer:t.Answer}).then((function(t){a.Message("success",t.data.msg),a.getList(),a.table.loading=!1})).catch((function(t){a.Message("error",t.data.msg),a.getList(),a.table.loading=!1})))},handleSelect:function(t){this.selectionItems=t,this.ids=t.map((function(t,e){return t._id})).join(",")},delDatas:function(){var t=this;0!==this.selectionItems.length?this.$Modal.confirm({title:"批量删除",content:"<p>确定要删除已选项吗？</p>",onOk:function(){t.delDatasFnAjax()},onCancel:function(){t.Message("info","取消删除")}}):this.Message("warning","请选择至少一项!")},delDatasFnAjax:function(){var t=this;g["c"].delData({ids:this.ids,questionType:"decide"}).then((function(e){t.Message("success",e.data.msg),t.getList(),t.table.loading=!1})).catch((function(e){t.Message("error",e.data.msg),t.getList(),t.table.loading=!1}))},delFn:function(t){var e=this;this.$Modal.confirm({title:"批量删除",content:"<p>确定要删除吗？</p>",onOk:function(){e.delFnAjax(t._id)},onCancel:function(){e.Message("info","取消删除")}})},delFnAjax:function(t){var e=this;g["c"].delData({ids:t,questionType:"single"}).then((function(t){e.Message("success",t.data.msg),e.getList(),e.table.loading=!1})).catch((function(t){e.Message("error",t.data.msg),e.getList(),e.table.loading=!1}))},pageSizeChange:function(t){this.FormData.data.pageSize=t,this.getList()},pageChange:function(t){this.FormData.data.page=t,this.getList()},getList:function(){var t=this;this.table.loading=!0,g["c"].getSingleList(this.FormData.data).then((function(e){t.table.tableData=e.data.info.list,t.table.total=e.data.info.count,t.table.loading=!1})).catch((function(e){t.Message("error",e.data.msg),t.table.loading=!1}))},Message:function(t,e,a,i){var n,s;n=null===a||void 0===a||""===a?1.5:a,s=null!==i&&void 0!==i&&""!==i&&i,this.$Message.destroy(),this.$Message[t]({content:e,duration:n,closable:s})}},components:{singleQsForm:u}},p=m,h=Object(c["a"])(p,i,n,!1,null,"5024ffe6",null);e["default"]=h.exports},"4ec3":function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return s})),a.d(e,"d",(function(){return o})),a.d(e,"c",(function(){return r}));var i=a("c1fb"),n={login:function(t){return Object(i["b"])("ManagerCount/api/checkLogin",t)},logOut:function(t){return Object(i["b"])("ManagerCount/api/logOut",t)}},s={addUser:function(t){return Object(i["b"])("ManagerCount/api/addNewUser",t)},updateUserData:function(t){return Object(i["b"])("ManagerCount/api/userDataUpdate",t)},delData:function(t){return Object(i["b"])("ManagerCount/api/DeleteUserData",t)},getUserData:function(t){return Object(i["b"])("ManagerCount/api/getUserData",t)},getList:function(t){return Object(i["b"])("ManagerCount/api/getUserList",t)}},o={showData:function(t){return Object(i["b"])("userPower/api/userMenuPowerShow",t)},saveData:function(t){return Object(i["b"])("userPower/api/userMenuPowerControl",t)}},r={addDecideData:function(t){return Object(i["b"])("addQuestion/api/addDecideData",t)},addSingleData:function(t){return Object(i["b"])("addQuestion/api/addSingleData",t)},addVacancyData:function(t){return Object(i["b"])("addQuestion/api/addVacancyData",t)},addSubjectiveData:function(t){return Object(i["b"])("addQuestion/api/addSubjectiveData",t)},getDecideList:function(t){return Object(i["b"])("getQuestion/api/getDecideList",t)},getSingleList:function(t){return Object(i["b"])("getQuestion/api/getSingleList",t)},getVacancyList:function(t){return Object(i["b"])("getQuestion/api/getVacancyList",t)},getSubjectiveList:function(t){return Object(i["b"])("getQuestion/api/getSubjectiveList",t)},delData:function(t){return Object(i["b"])("deleteQuestion/api/DeleteQuestionData",t)},updateDecideList:function(t){return Object(i["b"])("updateQuestion/api/decideUpdate",t)},updateSingleList:function(t){return Object(i["b"])("updateQuestion/api/singleUpdate",t)},updateVacancyList:function(t){return Object(i["b"])("updateQuestion/api/vacancyUpdate",t)},updateSubjectiveList:function(t){return Object(i["b"])("updateQuestion/api/subjectiveUpdate",t)},getDecideData:function(t){return Object(i["b"])("getQuestion/api/getDecideData",t)},getSingleData:function(t){return Object(i["b"])("getQuestion/api/getSingleData",t)},getVacancyData:function(t){return Object(i["b"])("getQuestion/api/getVacancyData",t)},getSubjectiveData:function(t){return Object(i["b"])("getQuestion/api/getSubjectiveData",t)}}},a15b:function(t,e,a){"use strict";var i=a("23e7"),n=a("44ad"),s=a("fc6a"),o=a("a640"),r=[].join,l=n!=Object,c=o("join",",");i({target:"Array",proto:!0,forced:l||!c},{join:function(t){return r.call(s(this),void 0===t?",":t)}})},d81d:function(t,e,a){"use strict";var i=a("23e7"),n=a("b727").map,s=a("1dde"),o=a("ae40"),r=s("map"),l=o("map");i({target:"Array",proto:!0,forced:!r||!l},{map:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-094b5398.8597d759.js.map