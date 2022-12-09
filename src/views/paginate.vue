<template>
  <h1>我是Test</h1>
  <div>
    <table>
      <tr v-for="item in testsBox.tests" :key="item.productName">
        <!--<td>{{ index }}</td>-->
        <td>{{ item.productId }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.productPrice }}</td>
        <td>{{ item.productNum }}</td>
      </tr>
    </table>
  </div>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="5"
    @current-change="page"
  >
  </el-pagination>
</template>

<style scoped>
td {
  background-color: bisque;
}
</style>

<script>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";

export default {
  setup() {
    //    定義資料:數值 字串要使用ref;物件 陣列要使用reactive
    const name = ref("Test");
    const testsBox = reactive({ tests: [] });

    onMounted(() => {
      axios
        .get("/data/productPage")
        // .get("/data/student/allstudent")
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log(testsBox);
          testsBox.tests = res.data;
          console.log(testsBox.tests);
          console.log(testsBox.tests[4]);
          // 迴圈結束後才開始來取得資料長度
          testsBox.tests.totalResult = testsBox.tests.length;
          console.log(testsBox.tests.totalResult);
          // 設置每一頁資料數量
          testsBox.per_page = 5;
          // 統計總頁數
          // 公式:總長度 / 每一頁數量，另外這裡會出現小數點，所以要使用 Math.ceil 來無條件進位
          testsBox.pageTotal = Math.ceil(
            testsBox.totalResult / testsBox.per_page
          );
          // 接下來定義當前頁數
          // 通常是 1
          testsBox.currentPage = 1;
          // 但是要注意，當前頁數是不可能超過總頁數，所以需要做一個判斷來避免
          if (testsBox.currentPage > testsBox.pageTotal) {
            testsBox.currentPage = testsBox.pageTotal;
          }
          // 接下來當我們目前位於第二頁時，資料會是 11~20
          // 所以這邊會有一段公式來做計算
          // 假設當前位於第二頁，所以就是 (10 * 2) - 10 = 10，最後 + 1，所以最小頁數就是 11 開始
          // 如果不清楚的時候可以使用結果反推
          const minPage =
            testsBox.currentPage * testsBox.per_page - testsBox.per_page + 1; // 11
          const maxPage = testsBox.currentPage * testsBox.per_page; // 20
          console.log(minPage);
          console.log(maxPage);
          // 開始做資料處理
          // 首先要將所有資料拉出來
          testsBox.products = [];
          testsBox.tests.forEach((item, index) => {
            // 由於 index 是從 0 開始，所以要建立一個變數儲存正確的數量
            const num = index + 1;
            // 接下來寫上判斷式
            // 當 num 比 minPage 大並且比 maxPage 小的時候，就 push 資料進去
            if (num >= minPage && num <= maxPage) {
              testsBox.products.push(item);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert("error");
        });
    });

    return { name, testsBox };
  },
  page(currentPage) {
    const _this = this;
    axios
      .get("/data/productPage")
      .then(function (res) {
        console.log(res.data);
        _this.tableData = res.data.list;
        _this.total = res.data.total;
        console.log(_this.tableData);
        console.log(_this.total);
      });
  }
};
</script>
