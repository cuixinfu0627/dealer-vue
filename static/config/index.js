/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};
  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://api.live.xingfu999.com/renren-fast';

  // img接口请求地址
  window.SITE_CONFIG['baseImg'] = 'http://q854zv8fy.bkt.clouddn.com';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
