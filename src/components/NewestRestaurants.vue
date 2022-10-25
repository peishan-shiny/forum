<template>
  <div class="card">
    <div class="card-header">最新餐廳</div>
    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            >{{ restaurant.name }}</router-link
          >
          <small>{{
            restaurant.Category ? restaurant.Category.name : "尚無分類"
          }}</small>
        </h4>
        <p>
          {{ restaurant.description }}
        </p>
        {{ restaurant.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
//引用mixins.js檔案裡面的fromNowFilter物件，最後在export裡面新增mixins屬性代入
import { fromNowFilter } from "../utils/mixins.js";

export default {
  //注意mixins這裡是用陣列
  mixins: [fromNowFilter],

  //父元件傳進來的資料
  props: {
    //第一個是告訴元件，傳進來的資料型態是 Array。
    //第二個 required: true 是標明，這組資料是必要的，一定要傳進來，才不會出錯。
    restaurants: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* small {
  font-size: 10px;
} */
</style>