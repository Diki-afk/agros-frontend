<template>
    <v-card>
        <v-toolbar>
           <v-btn icon @click.native="close"><!--untuk close component ketika diklik close-->
                <v-icon dark>mdi-close</v-icon>
           </v-btn>
           <v-img
            :src="require('@/assets/logo.png')"
            contain
            width="167"
            max-width="167"
            @click="$vuetify.goTo(0)"
            />
       </v-toolbar> 
        <v-divider></v-divider>

        <v-container fluid class="mb-10">
            <v-row
                class="fill-height pa-3 mt-5"
                align="center"
            >
                <v-col
                cols="12"
                >
                <h3 class="display-3 text-h4 font-weight-bold mb-4">
                   Daftar Sekarang
                </h3>

                <div class="subheading text-capitalize pl-2 mb-4">
                    Mari bergabung bersama Kerabat AGROS Indonesia lainnya.
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
                        v-model="name"
                        :counter="200"
                        label="Nama Lengkap Kerabat"
                        :rules="nameRules"
                        required
                        append-icon="mdi-account"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                    md="6"
                    cols="12"
                >
                    <v-text-field
                        color="#459467"
                        v-model="cityName"
                        name="cityName"
                        :counter="14"
                        :rules="cityNameRules"
                        label="Asal Kota"
                        required
                        append-icon="mdi-cityName"
                    >
                    </v-text-field>
                </v-col>
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
                    >
                    </v-text-field>
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
                    >
                    </v-text-field>
                </v-col>
                <v-col
                    md="6"
                    cols="12"
                >
                    <v-select
                        color="#459467"
                        v-model="role"
                        label="Role"
                        :rules="roleRules"
                        required
                        append-icon="mdi-passport"
                    >
                    
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    md="4"
                    cols="12"
                >
                    <div class="text-xs-center">
                        <v-btn
                            class="white--text"
                            color="#459467"                        
                            block
                            :disabled="!valid"
                            @click="submit"
                        >
                            Gabung Sekarang &nbsp;
                            <v-icon>mdi-account-plus</v-icon>
                        </v-btn>
                    </div>
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
    name: 'register',
    components:{
        Testimony: () => import("@/components/home/Testimony"),
    },
    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Nama Wajib Diisi',
                v => (v && v.length <= 200) || 'Name must be less than 255 character'
            ],
            email: '',
            emailRules: [
               v => !!v || 'Email Wajib Diisi',
               v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],
            showPassword: false,
            password: '',
            passwordRules: [
               v => !!v || 'Password Wajib diisi',
               v => (v && v.length >= 6) || 'Min 6 characters',
           ],
           cityName: '',
           cityNameRules: [
               v => !!v || 'Nama Kota Wajib Diisi',
               v =>  (v && v.length >= 12,[0-9])|| 'cityName number invalid'
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
            setAuth  : 'auth/set',
        }),
        submit() {
            if (this.$refs.form.validate()) {
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('password', this.password)
                formData.set('cityName', this.cityName)
                this.axios.post('/register', formData)
                    .then((response) => {
                        let {data} = response.data
                        this.setAuth(data)
                        this.setAlert({
                            status: true,
                            color: 'success',
                            text: 'Register success',
                        })
                        this.close()
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
        close() {
            this.$emit('closed', false)
        },
    },
}
</script>