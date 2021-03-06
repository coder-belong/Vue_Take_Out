<template>
    <div id="loading-cover">
        <mt-spinner
            type="double-bounce"
            :size="39"
            color="rgb(1,167,116)"
            class="loading"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
};
</script>

<style scoped>
#loading-cover {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}

#loading-cover .loading >>> .mint-spinner-double-bounce {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
