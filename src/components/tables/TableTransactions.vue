<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Transactions
        <q-btn label="Create File Type" class="float-right text-capitalize text-indigo-8 shadow-3" icon="add" @click="openDialog('Create')"/>
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
              @click="openPatientProcedure(props.row)"
            />
<!--            <q-btn icon="edit" size="sm" flat dense @click="openDialog(props.row)"/>-->
          </q-td>
        </template>
      </q-table>
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
    getTransactions () {
      this.isLoading = true;
      this.$store.dispatch("transactions/list").then(
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
