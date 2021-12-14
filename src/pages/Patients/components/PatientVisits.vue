<template>
  <q-page class="q-pa-sm">
  <patient-visits-table :patient-visits="patientVisits" :is-loading="isLoading"/>
  </q-page>
</template>

<script>
export default {
  name: "PatientVisits",
  props: ['patientVisits', 'isLoading'],
  components: {
    PatientVisitsTable: () => import('./TablePatientVisits')
  },
}
</script>

<style scoped>

</style>
