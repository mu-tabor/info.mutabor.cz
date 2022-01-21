export default {
  props: ['proj', 'call'],
  computed: {
    url: function () {
      return {
        name: 'paroproject_detail',
        params: {
          callid: this.call.id,
          id: this.proj.id
        }
      }
    }
  },
  template: `
    <div class="column">
      <img :src="proj.photo" /><br/>
      <hgroup>
        <h4><router-link :to="url">{{ proj.name }}</router-link>
        <h5>{{ proj.desc }}</h5>
      </hgroup>
    </div>
  `
}