<template>
  <v-card>
    <v-card-title>Preferences</v-card-title>
    <v-card-text>
      <v-switch v-model="stateDarkMode" label="dark mode" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'darkMode'
    ]),
    stateDarkMode: {
      get () {
        return this.darkMode
      },
      set (value) {
        this.setDarkMode(value)
      }
    }
  },
  methods: {
    ...mapActions([
      'setDarkMode'
    ])
  }
}
</script>
