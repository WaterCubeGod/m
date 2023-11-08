<template>
    <div class="main_page">
        <el-container id="elc">
            <el-header>
                明光筑梦，少年强国
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-active="this.activeIndex" class="el-menu-vertical-demo" @open="handleOpen"
                        @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                        style="width: 200px;" router>
                            <el-menu-item index="/main/friend">
                            <i class="el-icon-chat-round"></i>
                            <span slot="title">我的好友</span>
                        </el-menu-item>
                        <el-menu-item index="/main/team">
                            <i class="el-icon-chat-line-round"></i>
                            <span slot="title">我的群组</span>
                        </el-menu-item>
                        <el-menu-item index="/main/study">
                            <i class="el-icon-notebook-1"></i>
                            <span slot="title">我的学习</span>
                        </el-menu-item>
                        <el-menu-item index="/main/my">
                            <i class="el-icon-setting"></i>
                            <span slot="title">个人主页</span>
                        </el-menu-item>
                        <el-menu-item index="/main/donation">
                            <i class="el-icon-shopping-bag-1"></i>
                            <span slot="title">捐助物查看</span>
                        </el-menu-item>
                        <el-menu-item index="/main/money">
                            <i class="el-icon-money"></i>
                            <span slot="title">捐款接收</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view />
                    <div></div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'MainPage',
    data() {
        return {
            activeIndex: ''
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    mounted() {
        this.activeIndex = this.$route.path
    }

}
</script>

<style scoped>
.main_page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.el-header,
.el-footer {
    background-color: #DCDFE6;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 30px;
}

#elc {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>