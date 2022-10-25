<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1,
    name: "Chase Kling",
    tel: "621.126.1340",
    address: "55005 Beer Valleys",
    opening_hours: "08:00",
    description:
      "Ad officiis id voluptas est saepe dolorem maxime minima.\nNeque porro eum pariatur voluptatem vero autem praesentium qui excepturi.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=88.36185726282892",
    viewCounts: 0,
    createdAt: "2022-10-04T12:59:37.000Z",
    updatedAt: "2022-10-04T12:59:37.000Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2022-10-04T12:59:37.000Z",
      updatedAt: "2022-10-04T12:59:37.000Z",
    },
    Comments: [
      {
        id: 51,
        text: "Sunt quo et voluptate.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2022-10-04T12:59:37.000Z",
        updatedAt: "2022-10-04T12:59:37.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$ewLo/FPRB2VDm1batVFu6O4bhg3cwyOgzywrULPO4pwmuaA8tOmu.",
          isAdmin: true,
          image: null,
          createdAt: "2022-10-04T12:59:37.000Z",
          updatedAt: "2022-10-04T12:59:37.000Z",
        },
      },
      {
        id: 101,
        text: "Cupiditate quas quod.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2022-10-04T12:59:37.000Z",
        updatedAt: "2022-10-04T12:59:37.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$MiqC0EhI44DI7uIVh6ZDtuOpQSC0/pAn2Q0ggsrpTD/DIreCQWgtC",
          isAdmin: false,
          image: null,
          createdAt: "2022-10-04T12:59:37.000Z",
          updatedAt: "2022-10-04T12:59:37.000Z",
        },
      },
      {
        id: 1,
        text: "Ut saepe quia tempora explicabo facilis mollitia.",
        UserId: 3,
        RestaurantId: 1,
        createdAt: "2022-10-04T12:59:37.000Z",
        updatedAt: "2022-10-04T12:59:37.000Z",
        User: {
          id: 3,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$gn0ZWlVaqy5zVWFj7MtUmO7FQsKnxp48wjegMtTVMMW1CaVvwiTmO",
          isAdmin: false,
          image: null,
          createdAt: "2022-10-04T12:59:37.000Z",
          updatedAt: "2022-10-04T12:59:37.000Z",
        },
      },
    ],
  },
};

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: dummyData.restaurant,
    };
  },
};
</script>