<template>
  <div class="card mb-3" style="max-width: 540px; margin: auto">
    <div class="row no-gutters">
      <div class="col-md-4">
        <a href="#">
          <img class="card-img" :src="restaurant.image" />
        </a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <span class="badge badge-secondary"
            >收藏數：{{ restaurant.favoriteCount }}</span
          >
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <a href="#" class="btn btn-primary mr-2">Show</a>

          <button
            v-if="restaurant.isFavorited"
            @click.stop.prevent="deleteFavorite(restaurant.id)"
            type="button"
            class="btn btn-danger mr-2"
          >
            移除最愛
          </button>
          <button
            v-else
            @click.stop.prevent="addFavorite(restaurant.id)"
            type="button"
            class="btn btn-primary"
          >
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantsTopCard",
  props: {
    initialRestaurants: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurants,
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        //console.log(data);
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
          favoriteCount: this.restaurant.favoriteCount + 1,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法增加至最愛！",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        console.log(data);

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
          favoriteCount: this.restaurant.favoriteCount - 1,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除！",
        });
      }
    },
  },
};
</script>>