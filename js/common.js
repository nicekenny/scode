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
});
