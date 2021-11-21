<template>
  <q-page class="q-pa-sm">
    <tables-basic></tables-basic>
  </q-page>
</template>

<script>
export default {
  name: "Procedures",
  components: {
    TablesBasic: () => import('components/tables/TableProcedures')
  }
}
</script>

<style>

</style>
