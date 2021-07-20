<template>
    <div id="channel">
        <ul id="left">
            <div>通道列表</div>
            <li :class="['channel',(channel.id==vo.id?'active':'')]" v-for="vo in channels">
                <span class="channel_name" @click="select_channel(vo)">{{vo.name}}</span>
<!--                <i class="el-icon-setting" v-show="channel.id==vo.id" @click="set_money(vo)"></i>-->
                <i class="el-icon-circle-plus" v-show="channel.id==vo.id" @click="to_add(vo)"></i>
            </li>
        </ul>
        <div id="right">
            <div v-show="type==1">
                <accounts></accounts>
            </div>
            <div v-show="type==2">
                <fix_account></fix_account>
            </div>
        </div>
        <el-dialog title="通道设置" :visible="set_show">
        </el-dialog>
    </div>
</template>

<script>
    import accounts from "../components/accounts";
    import fix_account from "../components/fix_account";

    export default {
        name: "channel",
        components: {
            accounts, fix_account,
        },
        data() {
            return {
                channels: [],
                channel: {},
                type: 1,
                set_show: false,
            }
        }, methods: {
            select_channel(channel) {
                this.type = 1;
                this.channel = channel;
                this.$children[0].getAccounts();
            }, to_add(channel) {
                this.type = 2;
                this.$children[1].add(channel);
            }, on_del(account) {
                this.$api.do(this.$path.del_account, {id: account.id}, (data) => {
                    this.select_channel(this.channel);
                })
            }, on_edit(acount) {
                this.type = 2;
                this.$children[1].add(this.channel, acount);
            }, set_money(channel) {
                this.$prompt('(当前通道支持金额' + channel.money + ')', '请设置该通道金额,用-分开,例如:998-798-98', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:channel.money,
                }).then(({value}) => {
                    this.$api.do(this.$path.set_money, {cid: this.channel.id, money: value}, () => {
                        this.getChannels();
                    })
                }).catch(() => {
                });
            }, getChannels() {
                this.$api.do(this.$path.channels, {}, (data) => {
                    this.channels = data.data;
                    if (this.channels.length > 0) {
                        this.select_channel(this.channels[0])
                    }
                })
            }
        },
        mounted() {
            this.getChannels();
        }
    }
</script>

<style scoped>
    #channel {
        width: 100%;
        display: flex;
    }

    #left {
        width: 150px;
    }

    #right {
        flex: 1;
        border: 1px solid #409EFF;
        padding: 10px;
    }

    .channel {
        overflow: hidden;
    }

    .channel.active {
        color: #409EFF;
    }

    .channel {
        width: 100%;
        display: flex;
        height: 2.5rem;
        align-items: center;
        font-size: 1.2rem !important;
    }

    .channel .channel_name {
        flex: 1;
        line-height: 2.5rem;
    }

    .el-icon-circle-plus {
        line-height: 2.5rem;
        width: 25%;
    }
</style>