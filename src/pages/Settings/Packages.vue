<template>
  <q-page class="q-pa-sm">
    <table-packages></table-packages>
  </q-page>
</template>

<script>
export default {
  name: "FileType",
  components: {
    TablePackages: () => import('components/tables/TablePackages')
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
