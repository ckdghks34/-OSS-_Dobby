<template>
  <div class="findInfo">
    <el-dialog v-model="info.dialogVisible">
      <span>{{ info.message }}</span>
    </el-dialog>
    <div class="findId">
      <h2 v-if="info.find">아이디 찾기</h2>
      <h2 v-else>비밀번호 찾기</h2>
      <div v-if="!info.result">
        <p v-if="info.find">가입 시 등록한 이메일을 입력해 주세요</p>
        <p v-else>가입 시 등록한 정보를 입력해 주세요</p>
        <div v-if="info.find">
          <el-input
            v-model="info.userEmail"
            placeholder="이메일"
            @keyup.enter="clickFindId"
          ></el-input>
        </div>
        <div v-else>
          <el-input
            v-model="info.userId"
            placeholder="아이디"
            @keyup.enter="clickFindPw"
          ></el-input>
          <el-input
            v-model="info.userEmail"
            placeholder="이메일"
            @keyup.enter="clickFindPw"
          ></el-input>
        </div>
        <button
          class="findIdBtn"
          v-if="info.find"
          type="button"
          @click="clickFindId"
        >
          아이디 찾기
        </button>
        <button class="findIdBtn" v-else type="button" @click="clickFindPw">
          비밀번호 찾기
        </button>
      </div>

      <div v-else>
        <div v-if="info.find">
          <span>아이디: {{ info.userId }}</span>
        </div>
        <div v-else>
          <p style="margin-top:5%">비밀번호 변경</p>
          <el-form
            class="changePwForm"
            :model="state.form"
            :rules="state.rules"
            ref="changePwForm"
            :label-position="state.form.align"
            label-width="103px"
          >
            <el-form-item label="비밀번호" prop="password">
              <el-input
                v-model="state.form.password"
                type="password"
                placeholder="8~16, 영문+숫자+특수문자"
              ></el-input>
            </el-form-item>
            <el-form-item label="비밀번호 확인" prop="checkPw">
              <el-input v-model="state.form.checkPw" type="password"></el-input>
            </el-form-item>
          </el-form>
          <button class="findIdBtn" type="button" @click="clickChangePw">
            비밀번호 변경
          </button>
        </div>
      </div>

      <router-link to="/main"
        ><button class="findCancelBtn">취소</button></router-link
      >
      <button
        class="findPwBtn"
        v-if="info.find"
        type="button"
        @click=";(info.find = false), (info.result = false)"
      >
        비밀번호 찾기
      </button>
      <button
        class="findPwBtn"
        v-else
        type="button"
        @click=";(info.find = true), (info.result = false)"
      >
        아이디 찾기
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'findInfo',

  setup() {
    const changePwForm = ref(null)

    const info = reactive({
      find: true,
      userId: '',
      userEmail: '',
      dialogVisible: false,
      message: '',
      result: false,
    })

    const state = reactive({
      form: {
        password: '',
        checkPw: '',
        align: 'left',
      },
      rules: {
        password: [
          { required: true, message: '필수 입력 항목입니다' },
          {
            min: 8,
            max: 16,
            message: '비밀번호는 8~16자입니다',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,16}$/,
            message: '영문, 숫자, 특수문자 조합 필요',
          },
        ],
        checkPw: [
          { required: true, message: '필수 입력 항목입니다' },
          {
            validator(rule, value, callback) {
              if (value != state.form.password) {
                callback(new Error('비밀번호가 일치하지 않습니다'))
              } else {
                callback()
              }
            },
          },
        ],
      },
    })

    const clickFindId = function() {
      if (info.userEmail) {
        axios
          .post('https://k5d105.p.ssafy.io:3030/users/findID', {
            email: info.userEmail,
          })
          .then((res) => {
            info.result = true
            info.userId = res.data.id
          })
          .catch(() => {
            info.dialogVisible = true
            info.message = '일치하는 정보가 없습니다'
          })
      }
    }

    const clickFindPw = function() {
      if (info.userId && info.userEmail) {
        axios
          .post('https://k5d105.p.ssafy.io:3030/users/findPW', {
            id: info.userId,
            email: info.userEmail,
          })
          .then(() => {
            info.result = true
          })
          .catch(() => {
            info.dialogVisible = true
            info.message = '일치하는 정보가 없습니다'
          })
      }
    }

    const clickChangePw = function() {
      changePwForm.value.validate((valid) => {
        if (valid) {
          axios
            .post('https://k5d105.p.ssafy.io:3030/users/changePW', {
              id: info.userId,
              password: state.form.password,
            })
            .then(() => {
              info.dialogVisible = true
              info.message = '비밀번호가 변경되었습니다'
            })
        }
      })
    }
    return {
      changePwForm,
      info,
      state,
      clickFindId,
      clickFindPw,
      clickChangePw,
    }
  },
}
</script>

<style>
.findInfo {
  display: flex;
  height: 85vh;
  align-items: center;
}

.findId {
  width: 90%;
  min-width: 270px;
  max-width: 700px;
  margin: 0 auto;
}

.findId h2,
.findId p {
  margin-top: 0;
  text-align: left;
}

.findId input,
.findIdBtn {
  margin-top: 3%;
  width: 100%;
}

.findId input {
  border: 2px solid #a9c9de;
}

.findId input:hover,
.findId input:focus {
  outline: none;
  border: 2px solid #a9c9de;
  box-shadow: 0 0 5px #a9c9de;
}

.findIdBtn,
.findPwBtn,
.findCancelBtn {
  height: 40px;
  border: none;
  border-radius: 2px;
  background-color: #a9c9de;
  font-family: 'Gowun Batang', serif !important;
  color: white;
}

.findPwBtn {
  margin: 5% 0 0 3%;
}

.findIdBtn:hover,
.findPwBtn:hover {
  box-shadow: 0 0 10px #a9c9de;
}

.findPwBtn,
.findCancelBtn {
  width: 48%;
}

.findCancelBtn {
  background-color: rgb(255, 155, 155);
}

.findCancelBtn:hover {
  box-shadow: 0 0 10px rgb(255, 155, 155);
}

.changePwForm .el-input {
  text-align: left;
}
.changePwForm .el-input input {
  margin: 0;
}

.findInfo .el-dialog {
  width: 30%;
  top: 20%;
  max-width: 400px;
}

.findInfo .el-dialog__body {
  word-break: keep-all;
}

@media screen and (max-width: 950px) {
  .findInfo .el-dialog {
    width: 40%;
    top: 20%;
    word-break: keep-all;
  }
}

@media screen and (max-width: 680px) {
  .findInfo .el-dialog {
    width: 80%;
    top: 20%;
  }
}
</style>
