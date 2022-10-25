<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        src="https://i.imgur.com/Spox5DV.jpg"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category ? restaurant.Category.name : "尚未分類"
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <!-- 注意在 v-else 上沒有任何的標記，它必需要緊接在 v-if 之後使用 -->
        <button
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <!-- stop是防止冒泡事件發生 -->
        <button
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <!-- 注意在 v-else 上沒有任何的標記，它必需要緊接在 v-if 之後使用 -->
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
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      //這邊需要更改到資料，但props裡的資料是不能變動的，需把父元件的initialRestaurant丟到data裡的restaurant，data裡的資料才是子元件自己可以更改內容的
      restaurant: this.initialRestaurant,
    };
  },

  methods: {
    async addFavorite(restaurantId) {
      try {
        const response = await usersAPI.addFavorite({ restaurantId });
        //console.log(response);
        const { data } = response;
        //請求完記得先判斷錯誤，"error"要記得是字串
        if (data.status === "error") {
          throw new Error(data.message);
        }
        //更改子元件的內容，先使用展開運算 複製一個完整的內容，再針對要更改的內容做修改
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "目前無法加入我的最愛，請稍後在試！",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const response = await usersAPI.deleteFavorite({ restaurantId });
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "目前無法刪除我的最愛，請稍後在試！",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const response = await usersAPI.addLike({ restaurantId });
        const { data } = response;
        console.log(response);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法對餐廳按讚，請稍後再試",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const response = await usersAPI.deleteLike({ restaurantId });
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法對取消讚，請稍後再試",
        });
      }
    },
  },
};
</script>