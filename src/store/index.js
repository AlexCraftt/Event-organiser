import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedEvents: [
            // {
            //   imageUrl: 'https://via.placeholder.com/1200x600/c44052/FFFFFF',
            //   id: 'aaa', 
            //   date: new Date(),
            //   title: 'Some event',
            //   location: 'NY',
            //   description: 'Some event in NY'
            // },
            // {
            //   imageUrl: 'https://via.placeholder.com/1200x600/f46242/FFFFFF',
            //   id: 'aab', 
            //   date: new Date(), 
            //   title: 'Some event',
            //   location: 'Paris',
            //   description: 'Some event in Paris'
            // },
            // { 
            //   imageUrl: 'https://via.placeholder.com/1200x600/f4be41/FFFFFF', 
            //   id: 'aac', 
            //   date: new Date(), 
            //   title: 'Some event',
            //   location: 'London',
            //   description: 'Some event in London'
            // },
            // { 
            //   imageUrl: 'https://via.placeholder.com/1200x600/206d39/FFFFFF', 
            //   id: 'aad', 
            //   date: new Date(), 
            //   title: 'Some event', 
            //   location: 'Madrid',
            //   description: 'Some event in Madrid'
            // },
            // { 
            //   imageUrl: 'https://via.placeholder.com/1200x600/257889/FFFFFF', 
            //   id: 'aae', 
            //   date: new Date(), 
            //   title: 'Some event',
            //   location: 'Moscow',
            //   description: 'Some event in Moscow'
            // },
            // { 
            //   imageUrl: 'https://via.placeholder.com/1200x600/243c6d/FFFFFF', 
            //   id: 'aaf', 
            //   date: new Date(), 
            //   title: 'Some event',
            //   location: 'Saint Petersburg',
            //   description: 'Some event in Saint Petersburg'
            // },
            // { 
            //   imageUrl: 'https://via.placeholder.com/1200x600/6621af/FFFFFF', 
            //   id: 'aag', 
            //   date: new Date(), 
            //   title: 'Some event', 
            //   location: 'Kazan',
            //   description: 'Some event in Kazan'
            // }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedEvents (state, payload) {
          state.loadedEvents = payload
        },
        createEvent (state, payload) {
          state.loadedEvents.push(payload)
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
        loadEvents ({commit}) {
          firebase.database().ref('events').once('value')
            .then((data) => {
              const events = []
              const obj = data.val()
              for (let key in obj) {
                events.push({
                  id: key,
                  title: obj[key].title,
                  description: obj[key].description,
                  imageUrl: obj[key].imageUrl,
                  date: obj[key].date,
                  creatorId: obj[key].creatorId
                })
              }
              commit('setLoading', false)
              commit('setLoadedEvents', events)
            })
            .catch((error) => {
              console.log(error)
              commit('setLoading', true)
            })
        },
        createEvent ({commit, getters}, payload) {
          const event = {
            title: payload.title,
            location: payload.location,
            imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date.toISOString(),
            creatorId: getters.user.id
          }
          firebase.database().ref('events').push(event)
              .then((data) => {
                const key = data.key
                commit('createEvent', {
                  ...event,
                  id: key
                })
              })
              .catch((error) => {
                console.log(error)
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
                  registeredEvents: []
                }
                commit('setUser', newUser)
              }
            )
            .catch(
              error => {
                commit('setLoading', false)
                commit('setError', error)
              }
            )
        },
        autoSignIn ({commit}, payload) {
          commit ('setUser', {id: payload.uid, registeredEvents: []})
        },

        logout ({commit}) {
          firebase.auth().signOut()
          commit ('setUser', null)
        },

        clearError ({commit}) {
          commit('clearError')
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
                  registeredEvents: []
                }
                commit('setUser', newUser)
              }
            )
            .catch(
              error => {
                commit('setLoading', false)
                commit('setError', error)
              }
            )
        }
      },
      getters: {
        loadedEvents (state) {
          return state.loadedEvents.sort((eventA, eventB) => {
            return eventA.date > eventB.date
          })
        },
        featuredEvents (state, getters) {
          return getters.loadedEvents.slice(0, 5)
        },
        loadedEvent (state) {
          return (eventId) => {
            return state.loadedEvents.find((event) => {
              return event.id === eventId
            })
          }
        },
        user (state) {
          return state.user
        },
        error (state) {
          return state.error
        },
        loading (state) {
          return state.loading
        }
      }
    })