import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as config from './modules/config'
import * as game from './modules/game'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    modules: {
        config,
        game
    },
    plugins: [vuexLocal.plugin]
});
