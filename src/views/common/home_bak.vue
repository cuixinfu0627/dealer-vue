
<template>
  <div class="mod-home">
    <el-row :gutter="20" class="margin-top-20">
      <el-col :span="24">
        <el-card shadow="never" body-style="padding:15px 0">
          <h3>项目介绍</h3>
          <ul>
            <li>renren-fast-vue基于vue、element-ui构建开发，实现<a href="https://gitee.com/renrenio/renren-fast" target="_blank">renren-fast</a>后台管理前端功能，提供一套更优的前端解决方案</li>
            <li>前后端分离，通过token进行数据交互，可独立部署</li>
            <li>主题定制，通过scss变量统一一站式定制</li>
            <li>动态菜单，通过菜单管理统一管理访问路由</li>
            <li>数据切换，通过mock配置对接口数据／mock模拟数据进行切换</li>
            <li>发布时，可动态配置CDN静态资源／切换新旧版本</li>
            <li>演示地址：<a href="http://demo.open.renren.io/renren-fast" target="_blank">http://demo.open.renren.io/renren-fast</a> (账号密码：admin/admin)</li>
          </ul>
          <h3>获取帮助</h3>
          <ul>
            <li>官方社区：<a href="https://www.renren.io/community" target="_blank">https://www.renren.io/community</a></li>
            <li>前端Git地址：<a href="https://github.com/renrenio/renren-fast-vue" target="_blank">https://github.com/renrenio/renren-fast-vue</a></li>
            <li>后台Git地址：<a href="https://gitee.com/renrenio/renren-fast" target="_blank">https://gitee.com/renrenio/renren-fast</a></li>
            <li>代码生成器：<a href="https://gitee.com/renrenio/renren-generator" target="_blank">https://gitee.com/renrenio/renren-generator</a></li>
            <li>如需关注项目最新动态，请Watch、Star项目，同时也是对项目最好的支持</li>
          </ul>
          <h3>官方QQ群</h3>
          <ul>
            <li>高级群：324780204(大牛云集，跟大牛学习新技能)</li>
            <li>普通群：145799952(学习交流，互相解答各种疑问)</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="margin-top-20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card shadow="never" body-style="padding:7px 15px;">
          <h3 slot="header" class="text-gray"><i class="el-icon-time font-size-20 margin-right-10"></i>系统概况</h3>
          <el-form ref="form" class="details-form" label-width="120px" label-position="left">
            <template>
              <el-form-item label="系统名称" key="系统名称">
                <span>Happy-Live 管理系统</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="服务器IP" key="服务器IP">
                <span>{{loginLog.serverIp}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="操作系统" key="操作系统">
                <span>{{loginLog.serverOS}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="当前用户" key="当前用户">
                <span>{{loginLog.nickname}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="上次登录IP" key="上次登录IP">
                <span>{{loginLog.loginLastIp}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="上次登录时间" key="上次登录时间">
                <span>{{loginLog.loginLastTime}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="本次登录IP" key="本次登录IP">
                <span>{{loginLog.ip}}</span>
              </el-form-item>
            </template>
            <template>
              <el-form-item label="登录次数" key="登录次数">
                <span>{{loginLog.loginCount}} 次</span>
              </el-form-item>
            </template>
          </el-form>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <el-card shadow="never" body-style="padding:0; overflow: hidden;">
          <h3 slot="header" class="text-gray"><i class="el-icon-bell font-size-20 margin-right-10"></i>最新消息<router-link to="/loginUser/message" style="float:right;"><a type="primary">查看更多<i class="el-icon-d-arrow-right"></i></a></router-link></h3>
          <el-table :data="tableData" height="365">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="类型" width="180">
              <template slot-scope="scope">
                <el-tag size="small" type="success">
                  <span class="col-cont" v-html="messageTypeformatter(scope.row)"></span>
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="内容">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="toMessageDetails(scope.row)"><span class="router-link">{{scope.row.content !=null ? scope.row.content:'无内容'}}</span></a>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180">
              <template slot-scope="scope">
                <el-tag type="warning" v-if="scope.row.readStatus===1">未读</el-tag>
                <el-tag type="info" v-else-if="scope.row.readStatus===2">已读</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loginLog: {
          "id": 1051,
          "createTime": 1586410687669,
          "updateTime": 1586410687669,
          "status": 1,
          "userId": 18,
          "username": "cuixinfu",
          "nickname": "崔辛福",
          "type": 1,
          "operationType": 1,
          "country": null,
          "area": null,
          "ip": "175.0.39.201",
          "loginLastTime": "2020-04-01 15:00:21",
          "loginLastIp": "1.119.148.124",
          "serverIp": "127.0.0.1",
          "serverOS": "Linux amd64",
          "loginCount": 25
        },
        tableData: [
          {
            "id": 1,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 1,
            "groupType": 0,
            "messageType": 221,
            "title": "需求提交",
            "content": "有新的需求21586409846925446已提交，请前往审核。",
            "referenceId": 374,
            "deleted": null,
            "notifyCode": "3a4cbded5d2a4dc0af6713c0c220476b",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5366,
            "toNickName": ""
          },
          {
            "id": 2,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 2,
            "groupType": 0,
            "messageType": 221,
            "title": "反馈意见",
            "content": "有新的反馈意见请及时查看。",
            "referenceId": 339,
            "deleted": null,
            "notifyCode": "0cd6cacb139846219fb0287c7c46b2a4",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5029,
            "toNickName": ""
          },
          {
            "id": 3,
            "createTime": "2020-04-01 15:00:21",
            "updateTime": null,
            "status": 1,
            "fromType": null,
            "fromUserId": null,
            "fromNickName": "",
            "type": 3,
            "groupType": 0,
            "messageType": 221,
            "title": "用户审核",
            "content": "有新的注册用户待审核，请前往审核。",
            "referenceId": 339,
            "deleted": null,
            "notifyCode": "0cd6cacb139846219fb0287c7c46b2a4",
            "count": null,
            "types": null,
            "readTime": null,
            "readStatus": 1,
            "keyword": null,
            "beginTime": null,
            "endTime": null,
            "messageUserId": 5029,
            "toNickName": ""
          }
        ],
        messageTypeEnum: {
          1: {
            name: '需求提交',
            link: '/user/enterprise'
          },
          2: {
            name: '反馈意见',
            link: '/user/designer'
          },
          3: {
            name: '用户审核',
            link: '/project/demand'
          }
        },
        readMsgParams: {
          id: '',
          messageUserId: ''
        }
      }
    },
    methods: {
      messageTypeformatter (row) {
        let messageTypeName = this.messageTypeEnum[row.messageType]
        if (messageTypeName === null || messageTypeName === '' || messageTypeName === undefined) {
          return row.title
        }
        return messageTypeName.name
      },
      toMessageDetails (row) {
        console.log("==========查看消息详情==========")
      }
    },
    mounted () {

    },
    activated () {

    }
  }
</script>
<style lang="scss" scoped>
  .mod-home {
    line-height: 1.5;
  }
</style>


