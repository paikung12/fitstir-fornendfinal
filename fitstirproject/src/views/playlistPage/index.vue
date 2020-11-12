<template>
    <div class="p-0 md:p-4 ">
        <div class="flex flex-wrap">
            <div class="p-0 md:p-2 w-full md:w-8/12">
                <video autoplay controls :src="$url+currentVideo.video.video"></video>
                <h2 class="text-2xl">{{currentVideo.video.name}}</h2>
            </div>
            <div class="p-0 md:p-2 w-full md:w-4/12">
                <div @click="changeVideo(video)" class="flex flex-row m-2 p-3" v-for="video,i in videoplaylist" :key="i">
                    <img :src="$url+video.video.image" alt="" style="height:60px; width:120px;" >
                    <div class="p-2">
                        <h2 class="text-xl">{{video.video.name}}</h2>
                        <h3>{{video.video.description}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        sync,
        call
    } from 'vuex-pathify';
    export default {
        name: "index",
        data(){
            return{
                videoplaylist:[],
                currentVideo: null,
                response: false,
            };
        },
        computed:{
            VIDEOLISTS : sync("video/video")
        },
        async mounted() {
            await this.loadData()
        },
        methods:{
            async changeVideo(video){
                this.currentVideo = video
            },
            async loadData(){
                let id = this.$route.query.id
                this.videoplaylist = await this.$store.dispatch('videoplaylist/getVideoPlaylist',id)
                this.currentVideo = this.videoplaylist[0]
                console.log(this.videoplaylist)

            },
        },
    }
</script>

<style scoped>
    .container {
        max-width: 1200px;
    }
</style>