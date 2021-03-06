const actions = {
    async_updateUserInfo({ commit, getters, state}, payload) {
        commit('updateUserInfo', payload)
    }
}




export {
    actions
}