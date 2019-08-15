import Vue from 'vue'
import Vuex from 'vuex'
import EVNT from './evnts'
import user from './user'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    EVNT: EVNT,
    user: user
  }
})
