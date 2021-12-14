<template>
  <q-table
    title=""
    :data="computedFileData"
    :columns="fileColumns"
    row-key="id">
    <template v-slot:body-cell-Action="props">
      <q-td :props="props">
        <q-btn
          icon="visibility"
          size="sm"
          flat
          dense
          @click="openFileLink(props.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  name: "TableFileUploads",
  props: ['filesData', 'isLoading'],
  computed: {
    computedFileData: function () {
      return this.filesData
    }
  },
  data() {
    return {
      fileColumns: [
        {name: 'file_name', label: 'File Name', field: 'file_name', align: 'left'},
        {name: 'file_type_name', label: 'File Type', field: 'file_type_name', align: 'left'},
        {name: 'format', label: 'Format', field: 'format', align: 'left'},
        {name: 'Action', label: 'View File', field: 'Action', sortable: false, align: 'center'}
      ],
    }
  },
  methods: {
    openFileLink(fileUpload) {
      window.open(fileUpload.link, '_blank');
    },
  }
}
</script>

<style scoped>

</style>
