const formComponents = {
  finput: {
    props: [ 'data', 'cfg' ],
    template: `
    <input :type="cfg.type" 
      :value="data[cfg.name]"
      @input="evt => data[cfg.name] = evt.target.value" />
    `
  },
  ftextarea: {
    props: [ 'data', 'cfg' ],
    template: `
    <textarea :rows="cfg.rows"
      :value="data[cfg.name]"
      @input="evt => data[cfg.name] = evt.target.value" />
    `
  }
}
const validators = {
  required: (val) => {
    return val && val.length > 0 ? null : 'pole je povinné'
  },
  maxLen: (num) => (val) => {
    return val.length > num ? 'pole je moc dlouhé' : null
  }
}

export default {
  data: function () {
    return {
      submitting: false,
      errors: [],
      formdata: []
    }
  },
  props: ['cfg', 'data', 'submit'],
  computed: {
    hasErrors: function () {
      this.errors.length > 0
    }
  },
  created: function () {
    this.$data.formcontrol = jsyaml.load(this.$props.cfg.form)
    this.$data.formdata = _.reduce(this.$data.formcontrol, (acc, i) => {
      acc[i.name] = this.$props.data ? this.$props.data[i.name] : ''
      return acc
    }, {})
    this.$data.errors = _.reduce(this.$data.formcontrol, (acc, i) => {
      acc[i.name] = null
      return acc
    }, {})
  },
  methods: {
    handleSubmit: async function () {
      const invalid = this.validate()
      if (invalid) return
      this.$data.submitting = true
      try {
        const res = await this.$props.submit(this.formdata)
      } catch (err) {
        this.$store.dispatch('toast', { message, type: 'error' })
      } finally {
        this.$data.submitting = false
      }
    },
    validate: function () {
      _.map(this.$data.formcontrol, i => {
        if (!i.rules) return
        const err = validators[i.rules](this.$data.formdata[i.name])
        this.$data.errors[i.name] = err
      })
      return _.some(this.$data.errors, (v, k) => (v !== null))
    },
    getError: function (name) {
      return this.$data.errors[name]
    }
  },
  components: formComponents,
  template: `
<form @submit.prevent="handleSubmit">

  <div :class="i.class" v-for="i, idx in $data.formcontrol" :key="idx">
    <label for="firstname">
      {{ i.label }}
      <component :is="i.component"
        :aria-invalid="getError(i.name) !== null"
        :data="$data.formdata" :cfg="i"
        :placeholder="i.placeholder" />
      
      <small v-if="getError(i.name)" class="help is-danger">
        {{ getError(i.name) }}
      </small>
    </label>
  </div>

  <slot name="submitbuttons" :hasErrors="hasErrors" :submitting="submitting">  
    <button :disabled="submitting || hasErrors">
      <span class="icon is-small"><i class="fas fa-bold"></i></span>
      uložit
    </button>
  </slot>

</form>
  `
}
