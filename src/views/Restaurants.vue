<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 這次的迴圈要做在這邊，不能去RestaurantCard裡面做，因第一層不能做迴圈 -->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :previous-page="previousPage"
      :next-page="nextPage"
      :category-id="categoryId"
    />

    <div v-show="restaurants.length < 1">此類別目前無餐廳資料！</div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import RestaurantsNavPills from "../components/RestaurantsNavPills.vue";
import RestaurantsPagination from "../components/RestaurantsPagination.vue";
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

// const dummyData = {
//   restaurants: [
//     {
//       id: 1,
//       name: "Chase Kling",
//       tel: "621.126.1340",
//       address: "55005 Beer Valleys",
//       opening_hours: "08:00",
//       description: "Ad officiis id voluptas est saepe dolorem maxime m",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=88.36185726282892",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 1,
//       Category: {
//         id: 1,
//         name: "中式料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 2,
//       name: "Mrs. Lloyd Moore",
//       tel: "1-972-997-5935 x62986",
//       address: "58049 Barrows Locks",
//       opening_hours: "08:00",
//       description: "Est minima quis magni et aut maiores voluptas sapi",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=2.70212761161297",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 3,
//       name: "Mossie Schumm DVM",
//       tel: "(838) 245-9072",
//       address: "51134 Strosin Mount",
//       opening_hours: "08:00",
//       description: "Amet sit rerum nihil quia aut. Beatae magnam dolor",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=30.8000443288718",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 4,
//       Category: {
//         id: 4,
//         name: "墨西哥料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 4,
//       name: "Garry Kuvalis",
//       tel: "206.134.3514 x952",
//       address: "7392 Elenora Spurs",
//       opening_hours: "08:00",
//       description: "Earum similique omnis illum iste est eligendi dolo",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=48.71491936414971",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 1,
//       Category: {
//         id: 1,
//         name: "中式料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 5,
//       name: "Elwyn Jenkins",
//       tel: "1-103-810-8500 x383",
//       address: "3794 Herman Parkway",
//       opening_hours: "08:00",
//       description: "Voluptatem consequatur qui. Autem rerum rem aspern",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=6.726759325684806",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 6,
//       name: "Virgie Cronin",
//       tel: "1-314-401-9771",
//       address: "986 Lauriane Mill",
//       opening_hours: "08:00",
//       description: "Vel quos porro laboriosam enim qui est. Ut distinc",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=55.75741578305404",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 7,
//       name: "Trenton Hand",
//       tel: "1-723-466-5811 x09633",
//       address: "688 Kshlerin Shores",
//       opening_hours: "08:00",
//       description: "Dignissimos repudiandae aperiam laborum asperiores",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=27.28745060746476",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 8,
//       name: "Ms. Marcelo Gottlieb",
//       tel: "545-990-9044 x82608",
//       address: "61114 Upton Orchard",
//       opening_hours: "08:00",
//       description: "Officia quis sed voluptas qui nihil unde. Qui aspe",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=48.662098207104435",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 1,
//       Category: {
//         id: 1,
//         name: "中式料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 9,
//       name: "Heather Rowe V",
//       tel: "656.381.6701 x310",
//       address: "2249 Lynch Fort",
//       opening_hours: "08:00",
//       description: "Velit molestiae laboriosam voluptatem ipsa. Pariat",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=1.1136218782573204",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 3,
//       Category: {
//         id: 3,
//         name: "義大利料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//     {
//       id: 10,
//       name: "Amiya Spinka",
//       tel: "(130) 417-6840 x859",
//       address: "1245 Cassin Mount",
//       opening_hours: "08:00",
//       description: "Porro error molestiae animi asperiores qui ea. Vol",
//       image:
//         "https://loremflickr.com/320/240/restaurant,food/?random=92.40333570101689",
//       viewCounts: 0,
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//       CategoryId: 5,
//       Category: {
//         id: 5,
//         name: "素食料理",
//         createdAt: "2022-10-04T12:59:37.000Z",
//         updatedAt: "2022-10-04T12:59:37.000Z",
//       },
//       isFavorited: false,
//       isLiked: false,
//     },
//   ],
//   categories: [
//     {
//       id: 1,
//       name: "中式料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//     {
//       id: 2,
//       name: "日本料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//     {
//       id: 3,
//       name: "義大利料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//     {
//       id: 4,
//       name: "墨西哥料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//     {
//       id: 5,
//       name: "素食料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//     {
//       id: 6,
//       name: "美式料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//     {
//       id: 7,
//       name: "複合式料理",
//       createdAt: "2022-10-04T12:59:37.000Z",
//       updatedAt: "2022-10-04T12:59:37.000Z",
//     },
//   ],
//   categoryId: "",
//   page: 1,
//   totalPage: [1, 2, 3, 4, 5],
//   prev: 1,
//   next: 2,
// };

export default {
  name: "Restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
    };
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          //參數會等於呼叫fetchRestaurants時帶進來的參數
          page: queryPage,
          categoryId: queryCategoryId,
        });

        //console.log(response);
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = response.data;

        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  },
  created() {
    //原本寫法 => this.fetchRestaurants({ queryPage: '', queryCategoryId: '' })
    //created()這邊也要更改成下面寫法，因為如果今天是直接使用網址貼上，會呼叫的是created()，改成下面寫法才會是對應的頁面，原本寫法會是全部的˙頁面
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
  },
  //beforeRouteUpdate這個方法是vue提供，當網址改變時，可以抓取query的資料，再將資料重新呼叫fetchRestaurants，next()記得寫上，否則沒有動作
  beforeRouteUpdate(to, from, next) {
    //console.log(to, from);
    //page = "" ，給預設值空字串，因有可能網址只出現categoryId，沒有page，若沒有給預設空字串，js會判斷'undefined'，帶入網址，這時候就會出現錯誤
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    next();
  },
};
</script>