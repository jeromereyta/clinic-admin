const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/AdmitPatient',
        component: () => import('pages/Admission/AdmitPatient.vue'),
        name: 'admit-patient',
      },
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/Queue', component: () => import('pages/QueuePage.vue')},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},
      {
        path: '/Patients',
        component: () => import('pages/Patients/Patients.vue'),
        name: 'patients',
      },
      {
        path: '/Patient/:patient_code',
        component: () => import('pages/Patients/Patient2.vue'),
        name: 'patient',
      },
      {
        path: '/PatientVisit/:patient_visit_id',
        component: () => import('pages/Admission/PatientVisit.vue'),
        name: 'patient-visit',
      },
      {path: '/CategoryProcedures',component: () => import('pages/Settings/CategoryProcedures.vue')},
      {path: '/Procedures',component: () => import('pages/Settings/Procedures.vue')},
      {path: '/FileTypes',component: () => import('pages/Settings/FileTypes.vue')},
      {path: '/Packages',component: () => import('pages/Settings/Packages.vue')},
    ]
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  },

  {
    path: '/UsersAdmin',
    component: () => import('pages/UserSelection.vue')
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
