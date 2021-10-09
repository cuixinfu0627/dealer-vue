<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">多多配送平台</a>
        <a class="site-navbar__brand-mini" href="javascript:;">-</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge value="new">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <template slot="title">
            <el-badge value="">
              <i class="el-icon-bell"></i>
            </el-badge>
          </template>
        </el-menu-item>
        <el-menu-item index="5" @click="toScreenFull">
          <template slot="title">
            <icon-svg name="fullscreen" class="el-icon-fullscreen"></icon-svg>
          </template>
        </el-menu-item>
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img :src="userAvatar" :alt="userName">{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="updateHeadHandle()">修改头像</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
    <!-- 弹窗, 修改头像 -->
    <update-head v-if="updateHeadVisible" ref="updateHead"></update-head>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import UpdateHead from './main-navbar-update-head'
  import {clearLoginInfo} from '@/utils'
  import screenfull from 'screenfull'

  export default {
    data () {
      return {
        updatePassowrdVisible: false,
        updateHeadVisible: false,
        //vue 全屏主键 npm install --save screenfull
        isFullscreen:true
      }
    },
    components: {
      UpdatePassword,
      UpdateHead
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      },
      userAvatar: {
        get () {
          let userAvatar = this.$store.state.user.avatar
          return userAvatar
          //return this.$http.getFileUrl(userAvatar)
        }
      }
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 修改密码
      updateHeadHandle () {
        this.updateHeadVisible = true
        this.$nextTick(() => {
          this.$refs.updateHead.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      toScreenFull(){
        if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
          this.$message({
            message: '不支持全屏',
            type: 'warning'
          })
          return false
        }
        screenfull.toggle()
      }
    },
    mounted () {

    }
  }
</script>
