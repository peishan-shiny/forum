<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <!-- disable是禁止使用的功能，後面跟action一樣接true/false -->
      <!-- 當這個li在 currentPage === 1 時候 禁止使用 -->
      <li :class="['page-item', { disable: currentPage === 1 }]">
        <!-- 連結連到/restaurant這個頁面，query是網址問號後面的內容 -->
        <router-link
          :to="{ name: 'restaurants', query: { previousPage, categoryId } }"
          class="page-link"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <li
        v-for="page in totalPage"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <router-link
          :to="{ name: 'restaurants', query: { page, categoryId } }"
          class="page-link"
        >
          {{ page }}
        </router-link>
      </li>

      <!-- 後一頁 nextPage -->
      <li :class="['page-item', { disable: currentPage === totalPage.length }]">
        <router-link
          :to="{ name: 'restaurants', query: { nextPage, categoryId } }"
          class="page-link"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "RestaurantsPagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Array,
      required: true,
    },
    previousPage: {
      type: Number,
      required: true,
    },
    nextPage: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: [Number, String],
      default: "",
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-link {
  height: 37px;
  padding: 7px 20px;
  color: #bd2333;
}

.page-item.active .page-link,
.page-item.active span {
  color: white;
  background-color: #bd2333;
  border-color: #bd2333;
  z-index: 1;
}

.page-item span {
  color: #bd2333;
}

a.page-link:hover,
a.page-link:hover span {
  color: white;
  background-color: #bd2333;
  border-color: #bd2333;
}
</style>