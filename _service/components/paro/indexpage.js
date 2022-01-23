import ProjectCardFN from './project_card.js'

export default (templates) => ({
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
  components: { 
    ProjectCard: ProjectCardFN(templates) 
  },
  template: templates['index']
})

// `<h4>archiv</h4>
// <ul class="menu-list" v-if="loaded">
//   <li v-for="i,idx in items" :key="idx">
//     <router-link :to="data.detail_link + '/' + i.id">
//       <h3 class="title is-4">{{ i.name }}</h3>
//     </router-link>
//   </li>
// </ul>`