<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
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
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
    export default {
        data() {
            return {
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
          if (this.loggedIn) {
            this.$router.push("/");
          }
        },
        methods: {
          login() {
            let data = {
              "email": this.username,
              "password": this.password
            };

            this.$store.dispatch("auth/login", data).then(
              () => {
                this.$router.push("/profile");
              },
              (error) => {
                this.loading = false;
                this.message =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
              }
            );
          },
        },
    }
</script>

<style>

  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
