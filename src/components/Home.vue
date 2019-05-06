<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn round large router to="/events" class="info">Обзор событий</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn round large router to="/event/new" class="info">Добавить событие</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
        indeterminate 
        class="primary--text" 
        :width="7" 
        :size="50" 
        v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="EVNT in EVNTs"
            :src="EVNT.imageUrl"
            :key="EVNT.id"
            @click="onLoadEVNT(EVNT.id)">
            <div class="title">
              {{ EVNT.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>Присоединяйтесь, будет интересно!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      EVNTs () {
        return this.$store.getters.featuredEVNTs
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadEVNT (id) {
        this.$router.push('/events/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    color: white;
    padding: 20px;
  }
</style>