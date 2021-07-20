<template>
    <div id="set">
        <ul>
            <el-form>
                <el-form-item class="area" label="通知内容">
                    <el-input type="textarea" v-model="notice"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="ok('key-notice',notice)">确定</el-button>
                </el-form-item>
            </el-form>

        </ul>
    </div>
</template>

<script>
    export default {
        name: "set",
        data() {
            return {
                notice: '',
            }
        },
        methods: {
            ok(k, v) {
                this.$api.do(this.$path.set_set, {k: k, v: v});
            },
        }, mounted() {
            this.$api.do(this.$path.set_get, {}, (res) => {
                this.notice = res.data.notice;
            });
        }
    }
</script>

<style>
    #set .el-textarea textarea {
        min-height: 160px !important;
    }
</style>