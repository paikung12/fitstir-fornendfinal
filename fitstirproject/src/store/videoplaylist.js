import axios from "@/plugins/axios"
import {
    make
} from "vuex-pathify"

const state = {

}

const getters = {



}

const mutations = make.mutations(state)


const actions = {
    async getVideoPlaylist(context,id){
        let request = await axios.get('/backend/videoplaylist/'+id)
            .then((r)=>{
                return r.data;
            })
            .catch((e)=>{
                return e.response.data;
            })
        return request;
    },
    async postVideoPlaylist(context,params){
        let request = await axios.post('/backend/videoplaylist/',params)
            .then((r)=>{
                return r.data;
            })
            .catch((e)=>{
                return e.response.data;
            })
        return request;
    },
    async deleteVideoPlaylist(context,id){
        let request = await axios.delete('/backend/videoplaylist/'+ id)
            .then((r)=>{
                return r.data;
            })
            .catch((e)=>{
                return e.response.data;
            })
        return request;
    }

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}