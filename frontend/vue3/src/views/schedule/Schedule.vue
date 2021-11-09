<template>
    <div class="schedule-main">
        <h1>일정 추가</h1>
        <div>
            <span>제목 : </span>
            <input type="text" v-model="state.title">
        </div>
        <br>
        <div>
            <span>날짜</span>
            <div>   
                <input type="date" v-model="dateBegin"> ~ <input type="date" v-model="dateEnd">
            </div>         
        </div>
        <br>
        <div>
            <span>시간: </span>
            <input type="time" v-model="timeStart"> ~ <input type="time" v-model="timeFinish">
        </div>
        <br>
        <div>
            <span>장소 : </span>
            <input type="text" v-model="place">
        </div>
        <br>
        <div>
            <span>중요도 : {{picked}}</span>
            <label class="import-label" v-bind:class="{'red':true}"><input type="radio" value="5" v-model="picked"></label>
            <label class="import-label" v-bind:class="{'orange':true}"><input type="radio" value="4" v-model="picked"></label>
            <label class="import-label" v-bind:class="{'yellow':true}"><input type="radio" value="3" v-model="picked"></label>
            <label class="import-label" v-bind:class="{'green':true}"><input type="radio" value="2" v-model="picked"></label>
            <label class="import-label" v-bind:class="{'blue':true}"><input type="radio" value="1" v-model="picked"></label>
        </div>

        <div>
            <p>메모장</p>
            <input class="memo" v-bind:class="{'memo-content':true}" type="text" v-model="memo">
        </div>

        <div>
            <button>취소</button> <button type="button" @click="addSchedule" v-bind:disabled="title==''">추가</button>
        </div>
    
    </div>
</template>



<script>
import axios from 'axios';
// import { useRouter } from 'vue-router';
import { reactive } from 'vue'

export default {
    name: 'Schedule',
    components : {
        
    },
    // data() {
    //     return {
    //             title: 'bb',
    //             dateBegin: '',
    //             dateEnd: '',
    //             timeStart: '',
    //             timeFinish: '',
    //             place: '',
    //             importance:'5',
    //             picked: "",
    //             memo: '메모를 입력하세요'
    //     }
    // },
    setup() {
        const state = reactive({
            title:''
        })
    //     async addSchedule() {
    //         this.title = await this.api('http://k5d105.p.ssafy.io:3000/calendar/personal','post',{})
    //     },
    //     async api(url, method, data) {
    //         return (await axios({
    //             method: method,
    //             url: url,
    //             data: data
    //         }).catch(e => {
    //             console.log(e);
    //         })).data;
    //     }
        const addSchedule = function() {
            console.log(this.title)
            console.log('store axios')
            axios
                .post(`http://k5d105.p.ssafy.io:3000/calendar/createCalendar`, {
                    title : state.title
                })

                .then( response => {
                console.log('getCalendar Response')
                console.log(response)
                }
                )
                .catch( error => {
                console.log('getCalendar Error')
                console.log(error)
                })
        }
        return {
            state,
            addSchedule
        }
    }
}
</script>



<style scoped>
.schedule-main {
  width: 100%;
  height: 100%;
}

.memo {
    width: 300px;
    height: 200px;
}

.memo-content {
    background-color: #F6F6F6;
    font-size: 20px;
}

.import-label {
    border-radius: 50%; 
    height: 20px; 
    width: 20px; 
}

.red {
    background-color: #FF7C7C;
}
.orange {
    background-color: #FECFA3;
}
.yellow {
    background-color: #FFF972;
}
.green {
    background-color: #B6FB81;
}
.blue {
    background-color: #7886FF;
}

</style>