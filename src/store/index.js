import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedEVNTs: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {

    setLoadedEVNTs (state, payload) {
      state.loadedEVNTs = payload
    },

    createEVNT (state, payload) {
      state.loadedEVNTs.push(payload)
    },

    updateEVNT (state, payload) {
      const EVNT = state.loadedEVNTs.find(EVNT => {
        return EVNT.id === payload.id
      })
      if (payload.title) {
        EVNT.title = payload.title
      }
      if (payload.description) {
        EVNT.description = payload.description
      }
      if (payload.date) {
        EVNT.date = payload.date
      }
    },

    setUser (state, payload) {
      state.user = payload
    },

    setLoading (state, payload) {
      state.loading = payload
    },

    setError (state, payload) {
      state.error = payload
    },
    
    clearError (state) {
      state.error = null
    }

  },
  actions: {
    loadEVNTs ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('EVNTs').once('value')
        .then((data) => {
          const EVNTs = []
          const obj = data.val()
          for (let key in obj) {
            EVNTs.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedEVNTs', EVNTs)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createEVNT ({commit, getters}, payload) {
      const EVNT = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('EVNTs').push(EVNT)
        .then((data) => {
          const key = data.key
          commit('createEVNT', {
            ...EVNT,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },

    updateEVNTData ({commit}, payload) {
      commit ('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('EVNTs').child(payload.id).update(updateObj)
      .then (() =>{
        commit ('setLoading', false)
        commit ('updateEVNT', payload)
      })
      .catch (error => {
        console.log(error)
        commit('setLoading', false)
      })
    },

    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredEVNTs: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredEVNTs: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredEVNTs: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedEVNTs (state) {
      return state.loadedEVNTs.sort((EVNTA, EVNTB) => {
        return EVNTA.date > EVNTB.date
      })
    },
    featuredEVNTs (state, getters) {
      return getters.loadedEVNTs.slice(0, 5)
    },
    loadedEVNT (state) {
      return (EVNTId) => {
        return state.loadedEVNTs.find((EVNT) => {
          return EVNT.id === EVNTId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})