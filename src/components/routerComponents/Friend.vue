<template>
    <el-container>
        <el-header>
            <div>
                <el-input placeholder="请输入昵称进行搜索，可以直接回车搜索..." v-model="searchInput" class="searchClass" clearable
                    @clear="search" @keydown.enter.native="search"></el-input>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </div>
        </el-header>
        <el-table :data="tableData" style="width: 70%" max-height="400" highlight-current-row
            @row-click="handleCurrentChange">
            <el-table-column label="好友列表" width="100">
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
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer :visible.sync="drawer" :with-header="false" style="position: absolute" z-index="-1">
            <span>{{ this.currentRow.name }}</span>
            <div style="height: 83%;">
                <el-row>
                    <el-col :span="4">
                        <el-avatar icon="el-icon-user-solid" :size=33></el-avatar>
                    </el-col>
                    <el-col :span="20">
                        <div style="border-style: solid;solid: #000;
                        border-width: 1px;
                        border-radius: 10px;height: 31px;display: inline-block;float: left">你好</div>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-input type="textarea" v-model="createForm.desc" autosize @clear="sendInfo"
                    @keydown.enter.native="sendInfo" style="width: 80%;"></el-input>
                <el-button slot="append" icon="el-icon-search" @click="sendInfo"
                    style="width: 20%;height: 32px"></el-button>
            </div>
        </el-drawer>
    </el-container>
</template>

<script>
export default {
    name: 'MyFriend',
    data() {
        return {
            searchInput: '',
            chatInfo: '',
            drawer: false,
            currentRow: 0,
            createForm: {
                desc: ""
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 路'
            },
            {
                date: '2016-05-02',
                name: '王1虎',
                address: '上海市普陀区金沙江路 1518 路'
            },
            {
                date: '2016-05-02',
                name: '王2虎',
                address: '上海市普陀区金沙江路 1518 路'
            },
            {
                date: '2016-05-02',
                name: '王3虎',
                address: '上海市普陀区金沙江路 1518 路'
            },
            {
                date: '2016-05-02',
                name: '王4虎',
                address: '上海市普陀区金沙江路 1518 路'
            },
            {
                date: '2016-05-02',
                name: '王5虎',
                address: '上海市普陀区金沙江路 1518 路'
            },
            ],
            chatList: [
                {
                    data: '你好',
                    belong: '王小虎',
                    time: '2016-05-02'
                },
                {
                    data: '你好',
                    belong: '我',
                    time: '2016-05-02'
                }
            ]
        };
    },
    methods: {
        search() {
            this.$axios
                .get("http://localhost:8080/api/coffee/search", {
                    params: {
                        search: this.searchInput
                    }
                })
                .then(function (res) {
                    console.log(res);
                })
                .catch(resp => {
                    console.log("请求失败：" + resp.data.code + "," + resp.data);
                });
        },
        sendInfo() {
            this.$axios
                .get("http://localhost:8080/api/coffee/search", {
                    params: {
                        search: this.chatInfo
                    }
                })
                .then(function (res) {
                    console.log(res);
                })
                .catch(resp => {
                    console.log("请求失败：" + resp.data.code + "," + resp.data);
                });
        },
        handleCurrentChange(val) {
            this.drawer = true;
            this.currentRow = val;
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

.el-container {
    overflow: hidden;
    position: relative;
}

.el-drawer {
    line-height: 10px;
}
</style>