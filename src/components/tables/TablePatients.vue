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
        :data="data"
        :columns="columns"
        row-key="name"
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
            <q-btn icon="edit" size="sm" flat dense @click="patientView"/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template>
      </q-table>
      <q-linear-progress query size="10px"  color="blue" v-if="isLoading"/>
    </q-card-section>
    <q-dialog v-model="patientView">
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
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
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
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
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
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
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
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <q-inner-loading :showing="createPatientLoading">
          <q-spinner-gears size="200px" color="primary" />
        </q-inner-loading>

      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  name: "TableBasic",
  data() {
    return {
      data: [],
      user_details: {
        birthdate: '1990/01/01'
      },
      patientView: false,
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
      ]
    }
  },
  created() {
    this.getPatients();
  },
  methods: {
    proceed () {
        if (this.step !== 3) {
          this.$refs.stepper.next()
        } else {
          this.createPatientLoading = true
          this.$store.dispatch("patients/add", this.user_details).then(
            response => {
              this.createPatientLoading = false;

              if (response.status === 401) {
                this.$router.push("/UsersAdmin");
              } else {
                this.user_details = {};
                this.step = 1;
                this.patientView = false;
                this.getPatients();
              }
            })
        }
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
