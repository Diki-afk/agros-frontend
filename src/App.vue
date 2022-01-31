<template>
    <v-app>
      <!--pengondisian apakah sekarang ada pada route home apa tidak mneggunakan function home()-->
      <v-app-bar
        app
        color="white"
        v-if="Home"
      ><!-- Header jika view home-->
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          :src="require('@/assets/logo.png')"
          class=""
          contain
          width="167"
          max-width="167"
          @click="$vuetify.goTo(0)"
        />        
        <v-spacer></v-spacer>
        <!--componen cart didalam view home-->       
       
    <v-container class="mx-auto py-0">
      <v-row align="center">
        
        <v-spacer />

       <v-btn
          class="hidden-sm-and-down"
          text
          @click="onClick($event, link)"
        >
          Tentang
        </v-btn>
        <v-btn
          class="hidden-sm-and-down"
          text
          @click="setDialogComponent('profile')"
        >
          Profil
        </v-btn>
      </v-row>
    </v-container>

      </v-app-bar>

      <v-app-bar
        app
        v-else
      >
        <!--navigasi diluar view home-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer> 
      <!--componen search diluar view home-->
      </v-app-bar>
      <alert />
         <v-card>
          <!-- isi dari navigasi atau sidebar -->
          <v-navigation-drawer absolute app v-model="drawer" color="light">
            <v-list>
            <!--jika user belum login maka berstatus guest-->
              <v-img
                  :src="require('@/assets/logo.png')"
                  class="ml-3 mb-3"
                  contain
                  width="167"
                  max-width="167"
                  @click="$vuetify.goTo(0)"
                />

              <v-divider></v-divider>
              <!--jika user sudah login-->
              <v-list-item v-if="!guest"> 
                <v-list-item-avatar>
                  <v-img :src="'http://tugasakhir.test/storage/'+user.avatar" contain></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="subheading">{{user.name}}</v-list-item-title>
                </v-list-item-content>              
                </v-list-item>

              <v-list shaped>
                
              </v-list> 
            </v-list>
          </v-navigation-drawer>
        </v-card>
        <keep-alive>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <component :is="currentComponent" @closed="setDialogStatus">
            </component>
          </v-dialog>
      </keep-alive>

      <v-content>
      <!-- body -->
        <v-container fluid>
          <v-slide-x-transition>
            <router-view><!--untuk menampilkan konten utama--></router-view>
          </v-slide-x-transition>
        </v-container>
      </v-content>

      <v-card>
        <v-footer color="#459467">
            <v-card-text class="text-center white--text">
                Diki Taufik Gurohman &copy; {{ new Date() .getFullYear() }} - <strong>Agros</strong> powered by <strong>Vuetivy</strong>
            </v-card-text>
        </v-footer>
      </v-card>

  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';//digunakan untuk memanggil action dan getters pada vuex yang digunakan untuk mapping action dan mapping getters
export default {
  name: 'App',
  components: {
    Alert: () => import('@/components/Alert.vue'),//komponen alert
    Login : () => import('@/components/Login.vue'),//komponen login
    Register: () => import('@/components/Register.vue'),//komponen register
    Profile: () => import('@/components/Profile.vue'),//komponen profile
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    Home() {
      return (this.$route.path==='/')//mengecek route apakah sudah pada ke home
    },
    ...mapGetters({
      guest : 'auth/guest',//mapping getters guest yang ada pada store auth
      user : 'auth/user',//mapping getters user yang ada pada store auth
      dialogStatus : 'dialog/status',//mapping getters status yang ada pada store dialog
      currentComponent: 'dialog/component',//mapping getters component yang ada pada store dialog
    }),
    dialog: {
      get() {
        return this.dialogStatus//mendapatkan nilai dialogStatus
      },
      set(value){
        this.setDialogStatus(value)//mengeset nilai yang didapat dari action setDialogstatus
      }
    }
  },
  methods: {
    ...mapActions({
      setDialogStatus : 'dialog/setStatus',//mapping action setStatus yang ada pada store dialog 
      setDialogComponent : 'dialog/setComponent',//mapping action setComponent yang ada pada stre dialog
      setAuth : 'auth/set',//mapping action set yang ada pada store auth
      setAlert: 'alert/set',//mapping action set yang ada pada store alert
    }),
    logout(){//function logout
      let config = {
       token: this.user.token
    }
    this.axios.post('/logout',config)//ajax dari api laravel http/tugasakhir.test/v1/logout
      //promise
      .then(() => {//success
        this.setAuth({})//kosongkan auth ketika sudah logout
        this.setAlert({//tampilkan alert success
          status : true,
          color : 'success',
          text : 'Logout successfully'
        })
      })
      .catch((error) =>{//error
        let {data} = error.response
        this.setAlert({//tampilkan alert error
          status: true,
          color : 'error',
          text : data.message
        })
      })
    }
  },
}
</script>
