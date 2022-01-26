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
          <h3 class="display-3 text-h4 font-weight-bold white--text mb-5 mt-4 ml-2">
            Selamat Datang, Kerabat!
          </h3>

          <div class="subheading text-capitalize white--text pl-2 mb-7">
            kami hadir membawakan solusi terbaik untuk kebutuhan logistik anda.<br>
            Melayani dengan sepenuh hati untuk kenyamanan anda dan keamanan barang sampai pada tujuan.<br>
            Silahkan melakukan pendaftaran untuk dapat menikmati layanan kami
          </div>

          <v-btn outlined class="ma-1" color="white" @click="setDialogComponent('login')">Masuk</v-btn>
          <v-btn outlined class="ma-1" color="white" @click="setDialogComponent('register')">Daftar</v-btn>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';//digunakan untuk memanggil action dan getters pada vuex yang digunakan untuk mapping action dan mapping getters
export default {
    name: 'HomeBanner',
    computed: {
    Home() {
      return (this.$route.path==='/')//mengecek route apakah sudah pada ke home
    },
    ...mapGetters({
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
    }),
  },
  }
</script>