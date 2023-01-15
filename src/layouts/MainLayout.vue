<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: gray">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          <p style="color:deeppink; padding-top: 10px">Clinica Medica</p>
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                 @click="$q.fullscreen.toggle()"
                 v-if="$q.screen.gt.sm">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Transactions" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="account_balance"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Transactions</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Queue" active-class="q-item-no-link-highlighting"
          v-if="isAdmin || isReceptionist"
        >
          <q-item-section avatar>
            <q-icon name="queue_play_next"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Procedure Queueing</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Patients" active-class="q-item-no-link-highlighting" v-if="!isCashier">
          <q-item-section avatar>
            <q-icon name="people_alt"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Patients</q-item-label>
          </q-item-section>
        </q-item>
<!--        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="dashboard"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Sales Dashboard</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
        <q-expansion-item
          icon="pages"
          label="Profile Action"
        >
          <q-list class="q-pl-lg">
            <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item>
<!--            <q-item to="/UsersAdmin" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="admin_panel_settings"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>Change User Type</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
            <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="admin_panel_settings"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Logged Out</q-item-label>
              </q-item-section>
            </q-item>
<!--            <q-item to="/Profile" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="person"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>User Profile</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item to="/Maintenance" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="settings"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>Maintenance</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          v-if="isAdmin === true"
          icon="settings"
          label="Settings"
        >
          <q-list class="q-pl-lg">
              <q-item to="/CategoryProcedures" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="view_headline"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Categories of Procedure</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Packages" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="note_add"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Packages</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Procedures" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="integration_instructions"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Procedures</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/FileTypes" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="note_add"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>File Types</q-item-label>
              </q-item-section>
            </q-item>
            <!--            <q-item to="/Profile" active-class="q-item-no-link-highlighting">-->
            <!--              <q-item-section avatar>-->
            <!--                <q-icon name="person"/>-->
            <!--              </q-item-section>-->
            <!--              <q-item-section>-->
            <!--                <q-item-label>User Profile</q-item-label>-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
            <!--            <q-item to="/Maintenance" active-class="q-item-no-link-highlighting">-->
            <!--              <q-item-section avatar>-->
            <!--                <q-icon name="settings"/>-->
            <!--              </q-item-section>-->
            <!--              <q-item-section>-->
            <!--                <q-item-label>Maintenance</q-item-label>-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
          </q-list>
        </q-expansion-item>
<!--        <q-expansion-item-->
<!--          icon="map"-->
<!--          label="Maps"-->
<!--        >-->
<!--          <q-list class="q-pl-lg">-->
<!--            <q-item to="/Map" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="map"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>Map</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item to="/MapMarker" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="location_on"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>Map Marker</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-item to="/StreetView" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon name="streetview"/>-->
<!--              </q-item-section>-->
<!--              <q-item-section>-->
<!--                <q-item-label>Street View</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </q-list>-->
<!--        </q-expansion-item>-->

<!--        <q-item to="/Mail" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="email"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Mail</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="list"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>TreeTable</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Charts" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="insert_chart"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Charts</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Cards" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="card_giftcard"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Cards</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Tables" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="table_chart"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Tables</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

<!--        <q-item to="/Checkout" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="check_circle_outline"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Checkout</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Calendar" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="date_range"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Calendar</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Taskboard" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="done"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Taskboard</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Pagination" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="date_range"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Pagination</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/Ecommerce" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="shopping_cart"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Product Catalogues</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--        <q-expansion-item-->
<!--          icon="menu_open"-->
<!--          label="Menu Levels"-->
<!--        >-->
<!--          <q-item class="q-ml-xl" active-class="q-item-no-link-highlighting">-->
<!--            <q-item-section>-->
<!--              <q-item-label>Level 1</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--          <q-expansion-item-->
<!--            :header-inset-level="0.85"-->
<!--            label="Level 2"-->
<!--          >-->
<!--            <q-item class="q-ml-xl" style="margin-left: 55px  !important;" active-class="q-item-no-link-highlighting">-->
<!--              <q-item-section>-->
<!--                <q-item-label>Level 2.1</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--            <q-expansion-item-->
<!--              :header-inset-level="1"-->
<!--              label="Level 2.2"-->
<!--            >-->
<!--              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">-->
<!--                <q-item-section>-->
<!--                  <q-item-label>Level 2.2.1</q-item-label>-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">-->
<!--                <q-item-section>-->
<!--                  <q-item-label>Level 2.2.2</q-item-label>-->
<!--                </q-item-section>-->
<!--              </q-item>-->
<!--            </q-expansion-item>-->
<!--          </q-expansion-item>-->
<!--        </q-expansion-item>-->
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import Messages from "./Messages";

    export default {
        name: 'MainLayout',

        components: {
            Messages,
            EssentialLink
        },

        data() {
            return {
              leftDrawerOpen: false,
              isAdmin: false,
              isCashier: false,
              isReceptionist: false,
            }
        },

        created() {
          const user = JSON.parse(localStorage.getItem('user'))?.user ?? null;

          if (user.fullName.includes('Cashier')) {
            this.isCashier = true
          }

          if (user.fullName.includes('Admin')) {
            this.isAdmin = true
          }

          if (user.fullName.includes('Receptionist')) {
            this.isReceptionist = true
          }

          console.log(this.isCashier)
        }
    }
</script>
