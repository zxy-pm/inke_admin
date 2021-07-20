<template>
    <div id="order">
        <div class="menu">
            <el-button @click="change_page(page)" type="primary" size="mini" icon="el-icon-refresh"></el-button>
<!--            <el-button @click="del(5)" type="primary" size="mini" icon="el-icon-delete">删除5天前订单</el-button>-->
<!--            <el-button @click="del(10)" type="primary" size="mini" icon="el-icon-delete">删除10天前订单</el-button>-->
        </div>

        <el-table my-class="order_table" stripe border height="600px" :row-class-name="tableRowClassName"
                  :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="80"></el-table-column>
            <el-table-column prop="name" label="通道" width="180"></el-table-column>
            <el-table-column prop="money" label="金额" width="180"></el-table-column>
            <el-table-column prop="type" label="来源"></el-table-column>
            <el-table-column prop="time" label="创建"></el-table-column>
            <el-table-column prop="finish_time" label="操作时间" width="160"></el-table-column>
            <el-table-column prop="sta" label="状态"></el-table-column>
            <el-table-column v-if="false" prop="js" label="已结算" :formatter="js_format"></el-table-column>
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
            }
        }
        ,
        methods: {
            change_page(page) {
                this.$api.do(this.$path.orders, {page}, (data) => {
                    this.tableData = data.data;
                    this.total = data.count;
                })
            }, tableRowClassName({row, rowIndex}) {
                if (row.sta == '支付成功') return 'success-row';
                else if (row.sta == '风控失败') return 'warning-row';
            }, js_format(val) {
                return val.js == 0 ? '否' : '是';
            }, del(i) {
                this.$confirm('删除后不可恢复, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$api.do(this.$path.del, {day: i}, () => {
                        this.change_page(1);
                    });
                }).catch(() => {
                });

            }
        }, mounted() {
            this.change_page(1);
        }
    }
</script>

<style scoped>
    #order {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    [my-class=order_table] {
        flex: 1;
    }
</style>
