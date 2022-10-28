<template>
  <div class="container py-5">
    <main role="main">
      <div class="album py-5 bg-light">
        <div class="container">
          <!-- UserProfileCard -->
          <UserProfileCard :profile="profile" :initialIsFollowed="isFollowed" />

          <div class="row">
            <div class="col-md-4">
              <!-- UserFollowingsCard -->
              <UserFollowingsCard :followings="profile.followings" />

              <br />
              <!-- UserFollowersCard -->
              <UserFollowersCard :followers="profile.followers" />
            </div>
            <div class="col-md-8">
              <!-- UserCommentsCard -->
              <UserCommentsCard :comments="profile.comments" />

              <br />

              <!-- UserFavoritedRestaurantsCard -->
              <UserFavoritedRestaurantsCard
                :favoritedRestaurants="profile.favoritedRestaurants"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import UserFollowingsCard from "../components/UserFollowingsCard.vue";
import UserFollowersCard from "../components/UserFollowersCard.vue";
import UserCommentsCard from "../components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard.vue";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        email: "",
        image: "",
        comments: [],
        favoritedRestaurants: [],
        followers: [],
        followings: [],
      },
      isFollowed: false,
    };
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.get(userId);
        const { isFollowed, profile } = data;

        const {
          id,
          name,
          email,
          image,
          Comments,
          FavoritedRestaurants,
          Followers,
          Followings,
        } = profile;

        this.profile = {
          id,
          name,
          email,
          image,
          comments: Comments,
          favoritedRestaurants: FavoritedRestaurants,
          followers: Followers,
          followings: Followings,
        };
        this.isFollowed = isFollowed;
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "無法讀取",
        });
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
};
</script>