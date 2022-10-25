<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :isProcessing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";
import { Toast } from "../utils/helpers";
import adminAPI from "../apis/admin";

export default {
  name: "AdminRestaurantNew",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        //點擊送出，立即將按鈕鎖住，記得在發生error時要將isProcessing解開
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.create({ formData });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        //若成功送出就轉址
        this.$router.push({ name: "admin-restaurants" });
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value);
        // }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "無法新增餐廳",
        });
      }
    },
  },
};
</script>