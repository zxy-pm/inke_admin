<template>
    <div id="accounts">
        <div class="title">{{this.$parent.channel.name}}账号列表</div>
        <el-table border :data="tableData" style="width: 100%" height="80vh">
            <el-table-column prop="id" label="id" :show-tooltip-when-overflow="true" :show-overflow-tooltip="true"
                             width="80">
            </el-table-column>
            <el-table-column prop="name" label="收款账号id" width="100">
            </el-table-column>
            <el-table-column prop="note" label="备注" width="160">
            </el-table-column>
<!--            <el-table-column prop="money" label="支持金额" width="180">-->
<!--            </el-table-column>-->
            <el-table-column prop="num" label="总收入">
            </el-table-column>
            <el-table-column prop="max" label="最高限制"></el-table-column>
            <el-table-column prop="sta" label="开启状态" :formatter="format_sta"></el-table-column>
<!--            <el-table-column prop="ck" label="登录账号ck" width="140" show-overflow-tooltip>-->
<!--            </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
                    <el-button @click="edit(scope.row)" type="text" size="mini">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "accounts",
        data() {
            return {
                tableData: [],
            }
        }, methods: {
            getAccounts() {
                this.$api.do(this.$path.accounts, {channel_id: this.$parent.channel.id}, (data) => {
                    this.tableData = data.data;
                    // if (this.tableData.length == 1 && this.tableData[0].money == '') {
                    //     this.$confirm('第一次添加账号,必须设置支持金额(点击左侧通列表中的设置按钮即可)', '警告', {
                    //         confirmButtonText: '确定',
                    //         cancelButtonText: '取消',
                    //         type: 'warning',
                    //     }).then(() => {
                    //
                    //     }).catch(() => {
                    //     });
                    // }
                })
            }, del(v) {
                this.$confirm('删除后不可恢复, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$parent.on_del(v);
                }).catch(() => {
                });

            }, edit(v) {
                this.$parent.on_edit(v);
            }, format_sta(row, column, value, index) {
                return value == 1 ? '开启' : `暂停`;
            }, format_num(row, column, value, index) {
            }
        }, mounted() {

        }
    }
</script>

<style scoped>
    .title {
        font-size: 1.5rem;
        color: red;
    }


     #accounts .cell {
         white-space: nowrap !important;
     }
</style>