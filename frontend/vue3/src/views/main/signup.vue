<template>
  <div class="signupDiv">
    <el-dialog v-model="info.dialogVisible">
      <span>{{ info.message }}</span>
    </el-dialog>
    <div class="signup">
      <h2 style="text-align: left;">회원가입</h2>
      <el-form
        class="signupForm"
        :model="state.form"
        :rules="state.rules"
        ref="signupForm"
        :label-position="state.form.align"
        label-width="103px"
      >
        <el-form-item label="이름" prop="userName">
          <el-input v-model="state.form.userName" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="전화번호" prop="userPhone">
          <el-input v-model="state.form.userPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="아이디" prop="userId">
          <el-input
            class="duplInput"
            v-model="state.form.userId"
            placeholder="5~8글자, 영문/숫자"
            @input="info.checkId = false"
          ></el-input>
          <button
            type="button"
            class="checkDuplBtn"
            @click="checkIdDupl"
            :disabled="info.checkId"
          >
            중복 확인
          </button>
        </el-form-item>
        <el-form-item label="닉네임" prop="userNick">
          <el-input
            class="duplInput"
            v-model="state.form.userNick"
            placeholder="최대 8글자"
            @input="info.checkNick = false"
          ></el-input>
          <button
            type="button"
            class="checkDuplBtn"
            @click="checkNickDupl"
            :disabled="info.checkNick"
          >
            중복 확인
          </button>
        </el-form-item>
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
        <el-form-item label="이메일" prop="email">
          <el-input
            class="duplInput"
            v-model="state.form.email"
            type="email"
            @input="info.checkEmail = false"
          ></el-input
          ><button
            class="checkDuplBtn"
            @click="checkEmailDupl"
            type="button"
            :disabled="info.checkEmail"
          >
            중복 확인
          </button>
        </el-form-item>
        <el-form-item label="주소" prop="address">
          <el-input v-model="state.form.address" type="email"></el-input>
        </el-form-item>
      </el-form>
      <router-link to="/main"
        ><button class="signupCancel">취소</button></router-link
      >
      <button class="signupBtn" @click="clickSignup" type="button">
        회원가입
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'signup',
  setup() {
    const router = useRouter()
    const signupForm = ref(null)

    const info = reactive({
      message: '',
      dialogVisible: false,
      checkId: false,
      checkNick: false,
      checkEmail: false,
    })

    const state = reactive({
      form: {
        userName: '',
        userId: '',
        userPhone: '',
        userNick: '',
        password: '',
        checkPw: '',
        email: '',
        address: '',
        align: 'left',
      },
      rules: {
        userName: [{ required: true, message: '필수 입력 항목입니다' }],
        userPhone: [
          { required: true, message: '필수 입력 항목입니다' },
          {
            pattern: /^01[0-1]{1}[0-9]{3,4}[0-9]{4}/,
            message: '유효하지 않은 전화번호입니다',
          },
        ],
        userId: [
          { required: true, message: '필수 입력 항목입니다' },
          { min: 5, max: 8, message: '아이디는 5~8자입니다' },
          {
            pattern: /^[A-Za-z]{1,8}[0-9]{0,7}/,
            message: '아이디는 영문/숫자 조합',
          },
        ],
        userNick: [
          { required: true, message: '필수 입력 항목입니다' },
          { max: 8, message: '8글자까지 입력 가능합니다' },
        ],
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
        email: [
          { required: true, message: '필수 입력 항목입니다' },
          {
            pattern: /^([0-9a-zA-Z]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z]{2,3})$/,
            message: '올바른 이메일 형식이 아닙니다',
          },
        ],
        address: [{ required: true, message: '필수 입력 항목입니다' }],
      },
    })

    const checkIdDupl = function() {
      if (5 <= state.form.userId.length && state.form.userId.length <= 8) {
        axios
          .get('https://k5d105.p.ssafy.io:3030/users/checkDuplicateID', {
            params: { id: state.form.userId },
          })
          .then((res) => {
            if (res.data.valid) {
              info.dialogVisible = true
              info.message = '사용 가능한 아이디입니다'
              info.checkId = true
            } else {
              info.dialogVisible = true
              info.message = '이미 등록된 아이디입니다'
            }
          })
      }
    }

    const checkNickDupl = function() {
      if (state.form.userNick && state.form.userNick.length <= 8) {
        axios
          .get('https://k5d105.p.ssafy.io:3030/users/checkDuplicateNick', {
            params: {
              nickname: state.form.userNick,
            },
          })
          .then((res) => {
            console.log(res)
            if (res.data.valid) {
              info.dialogVisible = true
              info.message = '사용 가능한 닉네임입니다'
              info.checkNick = true
            } else {
              info.dialogVisible = true
              info.message = '이미 등록된 닉네임입니다'
            }
          })
      }
    }

    const checkEmailDupl = function() {
      if (state.form.email) {
        axios
          .get('https://k5d105.p.ssafy.io:3030/users/checkDuplicateEmail', {
            params: { email: state.form.email },
          })
          .then((res) => {
            console.log(res)
            if (res.data.valid) {
              info.dialogVisible = true
              info.message = '사용 가능한 이메일입니다'
              info.checkEmail = true
            } else {
              info.dialogVisible = true
              info.message = '이미 등록된 이메일입니다'
            }
          })
      }
    }

    const clickSignup = function() {
      signupForm.value.validate((valid) => {
        if (valid) {
          if (info.checkId && info.checkNick && info.checkEmail) {
            axios
              .post('https://k5d105.p.ssafy.io:3030/users/signup', {
                name: state.form.userName,
                id: state.form.userId,
                phone: state.form.phone,
                nickname: state.form.nick,
                password: state.form.password,
                email: state.form.email,
                address: state.form.address,
              })
              .then(() => router.push({ name: 'SuccessSignup' }))
          } else {
            info.dialogVisible = true
            info.message = '중복 확인을 해 주세요'
          }
        } else {
          console.log('fail')
        }
      })
    }

    return {
      signupForm,
      info,
      state,
      checkIdDupl,
      checkNickDupl,
      checkEmailDupl,
      clickSignup,
    }
  },
}
</script>

