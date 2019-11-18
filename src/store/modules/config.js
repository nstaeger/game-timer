export const namespaced = true;

export const state = {
    game: {
        currentPlayerIndex: null,
        status: 'paused'
    },
    players: [],
    settings: {
        playtime: 60,
        keepPlaytime: true,
        bonustime: 0
    }
}

export const mutations = {
    NEXT(state) {
        const currentPlayer = state.players[state.game.currentPlayerIndex];

        if (state.settings.keepPlaytime) {
            currentPlayer.time += state.settings.playtime;
        }
        else {
            currentPlayer.time = state.settings.playtime;
        }

        const currentPlayerIndex = state.players.indexOf(currentPlayer);
        const nextPlayerIndex = (currentPlayerIndex + 1) % state.players.length;

        state.game.currentPlayerIndex = nextPlayerIndex;
    },
    PREPARE_GAME(state) {
        if (state.players.length == 0) {
            return;
        }

        state.players.forEach(player => {
            player.time = state.settings.playtime;
            player.bonus = state.settings.bonustime;
        });

        state.game.currentPlayerIndex = 0;
    },
    PLAYER_ADD(state, player) {
        state.players.push({
            ...player,
            time: 0,
            bonus: 0
        });
    },
    PLAYER_DELETE(state, playerToRemove) {
        state.players = state.players.filter(player => player.id !== playerToRemove.id);
    },
    TICK(state) {
        const currentPlayer = state.players[state.game.currentPlayerIndex];

        if (currentPlayer.time > 0) {
            currentPlayer.time--;
            return;
        }

        if (currentPlayer.bonus > 0) {
            currentPlayer.bonus--;
            return;
        }
    },
    UPDATE_PLAYTIME(state, value) {
        state.settings.playtime = value;
    },
    UPDATE_KEEP_PLAYTIME(state, value) {
        state.settings.keepPlaytime = value;
    },
    UPDATE_BONUS_TIME(state, value) {
        state.settings.bonustime = value;
    }
}

export const actions = {
    addPlayer({ commit }, player) {
        commit('PLAYER_ADD', player);
    },
    next({ commit }) {
        commit('NEXT');
    },
    prepareGame({ commit }) {
        commit('PREPARE_GAME');
    },
    removePlayer({ commit }, player) {
        commit('PLAYER_DELETE', player);
    },
    tick({ commit }) {
        commit('TICK');
    },
    updatePlaytime({ commit }, value) {
        commit('UPDATE_PLAYTIME', value);
    },
    updateKeepPlaytime({ commit }, value) {
        commit('UPDATE_KEEP_PLAYTIME', value)
    },
    updateBonustime({ commit }, value) {
        commit('UPDATE_BONUS_TIME', value);
    }
}

export const getters = {
    currentPlayer(state) {
        return state.players[state.game.currentPlayerIndex];
    },
    gameStatus(state) {
        return state.game.status;
    },
    players(state) {
        return state.players;
    },
    playtime(state) {
        return state.settings.playtime;
    },
    keepPlaytime(state) {
        return state.settings.keepPlaytime;
    },
    bonustime(state) {
        return state.settings.bonustime;
    }
}
