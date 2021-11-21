<template>
  <div class="row q-col-gutter-sm">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-card class="text-grey-8">
        <q-card-section class="q-pa-none">
          <q-table class="no-shadow"
                   :data="data"
                   title="Queue"
                   :hide-header="mode === 'grid'"
                   :columns="columns"
                   row-key="name"
                   :filter="filter"
                   :pagination.sync="pagination"
          >
            <template v-slot:top-right="props">
              <q-select
                  filled
                  v-model="selectedProcedure"
                  fill-input
                  input-debounce="0"
                  :options="procedureOptions"
                  hint="Select Procedure"
                  :loading="queueLoading"
                  style="width: 400px; padding-bottom: 32px"
                />
            </template>
          </q-table>
          <q-linear-progress query size="10px"  color="blue" v-if="queueLoading"/>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableQueue',
  data () {
    return {
      patientProgress: {
        patient_name: null,
        patient_code: null,
      },
      procedureOptions: [],
      selectedProcedure: null,
      filter: '',
      queueLoading: false,
      mode:'list',
      columns: [
        {name: 'queue_number', align: 'left', label: 'Queue #', field: 'queue_number', sortable: true},
        {name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true},
        {name: 'patient_name', align: 'left', label: 'Patient Name', field: 'patient_name', sortable: true},
        {name: 'patient_code', align: 'left', label: 'Patient Code', field: 'patient_code', sortable: true},
      ],
      data:[],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  created () {
    this.getQueues();
  },
  computed : {
    queuesComputed: function () {
      return this.$store.state.queues.queues
    },
  },
  watch : {
    selectedProcedure: function (newValue, oldValue) {
      let data = this.queuesComputed;

      Object.keys(data).forEach(key => {
        let patients = data[key];

        if (key === newValue) {
          this.data = patients;
        }
      });
    },
    data: function (newValue, oldValue) {
      let patient = newValue.find(patient => patient.status === 'In Progress');

      if (patient !== undefined) {
        this.$store.dispatch("queues/setPatientInProgress", patient.patient_name, patient.patient_code);
      }

      if (patient === undefined){
        this.$store.dispatch("queues/setPatientInProgress", null, null)
      }

    }
  },
  methods: {
    getQueues () {
      this.queueLoading = true;
      this.$store.dispatch("queues/queueList").then(
        response => {
          this.queueLoading = false;
          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            let data = response.data;

            Object.keys(data).forEach(key => {
              this.procedureOptions.push(key)
            });

            // Always set to first item
            this.selectedProcedure = this.procedureOptions[0]
          }
        })
    }
  }
}
</script>
