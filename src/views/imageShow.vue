<template>
  <table>
      <tr v-for="item in testsBox.tests" :key="item.articleTitle">
        <!--<td>{{ index }}</td>-->
        <td>{{ item.articleTitle }}</td>
        <td>{{ item.articleContent }}</td>
        <td>{{ item.articleRemark }}</td>
        <td>{{ item.articleStatus }}</td>
      </tr>
    </table>
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
      axios
        .get("https://oceandemo.herokuapp.com/MySpringBoot/findArticle")
        // .get("/data/student/allstudent")
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log(testsBox);
          testsBox.tests = res.data;
          console.log(testsBox.tests);
        })
        .catch((error) => {
          console.log(error);
          alert("error");
        });
    });
    return { testsBox };
  }
};
</script>
