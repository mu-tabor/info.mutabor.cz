import ProjectCard from './project_card.js'

export default {
  data: function () {
    return {
      loaded: false,
      archive: [],
      curr: null,
      projekty: [],
      modalopened: false
    }
  },
  props: ['data'],
  created: async function () {
    try {
      const filter = { not: { status: 'closed' } }
      let currUrl = `${this.$props.data.url}?filter=${JSON.stringify(filter)}`
      const dataReq = await axios.get(currUrl)
      this.$data.curr = dataReq.data.length > 0 ? dataReq.data[0] : null
      const projektyReq = await axios.get(`${this.$props.data.url}/${this.$data.curr.id}`)
      this.$data.projekty = projektyReq.data
    } catch (err) {
      alert(err)
    } finally {
      this.$data.loaded = true
    }
  },
  components: { ProjectCard },
  template: `
  <div v-if="loaded">
    <div v-if="curr">
      <div class="grid">
        <div>        
          <h4 class="title">{{ curr.name }}</h4>
          <p>
            Začátek podávání návrhů: {{ curr.submission_start | date }}<br/>
            Konec navrhování: {{ curr.submission_end | date }}<br/>
            Začátek ověřování návrhů: {{ curr.thinking_start | date }}<br/>
            Začátek hlasování v anketě: {{ curr.voting_start | date }}<br/>
            Konec hlasování: {{ curr.voting_end | date }}<br/>
            Limit rozpočtu návrhu: {{ curr.budgetlimit }} Kč<br/>
            Počet palečků základní podpory: {{ curr.minimum_support }}
          </p>
        </div>
        <router-link :to="{name:'paroform'}" role="button">
          podat/upravit projekt
        </router-link>
      </div>
      
      <hr />
      <kbd v-if="projekty.length === 0">zatím žádné návrhy nedorazily :(</kbd>
      <div v-else class="grid">
        <ProjectCard v-for="i,idx in projekty" :key="idx" 
            :proj="i" :call="curr" />
      </div>
    </div>
    <kbd v-else>Není žádná aktuální výzva</kbd>
  </div>
  `
}

// `<h4>archiv</h4>
// <ul class="menu-list" v-if="loaded">
//   <li v-for="i,idx in items" :key="idx">
//     <router-link :to="data.detail_link + '/' + i.id">
//       <h3 class="title is-4">{{ i.name }}</h3>
//     </router-link>
//   </li>
// </ul>`