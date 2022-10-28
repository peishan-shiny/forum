<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    // handleSubmit() {
    //   // 如果 email 或 password 為空，則使用 Toast 提示
    //   // 然後 return 不繼續往後執行
    //   if (!this.email || !this.password) {
    //     Toast.fire({
    //       icon: "warning",
    //       title: "請輸入您的 帳號/密碼",
    //     });
    //     return;
    //   }
    //   //isProcessing用來控制當Submit送出後，使用者不可以無限點擊，這樣會造成伺服器重複動作發生錯誤
    //   //當isProcessing = true，會啟動disabled，使Submit按鈕不可點擊，但記得無法登入時需在更改回isProcessing = false
    //   this.isProcessing = true;
    //   //請求API signIn的資料
    //   authorizationAPI
    //     .signIn({
    //       email: this.email,
    //       password: this.password,
    //     })
    //     .then((response) => {
    //       //取得API signIn的資料
    //       //console.log(response);
    //       const { data } = response;
    //       //如果進入error，會直接跳到catch執行catch那邊的動作
    //       if (data.status === "error") {
    //         //Error 用throw拋出來
    //         throw new Error(data.message);
    //       }
    //       // 將 token 存放在 localStorage 內
    //       localStorage.setItem("token", data.token);
    //       // 成功登入後轉址到餐廳首頁
    //       this.$router.push("/restaurants");
    //     })
    //     .catch((error) => {
    //       this.isProcessing = false;
    //       //優化 => 將密碼清空
    //       this.password = "";
    //       //Toast
    //       Toast.fire({
    //         icon: "warning",
    //         title: "請確認您輸入的 帳號/密碼",
    //       });
    //       console.log(error);
    //     });
    // },

    //async / await寫法
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請輸入您的 帳號/密碼",
          });
          return;
        }

        this.isProcessing = true;

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });

        const { data } = response;
        //console.log(data);
        if (data.status === "error") {
          throw new Error(data.message);
        }
        //將token存在localStorage
        localStorage.setItem("token", data.token);
        //將資料傳送至vuex儲存
        //this.$store.comit 專門呼叫vuex的方法
        this.$store.commit("setCurrentUser", data.user);
        //成功轉址
        this.$router.push("/restaurants");
      } catch (error) {
        this.isProcessing = false;
        this.password = "";

        Toast.fire({
          icon: "warning",
          title: "請確認您輸入的 帳號/密碼",
        });
        console.log(error);
      }
    },
  },
};
</script>