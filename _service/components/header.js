
export default {
  data: function () {
    return { expanded: false }
  },
  template: `
<header>
  <nav>
    <ul>
      <li>
        <router-link to="/">
          <img :src="$store.getters.mediaUrl('http://data.vxk.cz/webom/logo-om.svg')">
        </router-link>
      </li>
      <li v-for="i,idx in $store.state.site.menu" :key="idx">
        <router-link :to="i.link">{{ i.label }}</router-link>
      </li>

      <li v-if="this.$store.getters.userLogged">
        {{ $store.state.user.CurrentFamilyName }} {{ $store.state.user.CurrentGivenName }}
        <a role="button" href="/api/nia/logout">odhlásit</a>
      </li>
      <li v-else>
        <a role="button" href="https://www.eidentita.cz/Home">
          <strong>zaregistrovat</strong>
        </a>
        <a role="button" href="/api/nia/login">příhlásit se</a>
      </li>

    </ul>
  </nav>
</header>
`
}
