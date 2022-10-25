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
              <strong>{{ profile.Comments.length }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ profile.FavoritedRestaurants.length }}</strong>
              收藏的餐廳
            </li>
            <li>
              <strong>{{ profile.Followings.length }}</strong> followings
              (追蹤者)
            </li>
            <li>
              <strong>{{ profile.Followers.length }}</strong> followers (追隨者)
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
                @click.stop.prevent="addFollowing"
                type="submit"
                class="btn btn-primary"
              >
                追蹤
              </button>
              <button
                @click.stop.prevent="deleteFollowing"
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
  data() {
    return {
      isFollowed: this.initialIsFollowed,
    };
  },

  methods: {
    checkedUser(profileId) {
      if (profileId === dummyUser.currentUser.id) {
        return true;
      }
    },

    addFollowing() {
      console.log("add");
      this.isFollowed = true;
    },

    deleteFollowing() {
      console.log("delete");
      this.isFollowed = false;
    },
  },
};
</script>
