<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          <!-- 使用mixins代入fromNowFilter，這邊使用一樣寫function名字fromNow -->
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>

<script>
//引用mixins.js檔案裡面的fromNowFilter物件，最後在export裡面新增mixins屬性代入
import { fromNowFilter } from "../utils/mixins.js";
import { mapState } from "vuex";
//import { Toast } from "../utils/helpers";
//import restaurantsAPI from "../apis/restaurants";

// const dummyUser = {
//   currentUser: {
//     id: 1,
//     name: "管理者",
//     email: "root@example.com",
//     image: "https://i.pravatar.cc/300",
//     isAdmin: true,
//   },
//   isAuthenticated: true,
// };

export default {
  name: "RestaurantComments",
  //注意mixins這裡是用陣列
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },

  // data() {
  //   return {
  //     currentUser: currentUser,
  //     isAuthenticated: isAuthenticated,
  //   };
  // },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  methods: {
    handleDeleteButtonClick(commentId) {
      console.log("handleDeleteButtonClick", commentId);
      //使用$emit通知父元件去更新畫面 => $emit( '事件名稱' , 傳遞的資料 )
      //並且父元件掛載子元件的地方，加上v-on監聽器
      this.$emit("after-delete-comment", commentId);
    },
  },
};
</script>

<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>