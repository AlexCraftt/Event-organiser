<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
        indeterminate 
        class="primary--text" 
        :width="7" 
        :size="50"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div id="event-head" class="primary--text">{{ EVNT.title }}</div>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-event-details-dialog :EVNT="EVNT"></app-edit-event-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="EVNT.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ EVNT.date | date }} - {{ EVNT.location }}</div>
            <div><app-edit-event-date-dialog :EVNT='EVNT' v-if="userIsCreator"></app-edit-event-date-dialog></div>
            <div>{{ EVNT.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round large class="primary">Зарегистрироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      EVNT () {
        return this.$store.getters.loadedEVNT(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.EVNT.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  #event-head {
    font-size: 1.6em;
    font-style: initial;
  }
</style>
