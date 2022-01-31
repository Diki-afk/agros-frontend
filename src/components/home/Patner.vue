<template>
  <div>
      <v-row
        class="fill-height pa-3 mt-12"
        align="center"
      >
        <v-col
          cols="12"
        >
          <h3 class="display-3 text-h4 font-weight-bold mb-4">
            Mitra AGROS
          </h3>

          <div class="subheading text-capitalize pl-2 mb-4">
            Kami berusaha semaksimal mungkin untuk memberikan kenyamanan dan keamanan kepada para pelanggan setia AGROS Indonesia. Untuk melihat daftar pelanggan kami, silakan melakukan pendaftaran.
          </div>
        </v-col>
      </v-row>
      <v-layout wrap class="mb-12">
            <v-flex md3 sm6 xs12 v-for="(user, index) in users" :key="index" >
                <v-card
                  class="mx-auto"
                  max-width="260"
                >
                  <v-card-title>
                    <h3 class=" text-capitalize text-no-wrap">{{ user.name }}</h3>
                  </v-card-title>
                  <v-card-text>
                    <v-chip
                      class="mr-5 mt-1 white--text"
                      color="green"
                    >
                      {{ user.city_name }}
                    </v-chip>
                  </v-card-text>
                  <v-card-actions v-if="auth.role==1">
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="deleteUser(user)" outlined>Hapus</v-btn>
                  </v-card-actions>
                </v-card>
            </v-flex>  
      </v-layout>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'HomePatner',
    data() {
      return {
        show: false,
      }
    },
    computed:{
       ...mapGetters({
        dialogStatus : 'dialog/status',
        auth : 'auth/user',
        guest: 'auth/guest',
        users: 'users/users'
      }),
    },
    mounted() {
      
    },
    methods: {
      ...mapActions({
            setAlert : 'alert/set',
            removeUser: 'users/remove'
      }),
      deleteUser(value){
        console.log(value.token)
        this.removeUser(value)
        let formData = {
          "id": value.id,
          "token": this.auth.token
        }
        let config = {
          headers: {
            'Authorization': 'Bearer ' + this.auth.token
          }
        }
        this.axios.post('/delete', formData, config)
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
              this.setAlert({
                status: true,
                color: 'success',
                text: 'User Berhasil Dihapus',
              })
          })
          .catch((error) => {
            let {data} = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: data.message,
            })
          })
      }
    },
  }
</script>
<style>
.v-chip.v-size--default {
    border-radius: 5px;
    font-size: 12px;
    height: 32px;
}
</style>
