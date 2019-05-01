<template>
    <v-container>
        <v-layout row wrap v-for="event in events" :key="event.id" mb-2>
            <v-flex xs12 sm10 md8 offset-sm2>
                <v-card class="info">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-img
                                :src='event.imageUrl'
                                height='300px'>
                                </v-img>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <div id="event-name">{{ event.title }}</div>
                                        <div id="event-date">{{ event.date | date }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat :to="'/events/' + event.id">
                                        <v-icon>arrow_forward</v-icon>
                                        Подробнее
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            events(){
                return this.$store.getters.loadedEvents
            }
        }
    }
</script>

<style scoped>
    #event-name {
        color: white;
        font-size: 2.5em;
    }
    #event-date {
        color: black;
        font-size: 1.5em;
    }
</style>