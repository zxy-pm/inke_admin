<template>
    <div id="fix_accounts">
        <div class="title">{{channel.name}}通道:{{type}}账号</div>
        <div class="title">{{channel.note}},支持金额:{{channel.money}}</div>
        <el-form label-position="top" label-width="80px" :model="account">
            <input name="id" hidden v-model="account.id"/>
            <input name="cid" hidden v-model="account.cid"/>
            <el-form-item label="账号备注">
                <el-input v-model="account.note"></el-input>
            </el-form-item>
            <el-form-item label="收款账号id">
                <el-input v-model="account.name"></el-input>
            </el-form-item>
            <el-form-item label="收款金额限制(超过后不能继续收款)">
                <el-input v-model="account.max"></el-input>
            </el-form-item>
            <el-form-item label="登录账号ck">
                <el-input v-model="account.ck"></el-input>
            </el-form-item>
            <el-form-item label="开启状态">
                <el-select v-model="account.sta" placeholder="请选择">
                    <el-option label="开启" value="1"></el-option>
                    <el-option label="暂停" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品设置" class="tm">
                <div v-for="(vo,i) in e1_obj">商品{{i+1}}
                    数量<input type="number" class="num" v-model="vo.count"/>
                    金额
                    <input class="mn" type="number" v-model="vo.money"/>
                    链接<input class="link" type="text" v-model="vo.link"/>总金额{{Math.round(vo.count*vo.money)}}
                </div>
            </el-form-item>
            <el-button type="primary" @click="to_fix()">确认提交</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "fix_accounts",
        data() {
            return {
                channel: {},
                account: {
                    id: 0,
                    cid: 0,
                    name: '',
                    note: '',
                    money: '',
                    sta: 1,
                    max: 0,
                    num: 0,
                    ck: '',
                    e1: '',
                    e2: '',
                    e3: '',
                    e4: '',
                },
                e1_obj: [{}, {}, {}, {}
                    // {noney: 100, count: 2, link: 'http://www.baidu.com'},
                ],
                type: '添加',
            }
        },
        methods: {
            add(channel, account) {
                this.channel = channel;
                this.account = account;
                if (account) {
                    this.e1_obj = JSON.parse(account.e1);
                    if (this.e1_obj == null || this.e1_obj.length != 4) {
                        this.e1_obj = [{}, {}, {}, {}];
                    }
                    this.type = '修改';
                    if (this.channel)
                        this.account.cid = this.channel.id;
                } else {
                    this.account = {
                        id: 0,
                        cid: this.channel ? this.channel.id : 0,
                        name: '',
                        note: '',
                        money: '',
                        max: 0,
                        num: 0,
                        sta: 1,
                        ck: '',
                        e1: '',
                        e2: '',
                        e3: '',
                        e4: '',
                    };
                }
            },
            to_fix() {
                if (this.check_filed())
                    this.$api.do(this.$path.fix_account, this.account, (data) => {
                        this.$parent.select_channel(this.channel);
                    })
            }, check_filed() {
                if (this.e1_obj == null || this.e1_obj.length != 4) {
                    this.$message('商品必须为4个(可重复)');
                    return false;
                }
                for (let i = 0; i < this.e1_obj.length; i++) {
                    if (this.e1_obj[i].money == '' || this.e1_obj[i].money == 0) {
                        this.$message('商品价格必须设置');
                        return false;
                    }
                }
                this.account.e1 = JSON.stringify(this.e1_obj);
                if (this.account.name == '' || this.account.note == '' || this.account.max == 0) {
                    this.$message('收款账号id,备注,收款金额限制 为必填项');
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style>
    #fix_accounts .title {
        color: red;
        font-size: 1.3rem;
    }

    #fix_accounts .el-form--label-top label.el-form-item__label {
        float: left;
        padding: 0;
        line-height: 1.3;
    }

    .tm .el-form-item__content {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .tm input {
        border: solid 1px #c0c4cc;
        border-radius: .5rem;
    }

    .tm input.num, .tm input.mn {
        width: 55px;
    }

    .tm input.link {
        flex: 1;
    }

    .tm div {
        display: flex;
        width: 100%;
        margin-bottom: 3px;
    }

</style>