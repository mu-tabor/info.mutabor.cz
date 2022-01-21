export default `
- name: name
  label: název projektu
  component: finput
  placeholder: dobře ho promyslete, měl by být výstižný
  rules: required
  class: is-full

- name: cound
  label: stručný popis projektu
  component: finput
  type: number
  placeholder: stručný popis, který detailně rozvedete dále ...
  rules: required
  class: is-full

- name: price
  label: cena za jednotku
  component: finput
  type: number
  placeholder: tak do toho ...
  rules: required
`