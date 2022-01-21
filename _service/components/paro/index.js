import IndexPage from './indexpage.js'
import FormPage from './projekt.js'
import DetailPage from './detail.js'

export async function setup (routes, path, cfg, _create) {
  
  routes.push({
    path,
    name: 'paroindex',
    component: _create(IndexPage, cfg)
  })

  routes.push({
    path: `${path}zadost`,
    name: 'paroform',
    component: _create(FormPage, cfg)
  })

  routes.push({
    path: `${path}:callid/:id`,
    name: 'paroproject_detail',
    component: _create(DetailPage, cfg)
  })

}