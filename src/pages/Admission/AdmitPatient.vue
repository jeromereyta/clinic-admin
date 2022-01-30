<template>
  <q-page>
    <q-card>
      <PatientProfileCard v-if="!patientInfoDisabled" :patient="user_details" :is-loading="isLoading"></PatientProfileCard>
      <q-separator />
      <div class="text-h6 text-grey-8">
        Patient Visit Logs
      </div>

      <q-card-section>
        <q-list class="row" v-if="patientInfoDisabled">
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                disable
                filled
                v-model="user_details.id"
                label="Patient ID"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                disable
                filled
                v-model="user_details.name"
                label="Patient Name"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="row">

          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.attending_doctor"
                label="Attending Doctor *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.patient_bp"
                label="Patient BP *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.patient_height"
                label="Height *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.patient_weight"
                label="Weight *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.remarks"
                label="Remarks *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
          <q-btn style="float: right; margin-right: 10px;" @click="proceed()" color="blue" label="Admit Patient" class="q-ml-sm" />
          <q-btn style="float: left" @click="$router.push('/')" flat color="red" label="Back to Homepage" class="q-ml-sm"/>
      </q-card-actions>
      <q-inner-loading :showing="isLoading">
        <q-spinner-grid size="200px" color="pink" />
      </q-inner-loading>
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
      <q-dialog v-model="patientSuccess" transition-show="scale">
        <q-card class="bg-green-4 text-white" style="width: 400px">
          <q-card-section>
            <div class="text-h6">
              Patient information created</div>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog persistent  v-model="patientCreating" transition-show="scale"  transition-hide="scale">
        <q-card class="bg-white text-pink-4" style="width: 600px">
          <q-card-section>
            <div class="text-h6">
              Patient information being creating
            </div>
            <q-spinner-grid
              color="pink"
              size="7em"
            />
            <q-tooltip :offset="[0, 8]">Processing</q-tooltip>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "AdmitPatient",
  components : {
    PatientProfileCard: () => import('../../components/Paitient/PatientProfileCard'),
  },
  data () {
    return {
      errorMessages : [],
      genders: ['Male', 'Female', 'Others'],
      isLoading: false,
      patientCreating: false,
      patientError : false,
      patientInfoDisabled : false,
      patientSuccess : false,
      patientVisitInfoDisabled: false,
      patient_visit : {},
      selectedPatient : null,
      step : 3,
      user_details : {
        birth_date : '1990/01/01'
      },
    }
  },
  created () {
    if (this.patientCode !== null && this.patientCode !== '') {
      this.patientInfoDisabled = true;
      this.fetchPatient(this.patientCode);
    }
  },
  computed : {
    patientCode: function () {
      return this.$route.query.patientCode ?? null;
    }
  },
  methods : {
    createPatientOrVisit () {
      if (this.patientCode === null) {
        this.createPatientWithVisit();
      } else {
        this.createPatientVisit();
      }
    },
    createPatientWithVisit () {
      this.patientCreating = true
      this.errorMessages = [];
      this.$store.dispatch("patients/add", this.user_details).then(
        response => {
          this.patientCreating = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status > 200) {
            this.processError(response.data)
            this.step = 1;
          } else {
            this.$router.push({ name: 'patient-visit',  params: { patient_visit_id: response.data.patient_visit.id }})
          }
        })
    },
    createPatientVisit () {
      let patientVisitId = this.patient_visit.id ?? null;

      if (patientVisitId === null) {
        this.patientCreating = true;

        let patientVisit = {
          patient_code : this.patientCode,
          attending_doctor : this.user_details.attending_doctor,
          patient_bp : this.user_details.patient_bp,
          patient_height : this.user_details.patient_height,
          patient_weight : this.user_details.patient_weight,
          remarks : this.user_details.remarks,
        };

        this.errorMessages = [];
        this.$store.dispatch("patients/addPatientVisit", patientVisit).then(
          response => {
            this.patientCreating = false;

            if (response.status === 401) {
              this.$router.push("/UsersAdmin");
            } else if (response.status > 201) {
              this.processError(response.data)
            } else {
              this.$router.push({ name: 'patient-visit',  params: { patient_visit_id: response.data.id }})
            }
          })
      }
    },
    fetchPatient (patientCode) {
      this.isLoading = true;

      this.$store.dispatch("patients/patientInfo", patientCode).then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status === 404) {

          }
          else {
            if (response.data !== null) {
              this.user_details = response.data;
            }
          }
        })
    },
    proceed () {
      if (this.step === 3) {
        let patientVisitId = this.patient_visit.id ?? null;

        if (patientVisitId === null) {
          this.createPatientOrVisit()
        } else {
          this.$refs.stepper.next()
        }
      }
      else if (this.step !== 5) {
        this.$refs.stepper.next()
      }

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
  }
}
</script>

<style scoped>

</style>
