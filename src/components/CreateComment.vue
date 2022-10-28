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
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

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
    async handleSummit() {
      //console.log(this.text);
      try {
        const { data } = await restaurantsAPI.addComments({
          restaurantId: this.restaurantId,
          text: this.text,
        });
        console.log(data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        //使用$emit通知父元件去更新畫面 => $emit( '事件名稱' , {傳遞的資料} )
        //並且父元件掛載子元件的地方，加上v-on監聽器
        this.$emit("after-create-comment", {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text,
        });

        //傳遞資料給父層後，將表單內的資料清空
        this.text = "";
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法新增評論",
        });
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>