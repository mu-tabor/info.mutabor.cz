import DynamicForm from '../../dynamicForm.js'
import formcontrol from './budget_formcontrol.js'

// function _parse (data) {
//   try {
//     return JSON.parse(data)
//   } catch (_) {
//     return []
//   }
// }

export function countTotal (items) {
  // const items = _parse(budget)
  return items.reduce((acc, i) => {
    return acc + (i.count * i.price)
  }, 0)
}

export default {
  data: function () {
    return {
      item: null,
      curr: null
    }
  },
  methods: {
    remove: function (item) {
      const items = _parse(this.$attrs.value)
      const idx = _.findIndex(items, i => (i.name === item.name))
      items.splice(idx, 1)
      this.$emit('input', JSON.stringify(items))
    },
    add: function () {
      this.$data.curr = null
      this.$data.item = { count: 1, name: '', price: '' }
    },
    edit: function (idx, item) {
      this.$data.curr = idx
      Object.assign(this.$data.item, item)
    },
    onItemSubmit: function (item) {
      const items = _parse(this.$attrs.value)
      this.$data.curr === null
        ? items.push(item)
        : Object.assign(items[this.$data.curr], item)
      const newVal = JSON.stringify(items)
      this.$props['v-model'] = newVal
      this.$emit('input', newVal)
    }
  },
  computed: {
    items: function () {
      return _parse(this.$attrs.value)
    },
    total: function () {
      return countTotal(this.data[this.cfg.name])
    },
    formcfg: function () {
      return formcontrol
    }
  },
  props: [ 'data', 'cfg' ], //'v-model'],
  components: { DynamicForm },
  template: `
    <div>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">Název</th>
            <th scope="col">Počet</th>
            <th scope="col">Cena</th>
            <th><button @click="add">+ přidat položku</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, idx) in data[cfg.name]">
            <td>{{ i.name }} <a v-if="i.link" v-bind:href="i.link" target="_blank">(odkaz)</a></td>
            <td>{{ i.count }}</td>
            <td>{{ i.price }}</td>
            <td>
              <button variant="secondary" size="sm" @click='edit(idx, i)'>edit</button>
              <button variant="danger" size="sm" @click='remove(i)'>x odstranit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <dialog :open="item!==null">
        <DynamicForm :cfg="formcfg" :data="item" :submit="onItemSubmit" />
      </dialog>
      <h3>Celkové náklady s DPH: {{ total }}.</h3>
      
    </div>
  `
}