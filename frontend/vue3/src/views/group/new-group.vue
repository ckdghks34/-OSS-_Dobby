<template>
  <div class="newGroup">
    <div class="newGroupDiv">
      <img src="@/assets/dobby.png" alt="" />
      <el-form
        ref="newGroupForm"
        :model="state.form"
        :rules="state.rules"
        label-width="95px"
        label-position="left"
      >
        <el-form-item label="그룹 이름" prop="groupTitle">
          <el-input
            v-model="state.form.groupTitle"
            placeholder="2~8글자"
          ></el-input>
        </el-form-item>
        <el-form-item label="비공개" prop="private" style="text-align:left;">
          <el-switch v-model="state.form.private"></el-switch>
        </el-form-item>
        <el-form-item
          v-if="state.form.private"
          label="비밀번호"
          prop="password"
        >
          <el-input
            v-model="state.form.password"
            maxlength="4"
            placeholder="4자리 숫자"
          ></el-input>
        </el-form-item>
        <el-form-item label="상세 설명" prop="info">
          <el-input
            v-model="state.form.info"
            type="textarea"
            placeholder="100자까지 입력 가능합니다"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <router-link to="/main"><button>취소</button></router-link>
      <button type="button" @click="clickNewGroupBtn">생성</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'new-group',
  setup() {
    const newGroupForm = ref(null)

    const state = reactive({
      form: {
        groupTitle: '',
        private: false,
        password: '',
        info: '',
      },
      rules: {
        groupTitle: [
          { required: true, message: '필수 입력 항목입니다' },
          { min: 2, max: 8, message: '그룹 이름은 2~8자입니다' },
        ],
        password: [
          { required: true, message: '필수 입력 항목입니다' },
          { pattern: /^[0-9]{4}/, message: '비밀번호는 4자리 숫자' },
        ],
        info: [
          { required: true, message: '필수 입력 항목입니다' },
          { max: 100, message: '100자까지 입력 가능합니다' },
        ],
      },
    })

    const clickNewGroupBtn = function() {
      newGroupForm.value.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8080/group', {
            groupTitle: state.form.groupTitle,
            info: state.form.info,
          })
          console.log(valid)
        } else {
          console.log(valid)
        }
      })
    }
    return { state, newGroupForm, clickNewGroupBtn }
  },
}
</script>

<style>
.newGroup {
  display: flex;
  height: 80vh;
  align-items: center;
}

.newGroupDiv {
  width: 90%;
  min-width: 260px;
  max-width: 500px;
  margin: 0 auto;
}

.newGroupDiv img {
  width: 30%;
  margin-bottom: 5%;
}

.newGroupDiv p {
  margin-bottom: 0;
  text-align: left;
}

.newGroupDiv input,
.newGroupDiv textarea {
  border: 2px solid #a9c9de;
}

.newGroupDiv input:hover,
.newGroupDiv input:focus,
.newGroupDiv textarea:hover,
.newGroupDiv textarea:focus,
.newGroupDiv > button:hover {
  outline: none;
  border: 2px solid #a9c9de;
  box-shadow: 0 0 5px #a9c9de;
}

.newGroupDiv textarea {
  height: 100px !important;
}

.newGroupDiv button {
  width: 48%;
  height: 30px;
  margin-top: 5%;
  font-family: 'Gowun Batang', serif !important;
  color: white;
  border: none;
  border-radius: 4px;
}

.newGroupDiv > a > button {
  background-color: rgb(255, 155, 155);
  margin-right: 4%;
}

.newGroupDiv > a > button:hover {
  box-shadow: 0 0 10px rgb(255, 155, 155);
}

.newGroupDiv > button {
  background-color: #a9c9de;
}

.newGroupDiv .el-switch.is-checked .el-switch__core {
  background-color: #a9c9de;
  border-color: #a9c9de;
}
</style>
