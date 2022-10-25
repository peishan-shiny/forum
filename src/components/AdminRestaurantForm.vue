<template>
  <form @submit.stop.prevent="handleSubmit" v-show="!isLoading">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        v-model="restaurant.categoryId"
        class="form-control"
        name="categoryId"
        required
      >
        <option value="" selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />
      <!-- accept 限制檔案格式 -->
      <!-- multiple 允許上傳多個檔案 -->
      <!-- @change 綁定一個 change 事件，監聽使用者是否有和「選擇檔案」按鈕互動 -->
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        multiple
        @change="handleFileChange"
      />
    </div>

    <button type="submit" class="btn btn-primary" :disabled="isProcessing">
      {{ isProcessing ? "處理中" : "送出" }}
    </button>
  </form>
</template>

<script>
import { Toast } from "../utils/helpers";
import adminAPI from "../apis/admin";

export default {
  name: "AdminRestaurantForm",
  props: {
    initialRestaurant: {
      type: Object,
      //當資料不是必填時，比較好的習慣是要用 default 設定一組預設值
      //當我們要為物件或陣列類型的資料設定預設值時，需要使用 () => ({}) 的寫法來回傳物件
      default: () => ({
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      }),
    },
    isProcessing: {
      type: Boolean,
      defaule: false,
    },
  },
  data() {
    return {
      categories: [],
      restaurant: {
        ...this.initialRestaurant,
      },
      isLoading: true,
    };
  },
  //因為在編輯頁面(AdminRestaurantEdit)時，一邊將後端拿取資料，同時也將資料向下傳遞給(AdminRestaurantForm)，當(AdminRestaurantEdit)後端資料尚未拿回來時，(AdminRestaurantForm)已完成拿取資料，所以拿到的資料是(AdminRestaurantEdit)在data裡restaurant原本預設的值，針對上述情況，Vue 提供了 watch 屬性可以幫助我們監控某些屬性，一旦這個屬性的內容有變更時，就可以去做一些事。
  //watch可以監控data裡的屬性
  watch: {
    initialRestaurant(newValue, oldValue) {
      console.log(newValue, oldValue);
      //預防newValue新的資料有舊資料原本沒有的屬性，基本上會先將舊資料展開運算丟進去(...this.restaurant)，因為後面有的屬性會蓋掉前面有的屬性
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await adminAPI.getCategories();

        if (data.status === "error") {
          throw new Error(data.message);
        }
        //拿取資料
        this.categories = data.categories;

        //使用isLoading判斷資料是否向後端取得，若取得將isLoading改成false，所以放在取完資料後面
        this.isLoading = false;
      } catch (error) {
        //若有錯誤記得將isLoading改成false，才不會是空白頁面
        this.isLoading = false;
        Toast.fire({
          icon: "warning",
          title: "資料錯誤請稍後再試！",
        });
      }
    },
    handleFileChange(e) {
      //e.target.files 是指當選擇圖片時，此圖片會存進FileList裡面
      //console.log(e.target.files);
      const fileList = e.target.files;
      if (fileList.length === 0) {
        this.restaurant.image = "";
        return;
      } else {
        //console.log(fileList[0]);
        //創一個本地的網址，將網址暫存在data裡的image，讓畫面可以render圖片
        const imgURL = window.URL.createObjectURL(fileList[0]);
        this.restaurant.image = imgURL;
      }
    },
    handleSubmit(e) {
      //避免有心人事將html reuired拿掉，寫一個必填寫的判斷，如果(未填寫)餐廳名稱{會發生錯誤}
      if (!this.restaurant.name) {
        Toast.fire({
          icon: "warning",
          title: "請填寫餐廳名稱",
        });
        return;
      } else if (!this.restaurant.categoryId) {
        Toast.fire({
          icon: "warning",
          title: "請選擇餐廳類別",
        });
        return;
      }
      //e.target 出來的東西就是 HTML的整整個<form>
      //console.log(e.target);
      const form = e.target;
      //透過 new FormData(form) 來產生物件實例，存放在 formData 變數裡
      const formData = new FormData(form);
      //console.log(formData.entries());
      this.$emit("after-submit", formData);
      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ": " + value);
      // }
    },
  },
  created() {
    this.fetchData();
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant,
    };
  },
};
</script>