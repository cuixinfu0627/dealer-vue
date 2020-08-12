export default class myUtils {
    /**
     * 判断字符串是否为空
     * @param str
     * @returns {boolean}
     */
    static isNull(str) {
        return str == null || str.length === 0 || str === '';
    }

    /**
     *
     * @desc  判断是否为身份证号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    static isIdCard(str) {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }

    /**
     * @desc   判断是否为手机号
     * @param  {String|Number} str
     * @return {Boolean}
     */
    static isPhoneNum(str) {
        return /^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(str)
    }
    /**
     * @desc   判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
     * @param  {String|Number} str
     * @return {Boolean}
     */
    static checkIsNumber(input) {
        var re = /^[0-9]+.?[0-9]*$/;
        var nubmer = document.getElementById(input).value;
        if (!re.test(nubmer)) {
            return false;
        }
        return true;
    }
    /**
     * @desc   获取url里面的参数值
     * @param  {String} name 参数key
     * @return {String} 返回参数值
     */
    static getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    /**
     * @desc   获取当前时间
     * @param  {Number} days 加减时间天数
     * @return {String}
     */
    static getNowFormatDate(days) {
        var date = new Date();
        var date_s = date.getTime();//转化为时间戳毫秒数
        date.setTime(date_s + days * 1000 * 60 * 60 * 24);//设置新时间比旧时间多一天
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
    /**
     * @desc   传递时间
     * @param  {Number} days 加减时间小时
     * @return {String}
     */
    static getNowFormatDateMinus(time, hours) {
        let date = new Date(time);
        date.setHours(date.getHours() - hours);
        let month = date.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        let times = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return times;
    }
    /**
     * @desc   比较两个时间大小
     * @param  {Date} startDate 开始时间
     * @param  {Date} endDate 结束时间
     * @return {Boolean}
     */
    static compareDate(startDate, endDate) {
        var date1 = new Date(startDate);
        var date2 = new Date(endDate);
        if (date1.getTime() > date2.getTime()) {
            return true;
        } else {
            return false;
        }
    }
    // 获取当前月的第一天
    static getCurrentMonthFirst() {
        //获取当前时间
        let date = new Date();
        //获取当前月的第一天
        let monthStart = date.setDate(1);
        return monthStart;
    }
    // 获取当前月的最后一天
    static getCurrentMonthLast() {
        //获取当前时间
        let date = new Date();
        //获取当前月
        let currentMonth = date.getMonth();
        //获取到下一个月，++currentMonth表示本月+1，一元运算
        let nextMonth = ++currentMonth;
        //获取到下个月的第一天
        let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        return new Date(nextMonthFirstDay);
    }

    /* 根据文件名后缀区分返回文件类型
    * @param: fileName - 文件名称
    * @param: 数据返回 1) 无后缀匹配 - false
    * @param: 数据返回 2) 匹配图片 - image
    * @param: 数据返回 3) 匹配 txt - txt
    * @param: 数据返回 4) 匹配 excel - excel
    * @param: 数据返回 5) 匹配 word - word
    * @param: 数据返回 6) 匹配 pdf - pdf
    * @param: 数据返回 7) 匹配 ppt - ppt
    * @param: 数据返回 8) 匹配 视频 - video
    * @param: 数据返回 9) 匹配 音频 - radio
    * @param: 数据返回 10) 其他匹配项 - other
    */
    static matchType(fileName) {
        // 后缀获取
        var suffix = '';
        // 获取类型结果
        var result = '';
        try {
            var flieArr = fileName.split('.');
            suffix = flieArr[flieArr.length - 1];
        } catch (err) {
            suffix = '';
        }
        // fileName无后缀返回 false
        if (!suffix) {
            result = false;
            return result;
        }
        // 图片格式
        var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
        // 进行图片匹配
        result = imglist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'image';
            return result;
        };
        // 匹配txt
        var txtlist = ['txt'];
        result = txtlist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'txt';
            return result;
        };
        // 匹配 excel
        var excelist = ['xls', 'xlsx'];
        result = excelist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'excel';
            return result;
        };
        // 匹配 word
        var wordlist = ['doc', 'docx'];
        result = wordlist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'word';
            return result;
        };
        // 匹配 pdf
        var pdflist = ['pdf'];
        result = pdflist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'pdf';
            return result;
        };
        // 匹配 ppt
        var pptlist = ['ppt'];
        result = pptlist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'ppt';
            return result;
        };
        // 匹配 视频
        var videolist = ['mp4', 'm2v', 'mkv'];
        result = videolist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'video';
            return result;
        };
        // 匹配 音频
        var radiolist = ['mp3', 'wav', 'wmv'];
        result = radiolist.some(function (item) {
            return item == suffix;
        });
        if (result) {
            result = 'radio';
            return result;
        }
        // 其他 文件类型
        result = 'other';
        return result;
    }
    /**
     * @desc   获取单位信息
     * @param  {Number} unitId
     * @return {Object}
     */
    static getByIdUnitInfo(unitId) {
        var unitInfo = {
            name: "",
            location: "",
            totalScore: 0
        }
        // 获取单位信息
        if (unitId == 0 || unitId == null) {
            unitInfo.name = "全部单位";
            unitInfo.location = "-";
            unitInfo.totalScore = 0;
        } else {
            this.$fetch("/api/unit/queryUnitInfo", { 'unitId': unitId }).then(response => {
                let data = response.data;
                if (response.data) {
                    unitInfo.name = data.unitInfo.name;
                    unitInfo.location = data.unitInfo.location;
                    unitInfo.totalScore = data.totalScore;
                }
            });
        }
        //console.log(unitInfo);
        return unitInfo;
    }
    /**
     * @desc   导出表格
     * @param  {String} 文件名称
     * @return void
     */
    static export_table(fileName, flag) {
        var nowDate = this.getNowFormatDate(0);
        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[1].outerHTML + "</body></html>";
        if (flag) {
            html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[0].outerHTML + document.getElementsByTagName("table")[1].outerHTML + "</body></html>";
        }
        // var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById("build_table").outerHTML + "</body></html>";
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
        var a = document.getElementsByName("export")[0];
        // 利用URL.createObjectURL()方法为a元素生成blob URL
        a.href = URL.createObjectURL(blob);
        // 设置文件名
        a.download = fileName + nowDate + ".xls";
    }
    /**
     * @desc   导出表格 特殊处理
     * @param  {String} 文件名称
     * @return void
     */
    static export_table_other(fileName) {
        var nowDate = this.getNowFormatDate(0);
        var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[1].outerHTML + "</body></html>";
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
        var a = document.getElementsByName("export")[0];
        a.href = URL.createObjectURL(blob);
        a.download = fileName + nowDate + ".xls";
    }
    /**
     * @desc   打印表格
     * @startprint 打印开始区域
     * @endtprint 打印结束区域
     * @return void
     */
    static print(e) {
        let subOutputRankPrint = document.getElementById('printContent');
        //console.log(subOutputRankPrint.innerHTML);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;

    }

    /**
     * @desc 导出二维码
     * @url  导出二维码链接
     * @params 请求参数
     * @return void
     */
    static export_qrcode(url, unitId) {
        var form = $("<form>");//定义form表单,通过表单发送请求
        form.attr("style", "display:none");//设置为不显示
        form.attr("target", "");
        form.attr("method", "get");//设置请求类型
        form.attr("action", url);//设置请求路径
        $("body").append(form);//添加表单到页面(body)中
        //添加参数:
        if (unitId != null || unitId != undefined) {
            var unitIdInput = $("<input>");
            unitIdInput.attr("type", "hidden");//设置为隐藏域
            unitIdInput.attr("name", "unitId");//设置参数名称
            unitIdInput.attr("value", unitId);//设置参数值
            form.append(unitIdInput);
        }
        form.submit();//表单提交
    }
    // static preview(oper){
    //     if (oper < 10){
    //             bdhtml=window.document.body.innerHTML;//获取当前页的html代码
    //             sprnstr="<!--startprint"+oper+"-->";//设置打印开始区域
    //             eprnstr="<!--endprint"+oper+"-->";//设置打印结束区域
    //             prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html
    //             prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
    //             window.document.body.innerHTML=prnhtml;
    //             window.print();
    //             window.document.body.innerHTML=bdhtml;
    //         }
    //     else {
    //         window.print();
    //     }
    // }

    /**
     * @desc  比对两个时间相差天数
     * @param  {date} beginTime 开始时间
     * @param  {date} endTime 结束时间
     * @param  {type} type 类型 1 返回相差秒数
     * @return {string} 相差时间天数
     */
    static timeFn(beginTime, endTime, type) {
        let iDays = '';
        if (beginTime == null || endTime == null) {
            return iDays = '-';
        }
        let date3 = parseInt(Math.abs(new Date(beginTime).getTime() - new Date(endTime).getTime()));
        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        let leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000)
        if (days > 0) {
            iDays += (days + "天");
        }
        if (hours > 0) {
            iDays += (hours + "时");
        }
        if (minutes > 0) {
            iDays += (minutes + "分");
        }
        iDays += (seconds + "秒");
        if (type == 1) {
            return Math.floor(date3 / (1000)) + "s";
        }
        return iDays;
    }

    /**
     * @desc  计算设备是否过期
     * @param  {date} beginTime 设备投入时间
     * @param  {toInteger} replaceCycle 运行周期  1 :日(1天) 2: 月 (31天) 3: 年(365天)
     * @param  {number} replaceType 运行周期类型  1 :日(1天) 2: 月 (31天) 3: 年(365天)
     * @return {string}  -  是  否
     */
    static deviceExpiredFn(beginTime, replaceCycle, replaceType) {
        if (!(beginTime && replaceCycle)) {
            return '-';
        }
        //定义周期秒数
        let replaceTime;
        //计算出周期数
        if (replaceType === 1) {
            replaceTime = replaceCycle * 24
        } else if (replaceType === 2) {
            replaceTime = replaceCycle * 31 * 24
        } else if (replaceType === 3) {
            replaceTime = replaceCycle * 365 * 24
        }
        let date = myUtils.getNowFormatDateMinus(beginTime, -replaceTime);
        if (new Date().getTime() > new Date(date).getTime()) {
            return date.substring(0, 10) + '已过期';
        } else {
            return date.substring(0, 10) + '未过期';
        }
        return '-';
    }
    /**
     * @desc  反转数据
     * @param  {Array} array
     * @return {Array} 反转后
     */
    static reverseArr(array) {
        var newArr = [];
        for (var i = array.length - 1; i >= 0; i--) {
            newArr[newArr.length] = array[i];
        }
        return newArr;
    }
    static getMap() {
        var map_ = new Object();
        map_.put = function (key, value) {
            map_[key + '_'] = value;
        };
        map_.get = function (key) {
            return map_[key + '_'];
        };
        map_.remove = function (key) {
            delete map_[key + '_'];
        };
        map_.keyset = function () {
            var ret = "";
            for (var p in map_) {
                if (typeof p == 'string' && p.substring(p.length - 1) == "_") {
                    ret += ",";
                    ret += p.substring(0, p.length - 1);
                }
            }
            if (ret == "") {
                return ret.split(",");
            } else {
                return ret.substring(1).split(",");
            }
        };
        return map_;
    }

    /**
     * @desc  赋值session
     * @return session
     */
    static initSession(fetch, permission) {
        fetch('/api/user/queryUserBaseInfo')
            .then(response => {
                if (response.status === 1) {
                    sessionStorage.login = 1;
                    sessionStorage.name = response.data.user.nickName;
                    sessionStorage.headImgurl = response.data.user.headImgUrl;
                    sessionStorage.userId = response.data.user.id;
                    sessionStorage.cellPhone = response.data.user.cellPhone;
                    sessionStorage.roleName = response.data.user.roleName;
                    sessionStorage.roleId = response.data.user.roleId;
                    sessionStorage.source = response.data.source;
                    sessionStorage.workPunch = response.data.unit.workPunch;
                    sessionStorage.punchTime = response.data.systemConfig.punchTime;
                    sessionStorage.continuedTime = response.data.systemConfig.continuedTime;
                    //策略圈半径(m)参数
                    sessionStorage.circleRadius = response.data.systemConfig.circleRadius;
                    //单位展示形式：1中心坐标点，2范围区块
                    sessionStorage.unitShowType = response.data.systemConfig.unitShowType;
                    sessionStorage.c_unitId = response.data.unit.id;
                    sessionStorage.c_unitName = response.data.unit.name;
                    permission()
                }
            })
    }
  /**
   * @desc  获取当前url域名
   * @return domian
   */
   static getHostDomain(url){
     var host = "null";
     if(typeof url == "undefined"
       || null == url)
       url = window.location.href;
     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined"
       && null != match)
       host = match[1];
     return host;
   }
}
