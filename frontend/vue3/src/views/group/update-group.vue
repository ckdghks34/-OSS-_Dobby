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
      <button type="button" @click="clickUpdateGroup">수정</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'update-group',
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

    const clickUpdateGroup = function() {
      newGroupForm.value.validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8080/group', {
            groupTitle: state.form.groupTitle,
            info: state.form.info,
          })
          console.log(valid)
        } else {
          console.log(valid)
        }
      })
    }
    return { state, newGroupForm, clickUpdateGroup }
  },
}
</script>

<style></style>
