<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Procedure List
        <q-btn label="Create Procedure" class="float-right text-capitalize text-indigo-8 shadow-3" icon="add" @click="procedureForm=true"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="computedProcedures"
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
<!--            <q-btn icon="edit" size="sm" flat dense @click="procedureForm"/>-->
<!--            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>-->
          </q-td>
        </template>
      </q-table>
      <q-linear-progress query size="10px"  color="blue" v-if="isLoading"/>
    </q-card-section>
    <q-dialog v-model="procedureForm">
      <q-card style="width: 500px; max-width: 100vw; height: 500px; max-height: 100vw;">
        <q-card-section>
          <h5> Create Procedure</h5>
          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="procedure.name"
              label="Procedure Name*"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="procedure.description"
              label="Description *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="procedure.price"
              label="Price *"
              lazy-rules
              type="number"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <div class="row">
              <div class="block" style="margin-right: 9%; width: 100%">
                <q-select
                  v-model="procedure.selected_category"
                  :options="computedCategories"
                  label="Category *"
                  option-label="name"
                  />
              </div>
            </div>
            <div>
              <q-btn label="Submit" color="primary" @click="createProcedure()"/>
              <q-btn label="Cancel" color="primary" flat class="q-ml-sm"  @click="procedureForm = false"/>
            </div>
          </q-form>
        </q-card-section>
        <q-inner-loading :showing="createLoading">
          <q-spinner-gears size="200px" color="primary" />
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
  </q-card>
</template>

<script>
export default {
  name: "TableProcedures",
  data() {
    return {
      data: [],
      procedure: {
        selected_category: null
      },
      procedureForm: false,
      createLoading: false,
      error: false,
      errorMessages: [],
      isLoading: false,
      filter: '',
      show_filter: false,
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
        {name: 'category', label: 'Category', field: 'category_name', align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ]
    }
  },
  created() {
    this.getProcedures();
  },
  computed: {
    computedProcedures: function() {
      return this.$store.state.procedures.procedures.map(procedure => {
        let category = this.computedCategories.find(category => category.id === procedure.category_procedure_id);

        if (category !== undefined) {
          procedure.category_name = category.name;
        }

        return procedure
      }) ?? [];
    },
    computedCategories: function() {
      return this.$store.state.categoryProcedures.categoryProcedures ?? [];
    }
  },
  methods: {
    createProcedure () {
      this.createLoading = true

      this.procedure.category_procedure_id = this.procedure.selected_category.id;

      this.$store.dispatch("procedures/add", this.procedure).then(
        response => {
          this.createLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status > 200) {
            this.processError(response.data)
          } else {
            this.category = {};
            this.procedureForm = false;
          }
        })
    },
    getProcedures () {
      if (this.computedProcedures.length === 0) {
        this.isLoading = true;

        this.$store.dispatch("procedures/list").then(
          response => {
            this.isLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else {

            }
          })
      }

      if (this.computedCategories.length === 0) {
        this.isLoading = true;

        this.$store.dispatch("categoryProcedures/list").then(
          response => {
            this.isLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else {

            }
          })
      }
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
