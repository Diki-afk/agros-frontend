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
          @click="setDialogComponent('register')"
        >
          Gabung Sekarang
        </v-btn>
      </v-row>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
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
  computed: {
    ...mapGetters({
      dialogStatus : 'dialog/status',
      currentComponent: 'dialog/component',
      
    }),
    dialog: {
      get() {
        return this.dialogStatus
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
    }),
  },
}
</script>