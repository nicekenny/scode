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
	//�ж��Ƿ����ƶ��豸�򿪡�
	if (browser.versions.mobile) {
		//��ȡ�ж��õĶ���
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			//��΢���д�
			current_browser = "WeiXin";
		}
		if (ua.match(/WeiBo/i) == "weibo") {
			//������΢���ͻ��˴�
			current_browser = "WeiBo";
		}
		if (ua.match(/QQ/i) == "qq") {
			//��QQ�ռ��
			current_browser = "QQ";
		}
		if (browser.versions.ios) {
			//�Ƿ���IOS�������
			current_browser = "IOS";
		} 
		if(browser.versions.android) {
			//�Ƿ��ڰ�׿�������
			current_browser = "Android";
		}
	} else {
		//�������PC�������
		current_browser = "PC";
	}
});
var current_browser = "PC";
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
			//�ƶ��ն�������汾��Ϣ
            trident: u.indexOf('Trident') > -1, //IE�ں�
            presto: u.indexOf('Presto') > -1, //opera�ں�
            webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //�Ƿ�Ϊ�ƶ��ն�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻�uc�����
            iPhone: u.indexOf('iPhone') > -1, //�Ƿ�ΪiPhone����QQHD�����
            iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
            webApp: u.indexOf('Safari') == -1 //�Ƿ�webӦ�ó���û��ͷ����ײ�
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}