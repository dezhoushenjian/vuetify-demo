const state = {
    loading:false,
    messageText:'',
    snackbar:false
}
const mutations = {
    SET_TEXT: (state, messageText) => {
        state.messageText = messageText
    },
    SET_SNACKBAR: (state, snackbar) => {
        state.snackbar = snackbar
    },
}


export default {
    namespaced: true,
    state,
    mutations,
}