<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-card-section class="text-h6 ">
            <div class="text-h6 text-hotpink">Patient Profile</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <div><i>Personal Information</i></div>
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.name"
                    label="Patient Name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.email"
                    label="Your email *"
                    hint="Example: johndoe@gmail.com"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    :disable="patientInfoDisabled"
                    v-model="user_details.gender"
                    :options="genders"
                    label="Gender *" />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
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
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.civil_status"
                    label="Civil Status *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.phone_number"
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
                    :disable="patientInfoDisabled"
                    v-model="user_details.mobile_number"
                    label="Mobile Number *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <div><i>Address</i></div>
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.street_address"
                    label="Street Address *"
                    hint="#14 unit 421 Tiny Street"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.barangay"
                    label="Barangay *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.city"
                    label="City *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    filled
                    :disable="patientInfoDisabled"
                    v-model="user_details.province"
                    label="Province *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
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
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info ">Update User Info</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">

        <q-card class="card-bg ">
          <q-card-section class="text-center bg-transparent">
            <q-avatar size="100px" class="shadow-10">
              <img src="http://localhost/storage/patient-images/fs7T9OhwiIdV26zp3kiaw3U3PRZ9uIifrtcuTqSU.jpg">
            </q-avatar>
            <div class="text-subtitle2 q-mt-lg">by Mark Jerome Reyta</div>
            <div class="text-h6 q-mt-md">Mark Jerome Reyta</div>`
          </q-card-section>
          <q-card-section>
            <div class="text-body2 text-justify">
              My name is Mark Jerome Reyta. I noticed myself pulling into programming since 2013,
              and then determined myself to become a skilled and knowledgeable programmer.
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Current Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined color="pink" round v-model="password_dict.current_password"
                         label="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined color="pink" round v-model="password_dict.new_password"
                         label="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                Confirm New Password
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined round color="pink" v-model="password_dict.confirm_new_password"
                         label="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info ">Change Password</q-btn>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: "UserProfile",
        data() {
            return {
                user_details: {},
                password_dict: {}
            }
        }
    }
</script>

<style scoped>
  .text-hotpink {
    color: black;
  }
  .card-bg {
    background-color: white;
    color: black;
  }
</style>
