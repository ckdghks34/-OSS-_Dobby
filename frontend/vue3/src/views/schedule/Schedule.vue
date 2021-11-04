<template>
    <div class="schedule-main">
        <h1>일정 추가</h1>
        <div>
            <span>제목 : </span>
            <input type="text" v-model="title">
        </div>
        <br>
        <div>
            <span>날짜</span>
            <div>   
                <input type="date" v-model="dataBegin"> ~ <input type="date" v-model="dataEnd">
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
            <button>취소</button> <button type="button" v-bind:disabled="title==''">추가</button>
        </div>
    
    </div>
</template>



<script>
export default {
    name: 'Schedule',
    components : {
        
    },
    data() {
        return {
            title: '',
            dataBegin: '',
            dataEnd: '',
            timeStart: '',
            timeFinish: '',
            place: '',
            importance:'5',
            picked: "",
            memo: '메모를 입력하세요',
        };
    },
    setup() {},
    create() {},
    mounted() {},
    unmounted() {},
    methods: {

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