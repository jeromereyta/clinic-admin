<template>
  <div>
    <div class="text-h6 text-grey-10">
      Personal Information
    </div>
    <div style="font-size: 18px; margin-top: 10px"></div>
    <q-separator />
    <q-list class="row">
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.first_name"
            label="First Name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.middle_name"
            label="Middle Name"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.last_name"
            label="Last Name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.email"
            label="Your email"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-select
            v-model="patient.gender"
            :options="genders"
            label="Gender *" />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input filled v-model="patient.birth_date" mask="date" :rules="['date']"    label="Birthdate *">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="patient.birth_date" >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-select
            v-model="patient.civil_status"
            :options="civilStatuses"
            label="Civil Status*"
            lazy-rules
          />
<!--          <q-input-->
<!--            filled-->
<!--            v-model="patient.civil_status"-->
<!--            label="Civil Status *"-->
<!--            lazy-rules-->
<!--            :rules="[ val => val && val.length > 0 || 'Please type something']"-->
<!--          />-->
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.phone_number"
            label="Phone Number *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled


            v-model="patient.mobile_number"
            label="Mobile Number *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="text-h6 text-grey-10">
      Address
    </div>
    <q-separator />
    <q-list class="row">
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.street_address"
            label="Street Address"
            hint="#14 unit 421 Tiny Street"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.barangay"
            label="Barangay"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.city"
            label="City"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>
          <q-input
            filled
            v-model="patient.province"
            label="Province"
          />
        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>

        </q-item-section>
      </q-item>
      <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-item-section>

        </q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="isLoading">
      <q-spinner-grid size="200px" color="pink" />
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  name: "PatientProfileCard",
  props: ['patient', 'isLoading'],
  data() {
    return {
      genders: ['Male', 'Female', 'Others'],
      civilStatuses: ['Single', 'Married', 'Divorced', 'Separated', 'Widowed' ]
    }
  }
}
</script>

<style>
.custom_selected {
}

.custom_selected .q-field__native {
  color: deeppink!important;
}
</style>
