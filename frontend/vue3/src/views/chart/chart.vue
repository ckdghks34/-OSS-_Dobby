<template>
  <div>
    <div class="chart">
      <img
        src="@/assets/dobby.png"
        alt="Dobby logo"
        style="width: 40%; margin: 5% 0;"
      />
      <div class="demo-date-picker" style="margin-bottom:5%;">
        <div class="block">
          <span class="demonstration" style="margin: 0 5% 5% 0;"
            >기간 설정</span
          >
          <el-date-picker
            class="datePicker"
            v-model="state.date"
            type="daterange"
            @change="changeDate"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="chartBottom">
      <div>
        <p>주로 어떤 계획을 세웠을까?</p>
        <div class="demo-progress">
          <div v-for="t in test" :key="t">
            <p>
              {{ t.name }}
            </p>
            <el-progress
              class="progress"
              :text-inside="true"
              :stroke-width="20"
              :percentage="t.per"
              :color="t.color"
              style="margin-bottom:3%"
            />
          </div>
        </div>
      </div>
      <div>
        <p>계획은 얼마나 달성했을까?</p>
        <div class="demo-progress">
          <div v-for="t in test" :key="t">
            <p>
              {{ t.name }}
            </p>
            <el-progress
              class="progress"
              :text-inside="true"
              :stroke-width="20"
              :percentage="t.per"
              :color="t.color"
              style="margin-bottom:3%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'chart',
  setup() {
    const state = reactive({
      date: '',
    })

    const test = [
      { name: '운동', per: 50, color: '#F6CECE' },
      { name: '다이어트', per: 10, color: '#F7BE81' },
      { name: '공부', per: 40, color: '#F2F5A9' },
      { name: '잠', per: 100, color: '#D8F781' },
    ]

    const changeDate = function() {
      let startDate = state.date[0]
      let endDate = state.date[1]
      console.log(startDate, endDate)
    }
    return { state, test, changeDate }
  },
}
</script>

<style>
.chart {
  width: 90%;
  min-width: 260px;
  max-width: 500px;
  margin: 0 auto;
}

.chartBottom {
  width: 90%;
  min-width: 260px;
  max-width: 500px;
  margin: 0 auto;
}

.chartBottom > div > p {
  margin-top: 10%;
}

.datePicker {
  margin-bottom: 5%;
  width: 80% !important;
}

.demo-progress p {
  display: inline-block;
  width: 25%;
  text-align: left;
}

.progress {
  display: inline-block !important;
  width: 70%;
}

.el-progress-bar__innerText {
  color: black !important;
}

.el-popper.is-pure::-webkit-scrollbar {
  background-color: white;
  height: 10px;
}

.el-popper.is-pure::-webkit-scrollbar-thumb {
  background-color: rgb(238, 238, 238);
}

@media screen and (min-width: 950px) {
  .chartBottom {
    max-width: 1300px;
  }

  .chartBottom > div {
    display: inline-block;
    width: 45%;
  }

  .chartBottom > div:nth-child(1) {
    margin-right: 10%;
  }

  .chartBottom > div:nth-child(2) > p {
    margin-top: 0;
  }
}

@media screen and (max-width: 650px) {
  .el-popper.is-pure {
    width: 97%;
    overflow-x: auto;
    overflow-y: hidden;
  }
}

@media screen and (max-width: 560px) {
  .demo-progress p {
    display: block;
    margin: 5% 0 2% 0;
  }

  .progress {
    display: block !important;
    width: 100%;
  }
}

@media screen and (max-width: 470px) {
  .demonstration {
    margin: 0 0 2% 0;
    display: block;
  }

  .datePicker {
    margin-bottom: 5%;
    width: 100% !important;
  }

  .chartBottom > div:nth-child(2) > p {
    margin-top: 25%;
  }
}
</style>
