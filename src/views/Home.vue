<template>
  <div id="app">
    <banner />
    
    <about />

    <blog />

    <testimony/>
    
    <patner />

    <template>
      <v-row
        class="mb-15 mt-3"
        align="center"
        justify="space-around"
      >  
        <v-btn
          class="white--text rounded-lg"
          depressed
          color="#459467"
        >
          Gabung Sekarang
        </v-btn>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    Banner: () => import("@/components/home/Banner"),
    About: () => import("@/components/home/About"),
    Blog: () => import("@/components/home/Blog"),
    Testimony: () => import("@/components/home/Testimony"),
    Patner: () => import("@/components/home/Patner"),
},
  data: () => ({
    categories:[],//untuk menampung data/record categories yang diambil dari api menggunakan axios dibawah
    menu:[]//untuk menampung data/record Menu yang diambil dari api menggunakan axios dibawah
  }),
  created(){
      //disini saya tidak perlu menuliskan lengkap domain karena saya sudah menuliskannya pada konfigurasi axios yang terletak pada direktori .plugin/axios.js
      //karena lebih fleksible
      //mengambil data dari http://tugasakhir.test/v1/categories/random yang manmpilkan 2 data atau record
      this.axios.get('/categories/random/2')
      //promise
      .then((response)=>{
        let {data} = response.data//success
        this.categories = data
      })
      .catch((error)=>{
        let {response} = error//error
        console.log(response)
      }),
      //mengambil data dari http://tugasakhir.test/v1/list/top yang manmpilkan 4 data atau record
      this.axios.get('/list/top/4')
      //promise 
      .then((response)=>{
        let {data} = response.data//success
        this.menu = data
      })
      .catch((error)=>{
          let{response} = error//error
          console.log(response)
      })
    },
}
</script>