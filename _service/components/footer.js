export default {
  template: `
  <footer>

        <div class="column is-4">
          <img class="logo" :src="$store.getters.mediaUrl('http://data.vxk.cz/webom/logo-om.svg')" />
          <a :href="$store.state.site.github" target="_blank"><i class="fab fa-github"></i></a>
          <a :href="$store.state.site.facebook" target="_blank"><i class="fab fa-facebook"></i></a>
          <a :href="$store.state.site.gitlab" target="_blank"><i class="fab fa-gitlab"></i></a>
        </div>

        <div class="column is-4 content">
          <ul>
            <li><router-link to="/povinne/pristupnost">
              Prohlášení o přístupnosti</router-link></li>
 
            <li><router-link to="/povinne/soukromi">
              Prohlášení o ochraně soukromí</router-link></li>

            <li><router-link to="/povinne/sitemap">
              Struktura stránek</router-link></li>
          </ul>
        </div>

  </footer>
`}
