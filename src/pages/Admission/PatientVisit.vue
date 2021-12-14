<template>
  <q-page class="q-pa-sm" >
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-7 col-sm-12 col-xs-12">
        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Patient Information and Visit Logs"
            icon="shopping_cart"
            :done="step > 1"
            :header-nav="step > 1"
          >
            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-input disable dense outlined class="full-width" v-model="patient.patient_name" label="Patient Name *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input disable dense outlined class="full-width" v-model="patient.attending_doctor" label="Attending Doctor *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input disable dense outlined class="full-width" v-model="patient.patient_height" label="Patient Height*"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input disable dense outlined class="full-width" v-model="patient.patient_weight" label="Patient Weight *"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input disable dense autogrow outlined v-model="patient.patient_bp" class="full-width"
                           label="Patient Blood Pressure*"/>
                </q-item>
              </div>
              <div class="col-6">
                <q-item>
                  <q-input disable dense autogrow outlined v-model="patient.remarks" class="full-width"
                           label="Remarks / Description *"/>
                </q-item>
              </div>
            </div>

            <q-stepper-navigation>
              <q-btn rounded @click="() => { done1 = true; step = 2 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
              <q-btn style="float: left" @click="$router.push('/')" flat color="red" label="Back to Homepage" class="q-ml-sm"/>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="Upload Files"
            icon="file"
            :done="step > 2"
            :header-nav="step > 2"
          >
            <q-card-section>
              <table-file-uploads :files-data="files"/>
            </q-card-section>
            <q-stepper-navigation>
              <q-btn style="float: left" label="Add File" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person_add" @click="openUploadModal()"/>
              <q-btn rounded @click="() => { done2 = true; step = 3 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
              <q-btn flat @click="step = 1" color="primary" rounded label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            title="Procedures"
            icon="file"
            :done="step > 3"
            :header-nav="step > 3"
          >
              <q-card-section>
                <table-patient-procedures :procedures="procedures" ></table-patient-procedures>
              </q-card-section>
            <q-stepper-navigation>
              <q-btn style="float: left" label="Add Procedures" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person_add" @click="openProcedureModal()"/>
              <q-btn rounded @click="() => { done2 = true; step = 4 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
              <q-btn flat @click="step = 2" color="primary" rounded label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="4"
            title="Review your Procedures"
            icon="shopping_cart"
            :header-nav="step > 4"
          >
            <q-card class="rounded-borders">
              <div class="row">
              <div class="col-12">
                <q-item-label header class="text-h6">Services summary</q-item-label>
                <div v-for="(item, index) in procedures" v-bind:key="item.id">
                  <q-item class="full-width">
                    <q-item-section>
                      <q-item-label lines="1">{{item.name}}</q-item-label>
                      <q-item-label caption>{{item.description}}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <span>&#8369;
                        {{item.price}}
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset></q-separator>
                </div>
              </div>
            </div>
            <q-separator />
            <q-card-section horizontal>
                <q-card-section class="col-7 q-pt-xs">
                  <q-item-label header class="text-h6">Payment Summary</q-item-label>

                  <div class="row">
                    <div class="col-3">
                      <q-item>
                        <div class="text-subtitle1" style="max-width: 200px;">Payment Method: </div>
                      </q-item>
                    </div>
                    <div class="col-6">
                      <q-item>
                        <q-input dense outlined class="full-width" v-model="order.payment_method" label="Eg. Cash, Gcash, Card"/>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      <q-item>
                        <div class="text-subtitle1" style="max-width: 200px;">Remarks: </div>
                      </q-item>
                    </div>
                    <div class="col-6">
                      <q-item>
                        <q-input dense outlined class="full-width" v-model="order.remarks" label=""/>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      <q-item>
                        <div class="text-subtitle1" style="max-width: 200px;">Total Amount: </div>
                      </q-item>
                    </div>
                    <div class="col-6">
                      <q-item>
                        <span>&#8369;</span> {{procedureAmount}}
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3">
                      <q-item>
                        <div class="text-subtitle1" style="max-width: 200px;">Payment Date: </div>
                      </q-item>
                    </div>
                    <div class="col-6">
                      <q-item>{{dateToday}}</q-item>
                    </div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>


            <q-stepper-navigation>
              <q-btn style="float: left" @click="$router.push('/')" flat color="red" label="Back to Homepage" class="q-ml-sm"/>
              <q-btn rounded @click="done3 = true" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Place Order"/>
              <q-btn flat @click="step = 3" color="primary" rounded label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="200px" color="primary" />
    </q-inner-loading>
    <q-dialog v-model="uploadFileModal" transition-show="scale">
      <q-card class="my-card">
        <q-card-section style="margin-top: 10px">
          <div class="text-subtitle1">
            Upload File
          </div>
          <div class="text-caption text-grey">
            Schedule for checkup, laboratory and etc.
          </div>
          <q-select
            filled
            v-model="fileType"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="fileTypes"
            option-label="name"
            :loading="loadingFileTypes"
            hint="Select File Type"
            style="margin-top:30px; width: 400px; padding-bottom: 32px"
          >
            <template v-slot:append>
              <q-icon  v-if="fileType!==null" v name="cancel" @click.stop="fileType = null" class="cursor-pointer" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-file v-if="fileType !== null" filled bottom-slots v-model="file" label="Upload File" counter max-files="12" style="margin-top:30px;">
            <template v-slot:append>
              <q-icon v-if="file !== null" name="close" @click.stop="file = null" class="cursor-pointer" />
            </template>

            <template v-slot:hint>
              Field hint
            </template>
          </q-file>
          <q-input v-if="file!==null" dense autogrow outlined v-model="description" class="full-width" style="margin-top:30px;"
                   label="Description *"/>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-if="file !== null" v-close-popup flat color="primary" label="Upload the File" icon="folder_open" @click="uploadFile()"/>
        </q-card-actions>
        <q-dialog v-model="patientError" transition-show="scale">
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
    </q-dialog>
    <q-dialog v-model="procedureModal" transition-show="scale">
        <q-card style="max-width: 450px; max-height: 650px;">
          <q-card-section style="margin-top: 10px">
            <div class="text-subtitle1">
              Add Procedure
            </div>
            <div class="text-caption text-grey">
              Schedule for checkup, laboratory and etc.
            </div>
          </q-card-section>
          <q-card-section>
              <q-select
                label="Select Procedures"
                filled
                v-model="selectedProcedure"
                use-input
                clearable
                input-debounce="0"
                :options="proceduresOptionsComputed"
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
              disable
              v-model="totalPrice"
              label="Price"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              v-model="description"
              label="Note"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn style="float: left" @click="submitPatientProcedure()" flat color="blue" label="Submit" class="q-ml-sm"/>
            <q-btn style="float: left" @click="procedureModal=false" flat color="red" label="Cancel" class="q-ml-sm"/>
          </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: "PatientVisit",
  components: {
    TableFileUploads: () => import('../Patients/components/TableFileUploads'),
    TablePatientProcedures: () => import('./components/TablePatientProcedures'),
  },
  data () {
    return {
      order : {
        payment_method : null,
        remarks : null,
      },
      dateToday : date.formatDate(Date.now(), 'dddd, MMMM DD, YYYY'),
      createPatientLoading : false,
      loadingFileTypes : false,
      fileType : null,
      fileTypes : [],
      filesData : [],
      file: null,
      description : null,
      patient : {
        files : [],
      },
      patientError : false,
      procedureOptions: [],
      errorMessages : [],
      step: 1,
      address_detail: {},
      card_detail: {},
      isLoading : false,
      procedureModal: false,
      selectedProcedure: null,
      totalPrice : 0,
      totalProceduresAmount : 0,
      uploadFileModal : false
    }
  },
  created () {
    this.getPatientVisit();
    this.getFileTypes();
    this.getProcedures();
  },
  watch: {
    selectedProcedure : function () {
      if (this.selectedProcedure === null) {
        this.totalPrice = 0;
      } else {
        this.totalPrice = this.selectedProcedure.price
      }
    }
  },
  computed : {
    files : function () {
      return this.patient.files.map(file => {
        return  {
          file_name : file.name,
          link : 'http://localhost/storage/' + file.path,
          file_type_name: file.file_type.name,
          format : file.format
        };
      })
    },
    procedures : function () {
      return this.patient.procedures;
    },
    proceduresOptionsComputed: function () {
      let procedures = this.$store.state.procedures?.procedures ?? [];

      return procedures.map(procedure => {
        procedure.label = procedure.name;
        procedure.value = procedure.id;
        return procedure;
      });
    },
    procedureAmount: function () {
      let totalAmount = 0;

      if (this.patient.procedures !== undefined) {
        for (let index = 0; index < this.patient.procedures.length ; index++) {
          let procedure = this.patient.procedures[index],
            amount = parseFloat(procedure.price);

          totalAmount = totalAmount + amount;
        }
      }

      return this.formatMoney(totalAmount);
    }
  },
  methods: {
    getPatientVisit () {
      let patientVisitId = this.$route.params.patient_visit_id ?? null;

      if (patientVisitId !== null) {
        this.isLoading = true;

        this.$store.dispatch("patients/patientVisitByID", patientVisitId).then(
          response => {
            this.isLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status >= 404) {
              this.$router.push('/')
            }
            else {
              if (response.data !== null) {
                this.patient = response.data;
              }
            }
          })
      }
    },
    getFileTypes () {
      this.loadingFileTypes = true;

      this.$store.dispatch("fileTypes/list").then(
        response => {
          this.loadingFileTypes = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.fileTypes = response.data;
          }
        })
    },
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        let result = negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");

        return result;

      } catch (e) {
      }
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
    openProcedureModal () {
      this.procedureModal = true;
    },
    openUploadModal () {
      this.uploadFileModal = true;
    },
    processError (errors) {
      for (let key in errors) {
        let errorObject = errors[key]

        for (let index in errorObject) {
          this.errorMessages.push(errorObject[index]);
        }
      }
      this.patientError = true;
    },
    uploadFile () {
      const fd = new FormData()

      fd.append('file', this.file);
      fd.append('patient_visit_id', this.$route.params.patient_visit_id);
      fd.append('file_type_id', this.fileType.id);
      fd.append('description', this.description);

      this.isLoading = true;

      this.$store.dispatch("patients/addPatientVisitFile", fd).then(
        response => {
          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
            this.isLoading = false;

          } else if (response.status > 200) {
            this.isLoading = false;
            this.processError(response.data)
          } else {
            this.description = null;
            this.file = null;
            this.fileType = null;
            this.getPatientVisit()
          }
        })

    },
    submitPatientProcedure () {
      const patientProcedure = {
        patient_visit_id: this.$route.params.patient_visit_id,
        procedure_ids : [
          this.selectedProcedure.id
        ],
        description : this.description
      };

      this.isLoading = true;
      this.errorMessages = [];

      this.$store.dispatch("patients/addPatientProcedure", patientProcedure).then(
        response => {
          this.createPatientLoading = false;
          this.procedureModal = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status > 204) {
            this.isLoading = false;
            this.processError(response.data)
          } else {
            this.isLoading = false;
            this.getPatientVisit()
            this.description = null;
            this.selectedProcedure = null;
          }
        })
    },
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 550px;
  height: 450px;
}

.card-bg {
  background-color: #162b4d;
}
span {
  content: "\20B1";
}
</style>
