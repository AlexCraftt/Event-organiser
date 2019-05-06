<template>
  <v-dialog width="600px" persistent v-model="editDialog">
    <v-btn large round accent slot="activator">
      Изменить дату
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Редактирование даты события</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width: 100%" actions>
                <template scope="{save, cancel}">
                    <v-btn flat round large class="blue--text darken-1" @click.native="editDialog = false">Закрыть</v-btn>
                    <v-btn flat round large class="blue--text darken-1" @click.native="onSaveChanges">Сохранить</v-btn>
                </template>
            </v-date-picker>
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
                editableDate: null
            }
        },
        methods: {
            onSaveChanges () {
                const newDate = new Date(this.EVNT.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateEVNTData', {
                    id: this.EVNT.id,
                    date: newDate
                })
            }
        },
        created () {
            let date = new Date(this.EVNT.date)
            let day = date.getUTCDate()
            if (day.toString().length == 1) {
                day = "0"+day
            }
            let month = date.getUTCMonth() + 1
                if (month.toString().length == 1) {
                    month = "0"+month
                }
            let year = date.getUTCFullYear()
            this.editableDate = year+"-"+month+"-"+day
        }
    }
</script>