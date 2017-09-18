import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {todos} from './todos'
import {tomatos} from './tomatos'

Vue.use(Vuex)


// var STORAGE_KEY= "tomatoNum-1.0"
// var tomatoNumStorage = {
//   fetch: function () {
//     var tomatoNums = localStorage.getItem(STORAGE_KEY) || 0
//     return tomatoNums
//   },
//   save: function (tomatoNums) {
//     localStorage.setItem(STORAGE_KEY,tomatoNums)
//   }
// }

// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

export const store = new Vuex.Store({
    state: {
        dialog: '',
        breakCount: false,  //是否打开休息时间计时
        // tomatoNum: Number(tomatoNumStorage.fetch()),       //番茄数量
        clockDuration: 25, //番茄时钟的时长（分钟）
        
    },
    mutations: {
        toggelDialog (state, type) {
            state.dialog = type
        },
        openBreakCount (state, type) {
            state.breakCount = type
        },
        // countTomatoNum (state, num) {
        //     let n = state.tomatoNum + num
        //     tomatoNumStorage.save(n)
        //     state.tomatoNum = Number(tomatoNumStorage.fetch())
        // },
        /**
         * 改变番茄时钟的时长
         * 
         * @param {number} level 传入1|2|3分别代表三种番茄的时长
         */
        changeClockDuration(state, level) {
            //
            switch(level) {
                case 1:
                    state.clockDuration = 25
                    break
                case 2:
                    state.clockDuration = 30
                    break
                case 3:
                    state.clockDuration = 35
                    break
                default:
                    state.clockDuration = 25
            }
        }
    },
    actions: {
      register (context, account) {
        var params = new URLSearchParams()
        params.append('username', account.username)
        params.append('password', account.password)
        params.append('nickName', account.nickName)
        
        axios({
          method: 'post',
          url: '/user/register',
          responseType: 'json',
          data: params
        }).then(function(res){
          console.log(res)
        })
        .catch(function(err){
          console.log(err)
        })
      },
      login (conext, account) {
      var params = new URLSearchParams()
      params.append('username', account.username)
      params.append('password', account.password)

      axios({
        method: 'post',
        url: '/user/login',
        responseType: 'json',
        data: params
      }).then(function(res){
        console.log(res)
      }).catch(function(err){
        console.log(err)
      })
    },
  },
  modules: {
    todos: todos,
    tomatos: tomatos,
  }
    
})

