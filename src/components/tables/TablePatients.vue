<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Patient List
        <q-btn label="Admit Patient" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person_add" @click="patientView=true"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="patientsComputed"
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
            <q-btn icon="edit" size="sm" flat dense @click="openPatientView(props.row)"/>
          </q-td>
        </template>
      </q-table>
      <q-linear-progress query size="10px"  color="blue" v-if="isLoading"/>
    </q-card-section>
    <q-dialog v-model="patientView" persistent>
      <q-card style="width: 1000px; max-width: 100vw; height: 800px; max-height: 100vw;">
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
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="user_details.name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                v-model="user_details.email"
                label="Your email *"
                hint="Example: johndoe@gmail.com"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <div class="row">
                <div class="block" style="margin-right: 9%; width: 30%">
                  <q-select v-model="user_details.gender" :options="genders" label="Gender *" />
                </div>
                <div class="block" style="margin-right: 9%; width: 30%">
                  <q-input filled v-model="user_details.birth_date" mask="date" :rules="['date']"   label="Birthdate *">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="user_details.birth_date">
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
                v-model="user_details.civil_status"
                label="Civil Status *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                v-model="user_details.phone_number"
                label="Phone Number *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                v-model="user_details.mobile_number"
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
                  v-model="user_details.street_address"
                  label="Street Address *"
                  hint="#14 unit 421 Tiny Street"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.barangay"
                  label="Barangay *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.city"
                  label="City *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.province"
                  label="Province *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </q-form>
            </q-card-section>
          </q-step>

          <q-step
            :name="3"
            title="Patient Initial Checkup"
            icon="fact_check"
            :done="step > 3"
          >
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  filled
                  v-model="user_details.attending_doctor"
                  label="Attending Doctor *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.patient_bp"
                  label="Patient BP *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.patient_height"
                  label="Height *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.patient_weight"
                  label="Weight *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="user_details.remarks"
                  label="Remarks *"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </q-form>
            </q-card-section>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn @click="proceed()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" />
              <q-btn @click="cancel()" color="secondary" :label="'Cancel'" class="q-ml-sm"/>
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <q-inner-loading :showing="createPatientLoading">
          <q-spinner-grid size="200px" color="pink" />
        </q-inner-loading>

      </q-card>
    </q-dialog>
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
</template>

<script>
export default {
  name: "TablePatients",
  data() {
    return {
      data: [],
      user_details: {
        birth_date: '1990/01/01'
      },
      profilePicture : null,
      patientView: false,
      patientError: false,
      createPatientLoading: false,
      isLoading: false,
      filter: '',
      genders: ['Male', 'Female', 'Others'],
      show_filter: false,
      step: 1,
      columns: [
        {name: 'patient_code', label: 'ID', field: 'id', sortable: true, align: 'left'},
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {name: 'email', label: 'Email', field: 'email', align: 'left'},
        {name: 'gender', label: 'Gender', field: 'gender', align: 'left'},
        {name: 'age', label: 'Age', field: 'age', align: 'left'},
        {name: 'created_at', label: 'Date Created', field: 'created_at', align: 'left'},
        {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
      ],
      errorMessages : []
    }
  },
  created() {
      this.getPatients();
  },
  computed: {
    patientsComputed: function() {
      return this.$store.state.patients.patients
    }
  },
  methods: {
    cancel () {
      this.user_details = {};
      this.step = 1;
      this.patientView = false;
    },
    proceed () {
        if (this.step !== 3) {
          this.$refs.stepper.next()
        } else {
          this.createPatientLoading = true
          this.errorMessages = [];
          this.$store.dispatch("patients/add", this.user_details).then(
            response => {
              this.createPatientLoading = false;

              if (response.status === 401) {
                this.$router.push("/UsersAdmin");
              } else if (response.status > 200) {
                this.processError(response.data)
                this.step = 1;
              } else {
                this.cancel()
              }
            })
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
    getPatients () {
      this.isLoading = true;
      this.$store.dispatch("patients/list").then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.data = response.data;
          }
        })
    },
    openPatientView (patient) {
      this.$router.push({ name: 'patient', params: { patient_code: patient.id } })
    },
    uploadImage () {

    }
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
