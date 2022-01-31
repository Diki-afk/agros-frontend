<template>
    <div>
        <v-img
        :src="require('@/assets/bg_slider.png')"
        class="grey lighten-2 rounded-xl mt-10"
        width="100%"
        >
      <v-row
        class="fill-height pa-3"
        align="center"
      >
        <v-col
          cols="12"
        >
          <h3 class="display-3 text-h4 font-weight-bold white--text mb-5 mt-4 ml-2" v-if="!guest">
            Selamat Datang, {{user.name}}!
          </h3>
          <h3 class="display-3 text-h4 font-weight-bold white--text mb-5 mt-4 ml-2" v-else>
            Selamat Datang, Kerabat!
          </h3>

          <div class="subheading text-capitalize white--text pl-2 mb-7">
            kami hadir membawakan solusi terbaik untuk kebutuhan logistik anda.<br>
            Melayani dengan sepenuh hati untuk kenyamanan anda dan keamanan barang sampai pada tujuan.<br>
            Silahkan melakukan pendaftaran untuk dapat menikmati layanan kami
          </div>
          <template v-if="!guest">
              <v-btn outlined class="ma-1" color="white" @click="logout">
                Keluar
              </v-btn>
          </template>
          <template v-else>
              <v-btn outlined class="ma-1" color="white" @click="setDialogComponent('login')">Masuk</v-btn>
              <v-btn outlined class="ma-1" color="white" @click="setDialogComponent('register')">Daftar</v-btn>
          </template>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    name: 'HomeBanner',
    computed: {
    Home() {
      return (this.$route.path==='/')
    },
    ...mapGetters({
      dialogStatus : 'dialog/status',
      user : 'auth/user',
      guest: 'auth/guest',
      currentComponent: 'dialog/component',
      
    }),
    dialog: {
      get() {
        return this.setDialogStatus
      },
      set(value){
        this.setDialogStatus(value)
      }
    }
  },
  methods: {
    ...mapActions({
      setDialogStatus : 'dialog/setStatus',
      setDialogComponent : 'dialog/setComponent',
      setAuth : 'auth/set',
      setAlert : 'alert/set',
      setUsers : 'users/set'
    }),
    logout(){//function logout
      let config = {
       token: this.user.token
      }
      this.axios.post('/logout',config)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {//success
        if(response.data.status=="Token is Expired"){
            this.setAuth({})
            this.setUsers({})
        }    
          this.setAuth({})
          this.setUsers({})
          this.setAlert({
            status : true,
            color : 'success',
            text : 'Logout successfully'
          })
        })
        .catch((error) =>{//error
          let {data} = error.response
          this.setAlert({
            status: true,
            color : 'error',
            text : data.message
          })
        })
      }
    },
}
</script>