<template>
    <v-main>
        <v-container>
            <p class="text-2xl"> Recommend playlist</p>
            <v-container>
                <div>
                    <v-layout row >
                        <v-card style="width:220px; " class="ma-2"
                                v-for="(items, index) in videoadmin"
                                :key="index"
                                @click="$router.push(`/playlistpage?id=${items.id}`)"
                        >
                            <v-img :src="$url+items.image" style="width:100%; height:160px;" />
                            <v-card-title>
                                <div>
                                    <v-chip
                                            class="ma-2"
                                            color="primary"
                                    >
                                        {{items.name}}
                                    </v-chip>
                                    <br>
                                    {{items.description}}

                                </div>
                            </v-card-title>

                        </v-card>
                    </v-layout>
                </div>

            </v-container>
        </v-container>
        <v-container>
                <p class="text-2xl">How to exercise</p>
        </v-container>
        <v-container>
            <v-layout row >
                    <v-card style="width:220px; " class="ma-2"
                            v-for="(item, index) in videos"
                            :key="index"
                            @click="getDialog(item)"
                    >
                        <v-img :src="item.image" style="width:100%; height:160px;" />
                        <v-card-title>
                            <div>
                                <v-chip
                                        class="ma-2"
                                        color="primary"
                                >
                                    {{item.name}}
                                </v-chip>
                                <br>
                                {{item.description}}
                                {{item.tag_type.name}}
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            {{item.tag_type.name}}
                        </v-card-actions>
                    </v-card>
            </v-layout>
        </v-container>
        <v-dialog
                v-model="dialog"
        >
            <v-card v-if="videoData ">
                <v-card-title >
                    <h2>{{videoData.name}}</h2>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">X</v-btn>
                </v-card-title>
                <video style="width:100%;" controls autoplay v-if="videoData" :src="videoData.video"></video>
            </v-card>
        </v-dialog>
    </v-main>

</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                dialog: true,
                alignmentsAvailable: [
                    'start',
                    'center',
                    'end',
                    'baseline',
                    'stretch',
                ],
                alignment: 'center',
                dense: false,
                justifyAvailable: [
                    'start',
                    'center',
                    'end',
                    'space-around',
                    'space-between',
                ],
                justify: 'center',
                videos:[],
                tag:[],
                videoData:{},
                videoadmin:[]

            }
        },
        mounted() {
             this.loadData()
             this.getDialog()
        },
        methods: {
            async loadData() {
                this.tag  = await axios.get('/api/tag')
                    .then(response => (this.tag = response))
                this.videos = await this.$store.dispatch('video/getVideos')
                console.log(this.videos);
                this.videoadmin =await axios.get('/api/adminplaylist')
                .then((r) =>{
                    return r.data
                })
                console.log(this.videos);
            },
            async getDialog(video){
                this.videoData = video
                this.dialog = true

            },

        }
    }
</script>

<style scoped>

</style>