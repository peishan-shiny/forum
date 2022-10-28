<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        :to="{
          name: 'restaurant-top',
          params: { id: restaurant.id },
        }"
        class="btn btn-primary btn-border mr-2"
        >Dashboard</router-link
      >

      <button
        v-if="restaurant.isFavorited"
        @click.stop.prevent="deleteFavorited(restaurant.id)"
        type="button"
        class="btn btn-danger btn-border mr-2"
      >
        移除最愛
      </button>
      <button
        v-else
        @click.stop.prevent="addFavorited(restaurant.id)"
        type="button"
        class="btn btn-primary btn-border mr-2"
      >
        加到最愛
      </button>
      <button
        v-if="restaurant.isLiked"
        @click.stop.prevent="deleteLike(restaurant.id)"
        type="button"
        class="btn btn-danger like mr-2"
      >
        Unlike
      </button>
      <button
        v-else
        @click.stop.prevent="addLike(restaurant.id)"
        type="button"
        class="btn btn-primary like mr-2"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantDetail",
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },

  //這種有父層子層且父層需傳資料給子層，且父層資料由後端API提供，需要在子層裝watch監聽，當父層資料有改變時，將新資料寫入
  //監聽initialRestaurant，當initialRestaurant有任何改變時，將新的資料傳入，把資料寫入元件
  watch: {
    //須帶一個新資料的參數 newValue
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },

  methods: {
    async addFavorited(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法增加至我的最愛",
        });
      }
    },
    async deleteFavorited(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除我的最愛",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法點讚",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const { data } = await usersAPI.deleteLike({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除",
        });
      }
    },
  },
  // methods: {
  //   fetchRestaurant() {
  //     this.restaurant = {
  //       ...this.initialRestaurant,
  //     };
  //   },
  // },
  // created() {
  //   this.fetchRestaurant();
  // },
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>