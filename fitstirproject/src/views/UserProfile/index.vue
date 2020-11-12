<template>
        <div class="container w-full mx-auto pt-20">
                <div class="flex w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
                        <div class="w-2/5 md:w-1/2 xl:w-1/3 p-3">
                                <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                        <div class="flex flex-row items-center">
                                                <div class="flex-shrink pr-4">
                                                        <div class="rounded p-3  ">
                                                                <i class="text-4xl em em-video_camera "></i>
                                                        </div>
                                                </div>
                                                <div class="flex-1 text-right md:text-center">
                                                        <h5 class="font-bold uppercase text-gray-400">BMI</h5>
                                                        <h3 class="font-bold text-3xl text-gray-600">
                <span class="text-orange-500">
                  {{ userProfile.bmi }}
                </span>
                                                        </h3>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="w-2/5 md:w-1/2 xl:w-1/3 p-3">
                                <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                        <div class="flex flex-row items-center">
                                                <div class="flex-shrink pr-4">
                                                        <div class="rounded p-3  "><i class="em em-calendar text-4xl "></i></div>
                                                </div>
                                                <div class="flex-1 text-right md:text-center">
                                                        <h5 class="font-bold uppercase text-gray-400">จำนวนเพย์ลิส</h5>
                                                        <h3 class="font-bold text-3xl text-gray-600">
                <span class="text-yellow-600">
                  {{}}
                </span>
                                                        </h3>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="w-2/5 md:w-1/2 xl:w-1/3 p-3">
                                <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
                                        <div class="flex flex-row items-center">
                                                <div class="flex-shrink pr-4">
                                                        <div class="rounded p-3  "><i class="em em-calendar text-4xl "></i></div>
                                                </div>
                                                <div class="flex-1 text-right md:text-center">
                                                        <h5 class="font-bold uppercase text-gray-400">จำนวน Challenge</h5>
                                                        <h3 class="font-bold text-3xl text-gray-600">
                <span class="text-yellow-600">
                  {{}}
                </span>
                                                        </h3>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>

                <hr class="border-b-2 border-gray-600 my-8 mx-4">

                <div class="column ">
                        <div class="flex flex-wrap  mt-2">
                                <div class=" w-full md:w-1/2  p-3">
                                        <div class=" bg-gray-900 border border-gray-800 rounded shadow">
                                                <div class="border-b border-gray-800 ">
                                                        <v-toolbar flat color="transparent">
                                                                <h5 class="font-bold uppercase text-white">Profile</h5>
                                                                <v-btn
                                                                        text
                                                                        color="primary"
                                                                        @click="getProfileDialogid(userDetail.id)"
                                                                >
                                                                        <v-icon>mdi-pen-minus</v-icon>
                                                                        Edit
                                                                </v-btn>
                                                                <v-spacer></v-spacer>
                                                                <!--                                                                <UpdateUser :fb="fb" :userId="profile.id" :profileId="profile.id" />-->
                                                        </v-toolbar>
                                                </div>
                                                <div class="p-5">
                                                        <img v-if="userProfile"
                                                             :src="$url+userProfile.image" alt=""
                                                             width="30" height="30"><br/>
                                                        <h2 class="text-xl text-white">Name: {{ userDetail.first_name }} {{ userDetail.last_name }}</h2><br/>
                                                        <h2 class="text-xl text-white">E-mail: {{ userDetail.email }}</h2><br/>
                                                        <h2 class="text-xl text-white">Tel: {{ userProfile.phone_number }}</h2><br/>
                                                        <h2 class="text-xl text-white" >Address: {{ userProfile.address }} </h2>



                                                </div>
                                        </div>
                                </div>
                        </div>




                        <div class="w-full md:w-1/2 p-3">
                                <div class="bg-gray-900 border border-gray-800 rounded shadow">
                                        <div class=" flex border-b border-gray-800  ">
                                                <v-toolbar flat color="transparent">
                                                        <h2 class="text-white uppercase">Health Record Table</h2>
                                                        <v-btn
                                                                text
                                                                color="primary"
                                                                @click="dialogBmi = true"
                                                        >
                                                                <v-icon
                                                                        color="green"
                                                                >
                                                                        mdi-plus-box-outline
                                                                </v-icon>
                                                                ADD
                                                        </v-btn>
                                                        <v-spacer></v-spacer>

                                                </v-toolbar>
                                        </div>
                                        <div class=" flex p-5">
                                                <table class="w-full p-3 text-gray-700">
                                                        <thead>
                                                        <tr>
                                                                <th class="text-left text-gray-600">Weight</th>
                                                                <th class="text-left text-gray-600">Height</th>
                                                                <th class="text-left text-gray-600">Bmi</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                                <td>{{ userProfile.weight }}</td>
                                                                <td>{{ userProfile.high }}</td>
                                                                <td>{{ userProfile.bmi }}</td>

                                                        </tr>
                                                        </tbody>
                                                </table>
                                        </div>
                                </div>
                        </div>

                </div>




                <v-dialog
                        v-model="dialoguser1"
                        max-width="450px"
                >
                        <v-card>
                                <v-card-title primary-title>
                                        <v-icon
                                                color="primary"
                                        >
                                                mdi-account
                                        </v-icon>
                                        Edit Account
                                        <v-spacer></v-spacer>
                                        <v-btn @click="dialoguser1 = false" icon text>
                                                <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                </v-card-title>
                                <v-card-text>

                                        <v-row
                                                cols="6"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field

                                                        v-model="userDetail.first_name"
                                                        label="First name"
                                                        outlined
                                                ></v-text-field>
                                        </v-row>
                                        <v-row
                                                cols="6"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field

                                                        v-model="userDetail.last_name"
                                                        label="Last name"
                                                        outlined
                                                ></v-text-field>
                                        </v-row>
                                        <v-col
                                                cols="12"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field

                                                        v-model="userDetail.email"
                                                        label="E-mail"
                                                        outlined
                                                ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field

                                                        v-model="userProfile.phone_number"
                                                        label="phone number"
                                                        outlined
                                                ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-textarea

                                                        v-model="userProfile.address"
                                                        label="address"
                                                        outlined
                                                ></v-textarea>
                                        </v-col>

                                        <v-btn
                                                color="primary"
                                                @click="updateUserInfo()"
                                        >
                                                <v-icon>mdi-pen</v-icon>
                                                Edit
                                        </v-btn>
                                </v-card-text>
                        </v-card>
                </v-dialog>


                <v-dialog
                        v-model="dialogBmi"
                        max-width="450"
                >
                        <v-card>
                                <v-card-title>

                                </v-card-title>
                                <v-card-text>
                                        <v-col
                                                cols="12"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field
                                                        @input="calBMI()"
                                                        v-model="userProfile.weight"
                                                        label="Weight"
                                                        outlined
                                                ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field
                                                        @input="calBMI()"
                                                        v-model="userProfile.high"
                                                        label="Height"
                                                        outlined
                                                ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="10"
                                                md="10"
                                        >
                                                <v-text-field
                                                        @change="calBMI()"
                                                        v-model="userProfile.bmi"
                                                        label="BMI"
                                                        outlined
                                                        readonly
                                                ></v-text-field>
                                                <v-btn @click="updateUserProfile()">save</v-btn>
                                        </v-col>
                                </v-card-text>
                        </v-card>
                </v-dialog>

        </div>


