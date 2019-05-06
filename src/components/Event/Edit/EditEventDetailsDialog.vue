<template>
  <v-dialog width="600px" persistent v-model="editDialog">
    <v-btn large fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Редактирование события</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="editedDescription"
                required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn round large flat class="blue--text darken-1" @click="editDialog = false">Закрыть</v-btn>
              <v-btn round large flat class="blue--text darken-1" @click="onSaveChanges">Сохранить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['EVNT'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.EVNT.title,
        editedDescription: this.EVNT.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateEVNData', {
          id: this.EVNT.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
      }
    }
  }
</script>