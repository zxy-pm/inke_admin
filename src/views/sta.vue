<template>
    <div id="sta">
        <div class="notice">
            通知
            <pre>{{notice}}</pre>
        </div>
        <div class="top">
            <ul>
                <li class="item"><span>用户名称:</span><span>{{name}}</span></li>
                <li class="item"><span>剩余金额:</span><span>{{money}}</span></li>
                <li class="item"><span>当前费率:</span><span>{{fee}}</span></li>
            </ul>
            <ul>
                <li class="item"><span>今天总额:</span><span>{{day0}}</span></li>
                <li class="item"><span>昨天总额:</span><span>{{day1}}</span></li>
                <li class="item"><span>前天总额:</span><span>{{day2}}</span></li>
                <li class="item"><span>大前天总额:</span><span>{{day3}}</span></li>
                <li class="item"><span>历史总额:</span><span>{{all}}</span></li>
            </ul>
        </div>
        <el-form style="text-align: left" label-position="left" ref="form" label-width="220px"
                 size="mini">
            <el-form-item label="通道类型">
                <el-select v-model="tongdao_type" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通道id">
                <el-input v-model="channel_id" placeholder="通道id"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="通道key">
                <el-input v-model="channel_key" placeholder="通道key"></el-input>
            </el-form-item>
            <el-form-item label="通道网关">
                <el-input v-model="host" placeholder="通道网关"></el-input>
            </el-form-item>
            <el-form-item label="金额设置,例如 911-701-502-304 必须设置4个值,并且用-分割,金额要从大到小,并且相邻金额的差值要大于50">
                <el-input v-model="moneys" placeholder="金额设置"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save()">保存</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "sta",
        data() {
            return {
                day0: 0,
                day1: 0,
                day2: 0,
                day3: 0,
                all: 0,
                name: '',
                fee: 0,
                money: 0,
                notice: '',
                channel_key: '',
                channel_id: '',
                host: '',
                moneys: '',
                options: [
                    {label: '前端集成', value: '前端集成'},
                    {label: '外部扩展', value: '外部扩展'},
                    {label: '二维码通道', value: '二维码通道'}
                ],
                tongdao_type: '',
            }
        },
        methods: {
            sta() {
                this.$api.do(this.$path.sta, {}, (res) => {
                    this.day0 = res.data.day0;
                    this.day1 = res.data.day1;
                    this.day2 = res.data.day2;
                    this.day3 = res.data.day3;
                    this.all = res.data.all;
                    this.name = res.data.name;
                    this.money = res.data.money;
                    this.fee = res.data.fee;
                    this.notice = res.data.notice;
                    this.channel_key = res.data.channel_key;
                    this.channel_id = res.data.channel_id;
                    this.host = res.data.host;
                    this.moneys = res.data.moneys;
                    this.tongdao_type = res.data.tongdao_type;
                })
            }, save(type) {
                this.$api.do(this.$path.user_ch, {
                    id: this.channel_id,
                    key: this.channel_key,
                    moneys: this.moneys,
                    host: this.host,
                    tongdao_type: this.tongdao_type,
                }, (res) => {
                })

            }

        }, mounted() {
            this.sta();
        }
    }
</script>

<style scoped>
    .item {
        display: flex;
        line-height: 2;
        padding: 0 2rem;
        background: white;
    }

    ul {
        margin: 1rem;
        border: #409EFF solid 1px;
    }

    .item span {
        margin: 0 .2rem;
        width: 9rem;
        text-align: right;
    }

    .notice pre {
        text-align: start;
    }

    .notice {
        color: red;
        font-size: 1.2rem;
        text-align: left;
        padding-left: 10%;

    }

    .top {
        display: flex;
        flex-direction: row;
    }

    .el-input__inner {
        width: 100%;
    }
</style>