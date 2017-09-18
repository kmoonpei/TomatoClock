import utils from '../utils/publicMethods'

export const tomatos = {
  state: {
    tomatos: [
      {  timestamp: 1504836636779 },
    ]
  },
  getters: {
    //获取番茄总数量
    totalTomato: state => state.tomatos.length,
    //获取当日番茄数量
    todayTomatos: state => filterTodayTomatos(state.tomatos),
  },
  mutations: {
    readLocalStorage(state) {
      state.tomatos = utils.readLocalStorage('tomatos')
    },
    addTomato(state, tomatos) {
      utils.writeLocalStorage('tomatos', state.tomatos)
    }
  },
  actions: {
    addTomato({commit,state},tomato) {
      state.tomatos.push(tomato)
      commit('addTomato', state.tomatos)
    }
  },
}

function filterTodayTomatos(tomatos) {
  return tomatos.filter(tomato => {
    let today = utils.getToday()
    console.log(today)
    if(tomato.timestamp >= today){
      return true
    }
    return false
  })
}



