import format from 'date-fns/format'
import utils from '../utils/publicMethods'

export const todos = {
  state: {
    todos: [
      {
        title: "第一个todo",
        createdTime: 1504103303009,
        assignedTime: 1506700800000,
        finishedTime: -1,
      },
      {
        title: "第二个todo",
        createdTime: 1504103303009,
        assignedTime: 1506700800000,
        finishedTime: -1,
      },
      {
        title: "第三个todo",
        createdTime: 1504103303009,
        assignedTime: 1506787200000,
        finishedTime: 1506787199999,
      },
    ],
  },
  getters: {
    //指派到当天完成的任务，不包含提前完成的任务
    todayTodos: state => filterTodayTodos(state.todos),
    //所有未完成的任务，包括未来的任务超期的任务
    unfinishedTodos: state => filterUnfinishedTodos(state.todos),
    //所有已完成的任务，用日期来分割
    finishedTodos: state => filterfinishedTodos(state.todos),
    //逾期任务
    overdueTodos: state => filterOverdueTodos(state.todos)
  },
  mutations: {
    readLocalStorage(state) {
      state.todos = utils.readLocalStorage('todos')
    },
    addTodo (state, todo) {
      state.todos.push(todo)
      utils.writeLocalStorage('todos', state.todos)
    },
    changeTime (state, todos) {
      utils.writeLocalStorage('todos', todos)
    },
    complete (state, todos) {
      utils.writeLocalStorage('todos', todos)
    },
    delete (state, todos) {
      utils.writeLocalStorage('todos', todos)
    },
    changeTodo (state,todos) {
      utils.writeLocalStorage('todos', todos)
    },
    cancelComplete (state,todos) {
      utils.writeLocalStorage('todos',todos)
    }
  },
  actions:  {
    addTodo(context, todo) {
      context.commit('addTodo', todo)
      // console.log(context.state.todos)
    },
    //为特定createdTime的todo指定newAssignedTime
    changeTime({commit,state}, args) {
      for(let element of state.todos) {
        if(element.createdTime === args.createdTime){
            element.assignedTime = args.newAssignedTime 
            console.log(format(args.newAssignedTime))
        }
      }
      commit('changeTime', state.todos)
    },
    complete({commit,state},args) {
      for(let element of state.todos) {
        if(element.createdTime === args.createdTime){
            element.finishedTime = args.newFinishedTime
        }
      }
      commit('complete',state.todos)
    },
    delete({commit,state},createdTime) {
      let i
      for(let [index,element] of state.todos.entries()) {
        if(element.createdTime === createdTime){
          i = index
        }
      }
      let a = state.todos.splice(i,1)
      // console.log('删除了第')
      // console.log(a)
      commit('delete', state.todos)
    },
    changeTodo({commit,state},args) {
      for(let element of state.todos) {
        if(element.createdTime === args.createdTime){
          element.title = args.newTitle
          element.assignedTime = args.newAssignedTime
        }
      }
      commit('changeTodo',state.todos)
    },
    cancelComplete({commit,state},createdTime){
      for(let element of state.todos) {
        if(element.createdTime == createdTime){
          element.finishedTime = -1
        }
      }
      commit('cancelComplete',state.todos)
    },
  }
    
}


function filterTodayTodos(todos) { 
  //获取今天零点的时间戳
  let timestamp = utils.getToday()
  return todos.filter(todo=>{
    if( todo.assignedTime === timestamp && todo.finishedTime > timestamp || todo.assignedTime === timestamp && todo.finishedTime === -1) {
        return true
    }
    return false
  })
}

function filterUnfinishedTodos(todos) {

  return todos.filter(todo=>{
    if( todo.finishedTime === -1) {
        return true
    }
    return false
  })
}

function filterfinishedTodos(todos) {
  return todos.filter(todo=>{
    if(todo.finishedTime > -1){
        return true
    }
    return false
  })
}

function filterOverdueTodos(todos) {
  return todos.filter(todo=>{
    let today = utils.getToday()
    if(todo.assignedTime < today && todo.finishedTime === -1){
      return true
    }
    return false
  })
}