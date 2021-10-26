<template>
    <div id="all_sta">
        <ul>
            <li class="item"><span>今天充值:</span><span>{{change0}}</span></li>
            <li class="item"><span>昨天充值:</span><span>{{change1}}</span></li>
            <li class="item"><span>前天充值:</span><span>{{change2}}</span></li>
            <li class="item"><span>大前天充值:</span><span>{{change3}}</span></li>
            <li class="item"><span>历史充值:</span><span>{{change}}</span></li>
        </ul>
        <ul v-if="false">
            <li class="item"><span>今天扣量:</span><span>{{kl0}}</span></li>
            <li class="item"><span>昨天扣量:</span><span>{{kl1}}</span></li>
            <li class="item"><span>前天扣量:</span><span>{{kl2}}</span></li>
            <li class="item"><span>大前天扣量:</span><span>{{kl3}}</span></li>
            <li class="item"><span>历史扣量:</span><span>{{kl_all}}</span></li>
        </ul>
        <ul>
            <li class="item"><span>今天订单:</span><span>{{day0}}</span></li>
            <li class="item"><span>昨天订单:</span><span>{{day1}}</span></li>
            <li class="item"><span>前天订单:</span><span>{{day2}}</span></li>
            <li class="item"><span>大前天订单:</span><span>{{day3}}</span></li>
            <li class="item"><span>历史订单:</span><span>{{all}}</span></li>
        </ul>
        <el-table border :data="tableData" style="width: 100%" height="80vh" row-key="id">
            <el-table-column prop="id" label="id" :show-tooltip-when-overflow="true" :show-overflow-tooltip="true"
                             width="80">
            </el-table-column>
            <el-table-column prop="name" label="用户名" width="100">
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
        name: "set",
        data() {
            return {
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                all: 0,
                kl0: 0,
                kl1: 0,
                kl2: 0,
                kl3: 0,
                kl_all: 0,
                change0: 0,
                change1: 0,
                change2: 0,
                change3: 0,
                change: 0,
                tableData: [],
            }
        },
        methods: {
            sta_all() {
                this.$api.do(this.$path.all_sta, {}, (res) => {
                    this.day0 = res.data.day0;
                    this.day1 = res.data.day1;
                    this.day2 = res.data.day2;
                    this.day3 = res.data.day3;
                    this.all = res.data.all;
                    this.kl0 = res.data.kl0;
                    this.kl1 = res.data.kl1;
                    this.kl2 = res.data.kl2;
                    this.kl3 = res.data.kl3;
                    this.kl_all = res.data.kl_all;
                    this.change0 = res.data.change0;
                    this.change1 = res.data.change1;
                    this.change2 = res.data.change2;
                    this.change3 = res.data.change3;
                    this.change = res.data.change;
                })
            }, getUsers() {
                this.$api.do(this.$path.users1, {}, (data) => {
                    this.tableData = data.data;
                })
            }, sta(i,item) {
                this.$api.do(this.$path.user_sta, {id: item.id}, (res) => {
                    item.num_2 = res.data.num_2;
                    item.num_1 = res.data.num_1;
                    item.num_0 = res.data.num_0;
                    this.$set(this.tableData,i,item);
                })
            }

        }, mounted() {
            this.getUsers();
            this.sta_all();
        }
    }
</script>

<style scoped>
    .item {
        display: flex;
        line-height: 1.3;
        padding: 0 .2rem;
        background: white;
    }

    ul {
        margin: .1rem;
        border: #409EFF solid 1px;
        display: flex;
        flex-direction: row;
    }

    .item span {
        margin: 0 .2rem;
        width: 6rem;
        text-align: right;
    }

</style>