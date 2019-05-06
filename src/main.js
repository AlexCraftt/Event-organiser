import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import Alert from './components/Shared/Alert'
import 'vuetify/dist/vuetify.min.css'
import EditEventDetailsDialog from './components/Event/Edit/EditEventDetailsDialog'
import EditEventDateDialog from './components/Event/Edit/EditEventDateDialog'

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-event-details-dialog', EditEventDetailsDialog)
Vue.component('app-edit-event-date-dialog', EditEventDateDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAtLDRTFlqI89is3YeBRQchwtLwnhFEKSQ",
      authDomain: "eventorginiser-2524f.firebaseapp.com",
      databaseURL: "https://eventorginiser-2524f.firebaseio.com",
      projectId: "eventorginiser-2524f",
      storageBucket: "eventorginiser-2524f.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch ('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadEVNTs')
  }
})
