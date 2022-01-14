
export default {
  data: function () {
    return { expanded: false }
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
        {{ $store.state.user.CurrentFamilyName }} {{ $store.state.user.CurrentGivenName }}
        <a role="button" href="https://modurad.otevrenamesta.cz/omstredni/nia/logout">odhlásit</a>
      </li>
      <li v-else>
        <a role="button" href="https://modurad.otevrenamesta.cz/omstredni/nia/login">příhlásit se</a>
      </li>

    </ul>
  </nav>
</header>
`
}
