/*!
 * Scode.org.cn functions v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-05-27 00:00:00
 */

// 全局
var global_keyword;
var page_number = 0;

// 页面数据初始化
$(function() {

	var pathname = window.location.pathname;
	if(pathname=="/search.html") {
		// 获取全局执行变量
		global_keyword = getQueryString("keyword");
		if(global_keyword!=undefined && $.trim(global_keyword).length>0) {
			$("#search_keyword").text(global_keyword);
			// 添加cookies
			var kwds = getCookie("searchKeywords");
			if(kwds==undefined) {
				setCookie("searchKeywords",global_keyword+"&");
			} else {
				var keywordList = $("#search_keyword_list").empty();
				kwds = kwds.replace(global_keyword+"&","");
				kwds = global_keyword+"&"+kwds;
				var kwdArray = kwds.split("&");
				for(var i=0;i<kwdArray.length;i++) {
					var _kwd = kwdArray[i];
					var searchUrl = basepath+"search.html?keyword="+_kwd;
					var _kwhtml = "<div class=\"category-item\"><a href=\""+searchUrl+"\">"+_kwd+"</a></div>";
					keywordList.append(_kwhtml);
				}
				if(kwds.length>200)
					kwds = kwds.substring(0,200);
				setCookie("searchKeywords",kwds);
			}
			loadSearchArticles();
		} else {
			$(".articles-empty").text("请输入搜索关键词！");
		}
	}
	// 清空搜索项目
	$(".search_clean_icon").click(function() {
		delCookie("searchKeywords");
		$("#search_keyword_list").empty();
	});
	
});
// article.html页面数据加载
function loadSearchArticles() {
	$.ajax({
		url: serv_basepath + "article/ajax/Search.html?keyword=" + global_keyword+"&page="+(page_number+1),
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showSearchArticles",
		success: function (data) {
			//console.info("success");
		}
	});
}
// Article回调函数
function showSearchArticles(data) {
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