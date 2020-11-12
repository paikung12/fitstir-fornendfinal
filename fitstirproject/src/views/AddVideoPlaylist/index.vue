<template>
    <v-content>
        <v-container>
               <h1><v-btn dark icon text @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>  Add video Playlist </h1>
            <br>
            <v-spacer></v-spacer>
                <v-dialog
                        v-model="dialog"
                        fullscreen
                        hide-overlay
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                                class="t-text-blue-600"
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                        >
                            <v-icon color="white">mdi-movie-open</v-icon>
                            Add Video
                        </v-btn>
                    </template>
                    <v-card>
                        <v-toolbar
                                dark
                                color="primary"
                        >
                            <v-btn
                                    icon
                                    dark
                                    @click="dialog = false"
                            > X <!--                        <v-icon>mdi-close</v-icon>-->
                            </v-btn>
                            <v-toolbar-title>Choose Video</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-data-table
                                :headers="headers"
                                :items="videos"
                        >
                            <template v-slot:body="{ items }">
                                <tbody>
                                <tr v-for="list,index in items"
                                    :key="index"
                                >
                                    <td>
                                            <img :src="list.image" alt="" width="100" height="100">
                                    </td>
                                    <td class="w3-large">{{list.name}}</td>
                                    <td>

                                        <v-btn text color="primary" @click="chooseVideo(list.id)" border>
                                            <v-icon>mdi-check</v-icon> Select
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-dialog>
            <v-container>
                <br>
                <v-data-table
                        :headers="headers1"
                        :items="videoplaylist"
                >
                    <template v-slot:body="{ items }">
                        <tbody>
                        <tr v-for="list,index in items" :key="index">
                            <td>
                                <img :src="$url+list.video.image" alt="" width="100" height="100">
                            </td>
                            <td class="w3-large">{{list.video.name}}</td>
                            <td>
                                <v-btn text color="primary" @click="getDialog(list)" border>
                                    <v-icon>mdi-play-circle-outline</v-icon> View
                                </v-btn>
                                <v-btn text color="red" @click="deletePlaylist(list.id)" border>
                                    <v-icon>mdi-cup-off-outline</v-icon> remove
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-data-table>
                <v-dialog
                        v-model="dialog1"
                        width="650px"
                >
                    <v-card v-if="videoData && dialog1">
                        <v-card-title>
                            {{videoData.video.name}}
                            <v-spacer></v-spacer>
                            <v-btn icon text  @click="dialog1 = false"><v-icon>mdi-close</v-icon></v-btn>
                        </v-card-title>
                        <video style="width:100%" controls autoplay v-if="videoData" :src="$url+videoData.video.video"></video>

                    </v-card>
                </v-dialog>
            </v-container>
        </v-container>
    </v-content>
</template>

<script>
    import {sync,call} from 'vuex-pathify'
    import swal from 'sweetalert2';
     export default {
        name: "index",
        data () {
            return {
                videos:[],
                videoData:{},
                videoplaylist:[],
                dialog: false,
                dialog1:false,
                headers: [
                    {
                        text: 'Videos',
                        value: 'name',
                    },
                    { text: 'Name', value: 'name' },
                    { text: 'Manage',  filterable: false, },
                ],
                headers1: [
                    {
                        align: 'start',
                        text: 'Videos',
                        value: 'name',
                    },
                    { text: 'Name', value: 'description'},
                    { text: 'Manage', value: 'Manage' },
                ],
            }
        },
        computed:{
            VIDEOLISTS : sync("video/video"),
        },
        async mounted() {
            await this.loadData()
            await this.loadDataplaylist()
        },
        methods: {
            openDialog: async function () {
                await this.$store.dispatch("video/getVideos");
                this.dialog = true;

            },
            openVideoPlayer: async function (video) {
                this.VIDEOURL = video
                this.DIALOGPLAY = true
            },
            chooseVideo: async function (videoId, day) {
                this.videos.id = videoId
                let playlistCurrent = this.$route.query;
                let addVideo = await this.$store.dispatch('videoplaylist/postVideoPlaylist', {
                    "video": videoId,
                    "playlist": Number(playlistCurrent.id),
                })
                if (addVideo != false) {
                    // this.dialog =false;
                    swal.fire(
                        'สำเร็จ',
                        'เพิ่มวิดีโอสำเร็จเเล้ว',
                        'success'
                    )
                    // this.dialog =true;
                } else {
                    swal.fire(
                        'ไม่สำเร็จ',
                        'เพิ่มวิดีโอสำไม่เร็จเเล้ว',
                        'error'
                    )
                }
                await this.loadData();
                await  this.loadDataplaylist()
            },
            remove: async function (id) {
                await this.$store.dispatch('videoplaylist/deleteVideoPlaylist',id)
                await this.load();
            },
            save: async function () {
                for (let index = 0; index < this.LISTSVIDEOS.length; index++) {
                    if (this.LISTSVIDEOS[index].order != (index + 1)) {
                        this.LISTSVIDEOS[index].order = (index + 1);
                        await this.$store.dispatch('playlistvideo/updateVideoPlaylists', this.LISTSVIDEOS[index])
                    }
                }
                this.updateList = false;
                await this.load();
                await  this.loadDataplaylist()
            },
            async deletePlaylist(id){
                let check = swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }
                ).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
                if(check){
                    console.log('[data]',id)
                    let data  = await  this.$store.dispatch('videoplaylist/deleteVideoPlaylist',id)
                    await this.loadData()
                    await  this.loadDataplaylist()
                }

            },
            async loadDataplaylist(){
                let id = this.$route.query.id
                this.videoplaylist = await this.$store.dispatch('videoplaylist/getVideoPlaylist',id)
                console.log(this.videoplaylist)
                this.loadData()
            },
            async loadData(){
                this.videos = await this.$store.dispatch('video/getVideos')
                console.log(this.videos);

            },
            async getDialog(video){
                this.videoData = video
                //this.dialog = true
                this.dialog1 = true

            },
        },
    }
</script>

<style scoped>

</style>