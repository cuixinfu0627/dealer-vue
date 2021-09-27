## dealer-vue
- dealer-vue基于vue、element-ui构建开发，实现后台管理前端功能，提供一套更优的前端解决方案
- 前后端分离，通过token进行数据交互，可独立部署
- 主题定制，通过scss变量统一一站式定制
- 动态菜单，通过菜单管理统一管理访问路由
- 数据切换，通过mock配置对接口数据／mock模拟数据进行切换
- 发布时，可动态配置CDN静态资源／切换新旧版本
- 演示地址：暂无

## 说明文档
项目开发、部署等说明都在[wiki](https://github.com/cuixinfu0627/dealer/wiki)中。


## 更新日志
每个版本的详细更改都记录在[release notes](https://github.com/cuixinfu0627/dealer/releases)中。

npm ERR! renren-fast-vue@1.2.2 build: `gulp`问题解决
解决问题：https://blog.csdn.net/zlbdmm/article/details/110069961

1、第一步是升级gulp到4.0
npm install -g gulp-cli
npm install --save-dev gulp@4
查看gulp版本：
gulp -v

2、第二步是修改gulpfile.js文件
gulpfile.js文件在renren-fast-vue项目的根目录下。
修改原因是：gulp4.0的语法跟以往版本不同。
修改后的gulpfile.js文件内容：

3、重新打包
npm run install
npm run build --prod
