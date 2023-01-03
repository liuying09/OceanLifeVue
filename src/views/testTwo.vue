<template>
  <div class="main-form first">
    <div class="main-form__title">
      <h1>登入</h1>
    </div>
    <div class="main-form__body">
      <input
        id="articleTitle"
        class="main-form__input"
        type="text"
        placeholder="articleTitle"
      />
      <input
        id="articleContent"
        class="main-form__input"
        type="text"
        placeholder="articleContent"
      />
      <input
        id="articleRemark"
        class="main-form__input"
        type="text"
        placeholder="articleRemark"
      />
      <input
        id="articleStatus"
        class="main-form__input"
        type="text"
        placeholder="articleStatus"
      />
      <input
        id="valueEN"
        class="main-form__input"
        type="text"
        placeholder="valueEN"
      />

      <img id="logo" src="" width="100%" />
      <button class="btn">上傳照片</button>
      <input id="photo" type="file" name="fileField" />

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
        const articleTitle = $("#articleTitle").val();
        const articleContent = $("#articleContent").val();
        const articleRemark = $("#articleRemark").val();
        const articleStatus = $("#articleStatus").val();
        const valueEN = $("#valueEN").val();
        const photo = $("#photo").val();

        axios({
          method: "post",
          url: "http://localhost:8090/MySpringBoot/addArticle",
          headers: {
            Accpet: "application/json",
            "Content-type": "multipart/form-data"
          },
          // API要求的資料
          data: {
            articleTitle: articleTitle,
            articleContent: articleContent,
            articleRemark: articleRemark,
            articleStatus: articleStatus,
            valueEN: valueEN,
            photo: photo
          }
        }).then((res) => {
          console.log(res);
          console.log(res.data);
        });
      });

      $(document).ready(function () {
        $("#photo").change(function () {
          const fil = this.files;
          for (var i = 0; i < fil.length; i++) {
            reads(fil[i]);
          }
        });
      });
      function reads(fil) {
        const reader = new FileReader();
        reader.onload = function () {
          $("#logo").attr("src", reader.result);
        };
      }
    });
  }
};
</script>
