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
            <template v-slot:body-cell-Action="props">
              <q-td :props="props">
                <q-btn
                  @click="confirmUpdateQueue(props.row, 'on going')"
                  v-if="props.row.queue_number===1 && props.row.status !== 'In Progress'"
                  label="Process"
                  color="pink"
                  icon="edit"
                  size="sm"
                  flat
                  dense/>
                <q-btn
                  @click="confirmUpdateQueue(props.row, 'cancelled')"
                  label="Cancel"
                  icon="delete"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  dense
                  color="red"
                />
                <q-btn
                  @click="confirmUpdateQueue(props.row, 'completed')"
                  v-if="props.row.status === 'In Progress'"
                  label="Done"
                  icon="task_alt"
                  size="sm"
                  class="q-ml-sm"
                  color="green"
                  flat
                  dense/>
                <q-btn
                  @click="confirmUpdateQueue(props.row, 'move one down in line')"
                  v-if="props.row.queue_number===1 && props.row.status !== 'In Progress'"
                  label="Move Down"
                  icon="arrow_downward"
                  color="blue"
                  size="sm"
                  class="q-ml-sm"
                  flat
                  dense/>
              </q-td>
            </template>
          </q-table>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center" style="background-color: ghostwhite">
                <q-avatar icon="signal_wifi_off" color="pink" text-color="white" />
                <span class="q-ml-sm" style="color: deeppink;">Proceed on updating this <i>{{selectedPatient}}'s </i> procedure to <b>{{selectedStatus}}</b> ?</span>
              </q-card-section>

              <q-card-actions align="right" style="background-color: ghostwhite">
                <q-btn flat label="Cancel" color="red" v-close-popup />
                <q-btn @click="updateQueue()" flat label="Update" color="pink" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-linear-progress query size="10px"  color="blue" v-if="queueLoading"/>
        </q-card-section>
      </q-card>
      <q-inner-loading :showing="updateLoading">
        <q-spinner-grid size="200px" color="pink" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableQueue',
  data () {
    return {
      updateLoading: false,
      confirm: false,
      patientProgress: {
        patient_name: null,
        patient_code: null,
      },
      selectedItem: null,
      selectedStatus: null,
      selectedPatient: null,
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
        {name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center'}
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
    confirmUpdateQueue (procedureQueue, status) {
      this.confirm = true;
      this.selectedItem = procedureQueue;
      this.selectedPatient = procedureQueue.patient_name;
      this.selectedStatus = status;
    },
    updateQueue (procedureQueue, status) {
      this.updateLoading = true;
      this.procedureOptions = [];

      let statusUpdate = 'In Queue';

      if (this.selectedStatus === 'on going') {
        statusUpdate = 'In Progress';
      }

      if (this.selectedStatus === 'cancelled') {
        statusUpdate = 'Cancelled';
      }

      if (this.selectedStatus === 'completed') {
        statusUpdate = 'Done';
      }

      let moveBack = false;

      if (this.selectedStatus === 'move one down in line') {
        moveBack = true;
      }

      let data = {
        status: statusUpdate,
        move_back: moveBack,
        id: this.selectedItem.id
      };

      this.$store.dispatch("queues/updateProcedureQueue", data).then(
        response => {
          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.updateLoading = false;
            this.getQueues();
          }
        })
    },
    getQueues () {
      this.updateLoading = true;
      this.selectedProcedure = null;
      this.procedureOptions = [];
      this.$store.dispatch("queues/queueList").then(
        response => {
          this.updateLoading = false;
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
