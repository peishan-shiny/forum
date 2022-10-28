<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurantComments="restaurantComments"
      :key="restaurantComments.id"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurantId="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "../components/RestaurantComments.vue";
import CreateComment from "../components/CreateComment.vue";
import { Toast } from "../utils/helpers";
import restaurantsAPI from "../apis/restaurants";
import { mapState } from "vuex";

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  methods: {
    //需要留意的是，fetchRestaurant 需要傳入參數 restaurantId。因為向伺服器請求資料時，我們會需要告訴伺服器要請求的是哪一筆餐廳資料。
    async fetchRestaurant(restaurantId) {
      try {
        // const id = restaurantId;
        // console.log(id);
        const { data } = await restaurantsAPI.getRestaurant(restaurantId);
        //console.log(data);

        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          Category,
          image,
          opening_hours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;

        //:前面是data裡面的id，:後面是上面const的id
        //可以簡寫成id,
        //這邊要留意categoryName的部分，要取Category的值，但在Category是一個物件，所以要取他裡面的屬性，要這樣寫category.name
        this.restaurant = {
          id: id,
          name: name,
          categoryName: Category ? Category.name : "尚未分類",
          image: image,
          openingHours: opening_hours,
          tel: tel,
          address: address,
          description: description,
          isFavorited: isFavorited,
          isLiked: isLiked,
        };
        this.restaurantComments = Comments;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法顯示餐廳詳細資料",
        });
      }
    },

    beforeRouteUpdate(to, from, next) {
      const { id } = to.params;
      this.fetchRestaurant(id);
      next();
    },

    //刪除評論
    async afterDeleteComment(commentId) {
      try {
        const response = await restaurantsAPI.deleteComments(commentId);
        console.log(response);
        console.log("afterDeleteComment", commentId);
        this.restaurantComments = this.restaurantComments.filter(
          (comment) => comment.id !== commentId
        );
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除評論",
        });
      }
    },

    //增加評論
    afterCreateComment(data) {
      console.log(data);
      const { commentId, restaurantId, text } = data;
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        text: text,
        //使用目前的時間
        createdAt: new Date(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
      });
    },
  },

  created() {
    //在 created 階段觸發 fetchRestaurant 之前，我們先透過 this.$route.params 取得網址結構中，對應到 :id 的內容。
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
};
</script>