<template>
    <v-content>
        <v-container v-if="response">
            <v-chip
                    class="ma-2"
                    color="primary"
            >
                <h1>{{tag.name}}</h1>
            </v-chip>
            <v-layout wrap >
                <pre>{{videos.tag_type}}</pre>
                <v-card style="width:220px;  " class="ma-2"
                        v-if=""
                        v-for="item, index in videos"
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
                            <p1 v-if="item.tag_type"> {{item.tag_type.name}}</p1>
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
            <v-card v-if="videoData && dialog">
                <v-card-title>
                    <h2>{{videoData.name}}</h2>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">X</v-btn>
                </v-card-title>
                <video style="width:100%;" controls autoplay v-if="videoData" :src="videoData.video"></video>
            </v-card>
        </v-dialog>



    </v-content>
</template>




<script>
    export default {
        name: "index",
        data () {
            return{
                response:false,
                videoData:[],
                dialog:false,
                tag:[],
                videos:null,
                params:{
                  tag_type__detail: null,
                },

            }
        },
        async mounted() {

            if(this.$route.query.id !== this.params.tag_type__detail ){
                this.params.tag_type__detail = await this.$route.query.id
                this.loadData()
                this.loadTag()
            }

        },
        watch:{
            async $route(to, from) {
                await this.loadData()
                await this.loadTag()
            }
        },
        methods: {
            async loadData() {
                this.videos = await this.$store.dispatch('video/getVideos', this.params )
            },

            async loadTag(){
                let tagid = await this.$route.query.id
                this.tags = await  this.$store.dispatch('tag/getTagById', tagid)
                this.tag = this.tags
                this.response = true

            },
            async getDialog(video) {
                this.dialog = true
                this.videoData = video
            },

            },


    }
</script>

<style scoped>

</style>