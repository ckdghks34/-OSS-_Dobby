<template>
  <div class="selectSignup">
    <div class="signupBox">
      <h1>내 손 안의 비서 DOBBY</h1>
      <p>회원가입 하고 DOBBY를 만나보세요</p>

      <router-link class="signupRouter" to="/signup">
        <div>
          <img src="@/assets/dobby.png" alt="" /> <br />
          <p>Dobby 회원가입</p>
        </div>
      </router-link>
      <router-link class="signupRouter" to="/sign">
        <div>
          <img src="@/assets/naver.png" alt="" />
          <br />
          <p>네이버 회원가입</p>
        </div>
      </router-link>
      <router-link class="signupRouter" to="/sign">
        <div>
          <img src="@/assets/google.png" alt="" />
          <br />
          <p>구글 회원가입</p>
        </div>
      </router-link>
      <br />
      <router-link to="/main"
        ><button class="blueBtn">돌아가기</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectSignup',
}
</script>

<style>
.selectSignup {
  display: flex;
  height: 85vh;
  align-items: center;
}

.signupBox {
  width: 100%;
  min-width: 200px;
  max-width: 1500px;
  margin: 0 auto;
}

.signupBox > p {
  margin-bottom: 50px;
}

.signupRouter {
  text-decoration: none;
}

.signupRouter > div {
  display: inline-block;
  height: 330px;
  width: 20%;
  margin: 0 2%;
  padding: 62px 20px 20px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 10px #b3b3b3;
  transition: all 0.1s linear;
  cursor: pointer;
}

.signupRouter > div:hover {
  box-shadow: 0 0 10px #719ece;
}

.signupRouter > div > p {
  margin-top: 70px;
  font-size: 20px;
  color: black;
}

.signupRouter > div > img {
  width: 80%;
  height: 200px;
}

.signupBox > a > button {
  width: 300px;
  height: 50px;
  margin: 5%;
  font-size: 20px;
}

@media screen and (max-width: 999px) {
  .signupRouter > div {
    display: block;
    height: 40px;
    width: 70%;
    min-width: 200px;
    max-width: 500px;
    margin: 30px auto;
    padding: 10px;
  }

  .signupRouter > div > img {
    float: left;
    width: 45px;
    height: 40px;
  }

  .signupRouter > div > p {
    margin-top: -20px;
  }

  .signupBox > h1 {
    margin: 0;
  }

  .signupBox > a > button {
    width: 200px;
    margin: 10px 0;
  }
}

@media screen and (max-width: 320px) {
  .signupRouter > div > p {
    font-size: 15px;
    margin-top: -15px;
  }
}
</style>
