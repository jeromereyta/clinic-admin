<template>
  <q-card>
    <q-table
      title=""
      :data="computedProcedures"
      :columns="computedOptions"
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
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn icon="backspace" size="sm" flat dense @click="openDeleteDialog(props.row)"/>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="deleteForm">
      <q-card>
        <q-card-section class="row items-center" style="background-color: ghostwhite">
          <q-avatar icon="delete" color=red text-color="white" />
          <span class="q-ml-sm" style="color: black;"> {{computedMessage}}</span>
        </q-card-section>

        <q-card-actions align="right" style="background-color: ghostwhite">
          <q-btn flat label="Cancel" color="black" v-close-popup @click="deleteForm=false"/>
          <q-btn @click="deleteProcedure" flat label="Delete" color="pink" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import authHeader from "src/services/auth-header";
import {axiosInstance} from "boot/axios";

export default {
  name: "TablePatientProcedures",
  props: {
    procedures: {
      type : Array,
      required: true
    },
    showPackage: {
      type : Boolean,
      default : false,
    }
  },
  computed: {
    computedProcedures: function () {
      return this.procedures
    },
    computedOptions: function () {
      let columns = [
          {name: 'name', label: 'Procedure Name', field: 'name', align: 'left'},
          {name: 'description', label: 'Description', field: 'description', align: 'left'},
          {name: 'patient_procedure_description', label: 'Note', field: 'patient_procedure_description', align: 'left'},
          {name: 'price', label: 'Price', field: 'price', align: 'left'},
        ];

      if (this.showPackage === true) {
        columns.push({
          name: 'package_name', label: 'Package Name', field: 'package_name', align: 'left'
        });

        columns.push({name: 'Action', label: 'Remove', field: 'Action', sortable: false, align: 'center'});
      }

      return columns;
    },
    computedMessage: function () {
      if (this.selectedProcedure.isPackage === true) {
        return "This procedure belongs to a package, removing this means removing the whole package"
      } else {
        return "Are you sure you want to remove this procedure? "
      }
    }
  },
  data() {
    return {
      deleteForm : false,
      selectedProcedure : {
        isPackage : false,
      },
    }
  },
  methods: {
    openDeleteDialog(patientProcedure) {
      this.deleteForm = true;
      this.selectedProcedure = patientProcedure;
      this.selectedProcedure.isPackage = patientProcedure.package_id !== null;
    },
    deleteProcedure () {
      this.$emit('delete-procedure', this.selectedProcedure.patient_procedure_id);
      this.deleteForm = false;
    },
  }
}
</script>

<style scoped>

</style>
