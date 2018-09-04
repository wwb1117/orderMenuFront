<template>
    <div class="counter-warp">

    </div>
</template>

<script>
    export default {
        computed: {
            count() {
                return this.$store.state.count;
            }
        },
        methods: {
            increment() {
                this.$store.commit("increment");
            },
            decrement() {
                this.$store.commit("decrement");
            },
            goback() {
                wx.navigateTo({
                    url: '/pages/index/main'
                })
            }
        }
    };
</script>

<style>
    .counter-warp {
        text-align: center;
        margin-top: 100px;
    }

    .home {
        display: inline-block;
        margin: 100px auto;
        padding: 5px 10px;
        color: blue;
        border: 1px solid blue;
    }
</style>
