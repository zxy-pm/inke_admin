<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {}
</script>

<style>
    html, body, #app {
        width: 100%;
        height: 100vh;
    }

    * {
        border: 0;
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
    }

    /*全局表格*/
    .el-table td, .el-table th {
        padding: 5px 0 !important;
        overflow: hidden;
    }

    .el-table .warning-row td {
        background: #fbc4c4 !important;
    }

    .el-table .success-row td {
        background: rgb(160, 207, 255) !important;
    }

    /*全局顶部菜单*/
    .menu {
        display: flex;
        justify-content: start;
    }
</style>
