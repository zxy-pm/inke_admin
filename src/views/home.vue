<template>
    <div class="home">
        <el-container my-class="out-box">
            <el-aside width="auto">
                <el-menu default-active="2" router
                         class="el-menu-vertical-demo" :collapse="isCollapse" my-class="aside-menu">
                    <el-menu-item index="/home/sta">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">我的信息</span>
                    </el-menu-item>
                    <el-menu-item index="/home/order">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">我的订单</span>
                    </el-menu-item>
                    <el-menu-item index="/home/my_sta">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">我的统计</span>
                    </el-menu-item>
                    <el-menu-item index="/home/channel">
                        <i class="el-icon-s-operation"></i>
                        <span slot="title">通道账号</span>
                    </el-menu-item>
                    <el-menu-item index="/home/change">
                        <i class="el-icon-coin"></i>
                        <span slot="title">我的充值</span>
                    </el-menu-item>
                    <el-menu-item index="/home/all_sta" v-if="type==1">
                        <i class="el-icon-s-data"></i>
                        <span slot="title">全局统计</span>
                    </el-menu-item>
                    <el-menu-item index="/home/all_order" v-if="type==1">
                        <i class="el-icon-s-grid"></i>
                        <span slot="title">全局订单</span>
                    </el-menu-item>
                    <el-menu-item index="/home/user" v-if="type==1">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">客户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/all_change" v-if="type==1">
                        <i class="el-icon-coin"></i>
                        <span slot="title">全局充值</span>
                    </el-menu-item>
                    <el-menu-item index="/home/set" v-if="type==1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统配置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height="45px" style="background:#fcfcfc">
                    <i class="el-icon-s-fold" style="font-size: 2rem;text-align: center;"
                       @click="isCollapse=!isCollapse"></i>
                    <div class="notice">后台管理系统</div>
                    <el-button type="warning" size="small" plain @click="log_out">登出</el-button>
                </el-header>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    export default {
        name: 'home',
        components: {}, data() {
            return {
                isCollapse: false,
                type: 0,
            };
        },
        methods: {
            log_out() {
                this.$api.do(this.$path.logout, {}, (res) => {
                    this.$router.replace('/login');
                });
            },

        }, mounted() {
            this.$api.do(this.$path.user, {}, (res) => {
                this.type = res.data.type;
            });
            this.$router.replace('/home/sta');
        }
    }
</script>
<style>
    header {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
    }

    header .notice {
        flex: 1;
    }

    [my-class=out-box] {
        height: 100%;
    }

    [my-class=aside-menu] {
        height: 100%;
    }

    .home {
        height: 100%;
    }

    .el-main {
        padding: 5px !important;
    }
</style>