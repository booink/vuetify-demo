<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block to="/preferences">
            Preferences
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        @click.stop="miniVariant = !miniVariant"
        icon
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        @click.stop="clipped = !clipped"
        icon
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        @click.stop="fixed = !fixed"
        icon
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        @click.stop="notificationsOpened = !notificationsOpened"
        icon
      >
        <v-icon>{{ hasUnopendNotification ? 'mdi-bell-check' : 'mdi-bell' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="notificationsOpened"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item v-for="notification in notifications" :key="notification.id">
          <v-alert
            :type="notification.type"
            @click.native="clickNotification(notification)"
            border="left"
            outlined
            dense
            colored-border
            elevation="2"
          >
            <span class="body-2">{{ notification.title }}</span><br>
            <span class="body-2">{{ notificationCreatedAt(notification) }}</span>
          </v-alert>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>

    <notification v-if="lastNotification" :notification="lastNotification" />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Notification from '~/components/Notification'

export default {
  components: {
    Notification
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'SPA Shops',
          to: '/spa-shops'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'VueRouter Shops',
          to: '/vr-shops'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Shops',
          to: '/shops'
        }
      ],
      miniVariant: false,
      right: true,
      notificationsOpened: false,
      title: 'Vuetify Demo Admin'
    }
  },
  computed: {
    ...mapState([
      'lastNotification',
      'darkMode'
    ]),
    ...mapGetters({
      notifications: 'orderedNotifications',
      hasUnopendNotification: 'hasUnopendNotification'
    })
  },
  watch: {
    darkMode (value) {
      this.setDarkMode(value)
    }
  },
  methods: {
    ...mapActions([
      'openNotification',
      'setDarkMode'
    ]),
    clickNotification (notification) {
      this.openNotification(notification)
      if (notification.href) {
        this.$router.push(notification.href)
      }
    },
    notificationCreatedAt (notification) {
      const t = new Date(notification.createdAt)
      return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    }
  }
}
</script>
