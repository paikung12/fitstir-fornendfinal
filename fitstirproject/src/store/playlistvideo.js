import _ from "lodash";
import { make, context, dispatch } from "vuex-pathify";
import axios from "axios";
const api = "/backend/api";

const state = {
    cueerntPlaylist:{},
    listVideos:[]
};
const getters = {};

const mutations = make.mutations(state);

const actions = {
    async getVideoPlaylists(context,playlistId){
        let videos =   await axios.get(`${api}/api/playlist/${playlistId}`)
            .then((r) => {
                state.cueerntPlaylist = r.data.playlist;
                state.listVideos = r.data.videos;
                return r.data;
            }).catch((e) => {
                return false;
            });
        return videos;
    },

    async updateVideoPlaylists(context,playlist){
        let videos =   await axios.put(`${api}/api/playlist/${playlist.id}/`,playlist)
            .then((r) => {
                return true;
            }).catch((e) => {
                return false;
            });
        return videos;
    },

    async setVideoPlaylists(context,video){
        let videos =   await axios.post(`${api}/api/playlist/`,video)
            .then((r) => {
                return true;
            }).catch((e) => {
                return false;
            });
        return videos;
    },
    async removeVideoPlaylists(context,id){
        let videos =   await axios.delete(`${api}/api/playlist/${id}`)
            .then((r) => {
                return true;
            }).catch((e) => {
                return false;
            });
        return videos;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
