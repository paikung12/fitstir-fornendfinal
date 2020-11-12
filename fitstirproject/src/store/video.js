import axios from "@/plugins/axios"
import _ from 'lodash'
import moment from 'moment';
import {
    make
} from "vuex-pathify"

const state = {

}

const getters = {



}

const mutations = make.mutations(state)


const actions = {
    async getVideos(context,params){
        console.log(params)
        let request = await axios.get('/backend/videos/', params={params})
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