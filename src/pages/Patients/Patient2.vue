<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-card-section>
            <div class="text-h4 text-hotpink">Patient ID: #{{patient.id }}</div>
            <q-separator />
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <PatientProfileCard :patient="patient" :is-loading="isLoading"></PatientProfileCard>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn @click="updatePatient()" color="blue" label="Update" v-if="hasInfoUpdate === true"  class="q-ml-sm" />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-card-section class="text-center bg-transparent">
            <q-avatar rounded  size="300px" class="shadow-10">
              <img :src="patient.profile">
            </q-avatar>
            <div class="text-h6 q-mt-md">{{ patient.name }}</div>
            <div class="text-h7 q-mt-md">{{ patient.age }} years old</div>
            <div class="text-h8 q-mt-md">First admission on {{ patient.created_at }}</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn
              color="blue"
              @click.native="uploadImageModal=true"
              class="q-ml-sm"
              label="Upload Patient Picture"/>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
        </q-card>
      </div>
    </div>
    <div class="q-col-gutter-lg-lg">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="history" label="Logs" />
        </q-tabs>

        <q-separator />
        <q-dialog v-model="uploadImageModal" transition-show="scale">
          <q-uploader
            :disable="isLoading"
            style="height: 40%; width: 30%; object-fit: contain"
            label="Restricted to images"
            :factory="uploadImage"
            accept=".jpg, image/*"
            @rejected="onRejected"
          />
        </q-dialog>
        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="history">
            <div class="text-h6">Patient Visits</div>
            <patient-visits :patient-visits="patientVisits" :is-loading="isPatientVisitLoading"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
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
    </div>
  </q-page>
</template>

<script>
import { Quasar } from 'quasar'
import { Notify } from 'quasar'

export default {
  setup () {
    const $q = Quasar

    function onRejected (rejectedEntries) {
      $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    }

    return { onRejected }
  },
  name: "Patient",
  components: {
    PatientVisits: () => import('./components/PatientVisits'),
    PatientProfileCard: () => import('../../components/Paitient/PatientProfileCard')
  },
  data() {
    return {
      errorMessages : [],
      isLoading : false,
      isPatientVisitLoading: false,
      genders: ['Male', 'Female', 'Others'],
      patient : {
        loaded : false
      },
      patientVisits: [],
      patientError : false,
      originalDataPatient : null,
      profilePicture: null,
      step: 1,
      tab: 'history',
      hasInfoUpdate: false,
      uploadImageModal: false,
      apiFileURL: null
    }
  },
  created() {
    this.apiFileURL = process.env.API_URL ?? `https://phplaravel-705740-2336961.cloudwaysapps.com/`;
    const patientCode = this.$route.params.patient_code
    this.fetchPatient(patientCode);
    this.fetchPatientVisits(patientCode);
  },
  computed: {
  },
  watch: {
    'patient' : {
      handler: function (newValue) {
        if (newValue !== undefined) {
          let combinedObject = { ...this.originalDataPatient, ...newValue }

          let diff = Object.entries(combinedObject).reduce((acc, [key, value]) => {
            if (
              this.patient.loaded === true &&
              (
                !Object.values(newValue).includes(value) ||
                !Object.values(this.originalDataPatient).includes(value)
              )
            ) {
              acc[key] = value
            }
            return acc
          }, {})

          this.hasInfoUpdate = JSON.stringify(diff) !== JSON.stringify({});
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    backToPatients () {
      this.$router.push({ name: 'patients'})
    },
    onRejected (rejectedEntries) {
      Quasar.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    proceed () {
      if (this.step !== 3) {
        this.$refs.stepper.next()
      } else {
        this.isLoading = true
        this.errorMessages = [];
        this.$store.dispatch("patients/add", this.user_details).then(
          response => {
            this.isLoading = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status > 200) {
              this.processError(response.data)
              this.step = 1;
              this.patient = this.originalDataPatient;
            } else {
              this.hasInfoUpdate = false;
            }
          })
      }
    },
    updatePatient () {
      this.isLoading = true
      this.errorMessages = [];
      this.$store.dispatch("patients/update", this.patient).then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status > 200) {
            this.processError(response.data)
            this.step = 1;
          } else {
            this.initiatePatient(response.data)
            this.cancel()
          }
        })
    },
    fetchPatientVisits (patientCode) {
      this.isPatientVisitLoading = true;

      this.$store.dispatch("patients/patientVisitsByPatient", patientCode).then(
        response => {
          this.isPatientVisitLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status === 404) {
            this.backToPatients()
          }
          else {
            if (response.data !== null) {
              this.patientVisits = response.data;
            }
          }
        })
    },
    fetchPatient (patientCode) {
      this.isLoading = true;

      this.$store.dispatch("patients/patientInfo", patientCode).then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status === 404) {
            this.backToPatients()
          }
          else {
            if (response.data !== null) {
              this.initiatePatient(response.data)
            }
          }
        })
    },
    initiatePatient (data) {
      this.patient = data

      this.patient.loaded = true;

      if (this.patient.profile_picture === null || this.patient.profile_picture === '') {
        this.patient.profile = 'https://www.pngitem.com/pimgs/m/111-1114675_user-login-person-man-enter-person-login-icon.png';
      } else {
        this.patient.profile = this.apiFileURL + this.patient.profile_picture;
      }

      this.originalDataPatient = JSON.parse(JSON.stringify(this.patient));
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
    uploadImage (files) {
      const patientCode = this.$route.params.patient_code

      this.isLoading = true;

      const fd = new FormData()
      fd.append('image', files[0]);
      fd.append('patient_code', patientCode);

      this.$store.dispatch("patients/updateImage", fd).then(
        response => {
          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
            this.isLoading = false;

          } else if (response.status > 200) {
            this.isLoading = false;

            this.processError(response.data)
            this.step = 1;
          } else {
            this.isLoading = false;

            this.initiatePatient(response.data)
            this.uploadImageModal = false;
          }
        })
    }
  }
}
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}

.portrait {
  height: 80px;
  width: 30px;
}

.landscape {
  height: 30px;
  width: 80px;
}
.text-hotpink {
  color: hotpink;
}

.custom_selected {
}

.custom_selected .q-field__native {
  color: deeppink!important;
}

</style>
