<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        File Types
        <q-btn label="Create File Type" class="float-right text-capitalize text-indigo-8 shadow-3" icon="add" @click="openDialog('Create')"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="computedFileTypes"
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
            <q-btn icon="edit" size="sm" flat dense @click="openDialog('Edit', props.row)"/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="deleteDialog( props.row)"/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog v-model="fileTypeForm">
      <q-card style="width: 500px; max-width: 100vw; height: 500px; max-height: 100vw;">
        <q-card-section>
          <h5> {{fileTypeMethod}} File Type</h5>
          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="fileType.name"
              label="File Type Name*"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="fileType.description"
              label="Description *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="fileType.type"
              label="Type"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <div>
              <q-btn label="Submit" color="primary" @click="createFileType()"/>
              <q-btn label="Cancel" color="primary" flat class="q-ml-sm"  @click="fileTypeForm = false"/>
            </div>
          </q-form>
        </q-card-section>
        <q-inner-loading :showing="createLoading">
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
          <span class="q-ml-sm" style="color: hotpink;"> Are you sure you want to delete this file type? </span>
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
export default {
  name: "TableFileTypes",
  data() {
    return {
      data: [],
      fileType: {},
      fileTypeMethod: null,
      fileTypeForm: false,
      createLoading: false,
      deleteForm: false,
      isLoading: false,
      filter: '',
      types: null,
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
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      error: false,
      errorMessages: []
    }
  },
  created() {
    this.getFileTypes();
  },
  computed: {
    computedFileTypes: function() {
      let result = this.$store.state.fileTypes.fileTypes ?? [];

      return JSON.parse(JSON.stringify(result));
    }
  },
  methods: {
    deleteFileType () {
      this.isLoading = true
      this.$store.dispatch("fileTypes/deleteFileType",this.fileType).then(
        response => {

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.isLoading = false;
            this.getFileTypes();
          }
        })
    },
    deleteDialog (fileType) {
      this.deleteForm = true;
      this.fileType = fileType
    },
    openDialog(method, fileType = {}) {
      this.fileTypeForm = true;

      this.fileType = fileType;

      this.fileTypeMethod = method;
    },
    createFileType () {
      this.createLoading = true

      if (this.fileTypeMethod === 'Create') {
        this.$store.dispatch("fileTypes/add", this.fileType).then(
          response => {
            this.createLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status>201) {
              this.processError(response.data)
            }
            else {
              this.fileTypeForm = false;
            }
          })
      } else {
        this.$store.dispatch("fileTypes/updateFileType", this.fileType).then(
          response => {
            this.createLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status>201) {
              this.processError(response.data)
            }
            else {
              this.fileTypeForm = false;
              this.getFileTypes();
            }
          })
      }

    },
    getFileTypes () {
      this.isLoading = true;

      this.$store.dispatch("fileTypes/list").then(
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
