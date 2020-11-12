<template>
    <v-container v-if="response">
        <div class="container flex flex-col justify-center items-center mx-auto " >
            <div
                    style="background-image: url(https://images.unsplash.com/photo-1538582709238-0a503bd5ae04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)"
                    class=" bg-blue-300 h-64 w-24 min-w-full
                rounded-lg shadow-md bg-cover bg-center"
            >
            </div>
            <div class="bg-white -mt-24 shadow-md rounded-lg overflow-hidden">
                <div class="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
                    <div class="px-2 -mt-6">
                        <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
                            <img v-if="getchallenge.image" :src="$url+getchallenge.image" alt=""
                                 class="h-full w-full">
                        </div>
                    </div>
                    <div class="text-center">

                        <div>
                            <h1 style="color: black" v-if="getchallenge">{{ getchallenge.name }}</h1><br>
                        </div>

                    </div>

                    <h1 v-if="getchallenge.user" style="color: black">
                        create by : {{ getchallenge.user.first_name }} {{ getchallenge.user.last_name }}
                    </h1>
                    <br>
                    <v-btn
                            @click="openDialogJoin"
                            color="error"
                            x-large
                    >
                        <v-icon>mdi-play</v-icon>
                        Join Challenge
                    </v-btn>
                </div>
            </div>
        </div>


        <v-layout column>
            <div style="margin-top: 30px ">
                <div>
                    <v-layout>
                        <div class=" justify-items-auto  pr-5" v-for="(videos,index) in CHALLENGECHOOSE" :key="index">
                            <div style="width:250px;" class=" container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
                                <div     @click="openVideoPlayer(videos)"
                                         style="width: auto; height: auto"
                                         @mouseover="active = index"
                                         @mouseout="active = -1"
                                         class="relative mb-6">
                                    <img   v-if="videos.video.image && !(active === index)" :src="$url+videos.video.image" alt=""
                                           style="height:290px; width:300px;">
                                    <div v-show="active === index">
                                        <video style="height:200px; width:300px;" muted  autoplay v-if="videos.video"
                                               :src="$url+videos.video.video"></video>
                                    </div>
                                    <div class="text-center absolute w-full" style="bottom: -30px">
                                        <div class="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-20 w-20">
                                            <img
                                                    v-if="videos.video.user.userdetail"
                                                    :src="$url+videos.video.user.userdetail.image"
                                                    class="w-full"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="flex justify-center pb-3 text-grey-dark">
                                    <div class="text-center mr-3 border-r pr-3">
                                        <h3   style="color: black" v-if="videos.video.title"> {{ videos.video.title }}</h3>
                                        <p class="text-gray-400 text-sm">Name</p>
                                    </div>
                                    <div class="text-center">
                                        <h3  style="color: black" v-if="videos.video.user"> {{ videos.video.user.first_name }} {{
                                            videos.video.user.last_name
                                            }}</h3>
                                        <p class="text-gray-400 text-sm">Status</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-layout>
                </div>
            </div>
        </v-layout>



        <v-dialog
                v-model="dialog"
        >
            <div class="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
                <div class="py-3 sm:max-w-xl sm:mx-auto">
                    <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                        <div class="px-12 py-5">
                            <h2 class="text-gray-800 text-3xl font-semibold">Join Challenge!
                            </h2>
                        </div>
                        <div class="bg-gray-200 w-full flex flex-col items-center">
                            <br>
                            <div class="w-3/4 flex flex-col">
                                <div>
                                    <h3>{{ selectedVideoName }}</h3>
                                    <v-btn color="primary" class="text-none" rounded depressed :loading="isSelecting"
                                           @click="onButtonClickVideo">
                                        <v-icon left>
                                            mdi-folder-upload
                                        </v-icon>
                                        Upload Video
                                    </v-btn>
                                    <input ref="videouploader" class="d-none" type="file" accept="video/mp4,video/x-m4v,video/*"
                                           @change="onFileChanged">
                                </div>
                                <div style="margin-top: 20px">
                                    <v-btn color="primary" class="text-none my-1" rounded depressed :loading="isSelecting"
                                           @click="onButtonClickImage">
                                        <v-icon left>
                                            mdi-folder-image
                                        </v-icon>
                                        Upload image
                                    </v-btn>
                                    <br>
                                    <input ref="imageuploader" class="d-none" type="file" accept="image/jpeg,image/jpg,image/*"
                                           @change="onSelectImage">
                                </div>
                                <br>
                                <label
                                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                >
                                    Name
                                </label>
                                <input
                                        v-model="form.title"
                                        type="text"
                                        class="px-3 py-3 placeholder-gray-400
                            text-gray-700 bg-white rounded text-sm shadow focus:outline-none
                            focus:shadow-outline w-full ease-linear transition-all duration-150"
                                        value="lucky.jesse"
                                />
                                <br>
                            </div>
                        </div>
                        <div class="h-20 flex items-center justify-center">
                            <a href="#" class="text-gray-600"
                               @click="saveData"
                            >Upload</a>
                        </div>
                    </div>
                </div>
            </div>
        </v-dialog>







        <v-dialog
                v-model="dialog2"
                v-if="inVideo"
        >
            <v-card>
                <div class="flex flex-wrap">
                    <div class="p-0 md:p-2 w-full md:w-8/12 ">
                        <div>
                            <v-btn class="v-btn--rounded" @click="dialog2 = false">X</v-btn>
                        </div>
                        <br>
                        <video style="width:100%;" controls autoplay v-if="inVideo.video"
                               :src="$url+inVideo.video.video"></video>
                    </div>

                    <div class="p-0 md:p-2 w-full md:w-4/12">
                        <div class="row">
                            <div class="flex-column">
                            </div>
                            <div class="flex-column" style="margin-left: 10px">
                                <br>
                                <div class="flex " v-if="hidden === false">
                                    <v-spacer></v-spacer>
                                </div>
                                <div class="flex " v-if="hidden === true">
                                    <v-text-field outlined v-if="videoDataChoose.title" v-model="videoDataChoose.title"></v-text-field>
                                    <br/>
                                    <v-btn @click="editVideoTitle()">save</v-btn>
                                    <v-btn @click="hidden=false">cancel</v-btn>
                                </div>
                                <br>
                                <div class="flex">
                                </div>
                            </div>
                        </div>
                        <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200" v-if="inVideo.video">
                            <div class="flex items-center space-x-4" v-if="inVideo.video.user">
                                <img v-if="inVideo.video.user.userdetail"
                                     :src="$url+inVideo.video.user.userdetail.image"
                                     alt=""
                                     class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" >
                                <div class="flex flex-col leading-tight">
                                    <div class="text-2xl mt-1 flex items-center">
                        <span class="text-gray-700 mr-3">
                        <h1 v-if="inVideo.video">{{ inVideo.video.user.first_name }}</h1>
                        </span>
                                        <span class="text-green-500">
                        <svg width="10" height="10">
                        <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                        </svg>
                      </span>
                                    </div>
                                    <h2 v-if="inVideo.video">{{ inVideo.video.title }}</h2>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="flex-column align-end">
                                    <v-menu
                                            transition="slide-y-transition"
                                            bottom
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                    class="mx-16"
                                                    fab
                                                    small
                                                    v-bind="attrs"
                                                    v-on="on"
                                            >
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item-group>
                                                <v-list-item>
                                                    <v-list-item-content @click="getTitleVideo(inVideo.video.id)">
                                                        <v-list-item-title>แก้ไข</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list-item-group>
                                            <v-list-item-group>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>ลบ</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-menu>
                                </div>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <br><br>
                        <div id="comment_scroll"  class="column  overflow-x-auto" style="height: 400px; width: auto">
                            <div class="row " v-for="(item, index) in commentList" :key="index">
                                <div class="column" style="margin-left: 15px" >

                                    <div v-if="item.comment.user">

                                        <img v-if="item.comment.user.userdetail"
                                             :src="$url+item.comment.user.userdetail.image" alt=""
                                             class="w-5 sm:w-10 h-5 sm:h-10 rounded-full">
                                    </div>

                                </div>
                                <div class="column" style="margin-left: 10px; max-width: 300px">
                                    <div class="flex items-end">
                                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                            <div>
                                                <p class="ma-0 pa-0" v-if="item.comment">{{ item.comment.user.first_name }}
                                                    {{ item.comment.user.last_name }}</p>
                                                <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                          <p class="ma-0 pa-0" v-if="item.comment">{{ item.comment.commentText }}</p>
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                </div>
                                <div class="column" style="margin-left: 15px" v-if="item.comment.user.id == user.pk">
                                    <v-btn

                                            fab
                                            small
                                            @click="deleteComment(item.id)"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                        <div class="fixed-bottom row">
                            <input type="text" placeholder="Comment" class="w-full focus:outline-none
                focus:placeholder-gray-400 text-gray-600
                placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                                   @keyup.enter="enterPress()" v-model="form3.commentText"
                            >
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import {call, sync} from 'vuex-pathify'
    import swal from "sweetalert2";
    import Vue from 'vue'
    import VueChatScroll from 'vue-chat-scroll'

    Vue.use(VueChatScroll)

    export default {
        name: "index",
        data: () => ({
            active: false,
            hidden: false,
            response: false,
            selectedItem: 1,
            responseComment: false,
            currentVideo: null,
            currentComment: null,
            videoDataChoose:{},
            inVideo: {},
            getchallenge: {},
            commentList: {},
            dialog: false,
            dialog2: false,
            isSelecting: false,
            selectedVideoName: null,
            selectedImage: null,

            form: {
                title: null,
                video: null,
                image: null,
                user: null,
                challenge: null,
            },
            form2: {
                video: null,
                challenge: null,
            },
            form3: {
                video: null,
                user: null,
                commentText: null,
            },
            form4: {
                video: null,
                comment: null,
            },

        }),
        computed: {
            ...sync('user/*'),
            CHALLENGECHOOSE: sync('challenge/challengeChoose')
        },
        async mounted() {
            await this.loadData()
        },
        methods: {
            ...call('challenge/*'),
            ...call('videoinchallenge/*'),
            loadData: async function () {
                let id = this.$route.query.id;
                this.getchallenge = await this.getChallengeById(id)
                this.inchallenge = await this.getInChallengeById(id)
                this.getinvideo = await this.getVideoChallenge()
                // console.log(this.getinvideo)
                // console.log(this.getchallenge)
                this.CHALLENGECHOOSE = this.inchallenge
                // console.log(this.CHALLENGECHOOSE)


                this.response = true
            },
            async saveData() {
                this.form.user = this.user.pk
                let challengeCurrent = this.$route.query;
                console.log(Number(challengeCurrent.id))

                this.form.challenge = Number(challengeCurrent.id)
                let data = await this.createVideoChallenge(this.form)
                this.form2.challenge = Number(challengeCurrent.id)
                this.form2.video = data.id
                if (data) {
                    let addVideo = await this.postVideoChallenge(this.form2)
                    if (addVideo) {
                        // this.dialog =false;
                        swal.fire(
                            'สำเร็จ',
                            'เพิ่มวิดีโอสำเร็จเเล้ว',
                            'success'
                        )
                        console.log(addVideo)
                        await this.closeDialog()
                        await this.loadData()
                        // this.dialog =true;
                    } else {
                        swal.fire(
                            'ไม่สำเร็จ',
                            'เพิ่มวิดีโอสำไม่เร็จเเล้ว',
                            'error'
                        )
                    }
                }

                console.log(data)

                return data



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
            onButtonClickImage() {
                this.isSelecting = true
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {
                    once: true
                })

                this.$refs.imageuploader.click()

            },
            onFileChanged(e) {
                this.form.video = e.target.files[0]
                this.selectedVideoName = e.target.files[0].name

            },
            onSelectImage(e) {
                var files = e.target.files || e.dataTransfer.files;
                this.form.image = e.target.files[0]
                if (!files.length)
                    return this.createImage(files[0]);
            },
            createImage(file) {
                this.selectedImage = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.selectedImage = e.target.result;
                };
                reader.readAsDataURL(file);
            },

            clearForm: async function () {
                this.form = {}
                this.form2 = {}
                this.form3 = {}
            },
            async openDialogJoin() {

                this.dialog = true
            },
            async closeDialog() {
                await this.clearForm()
                this.dialog = false
            },

            async openVideoPlayer(video) {
                this.responseComment = true
                this.inVideo = video
                console.log(this.inVideo)
                let pk = this.inVideo.video.id
                console.log(pk)
                this.commentList = await this.getVideoChallengeById(pk)
                console.log(this.commentList)
                this.currentComment = this.commentList[0]
                this.dialog2 = true
                // console.log(this.inVideo.video.user)
                // console.log(this.currentComment.comment.user)

            },
            async saveComment() {
                this.form3.user = this.user.pk
                let pk = this.inVideo.video.id
                this.form3.video = pk
                let data = await this.storeComment(this.form3)
                // console.log(this.form3.user)
                // console.log(this.form3.video)
                // console.log(data.id)
                this.form4.comment = data.id
                this.form4.video = pk
                if (data) {
                    let addComment = await this.postComment(this.form4)
                    if (addComment) {
                        // console.log(addComment)

                        let pk = this.inVideo.video.id
                        this.getinvideo = await this.getVideoChallenge()
                        this.commentList = await this.getVideoChallengeById(pk)
                        await this.loadData()
                        var objDiv = document.getElementById("comment_scroll");
                        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
                        await this.clearForm()
                        console.log(this.getinvideo)


                        // this.dialog =true;
                    } else {
                        console.log("Test")

                    }
                }
                return data
            },
            async enterPress() {
                await this.saveComment()
            },

            async getTitleVideo(id) {
                this.hidden = true
                let data = await this.getVideoUpdate(id)
                this.videoDataChoose = data
                console.log(this.videoDataChoose)
                return data

            },

            async deleteComment(id) {
                // console.log(id)
                if (confirm('Do you want to delete?')) {
                    if (!false) {
                        await alert('deleted')
                        await this.deleteCommentById(id)
                        let pk = this.inVideo.video.id
                        this.getinvideo = await this.getVideoChallenge()
                        this.commentList = await this.getVideoChallengeById(pk)
                        await this.loadData()
                    }
                }
            },

            async editVideoTitle() {

                let data = await this.editVideoChallenge(this.videoDataChoose)
                console.log(data)
                let pk = this.inVideo.video.id
                this.commentList = await this.getVideoChallenge(pk)


                return data

            },
            mouseOver: function(){
                this.active = !this.active;
            }


        },
    }
</script>

<style scoped>
    /*button {*/
    /*  background-color: #6617cb;*/
    /*  background-image: linear-gradient(315deg, #6617cb 0%, #cb218e 74%);*/
    /*}*/
</style>