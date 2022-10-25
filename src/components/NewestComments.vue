<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }"
          >
            {{ comment.Restaurant.name }}
          </router-link>
        </h4>
        <p>{{ comment.text || "沒有評論" }}</p>
        <!-- <p>{{ comment.text ? comment.text : "沒有評論" }}</p> -->
        <!-- 以上兩種寫法都可以 -->
        by
        <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
          {{ comment.User.name }}
        </router-link>
        {{ comment.createdAt | fromNow }}
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

  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>