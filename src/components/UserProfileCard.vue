<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">{{ profile.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ profile.comments.length }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ profile.favoritedRestaurants.length }}</strong>
              收藏的餐廳
            </li>
            <li>
              <strong>{{ profile.followings.length }}</strong> followings
              (追蹤者)
            </li>
            <li>
              <strong>{{ profile.followers.length }}</strong> followers (追隨者)
            </li>
          </ul>
          <p>
            <router-link
              v-if="checkedUser(profile.id)"
              :to="{ name: 'user-edit', params: { id: profile.id } }"
              ><button type="submit" class="btn btn-primary">
                edit
              </button></router-link
            >
            <template v-else>
              <button
                v-if="!this.isFollowed"
                @click.stop.prevent="addFollowing(profile.id)"
                type="submit"
                class="btn btn-primary"
              >
                追蹤
              </button>
              <button
                v-else
                @click.stop.prevent="deleteFollowing(profile.id)"
                type="submit"
                class="btn btn-danger"
              >
                取消追蹤
              </button>
            </template>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";

// const dummyUser = {
//   currentUser: {
//     id: 1,
//     name: "root",
//     email: "root@example.com",
//     image: "https://i.pravatar.cc/300",
//     isAdmin: true,
//   },
//   isAuthenticated: true,
// };

export default {
  name: "UserProfileCard",
  props: {
    profile: {
      type: Object,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },

  // watch: {
  //   initialIsFollowed(newValue) {
  //     this.isFollowed = {
  //       ...this.isFollowed,
  //       ...newValue,
  //     };
  //   },
  // },

  data() {
    return {
      isFollowed: this.initialIsFollowed,
    };
  },

  //使用mapState取出目前使用者
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  methods: {
    checkedUser(profileId) {
      if (profileId === this.currentUser.id) {
        return true;
      }
    },

    async addFollowing(profileId) {
      try {
        const response = await usersAPI.addFollowing(profileId);
        //console.log(response);
        if (response.data.status !== "success") {
          throw new Error(response.data.message);
        }

        this.isFollowed = true;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法追蹤",
        });
      }
    },

    async deleteFollowing(profileId) {
      try {
        const response = await usersAPI.deleteFollowing(profileId);
        //console.log(response);
        if (response.data.status !== "success") {
          throw new Error(response.data.message);
        }

        this.isFollowed = false;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法取消",
        });
      }
    },
  },
};
</script>
