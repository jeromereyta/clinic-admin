<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
      Patient Admitted Today
      <q-btn label="Admit Patient" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person_add" @click="patientActionSelection=true"/>
    </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        title=""
        :data="patientVisitsComputed"
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
            <q-btn
              icon="event_available"
              size="sm"
              flat
              dense
              @click="openPatientProcedure(props.row)"
            />
          </q-td>
        </template>
      </q-table>
      <q-linear-progress query size="10px"  color="blue" v-if="isLoading"/>
    </q-card-section>
    <q-dialog v-model="patientProcedureView">
      <q-card style="width: 500px; max-width: 100vw; height: 880px; max-height: 100vw;" class="my-card" flat bordered>
        <q-img src="https://www.jotform.com/blog/wp-content/uploads/2020/04/how-to-schedule-patients-90caf9.png" />
        <q-separator />
        <q-card-section horizontal>
          <div class="q-pa-md">
            <q-card-section>
              <h6 v-if="!selectedPatientVisit.has_queue">Set Patient to Procedure for queueing</h6>
              <h6 v-if="selectedPatientVisit.has_queue">This patient already in queue for procedures.
                Create another visit log if you wish to add procedures</h6>
              <q-form class="q-gutter-md">
                <q-input
                  filled
                  disable
                  v-model="selectedPatientVisit.patient_name"
                  label="Patient Name"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  filled
                  disable
                  v-model="selectedPatientVisit.created_at"
                  label="Date and Time Arrived"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-select
                  v-if = "!selectedPatientVisit.has_queue"
                  label="Select Procedures"
                  filled
                  v-model="selectedProcedures"
                  use-input
                  use-chips
                  clearable
                  multiple
                  input-debounce="0"
                  @new-value="createValue"
                  :options="procedureOptions"
                  option-label="name"
                  @filter="filterProcedures"
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
                  label="Estimated total price from procedures"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
              </q-form>
            </q-card-section>
            <q-card-actions >
              <q-btn v-if="!selectedPatientVisit.has_queue" @click="submitPatientProcedure()" color="primary" label="Proceed in Queueing" />
              <q-btn @click="patientProcedureView=false" color="secondary" :label="'Cancel'" class="q-ml-sm"/>
            </q-card-actions>
          </div>
        </q-card-section>
        <q-inner-loading :showing="createPatientLoading">
          <q-spinner-grid size="200px" color="pink" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <q-dialog v-model="patientActionSelection">
      <q-card class="my-card">
        <q-img src="https://st3.depositphotos.com/1001599/18936/v/600/depositphotos_189361234-stock-illustration-doctor-consulting-male-patient-in.jpg" />
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            Admit Patient
          </div>
          <div class="text-caption text-grey">
           Schedule for checkup, laboratory and etc.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup
                 flat color="primary"
                 label="New Patient"
                 icon="person_add"
                 @click="proceedOnAdmission()"
          />
          <q-btn v-close-popup flat color="primary" label="Existing Patient" icon="person_search" @click="openPatientVisitView
          ();"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="patientView" persistent>
      <q-card style="width: 1000px; max-width: 100vw; height: 1000px; max-height: 100vw;">
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
            <q-img
              style="max-height: 50%; width: 50%; height: 50%"
              src="https://www.nicepng.com/png/full/100-1006777_open-doctor-and-patient-cartoon.png" />
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
            <q-img
              style="max-height: 50%; width: 50%; height: 50%"
              src="https://www.nicepng.com/png/full/100-1006777_open-doctor-and-patient-cartoon.png" />
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
            title="Patient Initial Visit Checkup"
            icon="fact_check"
            :done="step > 3"
          >
            <div class="fill">
                <q-img
                  style="max-height: 50%; width: 50%; height: 50%"
                  src="https://214245-649665-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2017/08/doctorscanuse-600x403.jpg" />
              </div>
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
    <q-dialog v-model="patientVisitView" >
      <q-card style="width: 500px; max-width: 100vw; height: 300px; max-height: 100vw;" class="my-card" flat bordered>
          <q-item>
            <q-item-section>
              <q-item-label>Existing Patient</q-item-label>
              <q-item-label caption>
                Create visit log
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        <q-card-section class="col-4">
          <q-select
            filled
            v-model="selectedPatient"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="patientOptions"
            option-label="name"
            @filter="filterPatients"
            :loading="loadingPatients"
            hint="Select Patient"
            style="width: 400px; padding-bottom: 32px"
          >
             <template v-slot:append>
               <q-icon  v-if="selectedPatient!==null" v name="cancel" @click.stop="selectedPatient = null" class="cursor-pointer" />
               <q-icon name="person_search " />
            </template>
              <template v-slot:no-option>
               <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
            </template>
          </q-select>
       </q-card-section>

        <q-card-section horizontal>
            <div class="q-pa-md">
              <q-card-actions style="float: right" >
                <q-btn
                  v-if="selectedPatient!==null"
                  @click="proceedOnAdmission(selectedPatient.patient_code)" color="blue"
                       label="Create Patient Visit Log" />
                <q-btn
                       flat color="primary"
                       @click="patientVisitView=false;patientActionSelection=true;selectedPatient=null"
                       label="Back"
                       class="q-ml-sm" />
              </q-card-actions>
            </div>

          </q-card-section>

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
import {addPatientProcedure} from "src/store/patients/actions";

