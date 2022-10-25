<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategory"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          />
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="newCategoryClick"
            :disabled="isProcessing"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span
              v-show="category.isEditing"
              @click.stop.prevent="handleCancel(category.id)"
              class="cancel"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              @click.stop.prevent="toggleIsEditing(category.id)"
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
            >
              Edit
            </button>
            <button
              @click.stop.prevent="
                updateCategory({ categoryId: category.id, name: category.name })
              "
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategoryClick(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";
//import { v4 as uuidv4 } from "uuid";
import adimnAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      categories: [],
      newCategory: "",
      isProcessing: false,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      //後面map()方法是將每一個categories的物件(item)增加一個isEditing屬性
      try {
        const { data } = await adimnAPI.getCategories();
        //console.log(response.data);
        this.categories = data.categories.map((item) => {
          return {
            ...item,
            isEditing: false,
            nameCached: "",
          };
        });
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法顯示餐廳類別",
        });
      }
    },
    async newCategoryClick() {
      try {
        this.isProcessing = true;
        // const category = {
        //   name: this.newCategory,
        // };
        // console.log(category);
        const response = await adimnAPI.addCategories({
          name: this.newCategory,
        });

        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }

        this.fetchCategories();
        this.newCategory = "";
      } catch (error) {
        this.isProcessing = false;
        this.newCategory = "";

        Toast.fire({
          icon: "warning",
          title: "無法新增餐廳類別",
        });
      }
    },
    async deleteCategoryClick(categoryId) {
      try {
        // const id = categoryId;
        // console.log(id);
        const response = await adimnAPI.deleteCategories(categoryId);
        console.log(response);

        if (response.data.status !== "success") {
          throw new Error(response.data.message);
        }

        this.categories = this.categories.filter(
          (item) => item.id !== categoryId
        );
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除餐廳類別",
        });
      }
    },
    //點擊edit時，切換isEditing，要更改陣列裡的東西使用map,將this.categories裡的物件，一個一個經過map丟進去比對id，如果一樣return !item.isEditing(這裡的!是切換的意思)，其餘皆return item
    //nameCached暫存，先將原本name的文字暫存起來，因為input欄位有綁定v-model，若最後要取消，會找不到原本的文字內容
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            isEditing: !item.isEditing,
            nameCached: item.name,
          };
        }
        return item;
      });
    },
    async updateCategory({ categoryId, name }) {
      try {
        const response = await adimnAPI.updateCategories({ categoryId, name });

        if (response.data.status !== "success") {
          throw new Error(response.data.message);
        }

        this.toggleIsEditing(categoryId);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法更新餐廳類別",
        });
      }
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map((item) => {
        if (item.id === categoryId) {
          return {
            ...item,
            name: item.nameCached,
            isEditing: !item.isEditing,
          };
        }
        return item;
      });
    },
  },
};
</script>


<style scoped>
/* scoped是指指有在這個檔案執行這個樣式 */
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>