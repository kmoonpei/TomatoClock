<template>
  <div class="todos-in">
    <h3>任务  
      <mu-flat-button label="添加任务" @click="openNewTodo"/>
    </h3>
    <div class="todo">
      <ul class="todo-list">
        <li 
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="single"
          :class="{ completed: todo.completed, editing: todo == editedTodo }">
           <div class="invisible_space"></div> 
            <table class="view" @mouseover="isshow(todo)" @mouseleave="ishide(todo)">
              <div class="operate" v-show="todo.showOperate">
                <img src="../images/delete.png" @click="deletTodo(todo)">
                <img src="../images/edit.png" @click="editTodo(todo)">
              </div>
              <tbody>
                <tr>
                  <td style="vertical-align: top;">
                    <mu-checkbox type="checkbox" v-model="todo.completed" iconClass="mu-ckeckbox-icon"/>
                  </td>
                  <td style="padding-left: 10px;">
                    <div v-if="todo.isShowEditAgin" class="edit-again">
                      <div class="todo-content" contenteditable="true" :value="todo.title" @focus="focusBindEditTodo" @blur="blurBindEditTodo"></div>
                      <div>
                        <mu-flat-button label="保存修改" @click="doneEdit(todo)"/>
                        <a @click="cancelEdit(todo)">取消</a>
                      </div>
                    </div>
                  <div v-else ><span class="label-title">{{ todo.title }}</span></div> 
                  </td>
                </tr>
              </tbody>
            </table>
        </li>
      </ul>
      <ul class="new-todo" v-if="isShowNewTodo">
        <li>
          <div>
            <div class="todo-content" contenteditable="true" :value="newTodo" @blur="blurBindNewTodo" @focus="focusBindNewTodo"></div>
            <div>
              <mu-flat-button label="添加任务" @click="addTodo"/>
              <a @click="closeNewTodo">取消</a>
            </div>
          </div>
        </li>
      </ul>
      <div class="showCompleted">
        <div v-if="showCompleted" >
          <img 
            @click="hideCompTodos"
            src="../images/down.png"/>
          <span @click="hideCompTodos">折叠已完成任务</span>
        </div>
        <div v-else>
          <img 
            @click="showCompTodos" 
            src="../images/up.png"/>
          <span @click="showCompTodos">展开已完成任务</span>
        </div>
        
          <ul 
            class="todo-compl-list"
            v-show="showCompleted">
            <li 
              v-for="todo in filteredCompTodos"
              :key="todo.id"
              class="todo-compl-li">
              <table style="margin-top: 14px; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="vertical-align: top;">
                      <mu-checkbox type="checkbox" v-model="todo.completed" iconClass="mu-icon-class"/>
                    </td>
                    <td style="padding-left: 10px; ">
                      <label @dblclick="editTodo(todo)" class="label-compl-title">{{ todo.title }}</label> 
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import muCheckbox from 'muse-components/checkbox'
import muTextField from 'muse-components/textField'
import muFlatButton from 'muse-components/flatButton'


var STORAGE_KEY= "todos-1.0"
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function(todo,index){
      todo.id = index
      todo.showOperate = false
      todo.isShowEditAgin = false
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
  }
}
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}
 

export default {   
    name: 'todos',
    data () {
      return {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        beforeEditCache: '',
        visibility: 'active',
        showCompleted: false,
        isShowNewTodo: false,
      }
    },
    components: { muCheckbox, muTextField, muFlatButton },
    watch: {
      todos:{
        handler: function(todos){
          todoStorage.save(todos)
        },
        deep: true
      }
    },
    computed: {
      filteredTodos: function () {
        let filte,t
        filte = filters[this.visibility](this.todos)
        t = setTimeout(function(){return filte}, 5000)
        return filte
      },
      filteredCompTodos () {
        return filters['completed'](this.todos)
      },
      remaining: function (todos) {
        return filters.active(this.todos).length
      },
      allDone: {
        get: function () {
          return this.remaining === 0
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value
          })
        }
      }
    },
    methods: {
      blurBindNewTodo(e) {
        this.newTodo = e.target.innerText
      },
      focusBindNewTodo(e) {
        e.target.innerText = this.newTodo
      },
      focusBindEditTodo(e) {
        e.target.innerText = this.editedTodo.title
      },
      blurBindEditTodo(e) {
        this.editedTodo.title = e.target.innerText
      },
      addTodo: function () {
        var value = this.newTodo && this.newTodo.trim()
        if ( !value ) {
          return
        }
        this.todos.push({
          id: todoStorage.uid++,
          title: value,
          completed: false,
          showOperate: false
        })
        this.newTodo = ''
      },
      deletTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo),1)
      },
      onHashChange: function (visibility) {
        this.visibility = visibility
      },
      removeCompleted: function () {
        this.todos = filters.active(this.todos)
      },
      editTodo: function (todo) {
        this.beforeEditCache = todo.title
        this.editedTodo = todo
        this.editedTodo.isShowEditAgin = true
        // this.editedTodo.showOperate = false
        
      },
      doneEdit: function (todo) {
        if(!this.editedTodo){
          return
        }
        this.editedTodo = null
        todo.title = todo.title.trim()
        if(!todo.title){
          this.deletTodo(todo)
        }
        todo.isShowEditAgin = false
      },
      cancelEdit: function (todo) {
        this.editing = null
        todo.title = this.beforeEditCache
        todo.isShowEditAgin = false
        
      },
      isshow (todo) {
        todo.showOperate = true
      },
      ishide (todo) {
        todo.showOperate = false
      },
      hideCompTodos () {
        this.showCompleted = false
      },
      showCompTodos () {
        this.showCompleted = true
      },
      openNewTodo () {
        this.isShowNewTodo = true
      },
      closeNewTodo () {
        this.isShowNewTodo = false
        this.newTodo = ''
      },


    },
    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      },
      // 'focus': {
      //   bind(el, binding) {
      //     el.focus()
      //     // el.innerText = binding.value
      //   }
      // }
    }
}
</script> 

