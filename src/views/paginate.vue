<template>
  <div class="main-form first">
    <div class="main-form__title">
      <h1>登入</h1>
    </div>
    <div class="main-form__body">
      <input
        id="userAccount"
        class="main-form__input"
        type="text"
        placeholder="userAccount"
      />
      <input
        id="userPass"
        class="main-form__input"
        type="text"
        placeholder="userPass"
      />
      <button id="enter" class="btn">登入</button>
    </div>
  </div>
</template>

<style scoped>
td {
  background-color: bisque;
}
</style>

<script>
import axios from "axios";
import { onMounted } from "vue";

export default {
  setup() {
    //    定義資料:數值 字串要使用ref;物件 陣列要使用reactive
    onMounted(() => {
      $("#enter").click(function () {
        const userAccount = $("#userAccount").val();
        const userPass = $("#userPass").val();

        axios({
          method: "post",
          url: "https://oceandemo.herokuapp.com/MySpringBoot/login",
          // API要求的資料
          data: {
            userAccount: userAccount,
            userPass: userPass
          }
        }).then((res) => {
          console.log(res);
          console.log(res.data);
        });
      });
    });
  }
};
</script>
