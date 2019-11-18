<template>
    <div class="uk-container uk-container-xsmall uk-margin">
        <h2>Players</h2>

        <ul class="uk-list uk-list-divider">
            <li v-if="players.length == 0">
                <i>no players added, yet...</i>
            </li>
            <li v-for="player in players" :key="player.id">
                <div class="uk-flex uk-flex-between">
                    <div>{{ player.name }}</div>
                    <div @click="removePlayer(player)">
                        <span uk-icon="trash" class="tm-pointer"></span>
                    </div>
                </div>
            </li>
        </ul>
        <form v-on:submit.prevent="addPlayer">
            <input v-model.trim="newPlayerName" type="text" class="uk-input" placeholder="enter playername" />
        </form>

        <h2>Settings</h2>

        <form class="uk-form-horizontal">
            <div class="uk-margin">
                <label for="settings-playtime" class="uk-form-label">Play-Time (in seconds)</label>
                <div class="uk-form-controls">
                    <input v-model="playtime" id="settings-playtime" type="number" class="uk-input" step="1" min="1" />
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-controls">
                    <label>
                        <input v-model="keepPlaytime" class="uk-checkbox" type="checkbox" checked /> Keep unused playtime
                    </label>
                </div>
            </div>
            <div class="uk-margin">
                <label for="settings-playtime" class="uk-form-label">Bonus-Time (in seconds)</label>
                <div class="uk-form-controls">
                    <input v-model="bonustime" id="settings-bonustime" type="number" class="uk-input" step="1" min="0" />
                </div>
            </div>
        </form>

        <hr class="uk-margin-large" />

        <div class="uk-flex uk-flex-center">
            <button @click="startGame" class="uk-button uk-button-primary uk-button-large">I'm ready...</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            newPlayerName: null
        };
    },
    computed: {
        ...mapGetters({
            players: "config/players"
        }),
        playtime: {
            get() {
                return this.$store.getters["config/playtime"];
            },
            set(value) {
                this.$store.dispatch("config/updatePlaytime", parseInt(value));
            }
        },
        keepPlaytime: {
            get() {
                return this.$store.getters["config/keepPlaytime"];
            },
            set(value) {
                this.$store.dispatch("config/updateKeepPlaytime", value);
            }
        },
        bonustime: {
            get() {
                return this.$store.getters["config/bonustime"];
            },
            set(value) {
                this.$store.dispatch("config/updateBonustime", parseInt(value));
            }
        }
    },
    methods: {
        addPlayer() {
            this.$store.dispatch("config/addPlayer", {
                name: this.newPlayerName
            });

            this.newPlayerName = null;
        },
        removePlayer(player) {
            this.$store.dispatch("config/removePlayer", player);
        },
        startGame() {
            this.$store.dispatch("config/prepareGame");
            this.$router.push("play");
        }
    }
};
</script>

<style>
.tm-pointer {
    cursor: pointer;
}
</style>