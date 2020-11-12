<template>
        <v-container v-if="response">
            <div class="container flex flex-col justify-center items-center mx-auto " v-if="response">
                <div
                        style="background-image: url(https://images.unsplash.com/photo-1538582709238-0a503bd5ae04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)"
                        class=" bg-blue-300 h-64 w-24 min-w-full
                rounded-lg shadow-md bg-cover bg-center"
                >
                </div>
                <div class="bg-white -mt-24 shadow-md rounded-lg overflow-hidden">
                    <div class="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
                        <div class="px-2 -mt-6">
                            <div class="text-center">
                                <h6 class="text-gray-800 text-5xl font-bold">Palylist Video</h6>
                                <h2 class="text-gray-800 text-3xl font-bold">
                                    Make Your Day
                                </h2>
                                <h2 class="text-gray-800 text-1xl font-bold">
                                    Real People. Real Videos.
                                </h2>
                                <br>
                                <v-btn
                                        @click="dialog1 = true"
                                        color="primary"
                                        x-large
                                >
                                    <v-icon>mdi-folder-multiple-plus</v-icon>
                                    Create Playlist
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div>
                <v-layout>
                    <v-container>
                        <v-dialog
                                v-model="dialog1"
                                max-width="290"
                        >
                            <v-card>
                                <v-card-title class="headline">
                                    Playlsit Video
                                </v-card-title>
                                <v-form>
                                    <v-container>
                                        <v-layout>
                                                <div row>
                                                    <v-btn color="primary" class="text-none my-1" rounded depressed :loading="isSelecting" @click="onButtonClickImage">
                                                        <v-icon >
                                                            mdi-file-image
                                                        </v-icon>
                                                        Upload image
                                                    </v-btn>
                                                    <input ref="imageuploader" class="d-none" type="file" accept="image/jpeg,image/jpg,image/*" @change="onSelectImage">
                                                </div>
                                                <v-text-field
                                                        label="Name"
                                                        outline
                                                        v-model="form.name"
                                                >
                                                </v-text-field>
                                                <v-text-field
                                                        label="Description"
                                                        outline
                                                        v-model="form.description"
                                                >
                                                </v-text-field>
                                        </v-layout>
                                    </v-container>
                                </v-form>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            @click="createvideo"
                                    >
                                        Create Playlist
                                    </v-btn>
                                    <v-btn
                                            color="red"
                                            @click="dialog1"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-container>
                </v-layout>
                    <br>
                        <div>
                            <v-card style="
                                    hight: 200px;
                                    width:220px; "
                                    class="ma-4"
                                    v-for="item, index in videoplaylist"
                                    :key="index"
                            >
                                <v-img :src="$url+item.image" style="width:100%; height:160px;  border" />
                                <v-card-title>
                                    <div>
                                        {{item.name}}
                                    </div>

                                </v-card-title>
                                <v-flex>
                                    <v-btn
                                            color="primary"
                                            @click="$router.push(`/playlistpage?id=${item.id}`)"
                                    >
                                        <v-icon color="white">mdi-play-circle-outline</v-icon>
                                    </v-btn>
                                    <v-btn
                                            color="red"
                                            @click="getdataDialogid(item.id)"
                                    >
                                        <v-icon color="white">mdi-cog-outline</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-card>
                        </div>
                    <v-container>
                            <v-dialog
                                    v-model="dialog2"
                                    max-width="350"
                            >
                                <v-card>
                                    <v-card-title class="headline"> Setting Playlsit Video </v-card-title>
                                    <v-form>
                                        <v-container>
                                            <v-layout justify-center items-center>
                                                <v-flex row >
                                                    <v-btn
                                                            class="pa-md-5 mx-lg-auto"
                                                            width="300"
                                                            color="green"
                                                            @click="$router.push(`/Addvideoplaylist?id=${dataDialog}`)"
                                                    >
                                                        <v-icon
                                                        >
                                                            mdi-folder-multiple-plus
                                                        </v-icon>
                                                        ADD  Video
                                                    </v-btn>
                                                    <v-btn
                                                            class="pa-md-5 mx-lg-auto mt-2"
                                                            width="300"
                                                            color="primary"
                                                            @click="$router.push(`/playlistpage?id=${dataDialog}`)"
                                                    >
                                                        <v-icon>mdi-eye</v-icon>
                                                        My playlist
                                                    </v-btn>
                                                    <v-btn
                                                            class="pa-md-5 mx-lg-auto mt-2"
                                                            width="300"
                                                            color="red"
                                                            @click="deletePlaylist()"
                                                    >
                                                        Remove Playlist
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-form>
                                </v-card>
                            </v-dialog>
                    </v-container>
                </div>
        </v-container>
</template>

<script>
    export default {
        name: "index",
        data () {
            return{
                dataDialog: null,
                dataDialog1: null,
                selectedImage:null,
                dialog: false,
                dialog1 :false,
                dialog2: false,
                isSelecting:false,
                form:{
                    name:null,
                    image:null,
                    description:null,
                },
                videoplaylist: [],

                response : false,
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {

            async loadData() {
                this.user = await this.$store.dispatch('user/getUser')
                this.videoplaylist = await this.$store.dispatch('myplaylist/getMyPlaylist',this.user.pk)
                console.log(this.videoplaylist);
                this.response = true
                console.log(this.user);
            },
            async createvideo(){
                let dataImage = new FormData()
                this.form.user = this.user.pk
                this.form.description = this.user.pk
                let data  = await  this.$store.dispatch('myplaylist/createPlaylist',this.form)
                this.dialog1 = false
                this.loadData()
            },
            async deletePlaylist(){
                let data  = await  this.$store.dispatch('myplaylist/deleteMyPlaylist',this.dataDialog)
                this.dialog = false
                this.dialog2 = false
                this.loadData()
            },
            async onButtonClickImage(){
                this.isSelecting = true
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {
                    once: true
                })
                this.$refs.imageuploader.click()
            },
            onSelectImage(e) {
                var files = e.target.files || e.dataTransfer.files;
                this.form.image = e.target.files[0]
                if (!files.length)
                    return this.createImage(files[0]);
            },
            async getdataDialogid(id){
                this.dialog2 = true
                this.dataDialog= id
            },

        }

    }
</script>

<style scoped>

</style>