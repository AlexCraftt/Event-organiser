<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/events" class="info">Обзор событий</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/event/new" class="info">Добавить событие</v-btn>
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
            v-for="event in events"
            :src="event.imageUrl"
            :key="event.id"
            @click="onLoadEvent(event.id)">
            <div class="title">
              {{ event.title }}
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
      events () {
        return this.$store.getters.featuredEvents
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadEvent (id) {
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