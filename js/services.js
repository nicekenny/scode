/*!
 * Scode.org.cn Services v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-01-12 00:00:00
 */

// 定义全局变量
var basepath = "https://scode.org.cn/";
var serv_basepath = "http://x.scode.org.cn:81/";
// serv_basepath = "http://localhost/scodelab/";
serv_basepath = "https://x.scode.org.cn:444/";
// 初始化页码
var page_no = 1,current_page_no = 0,loaded = true;

// 页面数据初始化
$(function() {
	
	$("a[scl='scode']").each(function(){
		var tmp_href = $(this).attr("href");
		$(this).attr("href", basepath + tmp_href);
	});
	$("a[scl='x_scode']").each(function(){
		var tmp_href = $(this).attr("href");
		$(this).attr("href", serv_basepath + tmp_href);
	});
	
	var pathname = window.location.pathname;
	// alert(pathname);
	if(pathname=="" || pathname=="/" || pathname=="/index.html") {
		loadIndex();
	} else if(pathname=="/article.html") {
		loadArticle();
	} else if(pathname=="/goods.html") {
		loadGoods();
		// 滚动条加载商品数据
		$(window).scroll(function() {
			var items_box = $(".category_group");
			var window_top = $(window).scrollTop();
			
			if(window_top>(items_box.offset().top+items_box.height()-1000)) {
				loadGoods();
			}
		});
	} else if(pathname=="/m/guang.html") {
		load_m_guang();
		// 滚动条加载商品数据
		$(window).scroll(function() {
			var items_box = $("#product_walls");
			var window_top = $(window).scrollTop();
			
			if(window_top>(items_box.offset().top+items_box.height()-1000) && loaded) {
				load_m_guang();
			}
		});
	}
	

});
// index.html页面数据加载
function loadIndex() {
	$.ajax({
		url: serv_basepath + "article/ajax/items.html",
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showIndex",
		success: function (data) {
			//console.info("success");
		}
	});
}
// article.html页面数据加载
function loadArticle() {
	var article_id = getQueryString("id");
	$.ajax({
		url: serv_basepath + "article/ajax/" + article_id + ".html",
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showArticle",
		success: function (data) {
			//console.info("success");
		}
	});
}
// goods.html页面数据加载
function loadGoods() {
	if(page_no<=current_page_no)
		return;
	// 设置当前页码
	current_page_no = page_no;

	var categoryId = getQueryString("cate");
	$.ajax({
		url: serv_basepath + "taobao/item/ajaxItems.html?cate="+categoryId+"&page="+page_no,
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showGoods",
		success: function (data) {
			//console.info("success");
		}
	});
}
// m_guang.html页面数据加载
function load_m_guang() {
	if(page_no<=current_page_no)
		return;
	// 设置当前页码
	current_page_no = page_no;
	// 设置加载中
	loaded = false;
	$("#wall_loading").show();
	var categoryId = getQueryString("cate");
	$.ajax({
		url: serv_basepath + "taobao/item/ajaxItems.html?cate="+categoryId+"&page="+page_no,
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "show_m_guang",
		success: function (data) {
			//console.info("success");
		}
	});
}
// 获取浏览器地址栏参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
// Index回调函数
function showIndex(data) {

	var new_list = data.news;
	var edit_list = data.edits;
	if(new_list!=undefined) {
		var list_length = new_list.length;
		var tmp_rows = parseInt((list_length-1)/2)+1;
		var new_list_left_ul = $("#new_list_left");
		for(var i=0;i<tmp_rows;i++) {
			if(i>=list_length)
				break;
			var tmp_item = new_list[i];
			new_list_left_ul.append("<li><a href=\"article.html?id="+tmp_item.id+"\" target=\"_blank\">"+tmp_item.title+"</a><em>"+dateMMdd(tmp_item.createTime)+"</em></li>");
		}
		var new_list_right_ul = $("#new_list_right");
		for(var i=tmp_rows;i<list_length;i++) {
			if(i>=list_length)
				break;
			var tmp_item = new_list[i];
			new_list_right_ul.append("<li><a href=\"article.html?id="+tmp_item.id+"\" target=\"_blank\">"+tmp_item.title+"</a><em>"+dateMMdd(tmp_item.createTime)+"</em></li>");
		}
	}
	if(edit_list!=undefined) {
		var edit_list_ul = $("#edit_list");
		for(var i=0;i<edit_list.length;i++) {
			var tmp_item = edit_list[i];
			edit_list_ul.append("<li><a href=\"article.html?id="+tmp_item.id+"\" target=\"_blank\">"+tmp_item.title+"</a><em>"+dateMMdd(tmp_item.createTime)+"</em></li>");
		}
	}
}
// Article回调函数
function showArticle(data) {

	var article = data.article;
	if(article!=undefined) {
		// var result = JSON.stringify(article.content);
		// html - title
		$(document).attr("title",article.title + " - scode.org.cn");
		$("meta[name='keywords']").eq(0).attr("content",article.keywords);
		$("meta[name='description']").eq(0).attr("content",article.description);

		$("#article_title").html(article.title);
		
		$("#article_author").html(data.author);
		$("#article_time").html(dateYmdhm(article.createTime));
		
		$("#article_content").html(article.content);

		
	}

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

			var item_li = "<li class=\"cgi\"><a href=\""+item.clickUrl+"\" target=\"_blank\" class=\"img_square\"><img src=\""+item.pictUrl+"_250x250q90.jpg\"></a>"
				+"<p class=\"title\"><a href=\""+item.clickUrl+"\" target=\"_blank\">"+item.title+"</a></p>"
				//+"<div class=\"coupon\"><span class=\"cp_title\">满19元减10元</span><a href=\"\" target=\"_blank\" class=\"cp_link\">去领券</a></div>"
				+"<div class=\"goods_info\"><b class=\"price_info\"><i>￥</i>"+item.zkFinalPrice+"</b><span class=\"fav_num\">"+item.volume+"</span></div></li>";

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
// m_guang回调函数
function show_m_guang(data) {
	var current_category = data.currentCategory;
	if(current_category!=undefined) {
		$(document).attr("title", current_category + " - Shopping - scode.org.cn");
	}
	$("#wall_loading").hide();
	var items = data.items;
	if(items!=undefined) {
		for(var i=0;i<items.length;i++) {
			var item = items[i];

			var item_li = "<li class=\"wall_item\">"+"<a href=\""+item.clickUrl+"\" target=\"_blank\">"
				+"<div class=\"item_img\">"+"<img src=\""+item.pictUrl+"_250x250q90.jpg\" alt=\""+item.title+"\" />"
				+"</div><div class=\"item_title\">"+item.title+"</div>"+"<div class=\"item_info\">"
				+"<span class=\"item_info_price\"><i>¥</i>"+item.zkFinalPrice+"</span>"
				+"<span class=\"item_info_delprice\">¥"+item.reservePrice+"</span>"
				+"<span class=\"item_info_likes\">"+item.volume+"</span>"
				//+"<span class=\"item_info_provcity\">"+item.provcity+"</span>"
				+"</div></a></li>";


			var pw_h_max = $("#product_walls").height();
			var pw_min;
			$("#product_walls").find("ul.wall_wrap").each(function() {
				if($(this).height()<=pw_h_max) {
					pw_h_max = $(this).height();
					pw_min = $(this);
				}
			});
			pw_min.append(item_li);

		}
		// 全局页码翻页
		page_no = page_no + 1;
		loaded = true;
	}
	if(current_page_no<=1) {
		var categorys = data.categorys;
		if(categorys!=undefined) {
			for(var i=0;i<categorys.length;i++) {
				var category = categorys[i];

				var current_li = "";
				if(category.favoritesId == data.currentCategoryId) {
					current_li = " class=\"current\"";
				}

				var category_li = "<li"+current_li+"><a href=\""+basepath+"m/guang.html?cate="+category.favoritesId+ "\" >"+ category.favoritesTitle+"</a></li>";

				$("#category_list").append(category_li);
			}
		}
	}
	
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