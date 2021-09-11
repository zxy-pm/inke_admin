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

            <el-form style="text-align: left" label-width="180px" label-position="right" ref="form" :model="sizeForm"
                     size="mini">
<!--                <el-form-item label="扣量(0关闭1开启)">-->
<!--                    <el-input v-model="kl" placeholder="扣量(0关闭1开启)"></el-input>-->
<!--                </el-form-item>-->
                <br>
                <el-form-item label="正版扣量概率,0.1表示10%">
                    <el-input v-model="kl_fee" placeholder="正版扣量概率"></el-input>
                </el-form-item>
                <el-form-item label="盗版扣量概率,0.1表示10%">
                    <el-input v-model="kl_fee1" placeholder="盗版扣量概率"></el-input>
                </el-form-item>
<!--                <el-form-item label="扣量链接">-->
<!--                    <el-input v-model="kl_link" placeholder="扣量链接"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="save()">保存</el-button>
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
                kl: 0,
                kl_fee: 0,
                kl_fee1: 0,
                kl_link: '',
            }
        },
        methods: {
            ok(k, v) {
                this.$api.do(this.$path.set_set, {k: k, v: v});
            }, save() {
                this.$api.do(this.$path.save_kl, {
                    kl: this.kl,
                    kl_fee: this.kl_fee,
                    kl_fee1: this.kl_fee1,
                    kl_link: this.kl_link
                });
            }
        }, mounted() {
            this.$api.do(this.$path.set_get, {}, (res) => {
                this.notice = res.data.notice;
                this.kl = res.data.kl;
                this.kl_fee = res.data.kl_fee;
                this.kl_fee1 = res.data.kl_fee1;
                this.kl_link = res.data.kl_link;
            });
        }
    }
</script>

<style>
    #set .el-textarea textarea {
        min-height: 160px !important;
    }
</style>