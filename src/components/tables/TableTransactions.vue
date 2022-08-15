<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Transactions
        <q-btn label="Download Excel" class="float-right text-capitalize text-indigo-8 shadow-3" icon="file_download" @click="exportXlsx"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="transactionsComputed"
        :columns="columns"
        row-key="id"
        :filter="filter"
      >
        <template v-slot:top-left>
        </template>
        <template v-slot:top-right>
          <q-btn label="Filter By Date" style="margin-right: 750px" class="float-left text-capitalize text-indigo-8 shadow-3" icon="date_range" @click="dateFilter=true"/>
          <q-input filled borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              icon="visibility"
              size="sm"
              flat
              dense
              @click="openPatientProcedure(props.row)"
            />
<!--            <q-btn icon="edit" size="sm" flat dense @click="openDialog(props.row)"/>-->
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="dateFilter">
        <q-card style="width: 500px; max-width: 100vw; height: 300px; max-height: 100vw;">
          <q-card-section>
            <q-input  filled v-model="fromDate" mask="date" :rules="['date']" label="From Date" borderless dense debounce="300">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fromDate" >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input filled v-model="toDate" mask="date" :rules="['date']" label="To Date" borderless dense debounce="300">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="toDate" >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions>
            <q-btn
              @click="generateTransactionsByDate"
              class="float-right text-capitalize text-indigo-8 shadow-3"
              icon="date_range"
              v-show="fromDate && toDate"
            >
              Generate
            </q-btn>
            <q-btn @click="getAll" class="float-right text-capitalize text-indigo-8 shadow-3" icon="search_off">Clear Filter</q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-section>
    <q-inner-loading :showing="isLoading">
      <q-spinner-grid size="200px" color="pink" />
    </q-inner-loading>
  </q-card>
</template>

<script>
export default {
  name: "TableTransactions.vue",
  data() {
    return {
      dateFilter: false,
      fromDate: null,
      toDate: null,
      data: [],
      transactions: {},
      createLoading: false,
      isLoading: false,
      filter: '',
      show_filter: true,
      columns: [
        {name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {name: 'patient_name', label: 'Patient', field: 'patient', align: 'left'},
        {name: 'transaction_code', label: 'Transaction Code #', field: 'transaction_code', align: 'left'},
        {name: 'total_amount', label: 'Total Amount', field: 'total_amount', align: 'left', sortable: true},
        {name: 'payment_method', label: 'Payment Method', field: 'payment_method', align: 'left', sortable: true},
        {name: 'remarks', label: 'Remarks', field: 'remarks', align: 'left', sortable: true},
        {name: 'created_at', label: 'Date Created', field: 'created_at', align: 'left', sortable: true},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      error: false,
      errorMessages: []
    }
  },
  created() {
    this.getTransactions()
  },
  computed: {
    transactionsComputed: function() {
      return this.$store.state.transactions.transactions
    }
  },
  methods: {
    openPatientProcedure (transaction) {
      this.$router.push({ name: 'patient-visit',  params: { patient_visit_id: transaction.patient_visit_id }})
    },
    openDialog (transaction) {

    },
    exportXlsx () {
      let dateRange = {
        fromDate : this.fromDate,
        toDate: this.toDate,
      }

      if (this.fromDate && this.toDate) {
        window.location.href = process.env.API_URL + "api/" + "transactions/export?from=" + this.fromDate + "&to=" + this.toDate
      } else {
        window.location.href = process.env.API_URL + 'api/' + "transactions/export"
      }
    },
    getAll () {
      this.getTransactions()
      this.fromDate = null;
      this.toDate = null;
      this.dateFilter = false
    },
    generateTransactionsByDate() {
      let dateRange = {
        fromDate : this.fromDate,
        toDate: this.toDate,
      }

      this.getTransactions(dateRange)
      this.dateFilter = false
    },
    getTransactions (dateRange) {
      this.isLoading = true;
      this.$store.dispatch("transactions/list", dateRange).then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.data = response.data;
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
