<template>
  <form @submit.stop.prevent="handleSummit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CreateComment",
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      text: "",
    };
  },

  methods: {
    handleSummit() {
      console.log(this.text);
      //發送API，請求伺服器，新增該筆資料

      //使用$emit通知父元件去更新畫面 => $emit( '事件名稱' , {傳遞的資料} )
      //並且父元件掛載子元件的地方，加上v-on監聽器
      this.$emit("after-create-comment", {
        commentId: uuidv4(), // 尚未串接 API 暫時使用隨機的 id
        restaurantId: this.restaurantId,
        text: this.text,
      });
      this.text = ""; // 將表單內的資料清空
    },
  },
};
</script>