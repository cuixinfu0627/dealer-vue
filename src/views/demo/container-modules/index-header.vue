<template>
  <div class="header">
    <div class="clearfix">
      <el-tag class="title">智慧城市数据监控平台</el-tag>
      <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
        <el-menu-item index="2" @click="switchAdmin">
          <template slot="title">
            <el-tooltip class="item" effect="dark" content="进入后台" placement="top">
              <icon-svg name="switch-admin" class="el-icon-switch-admin">后台</icon-svg>
            </el-tooltip>
          </template>
        </el-menu-item>
        <el-menu-item index="3" @click="toScreenFull">
          <template slot="title">
            <el-tooltip class="item" effect="dark" content="全屏显示" placement="top">
              <icon-svg name="fullscreen" class="el-icon-fullscreen">全屏</icon-svg>
            </el-tooltip>
          </template>
        </el-menu-item>
        <el-menu-item class="site-navbar__avatar" index="4">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img :src="userAvatar" :alt="userName">{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>修改头像</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import screenfull from 'screenfull'

  export default {
    data () {
      return {
        isFullscreen:true,
        userAvatar:'http://q854zv8fy.bkt.clouddn.com/upload/20200408/2041379d685c4e83b6e44b6721b05841.png',
        userName:'哦噢',
      }
    },
    computed: {

    },
    methods: {
      toScreenFull(){
        if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
          this.$message({
            message: '不支持全屏',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      },
      switchAdmin(){
        this.$router.push({path:'home'})
      }
    }
  }
</script>

<style lang="scss">
  .header {

  }
  .title {
    margin-top: 16px;
    font-size: 30px;
    margin-left: 350px;
  }
  .item {
    margin: 4px;
  }
</style>
