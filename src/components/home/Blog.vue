<template>
    <div>
    <h5 class="display-3 text-h5 font-weight-bold ml-5">Layanan Agros Indonesia</h5>
    <v-container class="pa-0" grid-list-sm>
        <v-layout wrap>
            <v-flex md4 sm6 xs12 >
                <v-card
                    class="mx-5 my-12 rounded-lg"
                    max-width="400px"
                    height="315px"
                >
                    <v-img
                    class="img-blog"
                    :src="require('@/assets/hero-home1.png')"
                    ></v-img>

                    <v-card-title>AGROS Shipper</v-card-title>

                    <v-card-text>
                    <div>Agros adalah sistem terpadu satu pintu—one stop service yang berfokus pada pelayanan jasa logistik muatan berat. Agros menawarkan mitra terlatih, efisiensi dan</div>
                    </v-card-text>
                </v-card>
            </v-flex>  
            <v-flex md4 sm6 xs12>
                <v-card
                    class="mx-5 my-12 rounded-lg"
                    max-width="400px"
                    height="315px"
                >
                    <v-img
                    class="img-blog"
                    :src="require('@/assets/image2.png')"
                    ></v-img>

                    <v-card-title>AGROS Transporter</v-card-title>

                    <v-card-text>
                    <div>Tidak ada yang tidak mungkin. Kini, Perusahaan bisa dengan cepat mendapatkan keuntungan tanpa harus melakukan hal berat.</div>
                    </v-card-text>
                </v-card>
            </v-flex>  
            <v-flex md4 sm6 xs12>
                <v-card
                    class="mx-5 my-12 rounded-lg"
                    max-width="400px"
                    height="315px"
                >
                    <v-img
                    class="img-blog"
                    :src="require('@/assets/istockphoto-1185213630-612x612 1.png')"
                    ></v-img>

                    <v-card-title>AGROS Driver</v-card-title>

                    <v-card-text>
                    <div>AGROS menawarkan keleluasaan untuk memilih proyek sehingga peningkatan pendapatan bukan lagi jadi impian.</div>
                    </v-card-text>
                </v-card>
            </v-flex>  
        </v-layout>
      </v-container>
    </div>
</template>
<script>
  export default {
    name: 'HomeBlog',
    data: () => ({
     
    }),

    methods: {
    },
  }
</script>
<style>
img-blog{
    height: 148px;
}
</style>