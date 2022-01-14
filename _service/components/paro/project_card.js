export default {
  props: ['proj', 'callid'],
  computed: {
    url: function () {
      return `/paro/${this.callid}/${this.proj.id}`
    }
  },
  template: `
    <div class="column">
      <img :src="proj.photo" /><br/>
      <a :href="url">{{ proj.name }}</a><br/>
      <small>{{ proj.desc }}</small>
    </div>
  `
}