/*!
 * Scode.org.cn Common v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-01-20 00:00:00
 */

$(function() {
	if($(window).scrollTop()<=10)
		$(".fixed_box .back_top").hide();
	$(".fixed_box .back_top").click(function() {
		$(window).scrollTop(0);
	});
	$(window).scroll(function() {
		var window_top = $(window).scrollTop();
		if(window_top>10) {
			if($(".fixed_box .back_top").is(":hidden")) {
				$(".fixed_box .back_top").show();
			}
		} else {
			if(!$(".fixed_box .back_top").is(":hidden")) {
				$(".fixed_box .back_top").hide();
			}
		}
	});
	//判断是否是移动设备打开。
	if (browser.versions.mobile) {
		//获取判断用的对象
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			//在微信中打开
			current_browser = "WeiXin";
		} else if (ua.match(/WeiBo/i) == "weibo") {
			//在新浪微博客户端打开
			current_browser = "WeiBo";
		} else if (ua.match(/QQ/i) == "qq") {
			//在QQ空间打开
			current_browser = "QQ";
		}
		if (browser.versions.ios) {
			//是否在IOS浏览器打开
			current_browser_platform = "IOS";
		} else if(browser.versions.android) {
			//是否在安卓浏览器打开
			current_browser_platform = "Android";
		}
	} else {
		//否则就是PC浏览器打开
		current_browser = "PC";
		current_browser_platform = "PC";
	}
	$("#browser_version").html("Browser["+current_browser+"]");
});
// 浏览器版本
var current_browser = "PC", current_browser_platform = "PC";
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
			//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

// 获取浏览器地址栏参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
// 获取浏览器地址栏静态参数（#锚）
function getStaticParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.hash.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
/* 
* url 目标url 
* arg 需要替换的参数名称 
* arg_val 替换后的参数的值 
* return url 参数替换后的url 
*/ 
function changeURLArg(url,arg,arg_val) {
    var pattern=arg+'=([^&]*)';
    var replaceText=arg+'='+arg_val;
    if(url.match(pattern)) {
        var tmp='/('+ arg+'=)([^&]*)/gi';
        tmp=url.replace(eval(tmp),replaceText);
        return tmp;
    } else {
        if(url.match('[\?]')) {
            return url+'&'+replaceText;
        } else {
            return url+'?'+replaceText;
        }
    }
    return url+'\n'+arg+'\n'+arg_val;
}
function changeParamReload(arg,arg_val) {
	var href = window.location.href;
	href = changeURLArg(href,arg,arg_val);
	window.location.href = href;
}
// 获取日期（月-日）
function dateMMdd(time) {
	var tmp_date = new Date(time);
	var td_mm = tmp_date.getMonth()+1;
	var td_dd = tmp_date.getDate();
	return td_mm+"-"+td_dd;
}
// 获取日期（年-月-日 时:分）
function dateYmdhm(time) {
	var tmp_date = new Date(time);
	var td_yyyy = tmp_date.getFullYear();
	var td_mm = tmp_date.getMonth()+1;
	var td_dd = tmp_date.getDate();
	var td_hh = tmp_date.getHours();
	var td_ms = tmp_date.getMinutes();
	return td_yyyy+"-"+td_mm+"-"+td_dd+" "+td_hh+":"+td_ms;
}
// Json数据转换
function Json() {
	this.parse = function(string) {
		return Json.parse(string);
	}
}
Json.parse = function(string) {
	if (string == "")
		return undefined;
	return eval("(" + string + ")");
}

// 获得coolie 的值
function cookie(name) {
	// 得到分割的cookie名值对
	var cookieArray = document.cookie.split("; ");
	var cookie = new Object();
	for ( var i = 0; i < cookieArray.length; i++) {
		// 将名和值分开
		var arr = cookieArray[i].split("=");
		// 如果是指定的cookie，则返回它的值
		if (arr[0] == name)
			return unescape(arr[1]);
	}
	return "";
}

// 删除cookie
function delCookie(name) {
	document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
}

// 获取指定名称的cookie的值
function getCookie(objName) {
	var arrStr = document.cookie.split("; ");
	for ( var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == objName)
			return unescape(temp[1]);
	}
}

// 添加cookie
function addCookie(objName, objValue, objHours) {
	var str = objName + "=" + escape(objValue);
	// 为时不设定过期时间，浏览器关闭时cookie自动消失
	if (objHours > 0) {
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
}

// 两个参数，一个是cookie的名子，一个是值
function setCookie(name, value) {
	// 此 cookie 将被保存 30 天
	var Days = 30;
	// new Date("December 31, 9998");
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

// 取cookies函数
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;
}

// 删除cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//阻止浏览器的默认行为 
function stopDefault(event) {
    event.stopPropagation();
}
