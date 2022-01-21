
export default {
  data: function () {
    return { expanded: false }
  },
  methods: {
    logout: async function () {
      const r = await axios.get('https://modurad.otevrenamesta.cz/mutabor/nia/logout')
      localStorage.removeItem('_BBB_web_user')
      window.location.href = r.data
    }
  },
  template: `
<header class="container">
  <nav>
    <ul>
      <li>
        <router-link to="/">
          <img style="width: 200px;" 
            :src="$store.getters.mediaUrl('https://www.taborcz.eu/html/images/logo.svg')">
        </router-link>
      </li>
      <li v-for="i,idx in $store.state.site.menu" :key="idx">
        <router-link :to="i.link">{{ i.label }}</router-link>
      </li>
    </ul>

    <ul>
      <li v-if="this.$store.getters.userLogged">
        <span>{{ $store.state.user.CurrentFamilyName }} {{ $store.state.user.CurrentGivenName }}</span>
      </li>
      <li v-if="this.$store.getters.userLogged">
        <button @click="logout">odhlásit</button>
      </li>
      <li v-else>
        <a role="button" href="https://modurad.otevrenamesta.cz/mutabor/nia/login">
          přihlásit se
        </a>
      </li>

    </ul>
  </nav>
</header>
`
}
