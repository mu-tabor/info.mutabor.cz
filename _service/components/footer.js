export default {
  template: `
<footer class="container">
  <hr />
  <nav>
    <ul>
      <li><a :href="$store.state.site.facebook" target="_blank">
        <i class="fab fa-facebook"></i></a>
      </li>
    </ul>

    <ul>
      <li><router-link to="/povinne/pristupnost">
        Prohlášení o přístupnosti</router-link></li>

      <li><router-link to="/povinne/soukromi">
        Prohlášení o ochraně soukromí</router-link></li>

      <li><router-link to="/povinne/sitemap">
        Struktura stránek</router-link></li>
    </ul>
  </nav>
</footer>
`}
