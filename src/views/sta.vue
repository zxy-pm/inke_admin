<template>
    <div id="sta">
        <div class="notice">
            通知<pre>{{notice}}</pre>
        </div>
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
                name: '',
                fee: 0,
                money: 0,
                notice: '',
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

</style>