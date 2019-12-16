<template>
  <v-dialog v-model="dialog" @click:outside="onClickOutside" @keydown.esc="onKeyDown">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Search Shops</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field v-model="searchConditions.id" @keyup.enter="search" label="id" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="searchConditions.name" @keyup.enter="search" autofocus label="name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="searchConditions.address" @keyup.enter="search" label="address" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="searchConditions.phone_number" @keyup.enter="search" label="phone_number" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="searchConditions.website_url" @keyup.enter="search" label="website_url" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="reset" color="blue darken-1" text>
          Reset
        </v-btn>
        <v-btn @click="cancel" color="blue darken-1" text>
          Cancel
        </v-btn>
        <v-spacer />
        <v-btn @click="search" color="blue darken-1" text>
          Search
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      dialog: true,
      loading: false,
      searchConditions: {
        id: null,
        name: null
      }
    }
  },
  computed: {
    ...mapState('shops', {
      stateSearchConditions: 'searchConditions'
    }),
    ...mapGetters('shops', [
      'defaultSearchConditions'
    ])
  },
  created () {
    this.searchConditions = Object.assign({}, this.stateSearchConditions)
  },
  methods: {
    ...mapActions('shops', [
      'setSearchConditions'
    ]),
    search () {
      this.setSearchConditions(this.searchConditions)
      this.dialog = false
      this.$emit('search')
    },
    reset () {
      this.searchConditions = Object.assign({}, this.defaultSearchConditions)
    },
    cancel () {
      this.close()
    },
    onClickOutside () {
      this.close()
    },
    onKeyDown () {
      this.close()
    },
    close () {
      this.dialog = false
      this.$emit('close')
    }
  }
}
</script>
