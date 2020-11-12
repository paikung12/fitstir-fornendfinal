<template>
    <v-container class="align-center" v-if="response">
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
                        <div class="text-center">
                            <h6 class="text-gray-800 text-5xl font-bold">Exercise Challenge</h6>
                            <h2 class="text-gray-800 text-3xl font-bold">
                                Make Your Day
                            </h2>
                            <h2 class="text-gray-800 text-1xl font-bold">
                                Real People. Real Videos.
                            </h2>
                            <br>
                            <v-btn
                                    @click="$router.push('/app/createchallenge/index')"
                                    color="error"
                                    x-large
                            >
                                <v-icon>mdi-plus</v-icon>
                                Create Challenge
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
                style="width:300px;"
                v-for="list,index in CHALLENGELISTS" :key="index"
                @click="$router.push(`/app/ChallengePage/index?id=${list.id}`)"
                class=" max-w-xs rounded overflow-hidden shadow-lg my-2  justify-items-auto"
        >
            <img width="300" height="300"
                 v-if="list.image" :src="list.image" alt="">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ list.name }}t</div>
                <div class=" text-lg">{{ list.description }}t</div>
            </div>
        </div>

    </v-container>
</template>

<script>
    import {call, sync} from 'vuex-pathify'
    export default {
        name: "index",
        data: () => ({
            response: false,

        }),
        computed: {
            CHALLENGELISTS: sync('challenge/challengeLists')
        },
        async mounted() {
            await this.loadData()
        },
        methods: {
            ...call('challenge/*'),
            async loadData() {
                let data = await this.$store.dispatch('challenge/getListChallenge')
                console.log(data)
                this.CHALLENGELISTS = data
                console.log(this.CHALLENGELISTS)
                this.response = true
            },


        }
    }
</script>

<style scoped>

</style>