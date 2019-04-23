<template>
    <div>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                            <div id="event-name">
                                {{ event.title }}
                            </div>
                        </v-card-title>
                        <v-img
                            :src='event.imageUrl'
                            height='550px'>
                        </v-img>
                        <v-card-text>
                            <div id="event-date" class="info--text">{{ event.date | date }} - {{ event.location }}</div>
                            <div id="event-text">
                                {{ event.description }}
                            </div>                           
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn large class="primary">Регистрация</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        props: [
            'id'
        ],
        computed: {
            event(){
                return this.$store.getters.loadedEvent(this.id)
            }
        }
    }
</script>

<style scoped>
    #event-name {
        font-size: 1.7em;
        color: darkred;
    }
    #event-date {
        font-size: 1.5em;
        margin: 0.2em;
    }
    #event-text {
        font-size: 1.2em;
    }
</style>
