<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="my-card">
      <div style="width: 60%; height: 50%">
        <q-img
          style="padding-top: 15px"
          src="https://i.pinimg.com/originals/64/dc/12/64dc12b3dea9667d618cf26306aa097f.gif"
          :height="'50'"
        />

        <q-card-section>
          <div class="text-h6">Currently in Progress</div>
          <div class="text-subtitle2">{{patient_name}}</div>
          <div class="text-subtitle2">{{patient_code}}</div>
        </q-card-section>

        <q-card-actions align="center">
<!--          <q-btn v-show="hasPatient" color="blue" label="Procedure Completed" class="q-mt-md" icon="task_alt"/>-->
<!--          <q-btn v-show="hasPatient" color="red" label="Procedure Cancelled" class="q-mt-md" icon="cancel"/>-->
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CardProfile",
  computed : {
    patient_name () {
      return this.$store.state.queues.patient_name
    },
    patient_code () {
      return this.$store.state.queues.patient_code
    }
  }
}
</script>

<style scoped>

</style>
