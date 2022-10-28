<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/"> 餐廳評論網 </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link
          :to="{ name: 'admin-restaurants' }"
          class="text-white mr-3"
          v-if="currentUser.isAdmin"
        >
          管理員後台
        </router-link>

        <!-- is user is login -->
        <!-- 這邊因為有兩個元件需要做v-if，所以使用template去包起來，才不會影響樣式 -->
        <template v-if="isAuthenticated">
          <router-link
            :to="{ name: 'user', params: { id: currentUser.id } }"
            class="text-white mr-3"
          >
            {{ currentUser.name || "使用者" }} 您好
          </router-link>
          <button
            @click="logout"
            type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0"
          >
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  //mapState 屬性是vuex提供的一個方法，主要是取出vuex裡的state的資料
  //computed 在vue裡主要是在偵測computed裡面的資料是否有改變，若有改變會重新運算
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
};

// //dummyUser 是模擬api傳過來的假資料
// const dummyUser = {
//   currentUser: {
//     id: 1,
//     name: "root",
//     email: "root@example.com",
//     image: "https://i.pravatar.cc/300",
//     isAdmin: true,
//   },
//   isAuthenticated: true,
// };
// export default {
//   //預設登入需要的空資料
//   data() {
//     return {
//       currentUser: {
//         id: -1,
//         name: "",
//         email: "",
//         image: "",
//         isAdmin: false,
//       },
//       isAuthenticated: false,
//     };
//   },
//   created() {
//     this.fetchUser();
//   },
//   methods: {
//     fetchUser() {
//       this.currentUser = {
//         //...是物件結構賦值，有重複的屬性狀況下會以後面的為主，dummyUser.currentUser會蓋掉this.currentUser的值
//         ...this.currentUser,
//         ...dummyUser.currentUser,
//       };
//       this.isAuthenticated = dummyUser.isAuthenticated;
//     },
//   },
// };
</script>

<style scoped>
.navbar-toggler {
  min-width: 70px;
  margin-right: 0;
}

nav.bg-dark {
  padding: 14px 16px;
  background-color: #bd2333 !important;
}

.navbar-brand {
  font-size: 19px;
  padding: 0;
}
</style>