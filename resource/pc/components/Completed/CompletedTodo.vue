<template>
  <div class="day">
    <div class="day-title">
      <span>{{ theChooseDay }}</span>
    </div>
    <div class="day-completed-todo">
      <!-- <p class="hint" v-show="isShowHint">没有完成的任务哦！</p> -->
      <ul class="ul-todo" v-if="todosByChooseDay.length">
        <li class="li-todo" v-for="todo in todosByChooseDay" :key="todo.finisedTime">
          <div>
            <mu-check-box class="check-box" v-model="isCompleted" v-on:change="cancelComplete(todo)"/>
            <p class="todo-title">{{ todo.title }}</p>
          </div>
        </li>
      </ul>
      <p class="hint" v-else>该日没有完成任务哦！</p>
    </div> 
  </div>
</template>


<script>
import muCheckBox from 'muse-components/checkbox'
import format from 'date-fns/format'
import getTime from 'date-fns/get_time'

export default {
  name: 'conpleted-todo',
  data() {
    return {

    }
  },
  props: {
    todosByChooseDay: {
      type: Array
    },
    chooseDay: {
      type: Number
    }
  },
  components: { muCheckBox },
  computed: {
    theChooseDay: {
      get(){
            return format(this.chooseDay,"YYYY-MM-DD")
          },
      set(){}
    },
    isShowHint: {
      get(){
        if(this.todosByChooseDay == []){
          return true
        }
        return false
      },
      set(){}
    },
    isCompleted: {
      get(){
        return true
      },
      set(){}
    },
  },
  methods: {
    //恢复任务为未完成
    cancelComplete(todo){
      this.$store.dispatch('cancelComplete',todo.createdTime)
      this.$emit('cancelComplete')
    }
  }
}
</script>

<style lang="scss">
  .day {
    border-bottom: 1px solid #ddd;
    margin-bottom: 40px;

    .day-title {
      float: left;
      width: 100px;
      color: #999;
    }
    .day-completed-todo {
      margin-left: 180px;

      .ul-todo {
        width: 600px;
        min-height: 20px;
        margin-bottom: 40px;

        .li-todo {
          padding: 2px 0 2px 20px;
          margin: 0;
          font-size: 14px;
          word-break: break-all;
          word-wrap: break-word;

          .check-box {
            position: absolute;
            left: 210px;
          }
          .todo-title {
            // position: absolute;
            display: inline-block;
            margin-top: 2px;
          }
        }
      }

      .hint {
        font-size: 14px;
        color: #ccc;
        margin-bottom: 40px;
        margin-left: 60px;
      }
    }
  }
</style>
