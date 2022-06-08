import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import getters from './getters'
import settings from './settings'
import permission from './permission'
import messageText from'./messageText'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    user,
    permission,
    messageText
  },
  getters
})
