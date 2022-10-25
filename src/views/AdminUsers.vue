<template>
  <div class="container py-5">
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>
            <p v-show="user.isAdmin">admin</p>
            <p v-show="!user.isAdmin">user</p>
          </td>
          <td>
            <button
              v-if="user.id !== currentUser.id"
              @click.stop.prevent="toggleUserRole(user.id)"
              type="button"
              class="btn btn-link"
            >
              <p v-show="user.isAdmin">set as user</p>
              <p v-show="!user.isAdmin">set as admin</p>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$ewLo/FPRB2VDm1batVFu6O4bhg3cwyOgzywrULPO4pwmuaA8tOmu.",
      isAdmin: true,
      image: null,
      createdAt: "2022-10-04T12:59:37.000Z",
      updatedAt: "2022-10-04T12:59:37.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$MiqC0EhI44DI7uIVh6ZDtuOpQSC0/pAn2Q0ggsrpTD/DIreCQWgtC",
      isAdmin: false,
      image: null,
      createdAt: "2022-10-04T12:59:37.000Z",
      updatedAt: "2022-10-04T12:59:37.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$gn0ZWlVaqy5zVWFj7MtUmO7FQsKnxp48wjegMtTVMMW1CaVvwiTmO",
      isAdmin: false,
      image: null,
      createdAt: "2022-10-04T12:59:37.000Z",
      updatedAt: "2022-10-04T12:59:37.000Z",
    },
  ],
};
const dummyUser = {
  currentUser: {
    id: 1,
    name: "root",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

import AdminNav from "../components/AdminNav.vue";

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      currentUser: dummyUser.currentUser,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.users = dummyData.users;
    },
    toggleUserRole(userId) {
      this.users = this.users.map((item) => {
        if (item.id === userId) {
          return {
            ...item,
            //這裡的!是指切換
            isAdmin: !item.isAdmin,
          };
        }
        return item;
      });
    },
  },
};
</script>