<template>
  <q-dialog v-model="patientVisitView">
    <q-card style="width: 1000px; max-width: 100vw; height: 900px; max-height: 100vw;">
      <h1>Test me</h1>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "CardPatientVisit",
  props: ['patientVisitView'],
  data() {
    return {
      patientError: false,
      errorMessages: [],
      modalModel: this.patientVisitView
    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
