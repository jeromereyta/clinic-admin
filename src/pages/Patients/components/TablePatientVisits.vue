<template>
  <q-card>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="patientVisitsComputed"
        :columns="columns"
        row-key="id"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              icon="visibility"
              size="sm"
              flat
              dense
              @click="openPatientVisit(props.row)"
            />
          </q-td>
        </template>
      </q-table>
      <q-linear-progress query size="10px"  color="blue" v-if="isLoading"/>
    </q-card-section>
    <q-dialog v-model="patientVisitModal">
      <q-card style="width: 800px; max-width: 100vw; height: 800px; max-height: 100vw;">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                disable
                filled
                v-model="selectedPatientVisit.created_at"
                label="Date Visited *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                disable
                filled
                v-model="selectedPatientVisit.attending_doctor"
                label="Attending Doctor *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                disable
                v-model="selectedPatientVisit.patient_bp"
                label="Patient BP *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                disable
                v-model="selectedPatientVisit.patient_height"
                label="Height *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                disable
                v-model="selectedPatientVisit.patient_weight"
                label="Weight *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                disable
                v-model="selectedPatientVisit.remarks"
                label="Remarks *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <table-file-uploads :files-data="filesData"/>
            </q-form>
          </q-card-section>
        <q-inner-loading :showing="saving">
          <q-spinner-grid size="200px" color="pink" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  name: "TablePatientVisits",
  components: {
    TableFileUploads: () => import('./TableFileUploads')
  },
  props: ['patientVisits', 'isLoading'],
  data() {
    return {
      columns: [
        {name: 'created_at', label: 'Date Visited', field: 'created_at', align: 'left'},
        {name: 'attending_doctor', label: 'Attending Doctor', field: 'attending_doctor', align: 'left'},
        {name: 'patient_bp', label: 'Patient BP', field: 'patient_bp', align: 'left'},
        {name: 'file_uploaded_count', label: 'Files (#)', field: 'file_uploaded_count', align: 'left'},
        {name: 'remarks', label: 'Remarks', field: 'remarks', align: 'left'},
        {name: 'Action', label: 'View', field: 'Action', sortable: false, align: 'center'}
      ],
      fileColumns: [
        {name: 'file_name', label: 'File Name', field: 'file_name', align: 'left'},
        // {name: 'link', label: 'Link', field: 'link', align: 'left'},
        {name: 'Action', label: 'View File', field: 'Action', sortable: false, align: 'center'}
      ],
      filesData : [],
      filter: '',
      patientVisitModal: false,
      saving: false,
      selectedPatientVisit: {},
      show_filter: false,
    }
  },
  computed: {
    patientVisitsComputed: function () {
      return this.patientVisits.map(visit => {
        visit.file_uploaded_count = visit.files.length;

        return visit;
      })
    }
  },
  methods: {
    openFileLink (fileUpload) {
      window.open(fileUpload.link, '_blank');
    },
    openPatientVisit (patientVisit) {
      this.$router.push({ name: 'patient-visit',  params: { patient_visit_id: patientVisit.id }})
      this.patientVisitModal = true;
      this.selectedPatientVisit = patientVisit;
      this.filesData = this.selectedPatientVisit.files.map(file => {
        return  {
          file_name : file.name,
          link : 'https://phplaravel-705740-2336961.cloudwaysapps.com/storage/' + file.path,
          file_type_name: file.file_type.name,
          format : file.format
        };
      })
    }
  }
}
</script>

<style scoped>

</style>
