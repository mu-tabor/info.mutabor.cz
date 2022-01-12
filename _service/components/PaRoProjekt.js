import ProjectForm from './paro/form.js'

export default {
  data: function () {
    return {
      loaded: false,
      curr: null,
      projekt: null
    }
  },
  created: async function () {
    try {
      const filter = { not: { status: 'closed' } }
      let currUrl = `${this.$props.data.url}?filter=${JSON.stringify(filter)}`
      const dataReq = await axios.get(currUrl)
      this.$data.curr = dataReq.data.length > 0 ? dataReq.data[0] : null
      const projektyReq = await axios.get(`${this.$props.data.url}/${this.$data.curr.id}`)
      this.$data.projekt = projektyReq.data
    } catch (err) {
      alert(err)
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  methods: {
    edit: function () {
      this.modalopened = true
    },
    cancel: function () {
      this.modalopened = false
    }
  },
  components: { ProjectForm },
  template: `
  <div v-if="loaded">
  
    <ProjectForm :data="data" />
    <a role="button" href="..">storno</a>

  </div>
  `
}