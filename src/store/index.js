import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
    state: {
        address: '',
        active_modal: 0,
        hints: [],
        old_hints: []
    },
    mutations: {
        SAVE_ACTIVE_MODAL: (state, payload) => {
            state.active_modal = payload;
        },
        SAVE_HINTS: (state, payload) => {
            state.hints = payload;
        },
        ADD_ADDRESS: (state, payload) => {
            state.address = payload.value;
            if(state.old_hints.length > 0) {
                let double = 0;
                for (const index in state.old_hints) {
                    if(state.old_hints[index].value === payload.value) {
                        double = 1;
                        break;
                    }
                }
                if(!double) {
                    state.old_hints.push(payload);
                }
            } else {
                state.old_hints.push(payload);
            }

        },
        DELETE_HINTS: (state) => {
            state.hints = [];
        }
    },
    actions: {
        SWITCH_ACTIVE_MODAL: (context, payload) => {
            context.commit('SAVE_ACTIVE_MODAL', payload);
        },
        GET_HINTS: (context, payload) => {
            if(window.ymaps !== undefined) {
                window.ymaps.suggest(payload).then(function (items) {
                    context.commit('SAVE_HINTS', items)
                });
            }
        },
        SAVE_ADDRESS: (context, payload) => {
            context.commit('ADD_ADDRESS', payload);
        },
        CLEAR_HINTS: (context) => {
            context.commit('DELETE_HINTS')
        }
    },
    getters: {
        ADDRESS: (state) => {
            return state.address;
        },
        IS_MODAL: (state) => {
            return state.active_modal;
        },
        HINTS: (state) => {
            return state.hints;
        },
        OLD_HINTS: (state) => {
            return state.old_hints;
        }
    }
});