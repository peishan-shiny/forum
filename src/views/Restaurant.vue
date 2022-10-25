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

const dummyData = {
  restaurant: {
    id: 1,
    name: "Judy Runte",
    tel: "(918) 827-1962",
    address: "98138 Elisa Road",
    opening_hours: "08:00",
    description: "dicta et cupiditate",
    image: "https://i.imgur.com/2ascasG.jpg",
    createdAt: "2019-06-22T09:00:43.000Z",
    updatedAt: "2019-06-22T09:00:43.000Z",
    CategoryId: 3,
    Category: {
      id: 3,
      name: "義大利料理",
      createdAt: "2019-06-22T09:00:43.000Z",
      updatedAt: "2019-06-22T09:00:43.000Z",
    },
    FavoritedUsers: [],
    LikedUsers: [],
    Comments: [
      {
        id: 3,
        text: "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2019-06-22T09:00:43.000Z",
        updatedAt: "2019-06-22T09:00:43.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$0ISHJI48xu/VRNVmEeycFe8v5ChyT305f8KaJVIhumu7M/eKAikkm",
          image: "https://i.imgur.com/XooCt5K.png",
          isAdmin: false,
          createdAt: "2019-06-22T09:00:43.000Z",
          updatedAt: "2019-06-23T01:16:31.000Z",
        },
      },
    ],
  },
  isFavorited: false,
  isLiked: false,
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "shan",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

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
      currentUser: dummyUser.currentUser,
    };
  },

  methods: {
    //需要留意的是，fetchRestaurant 需要傳入參數 restaurantId。因為向伺服器請求資料時，我們會需要告訴伺服器要請求的是哪一筆餐廳資料。
    fetchRestaurant(restaurantId) {
      console.log("fetchRestaurant id: ", restaurantId);
      const { restaurant, isFavorited, isLiked } = dummyData;
      //這邊注意一下dummyData裡面還有一個restaurant物件，所以要取restaurant裡面的屬性可以這樣取
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

      //物件的解構賦值
      //:前面是data裡面的id，:後面是上面const的id
      //可以簡寫成id,
      //這邊要留意categoryName的部分，要取Category的值，但在dummyData裡Category是一個物件，所以要取他裡面的屬性，要這樣寫category.name
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

      //將dummyData裡的資料放進data中的另一種寫法

      // this.restaurant = {
      //   id: dummyData.restaurant.id,
      //   name: dummyData.restaurant.name,
      //   categoryName: dummyData.restaurant.Category.name,
      //   image: dummyData.restaurant.image,
      //   openingHours: dummyData.restaurant.opening_hours,
      //   tel: dummyData.restaurant.tel,
      //   address: dummyData.restaurant.address,
      //   description: dummyData.restaurant.description,
      //   isFavorited: dummyData.isFavorited,
      //   isLiked: dummyData.isLiked,
      // }

      // this.restaurantComments = dummyData.restaurant.Comments
    },

    //刪除評論
    afterDeleteComment(commentId) {
      console.log("afterDeleteComment", commentId);
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
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