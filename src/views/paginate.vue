<script>
// 套件(Axios)
import axios from "axios";

// 導入內部檔案
import cityName from "@/assets/CityCountyData.json";

// Vue 方法
import { ref, reactive, watch } from "vue";

export default {
  setup() {
    const cityNameInfo = reactive({ data: cityName });
    // const select = reactive({ data: [] });
    const select = reactive({
      data: [
        {
          city: "臺北市",
          area: "中正區"
        }
      ]
    });

    console.log(cityNameInfo.data);

    // --------------- 定義資料 ---------------
    // 所上傳的圖片
    // 在vue3中，如果DOM上使用了ref，必須在setup中先定義，否則打包會報錯。
    const emailInput = ref(null);
    const pwdInput = ref(null);
    const confirmPwdInput = ref(null);
    const dayInput = ref(null);

    const nameInput = ref(null);
    const sexInput = ref(null);
    const countyInput = ref(null);
    const townshipInput = ref(null);
    const addressInput = ref(null);
    const subscriptionInput = ref(null);

    const form = ref(null);

    // -------------- function ---------------
    // 取得資料
    const submitFn = (e) => {
      // 判斷是否有填寫必填的欄位
      if (form.value.reportValidity()) {
        // (1) 取得表單資料

        const emailInfo = $("#email").val(); // 信箱
        const pwdInfo = $("#pwd").val(); // 密碼
        const confirmPwdInfo = $("#confirmPwd").val(); // 確認密碼
        const dateInfo = $("#date").val(); // 生日

        const nameInfo = $("#name").val(); // 姓名
        const sexInfo = $("#sex").val(); // 性別

        const countyInfo = $("#county").val(); // 縣市
        const townshipInfo = $("#township").val(); // 地區
        const addressInfo = $("#address").val(); // 地址

        // const subscriptionInfo = $("#subscription").attr('checked'); // 訂閱
        const subscriptionInfo = $("input[name='sub']").is(":checked");

        console.log(emailInfo);
        console.log(pwdInfo);
        console.log(confirmPwdInfo);
        console.log(nameInfo);
        console.log(sexInfo);
        console.log(countyInfo);
        console.log(dateInfo);
        console.log(townshipInfo);

        console.log(addressInfo);
        console.log(subscriptionInfo);

        // (2) 轉成 FormData 檔案格式
        const formData = new FormData(); // 就能建立一個FormData格式的內容

        // append 增加一個欄位到表單內，其中一個 file-to-upload
        // email是 input標籤name 的名稱
        // formData.append("value", typeInfo); // 文章類別
        formData.append("account", emailInfo); // 帳號(信箱)
        formData.append("pass", pwdInfo); // 密碼
        // formData.append("confirmPwd", confirmPwdInfo); // 確認密碼?
        formData.append("name", nameInfo); // 姓名
        formData.append("gender", sexInfo); // 性別
        formData.append("birth", dateInfo); // 日期
        formData.append("country ", countyInfo); // 城市
        formData.append("district", townshipInfo); // 地區
        formData.append("road", addressInfo); // 地址
        formData.append("sub", subscriptionInfo); // 狀態

        // console.log(formData);

        // (3) 將form表單的內容透過API的方式，發送到伺服器
        // const fileName = fileInput.value.id;

        //   const url = "https://oceandemo.herokuapp.com/MySpringBoot/addUser";
        const url = "http://localhost:8090/MySpringBoot/addUser";

        axios
          .post(url, formData)
          .then(function (res) {
            console.log(res.data);
            alert(res.data);
            if (res.data === "註冊成功") {
              // 清空輸入的內容
              emailInput.value = "";
              pwdInput.value = "";
              confirmPwdInput.value = "";

              dayInput.value = "";
              nameInput.value = "";
              sexInput.value = "";
              countyInput.value = "";
              townshipInput.value = "";
              addressInput.value = "";
              subscriptionInput.value = "";
            }

            // }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        e.preventDefault();
        // console.log("請完成必填欄位");
      }
    };

    // watch監控 cityActive 選城市時的變化
    watch(select.data.city, (newCity) => {
      // const newArr = twZip.city.filter((city) => city.name === newCity);
      // // 選好城市 取得鄉鎮名子回傳
      // twZip.area = newArr[0].area;
      // 若選了城市 又替換選了別的城市 會將它預設值 清空
      select.data.area = "";
      // console.log(newCity);
      // console.log(newArr[0].area);
    });

    return {
      confirmPwdInput,
      submitFn,
      nameInput,
      sexInput,
      countyInput,
      emailInput,
      pwdInput,
      form,
      townshipInput,
      addressInput,
      dayInput,
      subscriptionInput,
      cityNameInfo,
      select
    };
  }
};
</script>

<template>
  <main class="signup">
    <div class="containerMain">
      <form
        class="signupForm"
        ref="form"
        action="https://oceandemo.herokuapp.com/MySpringBoot/addUser"
        method="post"
        enctype="multipart/form-data"
      >
        <h3>會員註冊</h3>
        <p class="signupInfo">
          建立 Ｏcean Life 會員個人檔案，獨家優惠搶先領，歡迎加入 Ｏcean Life
          這個大家庭。
        </p>
        <input
          class="inputText"
          type="email"
          placeholder="電子郵件*"
          id="email"
          name="account"
          ref="emailInput"
          required
        />
        <br />
        <div class="InfoBox">
          <div class="passwordBox">
            <input
              class="inputText"
              type="password"
              placeholder="密碼*"
              id="pwd"
              name="pass"
              ref="pwdInput"
              required
            />
          </div>
          <p>最少8個字元，至少包含1個數字、1個字母</p>
        </div>
        <div class="InfoBox">
          <div class="passwordBox">
            <input
              class="inputText"
              type="password"
              placeholder="確認密碼*"
              id="confirmPwd"
              name="confirmPwd"
              ref="confirmPwdInput"
              required
            />
          </div>
        </div>

        <div class="InfoBox">
          <input
            placeholder="出生日期*"
            class="birthday"
            type="text"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
            id="date"
            name="birth"
            ref="dayInput"
            required
          />
          <!-- <input type="date" placeholder="出生日期" /> -->
          <p>每年生日時獲得獨家好禮。</p>
        </div>

        <div class="InfoBox">
          <input
            type="text"
            placeholder="姓名*"
            name="name"
            ref="nameInput"
            id="name"
            required
          />
          <p>需填寫真實姓名</p>
        </div>

        <select name="gender" class="sexBox" ref="sexInput" id="sex">
          <!-- <option value="">性別</option> -->
          <option value="男" selected>男</option>
          <option value="女">女</option>
          <option value="其他">其他</option>
        </select>

        <br />

        <div class="addressBox">
          <select
            name="country"
            class="county"
            ref="countyInput"
            id="county"
            v-model="select.data[0].city"
            placeholder="請選擇縣市"
          >
            <option value="" disabled>請選擇縣市</option>
            <option
              v-for="item in cityNameInfo.data"
              :key="item.CityName"
              :value="item.CityName"
              required
            >
              {{ item.CityName }}
            </option>
            <!-- <option value="">請選擇縣市</option>
            <option value="1" selected>新北市</option>
            <option value="2">台北市</option>
            <option value="3">宜蘭縣</option> -->
          </select>
          <select
            name="district"
            ref="townshipInput"
            id="township"
            v-model="select.data[0].area"
            placeholder="請選擇地區"
          >
            <option value="" disabled>請選擇地區</option>
            <option
              v-for="item in cityNameInfo.data.find(
                (city) => city.CityName === select.data[0].city
              ).AreaList"
              :key="item.AreaName"
              :value="item.AreaName"
            >
              {{ item.AreaName }}
            </option>
            <!-- <option value="">請選擇鄉鎮</option>
            <option value="1" selected>中和區</option>
            <option value="2">永和區</option> -->
          </select>
        </div>

        <input
          type="text"
          placeholder="地址*"
          name="road"
          ref="addressInput"
          required
          id="address"
        />

        <div class="subscriptionBox">
          <input
            type="checkbox"
            id="subscription"
            name="sub"
            ref="subscriptionInput"
          />
          <label for="subscription"
            >訂閱 Ocean Life， 獲得會員福利最新消息</label
          >
        </div>
        <span class="agreeInfo"
          >如建立帳號，即代表同意 Ocean Life 的
          <a href=""> 隱私權政策</a>
          和
          <a href=""> 使用條款</a>。</span
        >

        <router-link to="/login">
          <button class="signupBtn" type="submit" @click="submitFn">
            註冊
          </button>
        </router-link>

        <!-- <button class="signupBtn" type="submit" @click="submitFn">註冊</button> -->

        <span
          >已經是會員了?
          <router-link to="/login">立即登入</router-link>
          <!-- <a href="">立即登入</a> -->
        </span>
      </form>
    </div>
  </main>
</template>
