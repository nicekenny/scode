/*!
 * Scode.org.cn Goods functions v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-05-27 00:00:00
 */

// 定义AppCode
var base_app_code = "scode",base_app_change = false;
// 页面执行全局变量
var param_gss,property_gss = "gss";

// 页面数据初始化
$(function() {

	// 获取全局执行变量
	param_gss = getQueryString(property_gss);

	// 初始全局APP代码
	var tmp_app_code = getQueryString("app");
	if(tmp_app_code!=undefined && $.trim(tmp_app_code)!="" && tmp_app_code!=base_app_code) {
		base_app_code = tmp_app_code;
		base_app_change = true;
	}

	var pathname = window.location.pathname;
	if(pathname=="/goods.html") {
		// 载入菜单
		loadGuangMenus();
		loadItems();
		// 滚动条加载商品数据
		$(window).scroll(function() {
			var items_box = $(".category_group");
			var window_top = $(window).scrollTop();
			
			if(window_top>(items_box.offset().top+items_box.height()-1000)) {
				loadItems();
			}
		});
	}
	
});
// 完善处理Guang.scode连接地址
function scodeUrl(url) {
	if(url==undefined || $.trim(url)=="" || url=="null" || url=="undefined") {
		if(base_app_change)
			return basepath + "?app=" + base_app_code;
		else
			return basepath;
	} else {
		if(base_app_change)
			return basepath + changeURLArg(url,"app",base_app_code);
		else
			return basepath + url;
	}
}
// 完善处理x.scode连接地址
function serverUrl(url) {
	if(url==undefined || $.trim(url)=="" || url=="null" || url=="undefined") {
		return serv_basepath + "?app=" + base_app_code;
	} else {
		return serv_basepath + changeURLArg(url,"app",base_app_code);
	}
}
// goods.html页面数据加载
function loadItems() {
	if(page_no<=current_page_no)
		return;
	// 设置当前页码
	current_page_no = page_no;
	// 设置加载中
	loaded = false;
	var load_url;
	if(param_gss!=undefined && param_gss!="") {
		if(param_gss=="search") {
			// 搜索载入
			var search_q = getQueryString("q");
			search_q = decodeURI(search_q);
			load_url = "guang/item/ajaxSearch.html?q="+ search_q +"&page="+page_no;
		} else if(param_gss=="material") {
			// 物料载入
			var search_q = getQueryString("q");
			search_q = decodeURI(search_q);
			var cate_param = "";
			var cate = getQueryString("cate");
			if(cate!=undefined)
				cate_param = "&cate="+cate;
			var material_param = "";
			var material_id = getQueryString("material_id");
			if(material_id!=undefined)
				material_param = "&material_id="+material_id;
			var sort_param = "";
			var sort = getQueryString("sort");
			if(sort!=undefined)
				sort_param = "&sort="+sort;
			
			load_url = "guang/item/ajaxMaterial.html?q="+ search_q + cate_param + material_param + sort_param +"&page="+page_no;
		}
	}
	if(load_url==undefined) {
		var categoryId = getQueryString("cate");
		load_url = "guang/item/ajaxItems.html?cate="+categoryId+"&page="+page_no;
	}
	$.ajax({
		url: serverUrl(load_url),
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showItems",
		success: function (data) {
			//console.info("success");
		}
	});

}
// Goods回调函数
function showItems(data) {
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
		loaded = true;
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
		} else {
			if(current_category!=undefined) {
				var tmp_category = current_category;
				if(current_category.length>10)
					tmp_category = current_category.substring(0,10)+"...";
				var category_li = "<li class=\"query_title current\"><a>"+ tmp_category +"</a></li>";
				$("#category_list").append(category_li);
			}
		}
		if(data.from=="material") {
			var query = data.query;
			if(query!=undefined) {
				$(document).attr("title", query.keyword + " - Shopping - scode.org.cn");
				// -----------------
			}
		}
	}
	
}

// 加载系统配置：逛街啦-菜单项目
function loadGuangMenus() {
	// 调用接口，获取菜单项
	$.ajax({
		url: serverUrl("guang/base/menuItems.html"),
		type: 'GET',
		dataType: "jsonp",
		success: function (data) {
			if(data!=undefined && data.menus!=undefined && data.menus.length>0) {
				var menu_html = "";
				for(var m=0;m<data.menus.length;m++) {
					var menu_item = data.menus[m];
					var mi_href = "goods.html?"+property_gss+"=material";
					if(menu_item.keyword!=undefined && $.trim(menu_item.keyword)!=""){
						mi_href = mi_href + "&q="+encodeURI(menu_item.keyword);
					}
					if(menu_item.categorys!=undefined && $.trim(menu_item.categorys)!=""){
						mi_href = mi_href + "&cate="+menu_item.categorys;
					}
					if(menu_item.materialId!=undefined && $.trim(menu_item.materialId)!=""){
						mi_href = mi_href + "&material_id="+menu_item.materialId;
					}
					if(menu_item.other!=undefined && $.trim(menu_item.other)!=""){
						mi_href = mi_href + menu_item.other;
					}
					menu_html = menu_html + "<a href=\""+scodeUrl(encodeURI(mi_href))+"\">"+menu_item.title+"</a>";
				}
				$("#guang_menus").empty().append(menu_html);
			}
		}
	});
}