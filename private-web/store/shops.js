import qs from 'qs'

const DEFAULT_SEARCH_CONDITIONS = {
  id: null,
  name: null,
  address: null,
  phone_number: null,
  website_url: null
}

export const state = () => ({
  searchConditions: Object.assign({}, DEFAULT_SEARCH_CONDITIONS),
  shops: [],
  total: 0,
  perPage: 5,
  page: 1,
  loading: false
})

export const getters = {
  searchingText (state) {
    const texts = []
    const keys = Object.keys(state.searchConditions)
    for (const index in keys) {
      const key = keys[index]
      const value = state.searchConditions[key]
      if (value && value.length > 0) {
        texts.push(`${key}: ${value}`)
      }
    }
    if (texts.length === 0) {
      return '未指定'
    }
    return texts.join(', ')
  },
  specifiedSearchConditions (state) {
    const keys = Object.keys(state.searchConditions)
    const searchConditions = {}
    for (const index in keys) {
      const key = keys[index]
      const value = state.searchConditions[key]
      if (value) { searchConditions[key] = value }
    }
    return searchConditions
  },
  specifiedSearchConditionsWithPage (state, getters) {
    const searchConditions = Object.assign({}, getters.specifiedSearchConditions)
    if (state.page > 1) {
      searchConditions.page = state.page
    }
    return searchConditions
  },
  defaultSearchConditions () {
    return DEFAULT_SEARCH_CONDITIONS
  },
  pageCount (state) {
    if (state.total == null || state.total === 0) { return 0 }
    return Math.ceil(state.total / state.perPage)
  }
}

export const mutations = {
  setSearchConditions (state, searchConditions) {
    const keys = Object.keys(state.searchConditions)
    for (const index in keys) {
      const key = keys[index]
      const value = searchConditions[key]
      state.searchConditions[key] = value || null
    }
  },
  setPage (state, page) {
    state.page = page
  },
  setShops (state, response) {
    if (response.status === 200) {
      state.shops = response.data
      state.total = parseInt(response.headers.total)
      state.perPage = parseInt(response.headers['per-page'])
    } else {
      state.shops = []
      state.total = 0
    }
  },
  setLoading (state, value) {
    state.loading = value
    state.shops = []
  },
  initializeSearchConditionsFromQuery (state, query) {
    const keys = Object.keys(state.searchConditions)
    for (const index in keys) {
      const key = keys[index]
      const value = query[key]
      state.searchConditions[key] = value || null
    }
    if (query.page) {
      state.page = parseInt(query.page)
    }
    state.perPage = parseInt(query.perPage) || 5
  }
}

export const actions = {
  setSearchConditions (context, searchConditions) {
    context.commit('setSearchConditions', searchConditions)
    context.commit('setPage', null)
  },
  initializeSearchConditionsFromQuery ({ commit }, query) {
    commit('initializeSearchConditionsFromQuery', query)
  },
  setPage (context, page) {
    context.commit('setPage', page)
  },
  resetSearchConditions (context) {
    context.commit('setSearchConditions', {})
    context.commit('setPage', 1)
  },
  async fetchShops ({ commit, state }) {
    if (state.loading) {
      return false
    }
    commit('setLoading', true)
    const params = { shop: state.searchConditions, page: state.page, per_page: state.perPage }
    const paramsSerializer = (params) => { return qs.stringify(params) }
    const response = await this.$axios.get('/shops', { params, paramsSerializer })
      .catch((error) => {
        this.errors = error.response.data
        return error.response
      })
    // await timeout(5000)
    commit('setLoading', false)
    commit('setShops', response)
  }
}

/*
function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
*/
