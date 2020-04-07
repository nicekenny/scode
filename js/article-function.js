/*!
 * Scode.org.cn functions v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-05-27 00:00:00
 */

// 全局
var global_article_id;

// 页面数据初始化
$(function() {

	var pathname = window.location.pathname;
	if(pathname=="/article.html") {
		// 获取全局执行变量
		global_article_id = getQueryString("id");
		if(global_article_id!=undefined && $.trim(global_article_id).length>0) {
			loadArticle();
		}
	}
	
});
// article.html页面数据加载
function loadArticle() {
	$.ajax({
		url: serv_basepath + "article/ajax/Item.html?id=" + global_article_id,
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showArticle",
		success: function (data) {
			//console.info("success");
		}
	});
}
// Article回调函数
function showArticle(data) {
	var article = data.article;
	if(article!=undefined) {
		// var result = JSON.stringify(article.content);
		// html - title
		$(document).attr("title",article.title + " - Article - scode.org.cn");
		$("meta[name='keywords']").eq(0).attr("content",article.keywords);
		$("meta[name='description']").eq(0).attr("content",article.description);

		$("#article_title").html(article.title);
		if(article.category!=undefined) {
			$("#article_category").html(article.category.name);
		}
		$("#article_author").html(data.author);
		$("#article_time").html(dateYmdhm(article.createTime));
		
		$("#article_content").html(article.content);
	}
}