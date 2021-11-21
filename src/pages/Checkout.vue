<template>
  <q-card>
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
            style="max-height: 50%; width: 300px; height: 300px"
            :src="patient.profile"/>
        </div>
        <div class="q-gutter-md row items-start" style="padding-top: 3%; padding-left: 20px">
          <q-file
            v-model="profilePicture"
            label="Upload Patient Image"
            filled
            counter
            max-files="3"
            multiple
            style="max-width: 700px; width: 400px"
          >
          </q-file>
          <q-btn
            v-if="profilePicture !== null"
            color="primary"
            @click="uploadImage"
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
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="200px" color="primary" />
    </q-inner-loading>

  </q-card>
</template>
