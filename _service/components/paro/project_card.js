export default {
  props: ['proj', 'call'],
  computed: {
    url: function () {
      return `/paro/${this.call.id}/${this.proj.id}`
    }
  },
  template: `
    <div class="column">
      <img :src="proj.photo" /><br/>
      <hgroup>
        <h4><a :href="url">{{ proj.name }}</h4>
        <h5>{{ proj.desc }}</h5>
      </hgroup>
    </div>
  `
}