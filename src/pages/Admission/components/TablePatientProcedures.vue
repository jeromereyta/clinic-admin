<template>
  <q-table
    title=""
    :data="computedProcedures"
    :columns="columns"
    row-key="id">
    <template v-slot:body-cell-Action="props">
      <q-td :props="props">
        <q-btn
          icon="visibility"
          size="sm"
          flat
          dense
          @click=""
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  name: "TablePatientProcedures",
  props: ['procedures', 'isLoading'],
  computed: {
    computedProcedures: function () {
      return this.procedures
    }
  },
  data() {
    return {
      columns: [
        {name: 'name', label: 'Procedure Name', field: 'name', align: 'left'},
        {name: 'description', label: 'Description', field: 'description', align: 'left'},
        {name: 'patient_procedure_description', label: 'Note', field: 'patient_procedure_description', align: 'left'},
        {name: 'price', label: 'Price', field: 'price', align: 'left'},
        // {name: 'Action', label: 'View File', field: 'Action', sortable: false, align: 'center'}

      ],
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
