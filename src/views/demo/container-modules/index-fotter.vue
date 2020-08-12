<template>
  <div class="box">
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button @click="handleClick('first')">用户管理</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button @click="handleClick('second')">配置管理</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button @click="handleClick('third')">角色管理</el-button>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName: 'first'
      }
    },
    mounted () {
    },
    activated () {
    },
    methods: {
      handleClick(item) {
        console.log(item);
        if(item == 'first'){
          this.first();
        }else if(item == 'second'){
          this.second();
        }else {
          this.third();
        }
      },
      first(){
        console.log('我是用户管理');
      },
      second(){
        console.log('我是配置管理');
      },
      third(){
        console.log('角色管理');
      }
    }
  }
</script>

<style lang="scss">
  .box {
    text-align: center;
    .top {
      text-align: center;
    }
  }
</style>
