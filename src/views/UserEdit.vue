<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <div class="mb-3">
          <img :src="user.image" width="200" height="200" />
        </div>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
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
  name: "UserEdit",
  data() {
    return {
      user: {
        name: "",
        image: "",
      },
    };
  },
  methods: {
    fetchData() {
      const { currentUser } = dummyUser;
      const { name, image } = currentUser;
      this.user = {
        ...this.user,
        name,
        image,
      };
    },
    handleFileChange(e) {
      const fileList = e.target.files;
      if (fileList.length === 0) {
        this.user.image = "";
        return;
      } else {
        const imgURL = window.URL.createObjectURL(fileList[0]);
        this.user.image = imgURL;
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchData(id);
  },
};
</script>