<template>
  <q-page>
    <q-card>
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step
          color="green"
          :name="1"
          title="Patient Information"
          icon="settings"
          :done="step > 1"
        >
          <div class="text-h6 text-grey-8">
            Patient Details
          </div>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.email"
                label="Your email *"
                hint="Example: johndoe@gmail.com"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <div class="row">
                <div class="block" style="margin-right: 9%; width: 30%">
                  <q-select
                    :disable="patientInfoDisabled"
                    v-model="user_details.gender"
                    :options="genders"
                    label="Gender *" />
                </div>
                <div class="block" style="margin-right: 9%; width: 30%">
                  <q-input :disable="patientInfoDisabled" filled v-model="user_details.birth_date" mask="date" :rules="['date']"   label="Birthdate *">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="user_details.birth_date" :disable="patientInfoDisabled">
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
                :disable="patientInfoDisabled"
                v-model="user_details.civil_status"
                label="Civil Status *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.phone_number"
                label="Phone Number *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.mobile_number"
                label="Mobile Number *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-form>
          </q-card-section>
        </q-step>

        <q-step
          color="blue"
          :name="2"
          title="Patient Address"
          icon="home"
          :done="step > 2"
        >
          <div class="text-h6 text-grey-8">
            Patient Address
          </div>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.street_address"
                label="Street Address *"
                hint="#14 unit 421 Tiny Street"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.barangay"
                label="Barangay *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.city"
                label="City *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientInfoDisabled"
                v-model="user_details.province"
                label="Province *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-form>
          </q-card-section>
        </q-step>

        <q-step
          color="yellow"
          :name="3"
          title="Patient Initial Visit Checkup"
          icon="fact_check"
          :done="step > 3"
        >
          <div class="text-h6 text-grey-8">
            Patient Visit Logs
          </div>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.attending_doctor"
                label="Attending Doctor *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.patient_bp"
                label="Patient BP *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.patient_height"
                label="Height *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.patient_weight"
                label="Weight *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                :disable="patientVisitInfoDisabled"
                v-model="user_details.remarks"
                label="Remarks *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
            </q-form>
          </q-card-section>
        </q-step>

<!--        <q-step-->
<!--          color="blue"-->
<!--          :name="4"-->
<!--          title="Upload Files"-->
<!--          icon="file_upload"-->
<!--          :done="step > 4"-->
<!--        >-->
<!--          <div class="text-h6 text-grey-8">-->
<!--            Uploaded Files-->
<!--          </div>-->
<!--          <q-card-section>-->
<!--            <q-form class="q-gutter-md">-->

<!--            </q-form>-->
<!--          </q-card-section>-->
<!--        </q-step>-->

<!--        <q-step-->
<!--          color="red"-->
<!--          :name="5"-->
<!--          title="Procedures"-->
<!--          icon="fact_check"-->
<!--          :done="step > 4"-->
<!--        >-->
<!--          <div class="text-h6 text-grey-8">-->
<!--            Procedures-->
<!--          </div>-->
<!--          <q-card-section>-->
<!--            <q-form class="q-gutter-md">-->

<!--            </q-form>-->
<!--          </q-card-section>-->
<!--        </q-step>-->
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="proceed()" color="primary" :label="step === 3 ? 'Admit Patient' : 'Continue'" />
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            <q-btn style="float: right" @click="$router.push('/')" flat color="red" label="Back to Homepage" class="q-ml-sm"/>
          </q-stepper-navigation>
        </template>
      </q-stepper>
      <q-inner-loading :showing="isLoading">
        <q-spinner-gears size="200px" color="primary" />
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
        <q-card class="bg-blue-4 text-white" style="width: 600px">
          <q-card-section>
            <div class="text-h6">
              Patient information being creating . . .</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div>
              <q-spinner-gears
                color="primary"
                size="5em"
              />
              <q-tooltip :offset="[0, 8]">Processing</q-tooltip>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "AdmitPatient",
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
      step : 1,
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
