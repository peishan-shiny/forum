<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: -1,
        viewCounts: -1,
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    //console.log(id);
    this.fetchRestaurant(id);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const response = await restaurantsAPI.getRestaurant(restaurantId);
        //console.log(response);
        const { restaurant } = response.data;
        const { id, name, Category, Comments, viewCounts } = restaurant;
        this.restaurant = {
          ...this.restaurant,
          id: id,
          name: name,
          categoryName: Category.name,
          commentsLength: Comments.length,
          viewCounts: viewCounts,
        };
        console.log(this.restaurant);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法顯示資料",
        });
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    //console.log(to, from);
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
};
</script>