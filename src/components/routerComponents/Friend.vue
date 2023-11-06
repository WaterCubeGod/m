<template>
    <el-container class="main-container">
        <el-header style="position: relative;">
            <div style="position: absolute;width:70%">
                <i class="el-icon-back" @click="handleBack" style="font-size: 40px;vertical-align: middle;"
                    v-if="!label"></i>
                <el-input placeholder="请输入昵称进行搜索，可以直接回车搜索..." v-model="searchInput" class="searchClass" clearable
                    @clear="search" @keydown.enter.native="search"></el-input>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </div>
        </el-header>
        <el-row style="height: 100%;" :gutter="20">
            <el-col style="height: 100%;" :span="16">
                <el-table :data="tableData" style="height: 100%;" :max-height="tableHeight" highlight-current-row
                    @row-click="handleCurrentChange">
                    <el-table-column v-if="label" label="好友列表" min-width="20%">
                        <template>
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </template>
                    </el-table-column>

                    <el-table-column v-else label="查找结果" min-width="20%">
                        <template>
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </template>
                    </el-table-column>

                    <el-table-column label="" min-width="50%">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.username }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <div>{{ scope.row.username }}</div>
                                    <!-- <el-tag size="medium" color="white">{{ scope.row.name }}</el-tag> -->
                                    <el-tag>{{ scope.row.address }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column label="" min-width="30%">
                        <el-badge :value="12" class="badge" style="width: 100%;">
                            <template slot-scope="scope">
                                <el-button v-if="label" size="mini"
                                    @click="handleVideoChat(scope.$index, scope.row)">视频聊天</el-button>
                                <el-button v-else size="mini" @click="dialogInfo.systemMessageVisible = true">添加好友</el-button>
                            </template>
                        </el-badge>
                    </el-table-column>

                </el-table>
            </el-col>

            <el-col style="height: 100%;" :span="8">
                <el-table :data="tableData" style="height: 100%;" :max-height="tableHeight" highlight-current-row
                    @row-click="handleCurrentChange">
                    <el-table-column v-if="label" label="我的申请" min-width="30%">
                        <template>
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="" min-width="30%">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.username }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <div>{{ scope.row.username }}</div>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="申请记录" min-width="30%">
                        <template slot-scope="scope">
                            <el-button v-if="label" size="mini"
                                @click="handleVideoChat(scope.$index, scope.row)">视频聊天</el-button>
                            <el-button v-else size="mini" @click="dialogInfo.systemMessageVisible = false">添加好友</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-drawer :visible.sync="drawer" :with-header="false" style="position: absolute" z-index="-1">
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
                <el-container style="height: 100%;">
                    <el-header style="position: relative;width: 100%;height: 10%;background: #add6fa;">
                        {{ this.currentRow.username }}
                    </el-header>

                    <el-main style="position: absolute;height: 80%;width: 100%;top: 10%;" ref="chat">
                        <infinite-loading :identifier="customIdentifier" direction="top"
                            @infinite="infiniteHandler"></infinite-loading>
                        <el-row v-for="(item, $index) in chatList" :key="$index" style="margin-top: 10px;">
                            <div v-if="item.fromID !== user.userID">
                                <el-col :span="4">
                                    <el-avatar icon="el-icon-user-solid" :size=33></el-avatar>
                                </el-col>
                                <el-col :span="20">
                                    <div style="border-style: solid;solid: #000;
                                background-color: #add6fa;
                                border-width: 1px;
                                border-radius: 7px;height: 31px;display: inline-block;float: left">
                                        {{ item.content }}
                                    </div>
                                </el-col>
                            </div>
                            <div v-else>
                                <el-col :span="20">
                                    <div style="border-style: solid;solid: #000;
                                background-color: #add6fa;
                                border-width: 1px;
                                border-radius: 7px;display: inline-block;float: right">
                                        {{ item.content }}
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <el-avatar icon="el-icon-user-solid" :size=33></el-avatar>
                                </el-col>
                            </div>
                        </el-row>

                    </el-main>

                    <el-footer style="position:absolute;top:90%;left:0;width:100%;height:100%;">
                        <div>
                            <el-input type="textarea" v-model="chatInfo" autosize @clear="sendInfo"
                                @keyup.enter.native="sendInfo" style="width: 80%;"></el-input>
                            <el-button slot="append" icon="el-icon-search" @click="sendInfo"
                                style="width: 20%;height: 32px"></el-button>
                        </div>
                    </el-footer>
                </el-container>
            </div>
        </el-drawer>

        <el-dialog title="添加好友" :visible.sync="dialogInfo.systemMessageVisible">
                        <el-form :model="currentRow">
                            <el-form-item label="昵称" :label-width="dialogInfo.formLabelWidth">
                                <el-input v-model="currentRow.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" :label-width="dialogInfo.formLabelWidth">
                                <el-select v-model="currentRow.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogInfo.systemMessageVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogInfo.systemMessageVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
    </el-container>
