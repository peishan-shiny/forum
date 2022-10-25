<template>
  <div class="col-3">
    <a href="#">
      <img :src="user.image" width="140px" height="140px" />
    </a>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary"
      >追蹤人數：{{ user.followerCount }}</span
    >
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        @click.stop.prevent="deleteFollowed(user.id)"
        type="button"
        class="btn btn-danger"
      >
        取消追蹤
      </button>
      <button
        v-else
        @click.stop.prevent="addFollowed(user.id)"
        type="button"
        class="btn btn-primary"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";

export default {
  name: "UsersTopCard",
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      user: this.initialUser,
    };
  },

  methods: {
    async addFollowed(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        console.log(typeof this.user.followerCount);
        this.user = {
          ...this.user,
          followerCount: this.user.followerCount + 1,
          isFollowed: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法追蹤請稍號再試！",
        });
      }
    },
    async deleteFollowed(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.user = {
          ...this.user,
          followerCount: this.user.followerCount - 1,
          isFollowed: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法刪除請稍號再試！",
        });
      }
    },
  },
};
</script>