<style>
.signupDiv {
  display: flex;
  height: 80vh;
  align-items: center;
}

.signupDiv > div > div > .el-dialog {
  width: 20%;
  top: 20%;
}

.signup {
  width: 90%;
  min-width: 260px;
  max-width: 500px;
  margin: 0 auto;
}

.signup h2 {
  margin: 10% 0 5% 0;
}

.signupForm > div > div > div > input {
  border: 2px solid #a9c9de;
}

.signupForm > div > div > div > input:hover,
.signupForm > div > div > div > input:focus,
.checkDuplBtn:hover {
  outline: none;
  border: 2px solid #a9c9de;
  box-shadow: 0 0 5px #a9c9de;
}

.el-form-item.is-error .el-input__inner {
  border-color: rgb(255, 155, 155) !important;
}

.duplInput {
  width: 76% !important;
}

.checkDuplBtn {
  margin-left: 3%;
  width: 21%;
  height: 40px;
  border: none;
  border-radius: 2px;
  background-color: #a9c9de;
  font-family: 'Gowun Batang', serif !important;
  color: white;
}

.checkDuplBtn:disabled {
  background-color: rgb(211, 211, 211);
}

.signupCancel,
.signupBtn {
  width: 45%;
  height: 35px;
  margin: 5% 0;
  font-family: 'Gowun Batang', serif !important;
  color: white;
  border: none;
  border-radius: 4px;
}

.signupCancel {
  background-color: rgb(255, 155, 155);
  margin-right: 5%;
}

.signupCancel:hover {
  box-shadow: 0 0 10px rgb(255, 155, 155);
}

.signupBtn {
  background-color: #a9c9de;
  margin-left: 5%;
}

.signupBtn:hover {
  box-shadow: 0 0 10px #a9c9de;
}

@media screen and (max-width: 950px) {
  .signupDiv > div > div > .el-dialog {
    width: 40%;
    top: 20%;
  }
}

@media screen and (max-width: 480px) {
  .signupDiv {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .signupDiv > div > div > .el-dialog {
    width: 70%;
    top: 20%;
  }

  .signup > h2 {
    margin-top: 0;
  }

  .duplInput {
    width: 100% !important;
  }

  .checkDuplBtn {
    width: 100%;
    margin: 5px 0 0;
  }
}
</style>
