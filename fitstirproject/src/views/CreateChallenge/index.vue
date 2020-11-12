<template>
    <v-container>
        <div class="container flex flex-col justify-center items-center mx-auto " >
            <div
                    style="background-image: url()"
                    class=" bg-blue-300 h-64 w-24 min-w-full
                rounded-lg shadow-md bg-cover bg-center"
            >
            </div>
            <div class="w-full  -mt-24  lg:w-8/12 px-7  justify-center ">
                <div class="relative flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                    <div class="rounded-t bg-white mb-0 px-6 py-6">
                        <div class="text-center flex justify-between">
                            <h6 class="text-gray-800 text-3xl">Create Challenge</h6>
                            <v-btn
                                    @click="createChallenge()"
                                    class="ma-2"
                                    outlined
                                    color="indigo"
                            >
                                Create
                            </v-btn>
                        </div>
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                            Challenge Information
                        </h6>
                        <img id="imageid" class=" t-h-32 t-w-64" :src="selectedImage" ref="image" style="width: 300px;" alt=""><br>
                        <div>
                            <v-btn color="primary" class="text-none my-1" rounded depressed :loading="isSelecting" @click="onButtonClickImage">
                                <v-icon left>
                                    mdi-file-image
                                </v-icon>
                                Upload image
                            </v-btn>
                            <input ref="imageuploader" class="d-none" type="file" accept="image/jpeg,image/jpg,image/*" @change="onSelectImage">
                        </div>


                        <hr class="mt-6 border-b-1 border-gray-400" />
                        <br>
                        <form>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label
                                                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                        >
                                            Name
                                        </label>
                                        <input
                                                v-model=" form.name"
                                                type="text"
                                                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                value="lucky.jesse"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label
                                                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                                v-model="form.description"
                                                type="text"
                                                class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                                rows="4"
                                        >

                  </textarea
                  >
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </v-container>
</template>

<script>
    import {call, sync} from 'vuex-pathify'

    export default {
        name: "index",
        data: ()=>({
            isSelecting: false,
            selectedVideoName: null,
            selectedImage: null,
            form:{
                name: null,
                description: null,
                image : null,
                user:null,
            }

        }),
        computed:{
            ...sync('user/*')

        },
        async mounted(){

        },
        methods:{
            ...call('challenge/*'),
            onButtonClickImage() {
                this.isSelecting = true
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {
                    once: true
                })

                this.$refs.imageuploader.click()

            },
            onButtonClickVideo() {
                this.isSelecting = true
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {
                    once: true
                })

                this.$refs.videouploader.click()

            },
            onFileChanged(e) {
                this.form.video = e.target.files[0]
                this.selectedVideoName = e.target.files[0].name

            },
            onSelectImage(e) {
                var files = e.target.files || e.dataTransfer.files;
                this.form.image = e.target.files[0]
                this.selectedImage = URL.createObjectURL(e.target.files[0]);

            },

            async createChallenge(){
                this.form.user = this.user.pk
                let data = await this.$store.dispatch('challenge/createChallenge', this.form)
                if(data){
                    await alert('Upload Success')
                    await this.$router.push('/app/challenge/index')
                }
                return data
            },
        }

    }
</script>

<style scoped>

</style>