</template>

<script>
import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import InfiniteLoading from 'vue-infinite-loading'


export default {
    name: 'MyFriend',
    data() {
        return {
            customIdentifier: true,
            page: 0,
            tableHeight: 400,
            searchInput: '',
            chatInfo: '',
            drawer: false,
            receivedData: {},
            currentRow: {},
            label: true,
            listbtn: true,
            tableData: [],
            chatList: [],
            user: {
                userID: parseInt(this.$cookies.get('userID'))
            },
            messageCountList: [],
            dialogInfo: {
                systemMessageVisible: false,
                formLabelWidth: '120px',
            },

        };
    },
    mounted() {
        //获取容器当前高度，重设表格的最大高度
        this.getTableMaxHeight();
        let _this = this;
        window.onresize = function () {//用于使表格高度自适应的方法
            _this.getTableMaxHeight();//获取容器当前高度，重设表格的最大高度
        }
        this.handleFriend()
        this.connect()
        this.$socket.onmessage = (event) => {
            console.log(JSON.parse(event.data))
            this.chatList.push(JSON.parse(event.data))
            console.log(this.chatList)
        }
    },
    methods: {
        connect() {
            Vue.use(VueNativeSock, 'ws://172.22.21.89:8087/websocket/' + this.$cookies.get('userID'), {
                format: 'json',
                reconnection: true, // 自动重连
                reconnectionAttempts: 5, // 重连尝试次数
                reconnectionDelay: 3000, // 重连延迟（毫秒）
            })
            this.$axios({
                method: 'GET',
                url: 'http://172.22.21.89:8087/getUnReadMessages',
                params: {
                    userID: parseInt(this.$cookies.get('userID')),
                }
            }).then(response => {
                this.messageCountList.message = response.data.data
            }, error => {
                console.log('错误', error.message)
            })
        },
        search() {
            if (this.searchInput !== '') {
                this.label = false
                this.$axios({
                    method: 'POST',
                    url: 'http://172.22.21.89:8087/searchUser',
                    data: {
                        username: this.searchInput,
                    }
                }).then(response => {
                    console.log(response.data)
                    this.tableData = response.data.data
                    this.label = false
                }, error => {
                    console.log('错误', error.message)
                })
            }
        },
        sendInfo() {
            if (this.chatInfo.trim() !== '') {
                this.$socket.sendObj({
                    message: this.chatInfo.trim(),
                    from: this.$cookies.get('userID'),
                    to: this.currentRow.userID,
                    kind: 0,
                });
                this.chatInfo = ''
            }
        },
        handleCurrentChange(val) {
            this.drawer = this.listbtn;
            if (this.currentRow !== val && this.drawer) {
                this.chatList = []
                this.page = 0
                this.currentRow = val;
                this.customIdentifier = true
            }
            this.listbtn = true
        },
        infiniteHandler($state) {
            this.$axios({
                method: 'GET',
                url: 'http://172.22.21.89:8087/getHistoryMessage/' + this.$cookies.get('userID') + '/' + this.currentRow.userID,
                params: {
                    page: this.page
                }
            }).then(response => {
                if (response.data.data.length) {
                    this.page += 1
                    for (var i = 0; i < response.data.data.length; i++) {
                        this.chatList.unshift(response.data.data[i])
                    }
                    $state.loaded();
                } else {
                    $state.complete();
                    this.customIdentifier = false
                }
            }, error => {
                console.log('错误', error.message)
            })
        },
        getNowDate() {
            var myDate = new Date;
            var year = myDate.getFullYear(); //获取当前年
            var mon = myDate.getMonth() + 1; //获取当前月
            var date = myDate.getDate(); //获取当前日
            var hours = myDate.getHours(); //获取当前小时
            var minutes = myDate.getMinutes(); //获取当前分钟
            var seconds = myDate.getSeconds(); //获取当前秒
            var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            return now;
        },
        getTableMaxHeight() {
            this.$nextTick(function () {
                let box = document.querySelector(".main-container").attributes
                let box_clientHeight = box[0].ownerElement.clientHeight;
                this.tableHeight = box_clientHeight - 60;
            })
        },
        handleScrollBottom() {
            this.$nextTick(() => {
                let scrollElem = this.$refs.chat;
                scrollElem.scrollTo(0, scrollElem.scrollHeight)
                // scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: 'smooth' });
            });
        },
        handleBack() {
            this.label = true
            this.searchInput = ''
            this.handleFriend()
        },
        handleVideoChat() {
            this.listbtn = false
        },
        handleFriend() {
            this.$axios({
                method: 'POST',
                url: 'http://172.22.21.89:8087/showFriendList',
                data: {
                    userID: this.$cookies.get('userID'),
                    password: this.$cookies.get('username')
                }
            }).then(response => {
                this.tableData = response.data.data
            }, error => {
                console.log('错误', error.message)
            })
        },
        // handleMessageCount(messages) {
        //     for (let i = 0; i < this.tableData.length; i++) {
        //         this.messageCountList.push({
        //             userID: this.tableData.le,
        //             count: 0,
        //             message: ''
        //         })
        //     }
        //     for (let i = 0; i < this.tableData.length; i++) {
        //         this.messageCountList.push({
        //             userID: 0,
        //             count: 0,
        //             message: ''
        //         })
        //         for (let j = 0; j < messages.length; j++) {
        //             if (messages[j].fromID === this.tableData[i].userID) {

        //             }
        //         }
        //     }
        // }
    },
    async created() {

    },
    components: {
        InfiniteLoading,
    }

}
</script>