export default {
  name: "TablePatientVisits",
  components: {
    CardPatientVisit: () =>  import('components/cards/CardPatientVisit'),
  },
  data() {
    return {
      user_details: {
        birth_date: '1990/01/01'
      },
      order : {
        payment_method : null,
        remarks : null,
      },
      patientActionSelection: false,
      patientView: false,
      patientVisitView: false,
      patientProcedureView: false,
      patientVisitModal: {
        height: 1000,
        width: 1000
      },
      selectedProcedures: null,
      selectedPatientVisit: {
        patient_name: null
      },
      totalPrice: 0,
      patientError: false,
      createPatientLoading: false,
      patientOptions: [],
      procedureOptions: [],
      patient_visit: {},
      isLoading: false,
      loadingSearch: false,
      loadingPatients: false,
      filter: '',
      genders: ['Male', 'Female', 'Others'],
      show_filter: false,
      step: 1,
      columns: [
        {name: 'status', label: 'Status', field: 'status', sortable: true, align: 'left'},
        {name: 'patient_code', label: 'Patient ID', field: 'patient_code', sortable: true, align: 'left'},
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.patient_name,
          format: val => `${val}`,
          sortable: true
        },
        {name: 'attending_doctor', label: 'Attending Doctor', field: 'attending_doctor', align: 'left'},
        {name: 'patient_bp', label: 'Patient BP', field: 'patient_bp', align: 'left'},
        {name: 'remarks', label: 'Remarks', field: 'remarks', align: 'left'},
        {name: 'created_at', label: 'Date Created', field: 'created_at', align: 'left'},
        {name: 'Action', label: 'View Log', field: 'Action', sortable: false, align: 'center'}
      ],
      errorMessages : [],
      selectedPatient: null
    }
  },
  created () {
    this.getPatientVisits();
    this.getPatients();
    this.getProcedures();
  },
  computed: {
    patientVisitsComputed: function () {
      return this.$store.state.patients.patientVisits.map(patientVisit => {
        patientVisit.status = patientVisit.has_queue === false ? 'Not paid/ Not yet placed' : 'Paid / In Queue';
        return patientVisit;
      })
    },
    patientsComputed: function () {
      return this.$store.state.patients.patients
    },
    proceduresComputed: function () {
      return this.$store.state.procedures.procedures;
    }
  },
  watch: {
    selectedProcedures: function (newValue, oldValue) {
      let totalAmount = 0;
      for (let index = 0; index < newValue.length ; index++) {
        let procedure = newValue[index],
          amount = parseFloat(procedure.price);

        totalAmount = totalAmount + amount;
      }

      this.totalPrice = this.formatMoney(totalAmount);
    },
  },
  methods: {
    submitPatientProcedure () {
      const patientProcedure = {
        patient_visit_id: this.selectedPatientVisit.id,
        procedure_ids : this.selectedProcedures.map(procedure => procedure.id)
      };

      this.createPatientLoading = true
      this.errorMessages = [];

      this.$store.dispatch("patients/addPatientProcedure", patientProcedure).then(
        response => {
          this.createPatientLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status > 204) {
            this.processError(response.data)
          } else {
            this.selectedProcedures = [];
            this.patientProcedureView = false;
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
        console.log(e)
      }
    },
    createValue (val, done) {
      if (val.length > 0) {
        const model = (this.selectedProcedures || []).slice()
        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (this.proceduresComputed.includes(v) === false) {
              this.proceduresComputed.push(v)
            }
            if (model.includes(v) === false) {
              model.push(v)
            }
          })

        done(null)
        this.selectedProcedures = model
      }
    },
    getProcedures () {
      if (this.proceduresComputed.length === 0 || this.proceduresComputed === null) {
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
    },
    openPatientProcedure (patientVisit) {
      this.$router.push({ name: 'patient-visit',  params: { patient_visit_id: patientVisit.id }})
    },
    openPatientVisitView () {
      this.patientVisitView = true;
      this.selectedPatient = null;
      this.patient_visit = {};
    },
    cancel () {
      this.user_details = {};
      this.step = 1;
      this.patientView = false;
    },
    filterPatients (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        if (this.patientsComputed.length > 0) {
          this.patientOptions = this.patientsComputed.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    filterProcedures (val, update) {
      update(() => {
        if (val === '') {
          this.procedureOptions = this.proceduresComputed
        }
        else {
          const needle = val.toLowerCase()
          this.procedureOptions = this.proceduresComputed.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
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
            this.getPatients();
            this.getPatientVisits();

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
    createPatientVisit () {
      this.patient_visit.patient_code = this.selectedPatient.id;
      this.createPatientLoading = true
      this.errorMessages = [];
      this.$store.dispatch("patients/addPatientVisit", this.patient_visit).then(
        response => {
          this.createPatientLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else if (response.status > 201) {
            this.processError(response.data)
          } else {
            this.patientVisitView = false;
            this.selectedPatient = null;
            this.patient_visit = {};
          }
        })
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
    proceedOnAdmission () {
      this.patientActionSelection = false;

      let patientCode = this.selectedPatient === null ? null : this.selectedPatient.id;

      if (patientCode !== null ) {
        this.$router.push({ name: 'admit-patient', query: { patientCode: patientCode } })
      } else {
        this.$router.push({ name: 'admit-patient' })
      }
    },
    getPatientVisits () {
      this.isLoading = true;
      this.$store.dispatch("patients/patientVisitlist").then(
        response => {
          this.isLoading = false;

          if (response.status === 401) {
            this.$router.push("/UsersAdmin");
          } else {
            this.data = response.data;
          }
        })
    },
    getPatients () {
      this.loadingPatients = true;
      this.$store.dispatch("patients/list").then(
        response => {
          this.loadingPatients = false;

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

.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden
}
.fill img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%
}

.my-card {
  width: 100%;
  max-width: 350px

}

</style>
