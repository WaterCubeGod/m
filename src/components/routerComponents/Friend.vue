<template>
    <div style="display: inline-flex;">
        <el-input placeholder="请输入昵称进行搜索，可以直接回车搜索..." v-model="searchInput" class="searchClass" clearable @clear="search"
            @keydown.enter.native="search"></el-input>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </div>
</template>

<script>
export default {
    name: 'MyFriend',
    data() {
        return {
            searchInput: '',
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
</style>