<style scoped>
.searchClass {
    border: 1px solid #c5c5c5;
    border-radius: 20px;
    background: #f4f4f4;
    line-height: 0px;
    width: 50%;
}

.searchClass .el-input-group__prepend {
    border: none;
    background-color: transparent;
    padding: 0 10px 0 30px;
}

.searchClass .el-input-group__append {
    border: none;
    background-color: transparent;
}

.searchClass .el-input__inner {
    height: 36px;
    line-height: 36px;
    border: none;
    background-color: transparent;
}

.searchClass .el-icon-search {
    font-size: 16px;
}

.searchClass .centerClass {
    height: 100%;
    line-height: 100%;
    display: inline-block;
    vertical-align: middle;
    text-align: right;
}

.searchClass .line {
    width: 1px;
    height: 26px;
    background-color: #c5c5c5;
    margin-left: 14px;
}

.searchClass:hover {
    border: 1px solid #D5E3E8;
    background: #fff;
}

.searchClass:hover .line {
    background-color: #D5E3E8;
}

.searchClass:hover .el-icon-search {
    color: #409eff;
    font-size: 16px;
}

.main-container {
    overflow: hidden;
    position: relative;
    height: calc(100% - 3rem);
}

.el-drawer {
    line-height: 10px;
}

:deep(.el-main) {
    height: 800px;
    overflow: auto;
    scrollbar-width: thin;
    /* 定义滚动条的宽度 */
    scrollbar-color: transparent transparent;
    /* 定义滚动条的颜色 */
}

/* 隐藏滚动条 */
:deep(.el-main::-webkit-scrollbar) {
    width: 0px;
    /* 定义滚动条宽度 */
    height: 8px;
    background-color: transparent;
    /* 滚动条背景颜色 */
}

.badge {
    margin-top: 10px;
    margin-right: 40px;
}
</style>