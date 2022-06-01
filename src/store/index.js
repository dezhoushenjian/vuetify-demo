import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import getters from './getters'
import settings from './settings'
import permission from './permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    user,
    permission,
  },
  getters
})
