<template>
    <el-container class="main-container">
        <el-header style="position: relative;">
            <div style="position: absolute;right: 42%;">
                <i class="el-icon-back" @click="handleBack" style="font-size: 40px;vertical-align: middle;"
                    v-if="!label"></i>
                <el-input placeholder="请输入昵称进行搜索，可以直接回车搜索..." v-model="searchInput" class="searchClass" clearable
                    @clear="search" @keydown.enter.native="search"></el-input>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </div>
        </el-header>

        <el-table :data="tableData" style="width: 70%" :max-height="tableHeight" highlight-current-row
            @row-click="handleCurrentChange">
            <el-table-column v-if="label" label="好友列表" width="100">
                <template>
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column v-else label="查找结果" width="100">
                <template>
                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <div>{{ scope.row.name }}</div>
                            <!-- <el-tag size="medium" color="white">{{ scope.row.name }}</el-tag> -->
                            <el-tag>{{ scope.row.address }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="">
                <template slot-scope="scope">
                    <el-button v-if="label" size="mini" @click="handleVideoChat(scope.$index, scope.row)">视频聊天</el-button>
                    <el-button v-else size="mini" @click="handleEdit(scope.$index, scope.row)">添加好友</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer :visible.sync="drawer" :with-header="false" style="position: absolute" z-index="-1">
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
                <el-container style="height: 100%;">
                    <el-header style="position: relative;width: 100%;height: 10%;background: #add6fa;">
                        {{ this.currentRow.name }}
                    </el-header>

                    <el-main style="position: absolute;height: 80%;width: 100%;top: 10%;" ref="chat">
                        <el-row v-for="(item) in chatList" :key="item.time" style="margin-top: 10px;">
                            <div v-if="item.belong !== '我'">
                                <el-col :span="4">
                                    <el-avatar icon="el-icon-user-solid" :size=33></el-avatar>
                                </el-col>
                                <el-col :span="20">
                                    <div style="border-style: solid;solid: #000;
                                background-color: #add6fa;
                                border-width: 1px;
                                border-radius: 7px;height: 31px;display: inline-block;float: left">
                                        {{ item.data }}
                                    </div>
                                </el-col>
                            </div>
                            <div v-else>
                                <el-col :span="20">
                                    <div style="border-style: solid;solid: #000;
                                background-color: #add6fa;
                                border-width: 1px;
                                border-radius: 7px;display: inline-block;float: right">
                                        {{ item.data }}
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
                                style="width: 80%;"></el-input>
                            <el-button slot="append" icon="el-icon-search" @click="sendInfo"
                                style="width: 20%;height: 32px"></el-button>
                        </div>
                    </el-footer>
                </el-container>
            </div>
        </el-drawer>
    </el-container>
</template>

<script>
export default {
    name: 'MyFriend',
    data() {
        return {
            tableHeight: 400,
            searchInput: '',
            chatInfo: '',
            drawer: false,
            currentRow: 0,
            label: true,
            listbtn: true,
            tableData: [],
            chatList: [
                {
                    data: '你好',
                    belong: '王小虎',
                    time: '2016-05-02'
                },
                {
                    data: '你好',
                    belong: '我',
                    time: '2016-05-03'
                }
            ]
        };
    },
    mounted() {
        //获取容器当前高度，重设表格的最大高度
        this.getTableMaxHeight();
        let _this = this;
        window.onresize = function () {//用于使表格高度自适应的方法  
            _this.getTableMaxHeight();//获取容器当前高度，重设表格的最大高度
        }
    },
    methods: {
        search() {
            if (this.searchInput !== '') {
                this.label = false
                this.$axios({
                    method: 'POST',
                    url: 'http://localhost:8087/searchUser',
                    data: {
                        username: this.searchInput,
                    }
                }).then(response => {
                    console.log(response.data)
                    this.label = false
                }, error => {
                    console.log('错误', error.message)
                })
            }
        },
        sendInfo() {
            // this.$axios
            //     .get("http://localhost:8080/api/coffee/search", {
            //         params: {
            //             search: this.chatInfo
            //         }
            //     })
            //     .then(function (res) {
            //         console.log(res);
            //     })
            //     .catch(resp => {
            //         console.log("请求失败：" + resp.data.code + "," + resp.data);
            //     });
            if (this.chatInfo !== '') {
                this.chatList.push({
                    data: this.chatInfo,
                    belong: '我',
                    time: new Date(this.getNowDate()).getTime(),
                })
                this.chatInfo = ''
                this.handleScrollBottom()
            }

        },
        handleCurrentChange(val) {
            this.drawer = this.listbtn;
            this.currentRow = val;
            this.listbtn = true
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
        },
        handleVideoChat() {
            this.listbtn = false
        }
    }

}
</script>

<style scoped>
.searchClass {
    border: 1px solid #c5c5c5;
    border-radius: 20px;
    background: #f4f4f4;
    line-height: 0px;
    width: 400px;
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
</style>