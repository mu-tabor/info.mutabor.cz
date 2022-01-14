import DynamicForm from '../dynamicForm.js'
import formcontrol from './formcontrol.js'

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
      const projektyReq = await axios.get(`${this.$props.data.url}${this.$data.curr.id}`)
      this.$data.projekt = projektyReq.data
    } catch (err) {
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  computed: {
    formcfg: function () {
      return { form: formcontrol }
    }
  },
  methods: {
    edit: function () {
      this.modalopened = true
    },
    submit: function (data) {
      if (data.id) {
        const u = `${this.$props.data.url}${this.$data.curr.id}/data.id`
        return axios.put(u, data)
      } else {
        return axios.post(`${this.$props.data.url}${this.$data.curr.id}`, data)
      }      
    }
  },
  components: { DynamicForm },
  template: `
  <kbd v-if="true">
    pracovat s projektovým návrhem může pouze přihlášený uživatel
  </kbd>
  <div v-else>
    <DynamicForm :cfg="formcfg" :data="curr" :submit="submit" />
    <a role="button" class="secondary" href="..">storno</a>
  </div>
  `
}