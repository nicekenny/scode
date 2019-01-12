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
serv_basepath = "http://localhost/scodelab/";
 
var article_id = "1";
 
$(function() {
	
	$.ajax({
		url: serv_basepath + "article/ajax/" + article_id + ".html",
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showArticle",
		success: function (data) {
			console.info("success");
		}
	});
			
});
 
function showArticle(data) {

	var article = data.article;
	if(article!=undefined) {
		// var result = JSON.stringify(article.content);
		$("#article_title").html(article.title);
		$("#article_content").html(article.content);
	}
	
};