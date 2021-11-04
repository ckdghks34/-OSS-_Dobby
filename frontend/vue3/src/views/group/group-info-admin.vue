<template>
  <div class="groupInfo">
    <div class="groupInfoDiv">
      <div class="groupInfoTop">
        <img src="@/assets/dobby.png" alt="" />
        <div>
          <h3>그룹 이름</h3>
          <span>비공개 여부</span>
          <el-switch v-model="info.private"></el-switch>
          <el-input v-if="info.private"></el-input>
        </div>
      </div>
      <div class="groupInfoMid">
        <p>상세 설명</p>
        <el-input v-model="info.info" type="textarea"></el-input>
        <button>정보 수정</button>
        <div class="groupMember">
          <div v-for="t in test" :key="t">
            <p style="display:inline-block; margin: 4px 0;">{{ t }}</p>
            <span style="float: right; margin:1% 2% 0 0;">X</span>
          </div>
        </div>
        <div>
          <button>초대하기</button>
          <button>{group} is free!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'groupInfo',
  setup() {
    const info = reactive({
      private: false,
      info: 'sssss',
    })
    const test = [
      '어피치',
      '라이언',
      '무지',
      '미니언즈',
      '포돌이',
      '포순이',
      '뚱이',
    ]
    return { info, test }
  },
}
</script>

<style>
.groupInfo {
  display: flex;
  margin: 5% 0;
  align-items: center;
  overflow: auto;
}

.groupInfoDiv {
  width: 90%;
  min-width: 260px;
  max-width: 500px;
  margin: 0 auto;
}

.groupInfoTop img {
  float: left;
  width: 30%;
  margin: 0 5% 5% 0;
}

.groupInfoTop > div {
  float: left;
  width: 65%;
  text-align: left;
}

.groupInfoTop h3 {
  margin-top: 0;
}

.groupInfoTop span {
  display: inline-block;
  margin: 0 5% 5% 0;
}

.groupInfoMid p {
  clear: both;
  margin: 0;
  text-align: left;
}

.groupInfoMid textarea {
  height: 100px;
  max-height: 100px;
}

.groupInfoMid button {
  width: 100%;
  height: 35px;
  margin-top: 5%;
  color: white;
  background-color: #a9c9de;
  border: none;
  border-radius: 4px;
  font-family: 'Gowun Batang', serif !important;
}

.groupInfoMid button:hover {
  box-shadow: 0 0 10px #a9c9de;
}

.groupInfoMid div button:nth-child(2) {
  background-color: rgb(255, 155, 155);
}

.groupInfoMid div button:nth-child(2):hover {
  box-shadow: 0 0 10px rgb(255, 155, 155);
}

.groupMember {
  height: 200px;
  margin-top: 5%;
  border: 2px solid #a9c9de;
  border-radius: 2px;
  overflow: auto;
}
.groupMember::-webkit-scrollbar {
  width: 10px;
  background-color: white;
}
.groupMember::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgb(241, 241, 241);
}

.groupMember div {
  height: 30px;
  margin: 2%;
  text-align: center;
  background: rgb(241, 241, 241);
}

@media screen and (max-width: 570px) {
  .groupInfoTop img {
    float: none;
    width: 50%;
    margin: 0;
  }

  .groupInfoTop > div {
    display: inline-block;
    float: none;
    width: 65%;
    text-align: center;
  }

  .groupInfoTop h3 {
    margin-top: 5%;
  }

  .groupInfoMid p {
    clear: both;
    margin: 5% 0 2% 0;
    text-align: left;
  }
}
</style>
