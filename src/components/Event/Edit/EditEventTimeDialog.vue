<template>
  <v-dialog width="600px" persistent v-model="editDialog">
    <v-btn large round accent slot="activator">Изменить время</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Редактирование времени события</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12></v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker
              full-width
              v-model="editableTime"
              style="width: 100%"
              actions
              format="24hr"
            >
              <template scope="{save, cancel}">
                <v-btn
                  flat
                  round
                  large
                  class="blue--text darken-1"
                  @click.native="editDialog = false"
                >Закрыть</v-btn>
                <v-btn
                  flat
                  round
                  large
                  class="blue--text darken-1"
                  @click.native="onSaveChanges"
                >Сохранить</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['EVNT'],
  data() {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.EVNT.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateEVNTData', {
        id: this.EVNT.id,
        date: newDate
      })
    }
  },
  created() {
    let date = new Date(this.EVNT.date)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    this.editableTime = hours + ':' + minutes
  }
}
</script>