<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-form" v-bind:style="$q.platform.is.mobile?{'width': '60%'}:{'width':'20%'}">
          <q-card-section>
            <q-avatar size="74px" class="absolute-center shadow-10">
              <img src="nurse.png">
            </q-avatar>
          </q-card-section>
          <q-card-section class="q-mt-md">
            <div class="text-h6 text-center">
              {{user.email}}
            </div>
            <q-input v-model="password" :type="isPwd ? 'password' : 'text'" placeholder="Enter Password">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn push @click="login" label="Unlock" class="text-capitalize" color="primary"></q-btn>
          </q-card-actions>
          <q-inner-loading :showing="isLoading">
            <q-spinner-grid size="200px" color="pink" />
          </q-inner-loading>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    export default {
        name: "LockScreen",
        data() {
            return {
                isLoading: false,
                user : null,
                email: null,
                password: '',
                isPwd: 'password'
            }
        },
      created () {
         this.user = JSON.parse(localStorage.user).user

          localStorage.removeItem('user');
        console.log(this.user)

      },
      methods: {
        login () {
          this.isLoading = true;

          let data = {
            email: this.user.email,
            password: this.password,
          }

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
      },
    }
</script>

<style>
  .bg-image {
    background-image: url("~assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }

  [v-cloak] {
    display: none !important;
  }
</style>
