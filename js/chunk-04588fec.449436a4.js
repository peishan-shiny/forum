(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04588fec"],{6135:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container py-5"},[t("AdminNav"),t("table",{staticClass:"table"},[e._m(0),t("tbody",e._l(e.users,(function(s){return t("tr",{key:s.id},[t("th",{attrs:{scope:"row"}},[e._v(e._s(s.id))]),t("td",[e._v(e._s(s.email))]),t("td",[t("p",{directives:[{name:"show",rawName:"v-show",value:s.isAdmin,expression:"user.isAdmin"}]},[e._v("admin")]),t("p",{directives:[{name:"show",rawName:"v-show",value:!s.isAdmin,expression:"!user.isAdmin"}]},[e._v("user")])]),t("td",[s.id!==e.currentUser.id?t("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.toggleUserRole(s.id)}}},[t("p",{directives:[{name:"show",rawName:"v-show",value:s.isAdmin,expression:"user.isAdmin"}]},[e._v("set as user")]),t("p",{directives:[{name:"show",rawName:"v-show",value:!s.isAdmin,expression:"!user.isAdmin"}]},[e._v("set as admin")])]):e._e()])])})),0)])],1)},r=[function(){var e=this,t=e._self._c;return t("thead",{staticClass:"thead-dark"},[t("tr",[t("th",{attrs:{scope:"col"}},[e._v("#")]),t("th",{attrs:{scope:"col"}},[e._v("Email")]),t("th",{attrs:{scope:"col"}},[e._v("Role")]),t("th",{attrs:{scope:"col",width:"140"}},[e._v("Action")])])])}],i=s("e04c");const n={users:[{id:1,name:"root",email:"root@example.com",password:"$2a$10$ewLo/FPRB2VDm1batVFu6O4bhg3cwyOgzywrULPO4pwmuaA8tOmu.",isAdmin:!0,image:null,createdAt:"2022-10-04T12:59:37.000Z",updatedAt:"2022-10-04T12:59:37.000Z"},{id:2,name:"user1",email:"user1@example.com",password:"$2a$10$MiqC0EhI44DI7uIVh6ZDtuOpQSC0/pAn2Q0ggsrpTD/DIreCQWgtC",isAdmin:!1,image:null,createdAt:"2022-10-04T12:59:37.000Z",updatedAt:"2022-10-04T12:59:37.000Z"},{id:3,name:"user2",email:"user2@example.com",password:"$2a$10$gn0ZWlVaqy5zVWFj7MtUmO7FQsKnxp48wjegMtTVMMW1CaVvwiTmO",isAdmin:!1,image:null,createdAt:"2022-10-04T12:59:37.000Z",updatedAt:"2022-10-04T12:59:37.000Z"}]},o={currentUser:{id:1,name:"root",email:"root@example.com",image:"https://i.pravatar.cc/300",isAdmin:!0},isAuthenticated:!0};var u={name:"AdminUsers",components:{AdminNav:i["a"]},data(){return{users:[],currentUser:o.currentUser}},created(){this.fetchData()},methods:{fetchData(){this.users=n.users},toggleUserRole(e){this.users=this.users.map(t=>t.id===e?{...t,isAdmin:!t.isAdmin}:t)}}},d=u,m=s("2877"),c=Object(m["a"])(d,a,r,!1,null,null,null);t["default"]=c.exports},e04c:function(e,t,s){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"mb-3"},[t("h1",[e._v("餐廳後台")]),t("router-link",{attrs:{to:{name:"admin-restaurants"}}},[e._v(" Restaurants ")]),e._v(" | "),t("router-link",{attrs:{to:"/admin/categories"}},[e._v("Categories")]),e._v(" | "),t("router-link",{attrs:{to:"/admin/users"}},[e._v("Users")])],1)},r=[],i={name:"AdminNav"},n=i,o=s("2877"),u=Object(o["a"])(n,a,r,!1,null,null,null);t["a"]=u.exports}}]);
//# sourceMappingURL=chunk-04588fec.449436a4.js.map