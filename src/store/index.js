import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import categoryProcedures from './category-procedures'
import fileTypes from './file-types'
import patients from './patients'
import procedures from './procedures'
import queues from './queues'
import packages from './package'
import transactions from './transactions'


Vue.use(Vuex)
Vue.prototype.$hostname = 'http://phplaravel-705740-2336961.cloudwaysapps.com'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      categoryProcedures,
      fileTypes,
      patients,
      procedures,
      queues,
      packages,
      transactions
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./auth'], () => {
      const newShowcase = require('./auth').default
      Store.hotUpdate({ modules: { auth: newShowcase } })
    })
  }

  return Store
}
