<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <RestaurantsTopCard
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :initial-restaurants="restaurant"
    />
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantsTopCard from "../components/RestaurantsTopCard.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantsTop",
  components: {
    NavTabs,
    RestaurantsTopCard,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants();
        //console.log(data);
        console.log(data.restaurants);
        this.restaurants = data.restaurants.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          image: restaurant.image,
          description: restaurant.description,
          favoriteCount: restaurant.FavoriteCount,
          isFavorited: restaurant.isFavorited,
        }));
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法讀取請稍號再試！",
        });
      }
    },
  },
};
</script>
