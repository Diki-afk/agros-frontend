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
   
  }),
  created(){
      
    },
}
</script>