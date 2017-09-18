<template>
<div>
  <table class="single-todo" @mouseover="showOperator" @mouseleave="hideOperator">
    <div class="operator" v-if="isShowOperator">
      <img src="../../images/delete.png" title="删除任务" @click="deletTodo">
      <img src="../../images/edit.png" title="修改任务" @click="editTodo">
    </div>
    <tbody>
      <tr>
        <td class="checkbox">
          <mu-checkbox @change="complete" v-model="isCompleted"/>
        </td>
        <td class="context">
          <span v-if="isHideEditBox" class="title">{{ todo.title }}</span>
          <div v-else class="editBox">
            <input type="text" v-model="title" class="input-todo">
            <div class="opreat-btn">
              <mu-flat-button label="保存修改" @click="changeTodo"/>
              <a @click="cancelChangeTodo">取消</a>
            </div>
            <!-- <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="errorShow">{{errorMessage}}</mu-popup> -->
          </div>
          <div class="mu-date" :class="isOverdue">
            <mu-date-picker v-model="assignedDate" autoOk :underlineShow="false" :minDate="today" @input="changeTime"/>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  
</template>

<script>
import muPopup from 'muse-components/popup'
import muCheckbox from 'muse-components/checkbox'
import muDatePicker from 'muse-components/datePicker'
import muFlatButton from 'muse-components/flatButton'
import format from 'date-fns/format'
import getTime from 'date-fns/get_time'
import utils from '../../utils/publicMethods'


export default {
  name: 'todo-list',
  data() {
      return {
        today: '',
        assignedDate: '',
        isShowOperator: false,
        isHideEditBox: true,
        title: '',
      }
  },
  props: {
    todo: {
      type: Object,
    }
  },
  components: { muCheckbox, muDatePicker, muFlatButton, muPopup },
  created() {
    this.today = utils.getTodayDate()
    this.assignedDate = format(this.todo.assignedTime,'YYYY-MM-DD')
    this.title = this.todo.title
  },
  computed: {
    isOverdue: {
      get() {
        if(this.todo.assignedTime < getTime(this.today)){
          return 'assTime'
        }
      },
      set(){}
    },
    isCompleted: {
      get() {
        if(this.todo.finishedTime > -1){
          return true
        }
        return false
      },
      set(){}
    },
  },
  methods: {
    changeTime() {
      let changedTodo = {
        createdTime: this.todo.createdTime,
        newAssignedTime: getTime(this.assignedDate)
      }
      this.$store.dispatch('changeTime',changedTodo)
    },
    complete() {
      let completedTodo = {
        createdTime: this.todo.createdTime,
        newFinishedTime: getTime( new Date())
      }
      this.$store.dispatch('complete',completedTodo)
    },
    showOperator() {
      this.isShowOperator = true
    },
    hideOperator() {
      this.isShowOperator = false
    },
    deletTodo() {
      this.$store.dispatch('delete',this.todo.createdTime)
    },
    editTodo() {
      this.isHideEditBox = false
    },
    changeTodo() {
      let changedTodo = {
        newTitle: this.title,
        createdTime: this.todo.createdTime,
        newAssignedTime: getTime(this.assignedDate)
      }
      this.$store.dispatch('changeTodo',changedTodo)
      this.isHideEditBox = true
      console.log(changedTodo)
    },
    cancelChangeTodo() {
      this.isHideEditBox = true
    }
  }
}



</script>
<style lang="scss">
@import '../../sass/vars.scss';

  .single-todo {
    display: block;
    position: relative;
    margin-left: 10px;

    .operator {
      position: absolute;
      top: 2px;
      left: -65px;
      width: 60px;
      line-height: 16px;
      border: 1px solid #ccc;
      background: #fff;
      text-align: center;
      padding: 2px;
      border-radius: 10px;

      img {
        width: 18px;
        height: 18px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
    .checkbox {
      vertical-align: top;
    }
    .context {
      display: inline-block;
      margin-left: 10px;

      .title {
        top: 10px;
        line-height: 1.6;
      }

      &>.mu-date {
        display: inline-block;
        width: 90px;
        padding-left: 6px;
        font-size: 12px;
        background: #d6d6d6;
        border-radius: 10px;
        vertical-align: top;

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
      .assTime {
        background-color: #fbc4c4 !important;
      }
    }
  }
  
  .editBox {
    display: inline-block;

    .input-todo {
      display: inline-block;
      width: 468px;
      min-height: 24px;
      font-size: 15px;
      line-height: 1.6;
      outline: none;
      border: none;
      border-bottom: 1px dashed #ccc;
    }
    .opreat-btn  {
      margin-top: 10px;

      .mu-flat-button {
        background-color: #0aa;
        font-size: 14px;
        color: #fff;
        border-radius: 5px;
        font-weight: 500;
      }

      a {
        font-size: 12px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
</style>
