<template>
  <div class="groupInfo" style="margin: 5% 0;">
    <div class="groupInfoDiv">
      <div class="groupInfoTop">
        <img src="@/assets/dobby.png" alt="" />
        <div>
          <el-input
            v-if="info.admin"
            v-model="info.groupTitle"
            style="margin-bottom:2%"
          ></el-input>
          <h3 v-else style="margin-top:0;">그룹 이름</h3>
          <span>비공개 여부</span>
          <el-switch
            v-model="info.private"
            :disabled="!info.admin"
            style="margin-bottom:1%; "
          ></el-switch>
          <el-input
            v-if="info.private"
            v-model="info.password"
            :disabled="!info.admin"
          ></el-input>
        </div>
      </div>
      <div class="groupInfoMid textarea">
        <p>상세 설명</p>
        <el-input
          v-model="info.info"
          type="textarea"
          :disabled="!info.admin"
        ></el-input>
        <button class="blueBtn" v-if="info.admin" @click="changeInfo">
          정보 수정
        </button>
        <div class="groupMember">
          <div v-for="t in test" :key="t">
            <p style="display:inline-block; margin: 4px 0;">{{ t }}</p>
            <span
              v-if="info.admin"
              style="float: right; margin:1% 2% 0 0; cursor: pointer;"
              @click="deleteMem(t)"
              >X</span
            >
          </div>
        </div>
        <div>
          <router-link to="/calendar"
            ><button class="blueBtn" style="margin-right: 4%; width: 48%;">
              돌아가기
            </button></router-link
          >

          <button class="blueBtn" style="width: 48%;" @click="inviteMem">
            초대하기
          </button>
          <button class="redBtn" @click="deleteGroup">{group} is free!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
// import axios from 'axios'

export default {
  name: 'groupInfo',
  setup() {
    const info = reactive({
      admin: false,
      private: false,
      password: '1234',
      groupTitle: '그룹 이름',
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

    const changeInfo = function() {
      alert('정보 수정')
      //! 임시
      // axios.put('http://k5d105.p.ssafy.io:9090/group', {
      //   private: info.private,
      //   password: info.password,
      //   groupTitle: info.groupTitle
      // })
    }

    const deleteMem = function(e) {
      alert(e + ' 삭제')
      // axios.delete('http://k5d105.p.ssafy.io:9090/group/member/exile')
    }

    const inviteMem = function() {
      alert('초대')
      // axios.post('http://k5d105.p.ssafy.io:9090/group/member/exile')
    }

    const deleteGroup = function() {
      alert('그룹 삭제')
      // axios.delete('http://k5d105.p.ssafy.io:9090/group')
    }
    return { info, test, changeInfo, deleteMem, inviteMem, deleteGroup }
  },
}
</script>

<style>
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

.groupInfoTop span {
  display: inline-block;
  margin: 4% 5% 1% 0;
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
}

.groupInfoTop .el-switch.is-checked .el-switch__core {
  border-color: #a9c9de;
  background-color: #a9c9de;
}

.groupInfoMid .el-textarea.is-disabled .el-textarea__inner,
.groupInfoTop .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #a9c9de;
  color: black;
  cursor: auto;
}

.groupInfoTop .el-switch.is-disabled .el-switch__core {
  cursor: auto;
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
