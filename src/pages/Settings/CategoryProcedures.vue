<template>
  <q-page class="q-pa-sm">
    <tables-basic></tables-basic>
  </q-page>
</template>

<script>
export default {
  name: "CategoryProcedures",
  components: {
    TablesBasic: () => import('components/tables/TableCategoryProcedures')
  },
  computed: {
  },
  created() {
  },
  methods: {

  }
}
</script>

<style>

</style>
