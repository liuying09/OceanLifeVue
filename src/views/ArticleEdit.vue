<template>
  <table>
    <!-- <tr v-for="item in testsBox.tests" :key="item.articleTitle"> -->
      <!--<td>{{ index }}</td>-->
      <!-- <td>{{ item.articleTitle }}</td> -->
      <!-- <td>{{ item.articleContent }}</td> -->
      <!-- <td>{{ item.articleRemark }}</td> -->
      <!-- <td>{{ item.articleStatus }}</td> -->
    <!-- </tr> -->
  </table>
  <table>
    <tr>
      <!--<td>{{ index }}</td>-->
      <td>{{ testsBox.tests.articleTitle }}</td>
      <td>{{ testsBox.tests.articleContent }}</td>
      <td>{{ testsBox.tests.articleRemark }}</td>
      <td>{{ testsBox.tests.articleStatus }}</td>
      <td>{{ testsBox.tests.createDate }}</td>
      <img
        :src="'data:image/png;base64,' + testsBox.tests.articleImg"
        style="width: 200px"
      />
    </tr>
  </table>
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
          <input
            id="customFile"
            class="imgInput"
            type="file"
            name="file-to-upload"
            ref="fileInput"
            value=""
          />
          <img :src="'data:image/png;base64,' + testsBox.tests.articleImg" alt="" style="width: 300px; heigh: 200px" />
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
        <button type="submit" class="addBtn" @click.prevent="submitFn">
          新增
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
td {
  background-color: bisque;
}
</style>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";

export default {
  setup() {
    //    定義資料:數值 字串要使用ref;物件 陣列要使用reactive
    const testsBox = reactive({ tests: [] });
    onMounted(() => {
      axios({
        method: "post",
        url: "http://localhost:8090/MySpringBoot/updateArticle",
        // url: "https://oceandemo.herokuapp.com/MySpringBoot/findArticleByArticleID",
        data: {
          articleID: 24
        }
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        testsBox.tests = res.data;
        console.log("testsBox=" + testsBox.tests.articleTitle);
        console.log("createDate=" + testsBox.tests.createDate);

        $("#title").val(testsBox.tests.articleTitle);
        $("#content").val(testsBox.tests.articleContent);
        $("#remark").val(testsBox.tests.articleRemark);
        $("#customFile").src(testsBox.tests.articleImg);
      });
    });
    return { testsBox };
  }
};
</script>