</template>

<script>
        import {
                sync,
                call
        } from 'vuex-pathify';
        export default {
                name: "index",
                data() {
                        return {
                                userProfile: {},
                                userDetail: {},
                                response: false,
                                dialoguser: false,
                                dialoguser1: false,
                                dialogBmi: false,
                                form: {
                                        phone_number: null,
                                        address: null,
                                        weight: null,
                                        height: null,
                                        bmi: null,
                                        user: null
                                },
                        }
                },
                computed: {
                        ...sync('user/*')
                },
                async mounted() {
                        await this.loadData()
                },
                methods: {
                        async loadData() {
                                // this.user = await this.$store.dispatch('user/getUser')
                                let id = this.user.pk
                                this.userProfile = await this.$store.dispatch('user/getUserProfile', id)
                                this.userDetail = await this.$store.dispatch('user/getUserUpdate', id)
                                console.log(id)
                                console.log(this.userProfile)
                                this.response = true
                                // console.log(this.user);
                        },
                        async updateUserInfo() {
                                let id = this.user.pk
                                console.log(id)
                                this.userProfile.user = id
                                let update = await this.$store.dispatch('user/updateUser', this.userDetail)
                                let request = await this.$store.dispatch('user/updateUserDetail', this.userProfile)
                                if(update && request){
                                        await alert('Yesssss')
                                        this.dialoguser = false
                                        this.dialoguser1 = false
                                        this.dialogBmi = false
                                        await this.loadData()
                                }
                                console.log(update)

                                return update , request
                        },
                        async updateUserProfile() {
                                let id = this.user.pk
                                console.log(id)
                                this.userProfile.user = id
                                console.log(this.userProfile)
                                let update = await this.$store.dispatch('user/updateUserDetail', this.userProfile)
                                if(update){
                                        await alert('Yesssss')
                                        this.dialoguser = false
                                        this.dialogBmi = false
                                        await this.loadData()
                                }
                                console.log(update)
                                return update
                        },
                        async getdataDialogid(id) {
                                console.log(id)
                                this.dialoguser = true
                        },
                        async getProfileDialogid(id) {
                                console.log(id)
                                this.dialoguser1 = true
                        },
                        async calBMI() {
                                let bmi = Number(this.userProfile.weight) / ((Number(this.userProfile.high) / 100) ** 2)
                                this.userProfile.bmi = (bmi).toFixed(2)
                                console.log(this.userProfile.bmi)
                                return this.userProfile.bmi
                        }
                },
                async onClick(){
                        console.log('test')
                }
        }
</script>
<style scoped>
        p.text {
                white-space: nowrap;
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
        }
        .container {
                max-width: 1200px;
        }
        .slide-area04 {
                background-image: url(https://sv1.picz.in.th/images/2020/11/02/biyQfI.png);
                background-repeat: no-repeat;
                background-size: cover;
        }
        .slide-area04 .hero-cap h2 {
                color: #fff;
                font-size: 70px;
                font-weight: 700;
                text-transform: uppercase;
                line-height: 1;
        }
        .container {
                max-width: 1200px;
        }
        .pt-x {
                padding-top: 100px;
        }
        @media only screen and (max-width: 600px) {
                .pt-x {
                        padding-top: 80px;
                }
                .rm-text {
                        font-size: 48px !important;
                }
                .rm-body {
                        font-size: 22px !important;
                }
        }
</style>