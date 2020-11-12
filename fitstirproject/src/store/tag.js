import axios from "@/plugins/axios"
import {
    get,
    make
} from "vuex-pathify"
const state = {
    tagLists: [],
}
const getters = {


}
const mutations = make.mutations(state)

const actions = {
    getTagList: async function (context, params) {
        let tags = await axios.get(`/api/tag/`)
            .then((r) => {
                return r.data;
            })
            .catch(async (e) => {
                return false;
            });
        return tags;
    },
    getTagById: async function(context, pk){
      let tag = await  axios.get(`/api/tag/${pk}`)
          .then((r) => {
              return r.data;
          })
          .catch(async (e) => {
              return false;
          });
        return tag;

    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}