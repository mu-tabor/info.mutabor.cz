export default {
  props: ['proj'],
  template: `
    <div class="column">
      <img :src="proj.photo" /><br/>
      <h1>{{ proj.name }}</h1>
      <h2>{{ proj.desc }}</h2>
      <MDText :text="proj.content" />
    </div>
  `
}