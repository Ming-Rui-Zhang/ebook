(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33a70500"],{a49d:function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"store-shelf"},[s("shelf-title"),t.ifShowList?s("scroll",{ref:"scroll",staticClass:"store-shelf-Scroll-wrapper",attrs:{top:0,bottom:t.scrollBottom},on:{onScroll:t.onScroll}},[s("shelf-list",{attrs:{top:42,data:t.shelfCategory.itemList}})],1):s("div",{staticClass:"store-shelf-empty-view"},[t._v(" "+t._s(t.$t("shelf.groupNone"))+" ")]),s("shelf-footer")],1)},l=[],i=s("f1f4"),r=s("b1a9"),n=s("ac0d"),c=s("6701"),a=s("0093"),f={mixins:[n["c"]],data:function(){return{scrollBottom:0}},watch:{isEditMode:function(t){var e=this;this.scrollBottom=t?48:0,this.$nextTick((function(){e.$refs.scroll&&e.$refs.scroll.refresh()}))}},components:{ShelfTitle:a["a"],Scroll:c["a"],ShelfList:r["a"],ShelfFooter:i["a"]},methods:{onScroll:function(t){this.setOffsetY(t)}},mounted:function(){this.getCategoryList(this.$route.query.title),this.setCurrentType(2)},computed:{ifShowList:function(){return this.shelfCategory.itemList&&this.shelfCategory.itemList.length>0}}},h=f,u=(s("a4b7"),s("5d22")),d=Object(u["a"])(h,o,l,!1,null,"0daf01ca",null);e["default"]=d.exports},a4b7:function(t,e,s){"use strict";s("d5e1")},d5e1:function(t,e,s){}}]);
//# sourceMappingURL=chunk-33a70500.d546496c.js.map