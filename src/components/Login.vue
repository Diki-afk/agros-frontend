<template>
    <v-card>
       <v-toolbar>
           <v-btn icon @click.native="close"><!--untuk close component ketika diklik close-->
                <v-icon dark>mdi-close</v-icon>
           </v-btn>
           <v-img
            :src="require('@/assets/logo.png')"
            class=""
            contain
            width="167"
            max-width="167"
            @click="$vuetify.goTo(0)"
            />
       </v-toolbar> 
       <v-divider></v-divider>

       <v-container fluid class="mb-10"><!--form data untuk login-->
            <v-row
                class="fill-height pa-3 mt-5"
                align="center"
            >
                <v-col
                cols="12"
                >
                <h3 class="display-3 text-h4 font-weight-bold mb-4">
                   Masuk Sekarang
                </h3>

                <div class="subheading text-capitalize pl-2 mb-4">
                    Masuk dan nikmati fitur kami
                </div>
                </v-col>
            </v-row>
           <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                    <v-col
                        md="6"
                        cols="12"
                    >
                        <v-text-field
                            color="#459467"
                            v-model="email"
                            label="E-mail"
                            :rules="emailRules"
                            required
                            append-icon="mdi-email"
                        ></v-text-field>
                    </v-col>

                    <v-col
                        md="6"
                        cols="12"
                    >
                        <v-text-field
                            color="#459467"
                            v-model="password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="passwordRules"
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            hint = "at least 6 characters"
                            counter
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        md="4"
                        cols="12"
                    >
                        <v-btn 
                            color="#459467"
                            :disabled="!valid"
                            @click="submit"
                            class="white--text"
                            block
                        >
                        Masuk Sekarang &nbsp;
                        <v-icon>mdi-lock-open</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
           </v-form>
       </v-container>
       <div class=" px-3">
            <testimony />
       </div>
    </v-card>
</template>

<script>
 import {mapGetters, mapActions} from 'vuex'
export default {
   name: 'login',
   components:{
        Testimony: () => import("@/components/home/Testimony"),
   },
   data () {
       return{
           valid: true,
           email: "",
           emailRules: [
               v => !!v || 'E-mail is required',
               v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],
           showPassword: false,
           password: '',
           passwordRules: [
               v => !!v || 'Password required.',
               v => (v && v.length >= 6) || 'Min 6 characters',
           ],
       }
   },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        }),
    },
    methods: {
        ...mapActions({
            setAlert : 'alert/set',
            setAuth : 'auth/set',
        }),
        submit () {
            if (this.$refs.form.validate()) {
                let formData = {
                    'email' : this.email,
                    'password' : this.password
                }
                this.axios.post('/login', formData)
                .then((response) => {
                    let token = response.data;
                    let params = {
                        'token' : token.token
                    }
                    this.axios.post('/get_user', params)
                    .then((result) =>{
                        let data = result.data
                        data.user.token = token.token
                        this.setAuth(data.user)
                        if (this.user.id>0) {
                            this.setAlert({
                                status: true,
                                color : 'success',
                                text : 'Login success',
                            })
                            this.close()
                        }else{
                            this.setAlert({
                                status: true,
                                color : 'error',
                                text : 'Login failed',
                            })
                        }
                    }).catch((error)=> {
                        let data = error.response
                        this.setAlert({
                            status: true,
                            color : 'error',
                            text : data.message,
                        })
                    })
                })
                .catch((error)=> {
                    let {data} = error.response
                    this.setAlert({
                        status: true,
                        color : 'error',
                        text : data.message,
                    })
                })
            }
        },
        close() {
            this.$emit('closed', false)
        }
    },
}
</script>