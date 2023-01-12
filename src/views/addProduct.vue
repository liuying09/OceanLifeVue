<script>
// 套件(Axios)
import axios from "axios";

import { ref } from "vue";

export default {
  setup() {
    const images = ref("");

    // --------------- 定義資料 ---------------
    const popupBtn = ref(false);

    const fileInput = ref(null);

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

      const name = $("#name").val();
      const price = $("#price").val();
      const priceSale = $("#priceSale").val();
      const type = $("#type").val();
      const num = $("#num").val();
      const content = $("#content").val();
      const meterial = $("#meterial").val();
      const size = $("#size").val();
      const mf = $("#mf").val();
      const remark = $("#remark").val();

      // const typeInfo = valueEnInput.value;
      // const titleInfo = titleInput.value;
      // const contentInfo = contentInput.value;
      // const remarkInfo = remarkInput.value;
      // const statusInfo = statusInput.value;

      // (2) 轉成 FormData 檔案格式
      const formData = new FormData(); // 就能建立一個FormData格式的內容

      // append 增加一個欄位到表單內，其中一個 file-to-upload
      // file-to-upload 是 input標籤name 的名稱
      formData.append("name", name);
      // formData.append("file-to-upload", uploadfile);
      formData.append("price", price);
      formData.append("priceSale", priceSale);
      formData.append("type", type);
      formData.append("num", num);
      formData.append("content", content);
      formData.append("meterial", meterial);
      formData.append("size", size);
      formData.append("mf", mf);
      formData.append("remark", remark);
      formData.append("id", 15);

      // formData.append("title", name);
      // formData.append("content", price);
      // formData.append("date", priceSale);
      // formData.append("time", type);
      // formData.append("remark", num);

      for (var i = 0; i < fileInput.value.files.length; i++) {
        formData.append("file-to-upload", fileInput.value.files[i]);
      }
      // formData.append("file-to-upload", uploadfile);
      console.log(formData);
      // (3) 將form表單的內容透過API的方式，發送到伺服器
      // const fileName = fileInput.value.id;

      // const url = `https://oceandemo.herokuapp.com/MySpringBoot/addArticle`;
      // const url = `http://localhost:8090/MySpringBoot/addProduct`;
      const url = `http://localhost:8090/MySpringBoot/updateProduct`;
      // const url = `http://localhost:8090/MySpringBoot/addActivity`;

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
    action="http://localhost:8090/MySpringBoot/addProduct"
    method="post"
    enctype="multipart/form-data"
  >
    <div class="tableBox">
      <ul class="tableContent">
        <li>
          <label for="">文章編號</label>
          <p>000001</p>
        </li>
        <!-- <li>
          <label for="">文章類別</label>
          <select name="value" id="value" ref="valueEnInput">
            <option value="新品上市">新品上市</option>
            <option value="園區公告">園區公告</option>
            <option value="商城公告">商城公告</option>
          </select>
        </li> -->
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
            multiple
          />
          <img :src="images" alt="" style="width: 300px; heigh: 200px" />
        </li>
        <li>
          <label for="">商品名稱</label>
          <input id="name" type="text" name="name" ref="titleInput" />
        </li>
        <li class="positionTop">
          <label for="">商品價格</label>
          <textarea name="price" id="price" ref="contentInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">特價價格</label>
          <textarea
            name="priceSale"
            id="priceSale"
            ref="remarkInput"
          ></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品類別</label>
          <textarea name="type" id="type" ref="remarkInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品數量</label>
          <textarea name="num" id="num" ref="remarkInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品介紹</label>
          <textarea name="content" id="content" ref="remarkInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品材質</label>
          <textarea name="meterial" id="meterial" ref="remarkInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品尺寸</label>
          <textarea name="size" id="size" ref="remarkInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品產地</label>
          <textarea name="mf" id="mf" ref="remarkInput"></textarea>
        </li>
        <li class="positionTop">
          <label for="">商品備註</label>
          <textarea name="remark" id="remark" ref="remarkInput"></textarea>
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
