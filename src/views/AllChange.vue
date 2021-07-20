<template>
    <div id="all_change">
        <div class="menu">
            <el-button @click="change_page(page)" type="primary" size="mini" icon="el-icon-refresh"></el-button>
        </div>

        <el-table my-class="order_table" stripe border height="600px"
                  :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="80"></el-table-column>
            <el-table-column prop="uid" label="用户id" width="80"></el-table-column>
            <el-table-column prop="money" label="金额" width="180"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
        </el-table>
        <el-pagination @current-change="change_page" :page-size='page_size'
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "all_change",
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
                this.$api.do(this.$path.all_changes, {page}, (data) => {
                    this.tableData = data.data;
                    this.total = data.count;
                })
            }
        }, mounted() {
            this.change_page(1);
        }
    }
</script>

<style scoped>
    #all_change {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    [my-class=order_table] {
        flex: 1;
    }
</style>
