<template>
  <v-app>
    <v-navigation-drawer absolute temporary v-model="sideNav" class="hidden-md-and-up">
      <v-list>

        <v-list-tile v-for="item in menuItems" 
        :key="item.title" 
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthentificated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Выйти</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">EventOrginiser</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
        flat 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link"        
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn flat v-if="userIsAuthentificated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'face', title: 'Регистрация', link: '/signup'},
          { icon: 'lock_open', title: 'Войти', link: '/signin'}
        ]
        if (this.userIsAuthentificated) {
          menuItems = [
            { icon: 'supervisor_account', title: 'События', link: '/events'},
            { icon: 'room', title: 'Добавить событие', link: '/event/new'},
            { icon: 'person', title: 'Профиль', link: '/profile'},
          ]
        }
        return menuItems
      },
      userIsAuthentificated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.store.dispatch('logout')
      }
    }
  }
</script>
