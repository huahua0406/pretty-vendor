<template>
    <div id="app">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            transitionName: ''
        };
    },
    mounted() {
        console.log('app mounted');
    },
    watch: {
        $route(to, from) {
            console.log(to, from);
        }
    }
};
</script>
