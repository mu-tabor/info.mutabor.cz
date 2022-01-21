import DynamicForm from '../dynamicForm.js'
import formcontrol from './formcontrol.js'
import budgeteditor from './parts/budgeteditor.js'

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
      let filter = { not: { status: 'closed' } }
      let currUrl = `${this.$props.data.url}?filter=${JSON.stringify(filter)}`
      const dataReq = await axios.get(currUrl)
      this.$data.curr = dataReq.data.length > 0 ? dataReq.data[0] : null
      filter = { author: this.$store.state.user.id }
      const u = `${this.$props.data.url}${this.$data.curr.id}?filter=${JSON.stringify(filter)}`
      const projektyReq = await axios.get(u)
      this.$data.projekt = projektyReq.data.length > 0 ? projektyReq.data[0] : null
    } catch (err) {
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  computed: {
    formcfg: function () {
      return { form: formcontrol }
    },
    fc: function () {
      return { budgeteditor }
    },
    canEdit: function () {
      return this.curr.status !== 'open' 
        && this.$router.currentRoute.query.d === undefined
    }
  },
  methods: {
    edit: function () {
      this.modalopened = true
    },
    submit: function (data) {
      if (this.projekt) {
        const u = `${this.$props.data.url}${this.$data.curr.id}/${this.projekt.id}`
        return axios.put(u, data)
      } else {
        return axios.post(`${this.$props.data.url}${this.$data.curr.id}`, data)
      }      
    }
  },
  components: { DynamicForm },
  template: `
  <div v-if="loaded">
    <kbd v-if="canEdit">
      podávat návrhy lze až od {{ curr.submission_start | date }}
    </kbd>
    <div v-else-if="this.$store.getters.userLogged">
      <DynamicForm :cfg="formcfg" :data="projekt" :submit="submit"
        :extracomponents="fc" />
      <a role="button" class="secondary" href="..">storno</a>
    </div>
    <kbd v-else>
      pracovat s projektovým návrhem může pouze přihlášený uživatel
    </kbd>
  </div>
  `
}