<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <!-- CARD -->
      <UsersTopCard v-for="user in users" :key="user.id" :initial-user="user" />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import UsersTopCard from "../components/UsersTopCard.vue";
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";

export default {
  name: "UsersTop",
  components: {
    NavTabs,
    UsersTopCard,
  },

  data() {
    return {
      users: [],
    };
  },

  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();
        // const { users } = data;
        // this.users = users;
        //console.log(data.users[0].FollowerCount);
        this.users = data.users.map((user) => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed,
        }));
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法讀取請稍號再試！",
        });
      }
    },
  },

  created() {
    this.fetchUsers();
  },
};
</script>