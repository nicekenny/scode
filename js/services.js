/*!
 * Scode.org.cn Services v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-01-12 00:00:00
 */

// 定义全局变量
var serv_basepath = "http://x.scode.org.cn:81/";
// serv_basepath = "http://localhost/scodelab/";
serv_basepath = "https://x.scode.org.cn:444/";

// 页面数据初始化
$(function() {
	
	var pathname = window.location.pathname;
	alert(pathname);
	if(pathname==""||pathname=="index.html") {
		loadIndex();
	} else if(pathname=="article.html") {
		loadArticle();
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
		// var result = JSON.stringify(article.content);
		//$("#article_title").html(article.title);
		//$("#article_content").html(article.content);
	}
	if(edit_list!=undefined) {
		// var result = JSON.stringify(article.content);
		//$("#article_title").html(article.title);
		//$("#article_content").html(article.content);
	}
}
// Article回调函数
function showArticle(data) {

	var article = data.article;
	if(article!=undefined) {
		// var result = JSON.stringify(article.content);
		$("#article_title").html(article.title);
		$("#article_content").html(article.content);
	}

}