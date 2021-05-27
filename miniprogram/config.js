//小程序配置文件

// var apiUrl ="https://zjgsujiaoxue.applinzi.com/index.php/Api"
// var apiUrl = "http://127.0.0.1/1/index.php/Api"
var apiUrl = "http://localhost/tushuguan"
var appid = "wx3801ca6d1b4c4fc4"

var config = {
  apiUrl,
  appid,
  wxUrl: `${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`,
  courseId: 10016
};

module.exports = config