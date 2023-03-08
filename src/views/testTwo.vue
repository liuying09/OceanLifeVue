<script>
// 套件(Axios)
import axios from "axios";

import { ref } from "vue";

export default {
  setup() {
    const images = ref("");

    // --------------- 定義資料 ---------------
    // 彈跳視窗 (是否顯示)
    const popupBtn = ref(false);

    // 所上傳的圖片
    // 在vue3中，如果DOM上使用了ref，必須在setup中先定義，否則打包會報錯。
    const fileInput = ref(null);
    // const valueEnInput = ref(null);
    // const titleInput = ref(null);
    // const contentInput = ref(null);
    // const remarkInput = ref(null);
    // const statusInput = ref(null);

    // -------------- function ---------------
    // 當選擇圖片時會觸發
    // const uploadFile = () => {
    //   // (1) 取得所紹上船的圖片資料
    // const uploadfile = fileInput.value.files[0];
    // console.dir(uploadfile);
    //   // (2) 轉成 FormData 檔案格式
    //   const formData = new FormData(); // 就能建立一個FormData格式的內容
    //   // append 增加一個欄位到表單內，其中一個 file-to-upload
    //   formData.append("file-to-upload", uploadfile); // file-to-upload 是 input標籤name 的名稱
    //   // (3) 將form表單的內容透過API的方式，發送到伺服器
    //   // const fileName = fileInput.value.id;
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
    //   axios
    //     .post(url, formData)
    //     .then(function (res) {
    //       if (res.data.success) {
    //         console.log(res.data);
    //         // this.tempProducts.imageUrl = res.data.imageUrl;
    //         // document.getElementById(fileName).value = "";
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };

    // 取得資料
    axios
      .get("https://oceandemo.herokuapp.com/MySpringBoot/findArticle", {
        responseType: "blob"
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        const blob = new window.Blob([res.data]);
        const url = window.URL.createObjectURL(blob);
        images.value = url;
        console.log("test");
        console.log(url);
      });

    const submitFn = () => {
      console.log("送出資料");

      // (1) 取得表單資料
      const uploadfile = fileInput.value.files[0]; // 文章類別
      console.dir(uploadfile);

      const typeInfo = $("#value").val();
      const titleInfo = $("#title").val();
      const contentInfo = $("#content").val();
      const remarkInfo = $("#remark").val();
      const statusInfo = $("#status").val();

      // const typeInfo = valueEnInput.value;
      // const titleInfo = titleInput.value;
      // const contentInfo = contentInput.value;
      // const remarkInfo = remarkInput.value;
      // const statusInfo = statusInput.value;

      console.log(typeInfo);
      console.log(titleInfo);
      console.log(contentInfo);
      console.log(remarkInfo);
      console.log(statusInfo);

      // (2) 轉成 FormData 檔案格式
      const formData = new FormData(); // 就能建立一個FormData格式的內容

      // append 增加一個欄位到表單內，其中一個 file-to-upload
      // file-to-upload 是 input標籤name 的名稱
      // formData.append("value", typeInfo); // 文章類別
      // formData.append("file-to-upload", uploadfile); // 文章圖片
      // formData.append("title", titleInfo); // 文章標題
      // formData.append("content", contentInfo); // 文章內容
      // formData.append("remark", remarkInfo); // 文章內容-備註
      // formData.append("status", statusInfo); // 文章狀態
      // formData.append("id", 21); // 文章狀態

      formData.append("account", "oceanLife@gmail.com"); // 文章類別
      formData.append("pass", "123123"); // 文章圖片
      formData.append("name", "管理員"); // 文章標題
      formData.append("gender", "女"); // 文章內容

      console.log(formData);
      // (3) 將form表單的內容透過API的方式，發送到伺服器
      // const fileName = fileInput.value.id;

      // const url = `https://oceandemo.herokuapp.com/MySpringBoot/addArticle`;
      // const url = `http://localhost:8090/MySpringBoot/updateArticle`;
      const url = `http://localhost:8090/MySpringBoot/addUser`;

      axios
        .post(url, formData)
        .then(function (res) {
          if (res.data.success) {
            console.log(res.data);
            // this.tempProducts.imageUrl = res.data.imageUrl;
            // document.getElementById(fileName).value = "";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      popupBtn,
      fileInput,
      // uploadFile,
      images,
      submitFn
    };
  }
};
</script>

<template>
  <div class="titleBox">
    <h3>消息管理</h3>
    <span>- 新增文章</span>
  </div>

  <!-- 表格資料 -->
  <form
    action="http://localhost:8090/MySpringBoot/updateArticle"
    method="post"
    enctype="multipart/form-data"
  >
    <div class="tableBox">
      <ul class="tableContent">
        <li>
          <label for="">文章編號</label>
          <p>000001</p>
        </li>
        <li>
          <label for="">文章類別</label>
          <select name="value" id="value" ref="valueEnInput">
            <option value="新品上市">新品上市</option>
            <option value="園區公告">園區公告</option>
            <option value="商城公告">商城公告</option>
          </select>
        </li>
        <li>
          <label for="">圖片</label>
          <!-- <input
            id="customFile"
            class="imgInput"
            type="file"
            name="articleImg"
            ref="fileInput"
            @change="uploadFile"
          /> -->
          <input
            id="customFile"
            class="imgInput"
            type="file"
            name="file-to-upload"
            ref="fileInput"
          />
          <img :src="images" alt="" style="width: 300px; heigh: 200px" />
        </li>
        <li>
          <label for="">標題</label>
          <input id="title" type="text" name="title" ref="titleInput" />
        </li>
        <li class="positionTop">
          <label for="">文章內容</label>
          <textarea name="content" id="content" ref="contentInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">注意事項</label>
          <textarea name="remark" id="remark" ref="remarkInput"></textarea>
        </li>
        <li>
          <label for="">文章狀態</label>
          <select name="status" id="status" ref="statusInput">
            <option value="上架">上架</option>
            <option value="下架">下架</option>
          </select>
        </li>
      </ul>
      <!-- <a class="cancel" href="">取消</a> -->
      <div class="btnBox">
        <button type="button" class="cancelBtn" @click="popupBtn = !popupBtn">
          取消
        </button>
        <button type="submit" class="addBtn" @click.prevent="submitFn">
          新增
        </button>
      </div>
    </div>
  </form>

  <!-- 彈跳視窗 -->
  <main class="ticket-popup" v-show="popupBtn">
    <div class="containerMain">
      <div class="popupTop">
        <h3>關閉視窗</h3>
      </div>

      <div class="popupUnder">
        <p>尚未存檔，是否確認關閉？</p>
        <div class="popupBtnBox">
          <!-- <router-link to="/NewsBackendAdd">
            <button class="popupCloseBtn" type="button">取消</button>
          </router-link> -->

          <button
            class="popupCloseBtn"
            type="button"
            @click="popupBtn = !popupBtn"
          >
            取消
          </button>
          <router-link to="/backend/newsbackend">
            <button class="popupOkBtn" type="button">確定</button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
