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
  <div class="main-form first">
    <div class="main-form__title">
      <h1>新增商品</h1>
    </div>
    <div class="main-form__body">
      <input
        id="PRODUCTNAME"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTNAME"
      />
      <input
        id="PRODUCTPRICE"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTPRICE"
      />
      <input
        id="PRODUCTPRICESALE"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTPRICESALE"
      />
      <input
        id="PRODUCTIMG"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTIMG"
      />
      <input
        id="PRODUCTTYPE"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTTYPE"
      />
      <input
        id="PRODUCTNUM"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTNUM"
      />
      <input
        id="PRODUCTCONTENT"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTCONTENT"
      />
      <input
        id="PRODUCTSPENMATERIAL"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTSPENMATERIAL"
      />
      <input
        id="PRODUCTSPENSIZE"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTSPENSIZE"
      />
      <input
        id="PRODUCTSPENMF"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTSPENMF"
      />
      <input
        id="PRODUCTREMARK"
        class="main-form__input"
        type="text"
        placeholder="PRODUCTREMARK"
      />
      <button class="btn">Clear</button>
      <button id="enter" class="btn">Register</button>
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
import { ref, reactive, onMounted } from "vue";

export default {
  setup() {
    //    定義資料:數值 字串要使用ref;物件 陣列要使用reactive
    const name = ref("Test");
    const testsBox = reactive({ tests: [] });

    onMounted(() => {
      $("#enter").click(function () {
        const PRODUCTNAME = $("#PRODUCTNAME").val();
        const PRODUCTPRICE = $("#PRODUCTPRICE").val();
        const PRODUCTPRICESALE = $("#PRODUCTPRICESALE").val();
        const PRODUCTIMG = $("#PRODUCTIMG").val();
        const PRODUCTTYPE = $("#PRODUCTTYPE").val();
        const PRODUCTNUM = $("#PRODUCTNUM").val();
        const PRODUCTCONTENT = $("#PRODUCTCONTENT").val();
        const PRODUCTSPENMATERIAL = $("#PRODUCTSPENMATERIAL").val();
        const PRODUCTSPENSIZE = $("#PRODUCTSPENSIZE").val();
        const PRODUCTSPENMF = $("#PRODUCTSPENMF").val();
        const PRODUCTREMARK = $("#PRODUCTREMARK").val();

        console.log("PRODUCTNAME= " + PRODUCTNAME);

        axios({
          method: "post",
          url: "https://oceandemo.herokuapp.com/MySpringBoot/addProduct",
          // API要求的資料
          data: {
            productName: PRODUCTNAME,
            productPrice: PRODUCTPRICE,
            productPriceSale: PRODUCTPRICESALE,
            productImg: PRODUCTIMG,
            productType: PRODUCTTYPE,
            productNum: PRODUCTNUM,
            productContent: PRODUCTCONTENT,
            productSpenMaterial: PRODUCTSPENMATERIAL,
            productSpenSize: PRODUCTSPENSIZE,
            productSpenMF: PRODUCTSPENMF,
            productRemark: PRODUCTREMARK
          }
        }).then((response) => alert("新增成功"));
      });
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
        })
        .catch((error) => {
          console.log(error);
          alert("error");
        });
    });

    return { name, testsBox };
  }
};
</script>
