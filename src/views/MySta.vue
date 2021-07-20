<template>
    <div id="mysta">
        <div class="title">分账号统计</div>
        <el-table border :data="tableData" style="width: 100%" height="80vh" row-key="id">
            <el-table-column prop="id" label="id" :show-tooltip-when-overflow="true" :show-overflow-tooltip="true"
                             width="80">
            </el-table-column>
            <el-table-column prop="aname" label="收款账号id" width="100">
            </el-table-column> <el-table-column prop="name" label='渠道' width="100">
            </el-table-column>
            <el-table-column prop="note" label="备注" width="120">
            </el-table-column>
            <el-table-column prop="num_2" label="前天"></el-table-column>
            <el-table-column prop="num_1" label="昨天"></el-table-column>
            <el-table-column prop="num_0" label="今天"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="sta(scope.$index,scope.row)" type="danger" size="mini">统计</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "my_sta",
        data() {
            return {
                tableData: [],
            }
        }, methods: {
            getAccounts() {
                this.$api.do(this.$path.accounts1, {}, (data) => {
                    this.tableData = data.data;
                })
            }, sta(i,item) {
                this.$api.do(this.$path.account_sta, {id: item.id}, (res) => {
                    item.num_2 = res.data.num_2;
                    item.num_1 = res.data.num_1;
                    item.num_0 = res.data.num_0;
                    this.$set(this.tableData,i,item);
                })
            }
        }, mounted() {
            this.getAccounts();
        }
    }
</script>

<style scoped>
    .title {
        font-size: 1.5rem;
        color: red;
    }


    #mysta .cell {
        white-space: nowrap !important;
    }
</style>