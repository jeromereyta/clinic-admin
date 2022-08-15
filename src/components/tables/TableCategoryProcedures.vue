<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Category Procedure List
        <q-btn label="Create Category" class="float-right text-capitalize text-indigo-8 shadow-3" icon="add" @click="openDialog('Create')"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="computedCategories"
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
            <q-btn icon="edit" size="sm" flat dense @click="openDialog('Edit', props.row)"/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="deleteDialog( props.row)"/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="categoryForm">
      <q-card style="width: 500px; max-width: 100vw; height: 500px; max-height: 100vw;">
            <q-card-section>
              <h5> {{categoryMethod}} Category Procedure</h5>
              <q-form class="q-gutter-md">
                <q-input
                  filled
                  v-model="category.name"
                  label="Category Name*"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="category.description"
                  label="Description *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <div class="row">
                  <div class="block" style="margin-right: 9%; width: 30%">
                    <q-select v-model="category.type" :options="types" label="Type *" />
                  </div>
                </div>
                <div>
                  <q-btn :label="categoryMethod ==='Create' ? 'Create' : 'Update'"  color="blue" @click="createCategoryProcedure()"/>
                  <q-btn label="Cancel" color="primary" flat class="q-ml-sm"  @click="categoryForm = false"/>
                </div>
              </q-form>
            </q-card-section>
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
          <span class="q-ml-sm" style="color: hotpink;"> Are you sure you want to delete this category? </span>
        </q-card-section>

        <q-card-actions align="right" style="background-color: ghostwhite">
          <q-btn flat label="Cancel" color="red" v-close-popup @click="deleteForm=false"/>
          <q-btn @click="deleteCategory()" flat label="Delete" color="pink" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="isLoading">
      <q-spinner-grid size="200px" color="pink" />
    </q-inner-loading>
  </q-card>
</template>

<script>
export default {
  name: "TableCategoryProcedures",
  data() {
    return {
      data: [],
      category: {},
      categoryForm: false,
      categoryMethod: null,
      deleteForm: false,
      isLoading: false,
      filter: '',
      types: ['Laboratory', 'Consultation', 'Others'],
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
        {name: 'type', label: 'Type', field: 'type', align: 'left'},
        {name: 'Action', label: 'Action', field: 'Action', sortable: false, align: 'center'}
      ],
      error: false,
      errorMessages: []
    }
  },
  created() {
    this.getCategoryProcedures();
  },
  computed: {
    computedCategories: function() {
      let categories = this.$store.state.categoryProcedures.categoryProcedures ?? [];
      return JSON.parse(JSON.stringify(categories))
    }
  },
  methods: {
    openDialog(method, category = null) {
      this.categoryForm = true;
      this.category = category ?? {};
      this.categoryMethod = method;
    },
    createCategoryProcedure () {
      this.isLoading = true

      if (this.categoryMethod === 'Create') {
        this.$store.dispatch("categoryProcedures/add", this.category).then(
          response => {
            this.isLoading = false;
            this.categoryMethod = null;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status>201) {
              this.processError(response.data)
            }
            else {
              this.category = {};
              this.categoryForm = false;
            }
          })
      } else {
        this.$store.dispatch("categoryProcedures/updateCategoryProcedure", this.category).then(
          response => {
            this.isLoading = false;
            this.categoryMethod = null;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status>201) {
              this.processError(response.data)
            }
            else {
              this.category = {};
              this.categoryForm = false;
              this.getCategoryProcedures();
            }
          })
      }
    },
    deleteDialog (category) {
      this.deleteForm = true;
      this.category = category
    },
    deleteCategory() {
      this.isLoading = true
      this.$store.dispatch("categoryProcedures/deleteCategoryProcedure",this.category).then(
        response => {

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.isLoading = false;

            this.category = {};
            this.getCategoryProcedures();
          }
        })
    },
    getCategoryProcedures () {
      this.isLoading = true;

      this.$store.dispatch("categoryProcedures/list").then(
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
