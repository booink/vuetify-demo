const uuidv4 = require('uuid/v4')

class Notification {
  id
  type = 'info'
  title = ''
  href = {}
  createdAt
  opened

  constructor (type, title, href) {
    this.id = uuidv4()
    this.type = type
    this.title = title
    this.href = href
    this.createdAt = Date.now()
    this.opened = false
  }
}

export const state = () => ({
  darkMode: false,
  notifications: [],
  lastNotification: null
})

export const getters = {
  orderedNotifications (state) {
    return [...state.notifications].reverse()
  },
  hasUnopendNotification (state) {
    return state.notifications.some((notification) => { return !notification.opened })
  }
}

export const mutations = {
  setDarkMode (state, darkMode) {
    state.darkMode = darkMode
    this.app.vuetify.framework.theme.dark = state.darkMode
  },
  addNotification (state, notification) {
    state.notifications.push(notification)
    state.lastNotification = notification
  },
  clearLastNotification (state) {
    state.lastNotification = null
  },
  openNotification (state, notification) {
    const openedNotification = state.notifications.find((n) => { return notification.id === n.id })
    openedNotification.opened = true
  }
}

export const actions = {
  nuxtClientInitPlugin ({ state }) {
    this.app.vuetify.framework.theme.dark = state.darkMode
  },
  setDarkMode (context, darkMode) {
    context.commit('setDarkMode', darkMode)
  },
  addNotification (context, { type, title, href }) {
    context.commit('addNotification', new Notification(type, title, href))
  },
  clearLastNotification (context) {
    context.commit('clearLastNotification')
  },
  openNotification (context, notification) {
    context.commit('openNotification', notification)
  }
}
