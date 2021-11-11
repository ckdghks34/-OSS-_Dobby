<template>
  <div class="searchGroup">
    <div class="searchGroupDiv">
      <el-dialog v-model="info.dialogVisible">
        <span>{{ info.message }}</span>
      </el-dialog>
      <el-dialog v-model="info.searchDia" :title="info.groupName" width="30%">
        <div v-if="info.private">
          <h3>{{ info.groupDes }}</h3>
          <span style="color:rgb(255, 155, 155)">비공개 그룹입니다</span>
        </div>
        <div v-else>
          <h3>{{ info.groupDes }}</h3>
        </div>
        <template #footer>
          <div v-if="info.private">
            <span class="dialog-footer">
              <el-button
                class="redBtn"
                @click=";(info.searchDia = false), (info.password = '')"
                >취소</el-button
              >
            </span>
          </div>
          <div v-else>
            <span class="dialog-footer">
              <el-button class="redBtn" @click="info.searchDia = false"
                >취소</el-button
              >
              <el-button class="blueBtn" @click="joinGroup">참여</el-button>
            </span>
          </div>
        </template>
      </el-dialog>
      <img src="@/assets/dobby.png" alt="" />
      <el-select v-model="info.value" @change="search">
        <el-option
          v-for="item in info.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div
        class="groupLi"
        v-for="(group, index) in info.pageGroup"
        :key="index"
        @click="clickGroup(group.gid)"
      >
        <div>
          <span style="line-height:3">{{ group.name }}</span>
          <svg
            v-if="group.private"
            class="lock"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            data-v-394d1fd8=""
          >
            <path
              fill="currentColor"
              d="M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z"
            ></path>
            <path
              fill="currentColor"
              d="M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z"
            ></path>
          </svg>
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="info.groupLi.length"
        :page-size="9"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios'
import { onBeforeMount } from '@vue/runtime-core'
export default {
  name: 'searchGroup',
  setup() {
    const info = reactive({
      dialogVisible: false,
      message: '',
      searchDia: false,
      options: ref([
        {
          value: '전체 그룹',
          label: '전체 그룹',
        },
        {
          value: '공개 그룹',
          label: '공개 그룹',
        },
      ]),
      value: '전체 그룹',
      groupLi: [],
      pageGroup: [],
      groupName: '',
      groupDes: '',
      private: false,
      groupGid: '',
    })

    onBeforeMount(() => {
      axios
        .get('https://k5d105.p.ssafy.io:3030/group/getAllgroups')
        .then((res) => {
          info.groupLi = res.data.groups
          info.pageGroup = info.groupLi.slice(0, 9)
        })
    })

    const search = function() {
      if (info.value === '전체 그룹') {
        axios
          .get('https://k5d105.p.ssafy.io:3030/group/getAllgroups')
          .then((res) => {
            info.groupLi = res.data.groups
            info.pageGroup = info.groupLi.slice(0, 9)
          })
      } else {
        axios
          .get('https://k5d105.p.ssafy.io:3030/group/getPublicGroups')
          .then((res) => {
            info.groupLi = res.data.groups
            info.pageGroup = info.groupLi.slice(0, 9)
          })
      }
    }

    const clickGroup = function(e) {
      info.groupGid = e
      axios
        .get('https://k5d105.p.ssafy.io:3030/group/getGroup', {
          params: { gid: info.groupGid },
        })
        .then((res) => {
          info.groupName = res.data.group.name
          info.groupDes = res.data.group.description
          info.private = res.data.group.private
          info.searchDia = true
        })
    }

    const joinGroup = function() {
      console.log('join')
      axios
        .get(
          'https://k5d105.p.ssafy.io:3030/groupCalendar/getGroup',
          {
            params: {
              uid: localStorage.getItem('uid'),
            },
          },
          {
            headers: {
              authorization: localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          for (var i in res.data.group) {
            if (res.data.group[i]['name'] === info.groupName) {
              info.searchDia = false
              info.message = '이미 가입되어 있는 그룹입니다'
              return (info.dialogVisible = true)
            }
          }
          axios
            .post('https://k5d105.p.ssafy.io:3030/group/joinGroup', {
              gid: info.groupGid,
              uid: localStorage.getItem('uid'),
            })
            .then(() => {
              info.searchDia = false
              info.message = `${info.groupName}에 가입되었습니다`
              info.dialogVisible = true
            })
        })
    }

    const handleCurrentChange = function(val) {
      info.pageGroup = info.groupLi.slice((val - 1) * 9, (val - 1) * 9 + 9)
    }
    return { info, search, clickGroup, joinGroup, handleCurrentChange }
  },
}
</script>

<style>
.searchGroupDiv {
  width: 90%;
  min-width: 260px;
  max-width: 1000px;
  margin: 0 auto;
}

.searchGroupDiv img {
  width: 60%;
  max-width: 200px;
  margin-bottom: 3%;
}

.searchGroupDiv .el-dialog {
  width: 90%;
  max-width: 600px;
}

.searchGroupDiv .el-select {
  width: 100%;
  margin-bottom: 3%;
}

.searchGroupDiv .el-select:hover {
  box-shadow: 0 0 10px #a9c9de;
}

.searchGroupDiv .el-select .el-input.is-focus .el-input__inner,
.searchGroupDiv .el-select .el-input__inner:focus {
  border: 2px solid #a9c9de;
}

.groupLi {
  display: inline-block;
  width: 30%;
  margin: 3% 1% 0 1%;
  border: 1px solid #a9c9de;
  border-radius: 4px;
  box-shadow: 3px 3px 3px #b3b3b3;
  cursor: pointer;
  transition: 0.2s linear;
}

.groupLi:hover {
  box-shadow: 0 0 10px #a9c9de;
}

.lock {
  width: 20px;
  float: right;
  margin: 5% 5% 0 0;
}

.searchGroupDiv .el-pagination {
  margin: 5% 0 1% 0;
}

@media screen and (max-width: 835px) {
  .groupLi {
    width: 45%;
  }

  .lock {
    margin: 6% 6% 0 0;
  }
}

@media screen and (max-width: 620px) {
  .lock {
    margin: 7% 7% 0 0;
  }
}

@media screen and (max-width: 530px) {
  .groupLi {
    width: 100%;
    margin: 4% 0 0 0;
  }

  .lock {
    margin: 4% 4% 0 0;
  }
}
</style>
