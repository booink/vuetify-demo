<template>
  <v-dialog v-model="dialog" @click:outside="onClickOutside" @keydown.esc="onKeyDown">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Shop: {{ shop.id }}</v-toolbar-title>
        <v-spacer />
        <p class="ma-2">
          createdAt: {{ shop.created_at }}<br>
          updatedAt: {{ shop.updated_at }}
        </p>
        <v-toolbar-items>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="deleteShop" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Shop</span>
          </v-tooltip>
        </v-toolbar-items>
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
        <v-btn @click="updateShop" color="blue darken-1" text>
          Update
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
      shop: {
        name: ''
      },
      errors: {
        name: null
      }
    }
  },
  computed: {
    ...mapState('shops', [
      'page'
    ]),
    ...mapGetters('shops', [
      'specifiedSearchConditionsWithPage'
    ]),
    path () {
      return `/shops/${this.$route.params.id}`
    }
  },
  created () {
    this.fetchShop()
  },
  methods: {
    ...mapActions('shops', [
      'fetchShops'
    ]),
    ...mapActions([
      'addNotification'
    ]),
    async fetchShop () {
      this.loading = true

      const response = await this.$axios.get(this.path)
        .catch((error) => {
          this.errors = error.response.data
          return error.response
        })

      this.loading = false

      if (response.status === 200) {
        this.shop = response.data
      }
    },
    async updateShop () {
      this.loading = true

      const shop = this.shop
      delete shop.id
      delete shop.created_at
      delete shop.updated_at
      const response = await this.$axios.put(this.path, { shop })
        .catch((error) => {
          this.errors = error.response.data
          return error.response
        })

      this.loading = false

      if (response.status === 200) {
        this.shop = response.data
        this.addNotification({ type: 'success', title: 'Updated Shop', href: { path: `shops/${this.shop.id}` } })
        this.fetchShops()
      }
    },
    async deleteShop () {
      this.loading = true

      const response = await this.$axios.delete(this.path)
        .catch((error) => {
          this.errors = error.response.data
          return error.response
        })

      this.loading = false

      if (response.status === 204) {
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
      this.$router.push({ path: '/shops', query: this.specifiedSearchConditionsWithPage })
    }
  }
}
</script>
