<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Shops</v-toolbar-title>
      <v-spacer />
      <span class="mx-2">検索条件: {{ searchingText }}</span>
      <v-toolbar-items>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="searchManufactures" :disabled="loading" icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Search Shop</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon to="/shops/new">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <span>New Shop</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>

    <v-pagination v-model="page" :length="pageCount" :total-visible="7" :disabled="loading" class="ma-2" />

    <v-data-table
      :items="items"
      :headers="headers"
      :loading="loading"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      :server-items-length="totalItems"
      :footer-props="{ 'items-per-page-options': [5, 25, 50, 100] }"
      @click:row="selectShop"
      loading-text="Loading... Please wait"
    />

    <nuxt-child />
    <search v-if="searchDialogOpened" @close="closeSearchDialog" @search="setShops" />
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Search from '~/components/shops/Search'

export default {
  components: { Search },
  data () {
    return {
      headers: [
        { text: 'id', value: 'id', sortable: false },
        { text: 'name', value: 'name', sortable: false }
      ],
      searchDialogOpened: false
    }
  },
  computed: {
    ...mapState('shops', {
      loading: 'loading',
      items: 'shops',
      statePage: 'page',
      totalItems: 'total',
      itemsPerPage: 'perPage'
    }),
    ...mapGetters('shops', [
      'pageCount',
      'searchingText',
      'specifiedSearchConditions'
    ]),
    page: {
      get () {
        return this.statePage || 1
      },
      set (value) {
        this.setPage(value)
        this.$router.push({ path: '/shops', query: { page: value, ...this.specifiedSearchConditions } })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.initializeSearchConditionsFromQuery(to.query)
      vm.fetchShops()
      return true
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'shops') {
      this.initializeSearchConditionsFromQuery(to.query)
      this.fetchShops()
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  methods: {
    ...mapActions('shops', [
      'fetchShops',
      'initializeSearchConditionsFromQuery',
      'setPage'
    ]),
    searchManufactures () {
      this.searchDialogOpened = true
    },
    closeSearchDialog () {
      this.searchDialogOpened = false
    },
    setShops () {
      this.$router.push({ path: '/shops', query: this.specifiedSearchConditions })
      this.closeSearchDialog()
    },
    selectShop (shop) {
      this.$router.push({ name: 'shops-id', params: { id: shop.id } })
    }

  }
}
</script>
