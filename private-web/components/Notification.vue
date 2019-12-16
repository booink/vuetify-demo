<template>
  <v-snackbar v-model="show" :color="notification.type" right top>
    {{ notification.title }}
    <v-btn @click.native="show = false" text color="accent">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      require: true,
      default: null
    }
  },
  data () {
    return {
      show: true
    }
  },
  watch: {
    show (value) {
      if (!value) {
        this.clearLastNotification()
      }
    }
  },
  methods: {
    ...mapActions([
      'clearLastNotification'
    ])
  }
}
</script>
