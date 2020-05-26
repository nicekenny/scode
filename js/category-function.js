/*!
 * Scode.org.cn functions v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-05-27 00:00:00
 */

var global_code,global_cate;
var page_number = 0;

// 页面数据初始化
$(function() {

	var pathname = window.location.pathname;
	if(pathname=="/category.html") {
		// 获取全局执行变量
		global_code = getQueryString("code");
		if(global_code!=undefined && $.trim(global_code).length>0) {
			loadCategorys();
		}
		global_cate = getQueryString("cate");
		loadArticles();
	}
	// 搜索关键词加载
	var kwds = getCookie("searchKeywords");
	if(kwds!=undefined) {
		var keywordList = $("#search_keyword_list").empty();
		var kwdArray = kwds.split("&");
		for(var i=0;i<kwdArray.length;i++) {
			var _kwd = kwdArray[i];
			var searchUrl = basepath+"search.html?keyword="+_kwd;
			var _kwhtml = "<div class=\"category-item\"><a href=\""+searchUrl+"\">"+_kwd+"</a></div>";
			keywordList.append(_kwhtml);
		}
	}
	
});
// 载入子类目列表
function loadCategorys() {
	$.ajax({
		url: serv_basepath + "category/ajax/List.html?code="+global_code,
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showCategorys",
		success: function (data) {
			//console.info("success");
		}
	});
}
// 回调显示子类列表
function showCategorys(data) {
	var _list = data.childrens;
	if(_list!=undefined && _list.length>0) {
		var categorys = $("#category_list").empty();
		appendCategorys(_list);
	}
}
// 添加类目
function appendCategorys(list) {
	if(list!=undefined && list.length>0) {
		var categorys = $("#category_list");
		for(var i=0;i<list.length;i++) {
			var _item = list[i];
			// console.log(_item);
			var categoryUrl = basepath+"category.html?code="+global_code+"&cate="+_item.id;
			var _class = "";
			if(_item.id==global_cate) {
				_class = "current";
				$(document).attr("title",_item.name + " - Category - scode.org.cn");
			}
			var categoryHtml = "<div class=\"category-item "+_class+"\"><a href=\""+categoryUrl+"\">"+_item.name+"<em>("+_item.count+")</em></a></div>";
			categorys.append(categoryHtml);
			appendCategorys(_item.childrens);
		}
	}
}

// 加载文章列表
function loadArticles() {
	$.ajax({
		url: serv_basepath + "article/ajax/Category.html?code="+global_code+"&cate="+global_cate+"&page="+(page_number+1),
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showArticles",
		success: function (data) {
			//console.info("success");
		}
	});
}
function showArticles(data) {
	if(data.pageNumber!=undefined){
		page_number = data.pageNumber;
	}
	var result = data.result;
	if(result!=undefined && result.length>0) {
		var articleList = $("#article_list");
		if(articleList.find(".article-item").length==0)
			articleList.empty();
		for(var i=0;i<result.length;i++) {
			var _item = result[i];
			var articleUrl = basepath+"article.html?id="+_item.id;
			var articleHtml = "<div class=\"article-item\">"+
				"<div class=\"article-title\"><a href=\""+articleUrl+"\" target=\"_blank\">"+_item.title+"</a></div>"+
				"<div class=\"article-desc\">"+_item.description+"</div></div>";
			articleList.append(articleHtml);
		}
	}
	if($(".articles-empty").length>0) {
		$(".articles-empty").text("没有找到相关文章，去看看别的吧！");
	}
}