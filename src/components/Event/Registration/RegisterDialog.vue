<template>
  <v-dialog v-model="registerDialog">
    <v-btn large round accent slot="activator">
      {{ userIsRegistered ? 'Зарегистрироваться' : 'Отмена регистрации' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Отменить регистрацию на событие?</v-card-title>
            <v-card-title v-else>Зарегистрироваться на событие?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Описание</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                text
                @click="registerDialog = false">Отмена</v-btn>
              <v-btn
                class="green--text darken-1"
                text
                @click="onAgree">Подтвердить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['EVNTId'],
    data: () => ({
        registerDialog: false
    }),
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredEVNTs.findIndex(EVNTId => {
          return EVNTId === this.EVNTId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromEVNT', this.EVNTId)
        } else {
          this.$store.dispatch('registerUserForEVNT', this.EVNTId)
        }
      }
    }
  }
</script>
