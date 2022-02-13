<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="nurse.png">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn label="Login"  type="button" color="primary"  @click.native="login()"/>
              </div>
            </q-form>
          </q-card-section>
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
        data() {
            return {
                isLoading: false,
                username: '',
                password: ''
            }
        },
        computed: {
          loggedIn() {
            return this.$store.state.auth.status.loggedIn;
          },
        },
        created() {
          this.$store.dispatch("auth/logout");
          if (this.loggedIn) {
            // this.$router.push("/");
          }
        },
        methods: {
          login () {
            this.isLoading = true;

            let data = {
              email: this.username,
              password: this.password,
            }

            this.$store.dispatch("auth/login", data).
            then(() => {
                this.isLoading = false;
                this.$router.push({ name: 'dashboard' })
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
   background-image: linear-gradient(135deg, #d52ee0 0%, #e0297f 100%);
  }
</style>