<style lang="scss" scoped>
  @import "../sass/vars.scss";
  @import '../sass/mixin.scss';

  .todos {
    
    // margin: 20px auto;
    // border-radius: 5px;
    // background-color: #fff;
    
  }
  .todos-in {
    position: relative;
    padding: 30px;
    color: #666;

    h3 {
      color: $primary-text-color;
    }

    &>.mu-flat-button {
      position: absolute;
      height: 20px;
      max-width: 60px;
      min-width: 60px;
      top: 50px;
      right: 350px;
      background-color: $accent-color;
      color: #fff;
      cursor: pointer;
    }

    &>.todo {
      position: relative;
      width: 100%;
      margin-top: 20px;

      &>.todo-list {
        width: 80%;

        &>.single {
          position: relative;

          &>.invisible_space {
            float: left;
            position: absolute;
            width: 27px;
            height: 20px;
            margin-left: -27px;
            z-index: 0;
            margin-top: 13px;
          }
          &>.view {
            @include clearBoth;
            position: relative;
            border-collapse: collapse;
            margin-top: 10px;

            &>.operate {
              position: absolute;
              width: 60px;
              line-height: 16px;
              left: -65px;
              text-align: center;
              border: 1px solid #ccc;
              border-radius: 10px;
              z-index: 100;
              background-color: #fff;
              padding: 2px;

              &>img {
                width: 18px;
                height: 18px;
                vertical-align: middle;
                cursor: pointer;
              }
            }
            &>table {

              &>tbody {

                &>tr {
                  
                  &>td {
                    
                    &>.label-title {
                      position: absolute;
                      top: 10px;
                      line-height: 1.6;
                      
                    }
                  }
                }
              }
            }
            
            
          }
        }
      }
      &>.new-todo {
        width: 80%;
        margin-left: 63px;
        &>li {
          &>div {
            &>.todo-content {
              width: 500px;
              min-height: 24px;
              font-size: 15px;
              line-height: 1.6;
              outline: none;
              border: none;
              border-bottom: 1px dashed #ccc;
              overflow-x: hidden;
              overflow-y: auto;
            }
            &>div {
              margin-top: 5px;
              &>.mu-flat-button {
                  background-color: #0a0;
                  font-size: 14px;
                  color: #fff;
                  border-radius: 5px;
                  font-weight: 500;
              }
              &>a {
                font-size: 12px;
                margin-left: 20px;
                cursor: pointer;
              }
            }
          }
        }
      }
      
      &>.showCompleted {
        position: relative;
        margin-top: 20px;

        &>div {

          &>img {
            width: 24px;
            height: 24px;
            margin-left: 20px;
            cursor: pointer;
          }
          &>span {
            position: absolute;
            font-size: 14px;
            top: 2px;
            margin-left: 5px;
            cursor: pointer;
          }
        }
        
        &>.todo-compl-list {
          width: 80%;
          margin-left: 30px;

          &>.todo-compl-li {
            position: relative;

            &>.label-compl-title {
              position: absolute;
              margin-left: 10px;
            }
            
          }
        }
      }
    } 
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s 
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ 
  {
    opacity: 0
  }


  .label-title:hover {
    color: $accent-color;
  }






  .todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  // .edit {
  //   position: relative;
  //   margin: 0;
  //   width: 100%;
  //   font-size: 15px;
  //   font-family: inherit;
  //   font-weight: inherit;
  //   line-height: 1.4em;
  //   background-color: #fff;
  //   border: 0;
  //   outline: none;
  //   color: inherit;
  //   padding: 6px;
  //   border: 1px solid #999;
  //   box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  //   box-sizing: border-box;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  // }

  // .todo-list .edit {
  //   display: none;
  // }
  // .todo-list li.editing .edit {
  //   position: absolute;
  //   display: block;
  //   width: 100%;
  //   padding: 5px 5px;
  //   margin: 0 0 0 45px;
  //   font-size: 18px;
  //   top: 15px;
  //   resize: none;
  // }
  div.edit-again {
    // padding-left: 34px; 
    >.todo-content {
      width: 500px;
      font-size: 15px;
      line-height: 1.6;
      outline: none;
      resize: none;
      border: none;
      border-bottom: 1px dashed #ccc;
      overflow-x: hidden;
      overflow-y: auto;
    }
    >div {
      margin-top: 5px;
      &>.mu-flat-button {
          background-color: #0a0;
          font-size: 14px;
          color: #fff;
          border-radius: 5px;
          font-weight: 500;
      }
      &>a {
        font-size: 12px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

</style>
