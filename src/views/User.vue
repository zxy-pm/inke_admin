<template>
    <div id="user">
        <div class="menu">
            <span class="sta"> 总用户:{{total}} 总余额:{{ye}} </span>
            <el-button @click="change_page(page)" type="primary" size="mini" icon="el-icon-refresh"></el-button>
            <el-button @click="add" type="primary" size="mini" icon="el-icon-circle-plus-outline">新增</el-button>
        </div>

        <el-table my-class="order_table" stripe border height="600px"
                  :data="tableData" style="width: 100%" @cell-click="cell_click" :cell-style="cell_style">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="pwd" label="密码" :formatter="pwd_form"></el-table-column>
            <el-table-column prop="fee" label="手续费率"></el-table-column>
            <el-table-column prop="money" label="余额"></el-table-column>
            <el-table-column prop="type" label="类型" :formatter="type_form"></el-table-column>
            <el-table-column prop="qkey" label="请求参数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="last_login" label="最近登录" width="160"></el-table-column>
            <el-table-column prop="note" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="channel_id" label="通道id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="channel_key" label="通道key" show-overflow-tooltip></el-table-column>
            <el-table-column prop="host" label="通道网关" show-overflow-tooltip></el-table-column>
            <el-table-column prop="moneys" label="支持金额" show-overflow-tooltip></el-table-column>
            <!--            <el-table-column prop="kl" label="扣量开启" :formatter="js_format"></el-table-column>-->
            <!--            <el-table-column prop="kl_fee" label="扣量概率"></el-table-column>-->
            <!--            <el-table-column prop="klsd" label="扣量时段" show-overflow-tooltip></el-table-column>-->
            <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row.id)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="change_page" :page-size='page_size'
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "order",
        data() {
            return {
                page: 1,
                page_size: 40,
                total: 1,
                tableData: [],
                ye: 0,
            }
        }
        ,
        methods: {
            change_page(page) {
                this.$api.do(this.$path.users, {page}, (data) => {
                    this.tableData = data.data.users;
                    this.ye = data.data.ye;
                    this.total = data.count;
                })
            }, js_format(val) {
                return val.kl == 0 ? '否' : '是';
            }, sjkl_format(val) {
                return val.sjkl == 0 ? '否' : '是';
            }, type_form(val) {
                return val.type == 0 ? '普通客户' : '管理员';
            }, pwd_form() {
                return '已加密'
            }, del(id) {
                this.$confirm('删除后不可恢复, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$api.do(this.$path.del_user, {id}, () => {
                        this.change_page(1);
                    });
                }).catch(() => {
                });

            }, add() {
                this.$prompt('请输入账户名称(新建后要记得修改密码)', '新增账号', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[0-9a-zA-Z_]{6,}$/,
                    inputErrorMessage: '必须是数字字母下划线组合,且至少6位'
                }).then(({value}) => {
                    this.$api.do(this.$path.add_user, {name: value}, (res) => {
                        this.change_page(1);
                    });
                });
            }, cell_click(row, column, cell, event) {
                let msg = '';
                let title = '';
                let pat = /^[*]{1,}$/;
                let pat_msg = '';
                switch (column.property) {
                    case "money":
                        msg = '请输入充值金额';
                        title = '您正在充值';
                        pat = /\d{1,}/;
                        pat_msg = '必须输入纯数字';
                        break;
                    case "name":
                        msg = '请输入新用户名';
                        title = '您正在修改用户名';
                        pat = /[0-9a-zA-Z]{6,12}/;
                        pat_msg = '必须6-12位字母或数字';
                        break;
                    case "pwd":
                        msg = '请输入新密码';
                        title = '您正在修改密码';
                        pat = /[0-9a-zA-Z]{6,12}/;
                        pat_msg = '必须6-12位字母或数字';
                        break;
                    case "fee":
                        msg = '请输入通道费率';
                        title = '您正在修改通道费率';
                        pat = /^0.?\d*$/;
                        pat_msg = '必须是0-1之间的小数(包含0)';
                        break;
                    case "note":
                        msg = '请输入备注';
                        title = '您正在修改备注';
                        pat = '';
                        pat_msg = '';
                        break;
                    case "kl":
                        msg = '输入:0表示关闭,1表示开启';
                        title = '开启或关闭扣量';
                        pat = /^[01]{1}$/;
                        pat_msg = '只能输入0或者1';
                        break;
                    case "kl_fee":
                        msg = '输入扣量概率:例如0.1表示扣量10%';
                        title = '您正在修改扣量概率';
                        pat = /^0.?\d*$/;
                        pat_msg = '只能0-1之间的小数(包含0)';
                        break;
                    case "channel_id":
                        msg = '输入通道id';
                        title = '您正在修改扣量概率';
                        pat = '';
                        pat_msg = '';
                        break;
                    case "channel_key":
                        msg = '输入通道key';
                        title = '您正在修改扣量概率';
                        pat = '';
                        pat_msg = '';
                        break;
                    case "host":
                        msg = '输入通道网关';
                        title = '您正在修改通道网关';
                        pat = '';
                        pat_msg = '';
                        break;
                    case "moneys":
                        msg = '输入支持金额用-分割(只能支持4个值),例如 921-720-531-301';
                        title = '输入支持金额';
                        pat = '';
                        pat_msg = '';
                        break;
                    case "qkey":
                        this.$prompt('刷新后旧的apk包立即失效',
                            '用户请求参数,需要打包到apk中',
                            {
                                inputValue: row[column.property],
                                confirmButtonText: '刷新(危险操作)',
                                cancelButtonText: '取消',
                                closeOnClickModal: false,
                            })
                            .then(({value}) => {
                                this.$confirm('刷新后此用户所有apk包都会失效, 是否继续?', '警告', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'error'
                                }).then(() => {
                                    this.$api.do(this.$path.fix_user, {
                                        id: row.id,
                                        k: column.property,
                                        v: ''
                                    }, (res) => {
                                        this.change_page(1);
                                    });

                                }).catch(() => {

                                    let uid = "123";
                                    uid = interval(uid);
                                });

                            })
                            .catch(() => {
                            });
                        return false;
                }
                if (msg == '') return false;
                this.$prompt(msg, title + '(用户' + row.name + ')', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: pat,
                    inputErrorMessage: pat_msg,
                    inputValue: row[column.property],
                }).then(({value}) => {
                    this.$api.do(this.$path.fix_user, {id: row.id, k: column.property, v: value}, (res) => {
                        this.change_page(1);
                    });
                }).catch(() => {
                });
            }, cell_style(row) {
                let v = row.column.property;
                if (v != 'id' && v != 'last_login' && v != 'type')
                    return {
                        color: '#409eff',
                    };
            }
        }, mounted() {
            this.change_page(1);
        }
    }
</script>

<style scoped>
    #user {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    [my-class=order_table] {
        flex: 1;
    }

    .sta {
        padding: .5rem;
    }

</style>
<style>

    #user .cell {
        white-space: nowrap !important;
    }
</style>
