<template>
  <q-layout view="lHh Lpr lFf" style="background:linear-gradient( 135deg, #5B6A82 10%, #162b4d 100%)">
    <q-header class="bg-transparent text-white">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title>
          User Admin Page
        </q-toolbar-title>
        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn square dense flat color="text-grey-7" to="/Lock-2" label="Lock" icon="lock">
            <q-tooltip>Lock</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <section style="min-height: 25vh;" class="flex text-white flex-center layout_bg">
        <div style="position: relative">
          <div class="text-h4 text-center">
            Select User Type
          </div>
          <div class="text-subtitle2 q-pt-sm text-center">
            Please note that the user you will select will be tagged to the records that will be created
          </div>
        </div>
      </section>
      <section class="q-pb-lg">
        <div class="row q-col-gutter-sm q-px-sm">
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12" v-for="user, user_index in users">
            <card-user-selection @click.native="login(user.data)" :icon="user.icon" :price="user.price"
                          :background_image="user.background_image"></card-user-selection>
          </div>
        </div>
      </section>
      <q-inner-loading :showing="isLoading">
        <q-spinner-grid size="50px" color="pink" />
      </q-inner-loading>
    </q-page-container>

    <section class="flex row flex-center q-py-sm ">
      <div class="text-weight-bold text-subtitle2 text-white ">
        Copyright © {{ year }}, made by Mark And Karl
      </div>
    </section>
  </q-layout>
</template>

<script>

export default {
  name: "UserSelection",
  components: {
    CardUserSelection : () => import('components/cards/CardUserSelection')
  },
  data() {
    return {
      isLoading: false,
      year: (new Date()).getFullYear(),
      users: [
        {
          title: 'Admin',
          price: 'Admin',
          icon: 'home_work',
          background_image: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
          text: 'This is good if your company size is between 2 and 10 Persons.',
          data: {
            email: 'Admin@testmail.com',
            password: 'Admin',
          }
        },
        {
          title: 'Reception',
          price: 'Reception',
          icon: 'home',
          background_image: 'linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%)',
          text: 'This is good if your company size is between 2 and 10 Persons.',
          data: {
            email: 'Receptionist@testmail.com',
            password: 'Receptionist',
          }
        },
        {
          title: 'Cashier',
          price: 'Cashier',
          icon: 'apartment',
          background_image: 'linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)',
          text: 'This is good if your company size is between 2 and 10 Persons.',
          data: {
            email: 'Cashier@testmail.com',
            password: 'Cashier',
          }
        },
        {
          title: 'Other Staff',
          price: 'Other Staff',
          icon: 'business_center',
          background_image: 'linear-gradient(87deg, rgb(17, 205, 239), rgb(17, 113, 239)) !important',
          text: 'This is good if your company size is between 2 and 10 Persons.',
          data: {
            email: 'Staff@testmail.com',
            password: 'Staff',
          }
        },
      ]
    }
  },
  methods: {
    login (data) {
      this.isLoading = true;

      this.$store.dispatch("auth/login", data).then(
        () => {
          this.isLoading = false;
          this.$router.push("/");
        },
        (error) => {
          this.isLoading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
}
</script>

<style scoped>

</style>
