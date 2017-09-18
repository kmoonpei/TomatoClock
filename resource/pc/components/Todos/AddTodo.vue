<template>
    <div>
      <input type="text" v-model="title" class="input-todo" >
      <div class="time">
        <label>完成时间 :</label>
        <div>
          <mu-date-picker v-model="assignedDate" autoOk :underlineShow="false" :minDate="today"/>
        </div>
      </div>
      <div class="opreat-btn">
        <mu-flat-button label="添加任务" @click="add"/>
        <a v-on:click="cancelAdd">取消</a>
      </div>
      <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="errorShow">{{errorMessage}}</mu-popup>
    </div>      
</template>

<script>
import muPopup from 'muse-components/popup'
import muFlatButton from 'muse-components/flatButton'
import muDatePicker from 'muse-components/datePicker'
import popover from 'muse-components/popover'
import format from 'date-fns/format'
import getTime from 'date-fns/get_time'

export default {
  name: 'add-todo',
  data() {
    return {
      newTodo: {
        title: '',
        assignedTime: -1,
      },
      title: '',
      assignedDate: '',
      today: '',
      errorMessage: '任务请不要为空',
      errorShow: false
    }
  },
  // props: {
  //   isShow: {
  //     type: Boolean,
  //     // default: true,
  //   }
  // },
  components: { muPopup, popover, muDatePicker, muFlatButton },
  created() {
    this.today = format(getTodayDate(), 'YYYY-MM-DD')
    this.assignedDate = this.today
    this.newTodo.assignedTime = getTime(this.today)
  },
  methods: {
    add() {
      let title = checkTodoFormat(this.title)
      if ( !title ) {
        this.errorShow = true
        return 
      }
      this.newTodo.title = title
      let todo = handleDate(this.newTodo, this.assignedDate)
      this.$store.dispatch('addTodo', todo)
      this.title = ''
    },
    cancelAdd() {
      this.$emit('cancel')
    }
  },
  watch: {
    errorShow(val) {
      if(val) {
        setTimeout(()=>{
          this.errorShow = false
        }, 3000);
      }
    }
  },
}


function checkTodoFormat(title) {
  let trimedTitle = title.trim()
  if (trimedTitle === '') {
    return false
  }
  return trimedTitle
}

/**
 * 将YYYY-MM-DD格式的assignedDate转为时间戳，并添加createdTime
 * @param {Object} todo 还未处理todo对象
 * @param {String} assignedDate 
 * @return {Object} 处理完成的todo对象
 */
function handleDate(todo, assignedDate) {
  let tmp = {}
  tmp.title = todo.title
  tmp.assignedTime = getTime(assignedDate)
  tmp.createdTime = new Date().getTime()
  tmp.finishedTime = -1
  return tmp
}


function getTodayDate() {
  let today = format(new Date(), 'YYYY-MM-DD')
  return today
}

</script>

<style lang="scss">

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
  .mu-popup.popup-top {
    color: #fff;
    background: #eca3a3;
    padding: 8px 16px;
    user-select: none;
  }   

  .time {
    padding-left: 6px;
    font-size: 12px;
    display: inline-block;
    background: #d6d6d6;
    border-radius: 10px;
    
    &>div {
        display: inline-block;
        width: 90px;
        padding-left: 6px;
        font-size: 12px;
        background: #d6d6d6;
        border-radius: 10px;

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

  .mu-calendar-svg-icon {
    transform: translateX(50%);
  }

</style>

