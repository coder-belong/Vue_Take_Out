<template>
    <div id="nav-bar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>

    </div>
</template>

<script>
export default {
};
</script>

<style scoped>
#nav-bar {
    position: fixed;
    z-index: 9;
    display: flex;
    top: 0;
    width: 100vw;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: rgb(1,167,116);
    color: white;
}

#nav-bar .left, #nav-bar .right {
    flex: 2;
    font-size: 14px;
}

#nav-bar .center {
    flex: 6;
    font-size: 18px;
    overflow: hidden;
}
</style>
