<template>
  <q-page class="q-pa-sm">
  <div class="q-pa-md">
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
        <q-tab name="info" label="Personal Information" />
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
        <q-tab-panel name="info">
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            animated
          >
            <q-step
              :name="1"
              title="Patient Information"
              icon="settings"
              :done="step > 1"
            >
              <div class="q-gutter-md row items-start">
                <q-img
                  style="height: 25%; width: 30%; object-fit: contain"
                  :src="patient.profile"/>
              </div>
              <div class="q-gutter-md row items-start" style="padding-top: 3%; padding-left: 20px">
                <q-btn
                  color="primary"
                  @click.native="uploadImageModal=true"
                  style="height: 56px; width: 120px"
                  label="Upload"/>
              </div>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    filled
                    v-model="patient.name"
                    label="Your name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="patient.email"
                    label="Your email *"
                    hint="Example: johndoe@gmail.com"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <div class="row">
                    <div class="block" style="margin-right: 9%; width: 30%">
                      <q-select v-model="patient.gender" :options="genders" label="Gender *" />
                    </div>
                    <div class="block" style="margin-right: 9%; width: 30%">
                      <q-input filled v-model="patient.birth_date" mask="date" :rules="['date']"   label="Birthdate *">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="patient.birth_date">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <q-input
                    filled
                    v-model="patient.civil_status"
                    label="Civil Status *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="patient.phone_number"
                    label="Phone Number *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="patient.mobile_number"
                    label="Mobile Number *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-form>
              </q-card-section>
            </q-step>

            <q-step
              :name="2"
              title="Patient Address"
              icon="home"
              :done="step > 2"
            >
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    filled
                    v-model="patient.street_address"
                    label="Street Address *"
                    hint="#14 unit 421 Tiny Street"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="patient.barangay"
                    label="Barangay *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="patient.city"
                    label="City *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="patient.province"
                    label="Province *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-form>
              </q-card-section>
            </q-step>
            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn @click="proceed()" color="primary" label="Next" v-if="step === 1"/>
                <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                <q-btn @click="updatePatient()" color="blue" label="Update" v-if="hasInfoUpdate === true"  class="q-ml-sm" />
                <q-btn style="float: right"  color="red" label="Back to Patients" @click="backToPatients()"/>

              </q-stepper-navigation>
            </template>
          </q-stepper>
          <q-inner-loading :showing="isLoading">
            <q-spinner-grid size="200px" color="pink" />
          </q-inner-loading>

        </q-tab-panel>

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
    PatientVisits: () => import('./components/PatientVisits')
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
      tab: 'info',
      hasInfoUpdate: false,
      uploadImageModal: false
    }
  },
  created() {
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
        this.patient.profile = 'http://localhost/' + this.patient.profile_picture;
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

<style scoped>
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

.square {
  height: 75px;
  width: 75px;
}
</style>
