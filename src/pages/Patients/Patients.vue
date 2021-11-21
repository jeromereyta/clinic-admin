<template>
  <q-page class="q-pa-sm">

    <tables-basic></tables-basic>
  </q-page>
</template>

<script>
export default {
  name: "Patients",
  components: {
    TablesBasic: () => import('components/tables/TablePatients')
  },
  computed: {
    patientList() {
      this.$store.dispatch("patients/list").then(
        response => {
          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          }
        })
    },
  },
  created() {
  },
  methods: {

  }
}
</script>

<style>

</style>
