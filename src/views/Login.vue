<template>
    <div id="login">
        <el-form status-icon ref="ruleForm" label-width="100px">
            <div class="title">后台管理系统登录</div>
            <el-form-item label="用户名">
                <el-input type="text" v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="user.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "login",
        components: {},
        data() {
            return {
                user: {
                    name: '',
                    pwd: '',
                }
            }
        },
        methods: {
            submitForm() {
                this.$api.do(this.$path.login, this.user, (res) => {
                   this.$router.replace('/home');
                })
            },
        }, mounted() {
        }
    }
</script>

<style scoped>
    #login {
        margin: 10% 20% 20%;
        border: #409EFF solid 1px;
        padding: 2% 6% 2% 0%;
    }

    .title {
        font-size: 1.5rem;
        line-height: 3rem;
        color: #409EFF;
        margin-bottom: 1rem;
    }
</style>