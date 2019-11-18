<template>
    <div class="uk-container uk-container-xsmall">
        <div class="uk-text-center">
            <div class="uk-margin">
                <div class="uk-text-muted">current player</div>
                <div class="uk-heading-medium uk-margin-remove">{{ currentPlayer.name }}</div>
                <div class="uk-heading-xlarge uk-margin-remove">{{ currentPlayerTimeLeft }} sec.</div>
            </div>
            <div class="uk-margin-large">
                <button
                    @click="toggleRunning"
                    v-html="running ? 'Pause' : 'Start'"
                    class="uk-button uk-button-primary uk-button-large uk-margin-left uk-margin-right"
                ></button>
                <button
                    @click="next"
                    class="uk-button uk-button-primary uk-button-large uk-margin-left uk-margin-right"
                >Next</button>
            </div>
        </div>

        <div>
            <table class="uk-table uk-table-divider uk-table-small">
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Bonus</th>
                </tr>
                <tr
                    v-for="(player, index) in players"
                    :key="index"
                    :class="{'uk-background-muted': player == currentPlayer}"
                >
                    <td>{{ player.name }}</td>
                    <td>{{ player.time }} sec.</td>
                    <td>{{ player.bonus }} sec.</td>
                </tr>
            </table>
        </div>

        <div hidden>
            <audio controls ref="horn" hidden>
                <source src="horn.mp3" type="audio/mp3" />Your browser does not support the audio element.
            </audio>
            <audio controls ref="tick" hidden>
                <source src="tick.mp3" type="audio/mp3" />Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            running: false,
            timer: null
        };
    },
    computed: {
        ...mapGetters({
            currentPlayer: "config/currentPlayer",
            players: "config/players"
        }),
        currentPlayerTimeLeft() {
            return this.currentPlayer.time + this.currentPlayer.bonus;
        }
    },
    methods: {
        toggleRunning() {
            if (this.running) {
                this.stop();
            } else {
                this.start();
            }
        },
        start() {
            this.running = true;
            this.timer = setInterval(() => {
                this.tick();
            }, 1000);
        },
        stop() {
            this.running = false;
            clearInterval(this.timer);
            this.timer = null;
        },
        tick() {
            this.$store.dispatch("config/tick");

            if (this.currentPlayerTimeLeft == 0) {
                this.playHorn();
                this.stop();
                this.next();

                return;
            }
            if (this.currentPlayerTimeLeft < 10) {
                this.playTick();
            }
        },
        next() {
            this.$store.dispatch("config/next");
        },
        playHorn() {
            this.$refs.horn.play();
        },
        playTick() {
            this.$refs.tick.play();
        }
    }
};
</script>