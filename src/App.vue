<template>
    <div id="app">
        <div class="uk-container uk-container-xsmall uk-padding">
            <h1>Game Timer</h1>
        </div>
        <router-view :key="$route.fullPath" />
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>
