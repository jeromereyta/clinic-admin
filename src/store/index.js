import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import patients from './patients'

Vue.use(Vuex)

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
      patients
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
