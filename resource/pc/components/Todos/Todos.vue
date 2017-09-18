<template>
  <div class="todos">
		<h3>任务
			<mu-flat-button @click="showAdd">添加任务</mu-flat-button>
		</h3>
    <div class="toolbar">
      <!-- <img src="../../images/sizer.png" title="筛选任务" class="sizer">       -->
      <mu-dropDown-menu icon="more_vert" @change="handleChange" :value="value" class="sizer">
        <mu-menu-item value="1" title="今日任务" />
        <mu-menu-item value="2" title="待处理任务" />
        <mu-menu-item value="3" title="逾期任务" />
      </mu-dropDown-menu>
    </div>
		<div class="todo-list" v-show="isShowTodoList">
			<todoList v-for="todo in todos" :key="todo.createdTime" :todo="todo"></todoList>
		</div>
		<addTodo v-on:cancel="hideAdd" v-if="isShowAdd" class="add-todo"/>
    <div class="show-Compl"><span @click="openCompletedList">已完成任务</span></div>
    <completed v-if="isShowCompl" v-on:cancel="hideCompl"/>
	</div>
</template>

<script>
import addTodo from './AddTodo.vue'
import todoList from './TodoList.vue'
import muFlatButton from 'muse-components/flatButton'
import muDropDownMenu from 'muse-components/dropDownMenu'
import muMenuItem from 'muse-components/menu/menuItem'
import completed from '@/components/Completed'


export default {
  name: 'todos',
  data() {
    return {
      isShowAdd: false,
      isOpenSwitch: false,
      value: '2',
      isShowCompl: false,
      isShowTodoList: true,
    }
	},
	components: { addTodo, muFlatButton, todoList, muDropDownMenu, muMenuItem, completed },
	created() {
    this.$store.commit('readLocalStorage')
	},
	computed: {
		todos() {
      if(this.value === '1'){
			  return this.$store.getters.todayTodos
      }
      if(this.value === '2'){
			  return this.$store.getters.unfinishedTodos
      }
      if(this.value === '3'){
			  return this.$store.getters.overdueTodos
      }
		}
	},
	methods: {
		showAdd() {
			this.isShowAdd = true
    },
    hideAdd() {
      this.isShowAdd = false
    },
    handleChange(val) {
      this.value = val
    },
    openCompletedList() {
      this.isShowCompl = true
      this.isShowTodoList = false
    },
    hideCompl() {
      this.isShowCompl = false
      this.isShowTodoList = true      
    }
	}
}
</script>

<style lang="scss">
// @import './sass/vars.scss';

.todos {
  position: relative;
	padding: 30px;
  >.toolbar {
    position: absolute;
    right: 30px;
    top: 20px;

    >.sizer {
      font-size: 12px;
      color: #E39600;

      .mu-dropDown-menu-text {
        color: inherit;
      }
      .mu-dropDown-menu-line {
        bottom: 0;
      }
    }
    
  }
  
	>.todo-list {
		margin-top: 20px;
	}
  .add-todo {
    margin-left: 48px;
  }
}
  .mu-menu-item-wrapper.active {
    color: #E39600 !important;
    
  }
  .mu-menu-item-wrapper {
    height: 24px !important;
    line-height: 24px !important;
    border-top: 1px solid #ccc !important;
    border-bottom: 1px solid #ccc !important;
    margin-top: -1px;
    font-size: 12px !important;
  }

  .mu-menu {
    width: 110px !important;

    .mu-menu-destop {
      width: 110px !important;
      padding: 10px 0;
    }
  }
 
  .show-Compl {
    span {
      font-size: 14px;
      color: #00BCD4;
      cursor: pointer;
    }
  }
</style>

