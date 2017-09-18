<template>
  <div class="completed">
    <div class="pull-close">
      <img src="../../images/pull-close.png" title="点击关闭已完成列表" v-on:click="cancelCompl">
    </div>
    <h3>已完成的任务</h3>
    <div class="mu-date">
      <mu-date-picker v-model="chooseDay" autoOk :underlineShow="false" :maxDate="today" @input="changeTime"/>
    </div>
    <completedTodo :chooseDay="theChooseDay" :todosByChooseDay="todosByChooseDay"/>
  </div>
</template>

<script>
import completedTodo from './completedTodo'
import muDatePicker from 'muse-components/datePicker'
import format from 'date-fns/format'
import getTime from 'date-fns/get_time'
import utils from '../../utils/publicMethods'

export default {
  name: 'completed',
  data() {
    return {
      chooseDay: '',
      todosByChooseDay: [],
      today: '',
    }
  },
  components: { completedTodo, muDatePicker },
  created() {
    this.chooseDay = format(new Date(),'YYYY-MM-DD')
    this.changeTime()
    this.today = utils.getTodayDate()    
  },
  computed: {
    theChooseDay(){
      return getTime(this.chooseDay)
    } 
  },
  methods: {
    changeTime() {
      let minFinishedTime = getTime(this.chooseDay)
      let nextDay = minFinishedTime + 86400000
      let maxFinishedTime = getTime(nextDay)
      console.log(this.chooseDay)
      let allFinishedTodos = this.$store.getters.finishedTodos
      this.todosByChooseDay = filterChooseDayfinishedTodos(allFinishedTodos, minFinishedTime, maxFinishedTime)
      console.log(this.todosByChooseDay)
      
    },
    cancelCompl() {
      this.$emit("cancel")
    }
  },
}

function filterChooseDayfinishedTodos(todos,minFinishedTime, maxFinishedTime) {
  return todos.filter(todo=>{
    if(todo.finishedTime >= minFinishedTime && todo.finishedTime < maxFinishedTime){
        return true
    }
    return false
  })
}

</script>

<style lang="scss">
  .completed {
    position: absolute;
    width: 1000px;
    // min-height: 300px;
    top: 30px;
    left: 50%;
    margin-left: -500px;
    border: 1px solid #ccc;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    background-color: #fff;
    border-radius: 5px;
    padding: 0 40px;
    box-sizing: border-box;

    .pull-close {
      position: absolute;
      left: 50%;
      margin-left: -24px;

      img {
        height: 30px;
        margin-top: 5px;
        cursor: pointer;
      }
    }
    h3 {
      display: inline-block;
      font-size: 20px;
      line-height: 28px;
      margin: 50px 0;
      color: #333;
    }
    .mu-date {
        display: inline-block;
        width: 90px;
        padding-left: 6px;
        font-size: 12px;
        background: rgb(248, 248, 248);
        border: 1px solid #ccc;
        border-radius: 10px;
        vertical-align: top;
        position: relative;
        top: 55px;
        left: 40px;


        .mu-date-picker {
          width: 90px;
          .mu-text-field {
            width: 90px;
            margin-bottom: 0px;
            min-height: 12px;
            font-size: 12px;
            left: 5px;

            .mu-text-field-content {
              padding: 0;

              .mu-text-field-input {
                height: 12px;
              }
            }
          }
        }
      }
  }
</style>
