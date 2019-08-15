import * as firebase from 'firebase'

export default {
  state: {
    loadedEVNTs: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'EVNT in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'EVNT in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ]
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
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('EVNTs').push(EVNT)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('EVNTs/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('EVNTs').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createEVNT', {
            ...EVNT,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateEVNTData ({commit}, payload) {
      commit('setLoading', true)
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
        .then(() => {
          commit('setLoading', false)
          commit('updateEVNT', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    }
  }
}