<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>New Shop</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="shop.name" :error-messages="errors.name" autofocus label="name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="shop.address" :error-messages="errors.address" label="address" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="shop.phone_number" :error-messages="errors.phone_number" label="phone_number" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="shop.website_url" :error-messages="errors.website_url" label="website_url" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="cancel" color="blue darken-1" text>
        Cancel
      </v-btn>
      <v-spacer />
      <v-btn @click="save" color="blue darken-1" text>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dialog: true,
      loading: false,
      shop: {
        name: '',
        address: '',
        phone_number: '',
        website_url: ''
      },
      errors: {
        name: null,
        address: null,
        phone_number: null,
        website_url: null
      }
    }
  },
  methods: {
    ...mapActions('shops', [
      'fetchShops',
      'resetSearchConditions'
    ]),
    ...mapActions([
      'addNotification'
    ]),
    async save () {
      this.loading = true

      const response = await this.$axios.post('/shops', { shop: this.shop })
        .catch((error) => {
          this.errors = error.response.data
          return error.response
        })

      this.loading = false

      if (response.status === 201) {
        this.addNotification({ type: 'success', title: 'Created Shop', href: { path: `shops/${response.data.id}` } })
        this.fetchShops()
        this.backToIndex()
      }
    },
    cancel () {
      this.backToIndex()
    },
    onClickOutside () {
      this.backToIndex()
    },
    onKeyDown () {
      this.backToIndex()
    },
    backToIndex () {
      this.$router.push({ path: '/spa-shops' })
    }
  }
}
</script>
