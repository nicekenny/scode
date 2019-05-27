/*!
 * Scode.org.cn Goods functions v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-05-27 00:00:00
 */

// 页面数据初始化
$(function() {

	var pathname = window.location.pathname;
	if(pathname=="/goods.html") {
		loadGoods();
		// 滚动条加载商品数据
		$(window).scroll(function() {
			var items_box = $(".category_group");
			var window_top = $(window).scrollTop();
			
			if(window_top>(items_box.offset().top+items_box.height()-1000)) {
				loadGoods();
			}
		});
	}
	
});

// goods.html页面数据加载
function loadGoods() {
	if(page_no<=current_page_no)
		return;
	// 设置当前页码
	current_page_no = page_no;

	var categoryId = getQueryString("cate");
	$.ajax({
		url: serv_basepath + "guang/item/ajaxItems.html?cate="+categoryId+"&page="+page_no+"&app="+base_app_code,
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showGoods",
		success: function (data) {
			//console.info("success");
		}
	});
}
// Goods回调函数
function showGoods(data) {
	var current_category = data.currentCategory;
	if(current_category!=undefined) {
		$(document).attr("title", current_category + " - Shopping - scode.org.cn");
	}
	var items = data.items;
	if(items!=undefined) {
		for(var i=0;i<items.length;i++) {
			var item = items[i];
			
			var item_coupon = "<div class=\"coupon\"></div>";
			if(item.couponInfo!=undefined) {
				item_coupon = "<div class=\"coupon\"><span class=\"cp_title\">"+item.couponInfo+"</span><a href=\""+item.couponClickUrl+"\" target=\"_blank\" class=\"cp_link\">去领券</a></div>";
			}

			var item_li = "<li class=\"cgi\"><a href=\""+item.buyUrl+"\" target=\"_blank\" class=\"img_square\"><img src=\""+item.pictUrl+"_250x250q90.jpg\"></a>"
				+"<p class=\"title\"><a href=\""+item.clickUrl+"\" target=\"_blank\">"+item.title+"</a></p>"
				+item_coupon
				+"<div class=\"goods_info\"><b class=\"price_info\"><i>￥</i>"+item.finalPrice+"</b><span class=\"fav_num\">"+item.volume+"</span></div></li>";

			$("#goods_list").append(item_li);
		}
		// 全局页码翻页
		page_no = page_no + 1;
	}
	if(current_page_no<=1) {
		var categorys = data.categorys;
		if(categorys!=undefined) {
			for(var i=0;i<categorys.length;i++) {
				var category = categorys[i];

				var category_li = "<a href=\""+basepath+"goods.html?cate="+category.favoritesId;
				if(category.favoritesId == data.currentCategoryId) {
					category_li = category_li + "\" class=\"current\">";
				} else {
					category_li = category_li + "\" >";
				}
				category_li = category_li + category.favoritesTitle+"</a>";

				$("#category_list").append(category_li);
			}
		}
	}
	
}