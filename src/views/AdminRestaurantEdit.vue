<template>
  <div class="container py-5">
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :initial-restaurant="restaurant"
      :isProcessing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      //isProcessing記得傳去子層給表單，才能設定按鈕
      isProcessing: false,
    };
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchData(id);
    next();
  },
  methods: {
    async fetchData(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });
        //透過解構賦值將restaurant需要的資料取出
        const {
          id,
          name,
          CategoryId,
          tel,
          address,
          description,
          image,
          opening_hours: openingHours,
        } = data.restaurant;
        //將資料帶入 Vue 的data裡
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryId: CategoryId,
          tel,
          address,
          description,
          image,
          openingHours,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法顯示餐廳列表",
        });
      }
    },

    async handleAfterSubmit(formData) {
      //將按鈕狀態改為true，代表已點擊，防止再次點擊
      this.isProcessing = true;
      // 透過 API 將表單資料送到伺服器
      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ": " + value);
      // }
      try {
        //restaurantId 在fetchData的時候就拿到資料放進data的this.restaurant裡了
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        //將按鈕狀態改為false，因發生錯誤，改成false才能再次點擊
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "無法顯示餐廳列表",
        });
      }
    },
  },
  created() {
    //透過 this.$route.params 取得網址上的 id，才會知道現在編輯的是哪一筆餐廳資料
    const { id } = this.$route.params;
    //console.log(this.$route.params);取出來是物件，所以要解構賦值後再把id丟進參數
    this.fetchData(id);
  },
};
</script>