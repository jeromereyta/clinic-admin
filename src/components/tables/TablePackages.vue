<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Packages
        <q-btn label="Add Package" class="float-right text-capitalize text-indigo-8 shadow-3" icon="add" @click="openDialog()"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="computedPackages"
        :columns="columns"
        row-key="id"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input filled borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense @click="editDialog(props.row)"/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="packageDataForm">
      <q-card style="width: 800px; max-width: 100vw; height: 700px; max-height: 100vw;">
        <q-card-section>
          <h5> {{packageMethod}} Package Details</h5>
          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="packageData.name"
              label="Package Name*"
            />
            <q-input
              filled
              v-model="packageData.description"
              label="Description *"
            />
          </q-form>
          <q-card-section class="q-pa-none" style="margin-top: 15px">
            <q-table
              :data="selectedPackageProcedures"
              :columns="procedureColumns"
              row-key="id"
            >
              <template v-slot:top-right>
                <q-btn label="Add Procedure" class="float-right text-capitalize text-indigo-8 shadow-3" icon="add" @click="procedureModal=true"/>
              </template>
              <template v-slot:body-cell-Action="props">
                <q-td :props="props">
                  <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="removeProcedure( props.row)"/>
                </q-td>
              </template>
            </q-table>
          </q-card-section>

            <div>
              <q-btn label="Submit" color="primary" @click="submitPackage()" class="mr-10 mt-10" style="margin-top: 20px"/>
              <q-btn label="Cancel" color="primary" flat class="q-ml-sm"  @click="closePackageData()" style="margin-top: 20px"/>
            </div>

        </q-card-section>
        <q-inner-loading :showing="createLoading">
          <q-spinner-grid size="200px" color="pink" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <q-dialog v-model="procedureModal" transition-show="scale">
      <q-card style="max-width: 450px; max-height: 650px;">
        <q-card-section style="margin-top: 10px">
          <div class="text-subtitle1">
            Add Procedure
          </div>
        </q-card-section>
        <q-card-section>
          <q-select
            label="Select Procedures"
            filled
            v-model="newProcedure.selectedProcedure"
            use-input
            fill-input
            clearable
            @filter="filterProcedures"
            input-debounce="0"
            :options="procedureSelections"
            option-label="name"
            style="width: 400px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            filled
            v-model="newProcedure.price"
            label="Price"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn style="float: left" @click="addProcedure()" flat color="blue" label="Submit" class="q-ml-sm"/>
          <q-btn style="float: left" @click="procedureModal=false" flat color="red" label="Cancel" class="q-ml-sm"/>
        </q-card-actions>
        <q-inner-loading :showing="isLoading">
          <q-spinner-grid size="200px" color="pink" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <q-dialog v-model="error" transition-show="scale">
      <q-card class="bg-red-4 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <ul>
            <li v-for="message in errorMessages" :key="message">
              {{ message }}
            </li>
          </ul>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteForm">
      <q-card>
        <q-card-section class="row items-center" style="background-color: ghostwhite">
          <q-avatar icon="delete" color=red text-color="white" />
          <span class="q-ml-sm" style="color: hotpink;"> Are you sure you want to delete this package? </span>
        </q-card-section>

        <q-card-actions align="right" style="background-color: ghostwhite">
          <q-btn flat label="Cancel" color="red" v-close-popup @click="deleteForm=false"/>
          <q-btn @click="deleteFileType()" flat label="Delete" color="pink" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="isLoading">
      <q-spinner-grid size="200px" color="pink" />
    </q-inner-loading>
  </q-card>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "TableFileTypes",
  components: {
    TablePatientProcedures: () => import('components/tables/TableProcedures'),
  },
  data() {
    return {
      data: [],
      newProcedure: {

      },
      packageData: {},
      procedureSelections: [],
      procedureModal: false,
      selectedPackageProcedures: [],
      packageMethod: null,
      packageDataForm: false,
      createLoading: false,
      deleteForm: false,
      isLoading: false,
      filter: '',
      types: null,
      selectedProcedure: null,
      show_filter: false,
      procedureColumns: [
        {name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {name: 'price', label: 'Price', field: 'price', align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      columns: [
        {name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {name: 'description', label: 'Description', field: 'description', align: 'left'},
        {name: 'count', label: '# Number of Procedures', field: 'numberOfProcedures', align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      error: false,
      errorMessages: []
    }
  },
  created() {
    this.getPackages();
    this.getProcedures();
  },
  computed: {
    proceduresOptionsComputed: function () {
      let procedures = this.$store.state.procedures?.procedures ?? [];

      return procedures.map(procedure => {
        procedure.label = procedure.name;
        procedure.value = procedure.id;
        return procedure;
      });
    },
    computedPackages: function() {
      let result = this.$store.state.packages.packages ?? [];

      result = result.map(packageData => {
        packageData.numberOfProcedures = packageData.procedures.length;

        return packageData;
      })
      return JSON.parse(JSON.stringify(result));
    }
  },
  methods: {
    filterProcedures (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        if (this.proceduresOptionsComputed.length > 0) {
          this.procedureSelections = this.proceduresOptionsComputed.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    closePackageData () {
      this.packageDataForm = false;
      this.selectedPackageProcedures = [];
      this.packageData = {};
    },
    submitPackage() {
      let data = {
        name: this.packageData.name,
        description: this.packageData.description,
        procedures: this.selectedPackageProcedures,
      };

      if (this.packageData.id !== null) {
        data.id = this.packageData.id;
      }

      this.createLoading = true

      if (this.packageMethod === 'Create') {
        this.$store.dispatch("packages/add", data).then(
          response => {
            this.createLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status>201) {
              this.processError(response.data)
            }
            else {
              this.closePackageData();
              this.getPackages()
            }
          })
      } else {
        this.$store.dispatch("packages/updatePackage", data).then(
          response => {
            this.createLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status>201) {
              this.processError(response.data)
            }
            else {
              this.closePackageData();
              this.getPackages()
            }
          })
      }
    },
    addProcedure () {
      let addedProcedure =  {
        id: this.newProcedure.selectedProcedure.id,
        name: this.newProcedure.selectedProcedure.name,
        price: this.newProcedure.price,
      };

      this.selectedPackageProcedures.push(addedProcedure);
      this.procedureModal = false;
      this.newProcedure = {};
    },
    removeProcedure (procedure) {
      let index = this.selectedPackageProcedures.indexOf(procedure);
      this.selectedPackageProcedures.splice(index,1);
    },
    getProcedures () {
      this.isLoading = true;

      this.$store.dispatch("procedures/list").then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {

          }
        })
    },
    deleteDialog (fileType) {
      this.deleteForm = true;
      this.fileType = fileType
    },
    openDialog() {
      this.packageDataForm = true;
      this.packageMethod = 'Create'
    },
    editDialog(packageData) {
      let rawData = JSON.parse(JSON.stringify(packageData));
      this.packageMethod = 'Edit'
      this.packageDataForm = true;
      this.selectedPackageProcedures = packageData.procedures;
      this.procedureModal = false;
      this.newProcedure = {};
      this.packageData = rawData
    },
    getPackages () {
      this.isLoading = true;

      this.$store.dispatch("packages/list").then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          }
        })
    },
    processError (errors) {
      this.errorMessages = [];

      for (let key in errors) {
        let errorObject = errors[key]

        for (let index in errorObject) {
          this.errorMessages.push(errorObject[index]);
        }
      }

      this.error = true;
    },
  }
}
</script>

<style scoped>

.card-bg {
  background-color: #162b4d;
}
.row {
  width: 100%;
  flex-direction: row;
}
.block {
  width: 100px;
}
.horizontalBlocks {
  display: inline-block;
}
</style>
