import IndexPageFN from './indexpage.js'
import FormPageFN from './projekt.js'
import DetailPageFN from './detail.js'

export async function setup (routes, path, cfg, _create) {
  
  routes.push({
    path,
    name: 'paroindex',
    component: _create(IndexPageFN, cfg, ['index', 'project_card'])
  })

  routes.push({
    path: `${path}zadost`,
    name: 'paroform',
    component: _create(FormPageFN, cfg, ['form'])
  })

  routes.push({
    path: `${path}:callid/:id`,
    name: 'paroproject_detail',
    component: _create(DetailPageFN, cfg, ['detail', 'likebutton'])
  })

}