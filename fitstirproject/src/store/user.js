export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        setUser: function (state, data) {
            state.user = data
        },
        setUserProfile: function (state, data) {
            state.user.profile = data
        }
    },
    actions: {
        getUserToken: async function (context, params) {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('access_token')

            let data = await axios.post(`/rest-auth/login/`, params)
                .then((response) => {
                    localStorage.setItem('access_token', response.data.key)
                    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access_token')}`;
                    return response.data
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
            return data
        },
        getUser: async function (context, params) {
            return await axios.get(`/rest-auth/user/`)
                .then((response) => {
                    context.commit('setUser', response.data)
                    return response.data
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },

        registerUser: async function (context, params) {
            localStorage.clear()  // clear old access_token because it invalid token if send request with token
            localStorage.removeItem('access_token')

            return await axios.post(`/rest-auth/registration/`, params)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async logout(context) {
            return await axios.post(`/rest-auth/logout/`)
                .then((response) => {
                    // console.log("response", response.data)
                    delete axios.defaults.headers.common["Authorization"];
                    localStorage.removeItem('access_token')
                    return response.data
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async uploadProfileImage(context, params) {
            const fd = new FormData();
            fd.append('image', params.image, params.image.name)
            fd.append('user', params.user)

            return await axios.post('/api/v1/core/user-profile/', fd)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async updateProfileImage(context, params) {
            let id = params.id
            const fd = new FormData();
            fd.append('image', params.image, params.image.name)
            fd.append('user', params.user)

            return await axios.put(`/api/v1/core/user-profile/${id}/`, fd)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async changePassword(context, params) {

            return await axios.post('/rest-auth/password/change/', params)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getUserProfile(context, id){
            let data = await axios.get(`/api/userprofile/${id}`)
                .then((r) => {

                    return r.data;
                })
                .catch(async (e) => {
                    return false;
                });
            return data

        },
        async getUserUpdate(context, id){
            let data = await axios.get(`/api/user/${id}`)
                .then((r) => {

                    return r.data;
                })
                .catch(async (e) => {
                    return false;
                });
            return data

        },
        async updateUser(context, params){
            let data = await axios.put(`/api/user/${params.id}`, params)
                .then((r) => {
                    return r.data;
                })
                .catch(async (e) => {
                    return false;
                });
            return data

        },
        async updateUserDetail(context, params){
            var formData = new FormData();
            if (typeof (params.image) ===  'object') {
                formData.append('image', params.image)
            }
            formData.append('address',params.address)
            formData.append('phone_number',params.phone_number)
            formData.append('birthday',params.birthday)
            formData.append('bmi',params.bmi)
            formData.append('weight',params.weight)
            formData.append('high',params.high)
            formData.append('user',params.user)
            let data = await axios.put(`/api/userprofile/${params.id}`,  formData)
                .then((r) => {
                    return r.data;
                })
                .catch(async (e) => {
                    return false;
                });
            return data
        }


    },

}