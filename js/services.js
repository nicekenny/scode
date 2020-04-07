/*!
 * Scode.org.cn Services v1.0.0
 * https://scode.org.cn/
 *
 * Copyright 2019-2029
 * 
 * Date: 2019-01-12 00:00:00
 */

// 定义全局变量
var basepath = "http://scode.org.cn/";
var serv_basepath = "http://x.scode.org.cn:81/";

// basepath = "http://127.0.0.1/";
// serv_basepath = "http://127.0.0.1/scodelab/";

var topLinks = [{scl:"scode",url:"index.html",name:"源代码"},
				{scl:"x_scode",url:"",name:"实验室"}];

// 页面数据初始化
$(function() {

	var protocol = window.location.protocol;
	if(protocol=="https:") {
		basepath = "https://scode.org.cn/";
		serv_basepath = "https://x.scode.org.cn:444/";
	}

	$("a[scl='scode']").each(function(){
		var tmp_href = $(this).attr("href");
		$(this).attr("href", basepath + tmp_href);
	});
	$("a[scl='x_scode']").each(function(){
		var tmp_href = $(this).attr("href");
		$(this).attr("href", serv_basepath + tmp_href);
	});
	$("form[scl='scode']").each(function(){
		var tmp_action = $(this).attr("action");
		$(this).attr("action", basepath + tmp_action);
	});
	// top-links
	var topLinks_UL = $("#top_links").empty();
	for(var i=0;i<topLinks.length;i++) {
		var topLink = topLinks[i];
		var topLink_url = topLink.url;
		if(topLink.scl=="scode")
			topLink_url = basepath + topLink_url;
		else if(topLink.scl=="x_scode")
			topLink_url = serv_basepath + topLink_url;
		topLinks_UL.append("<li><a href=\""+topLink_url+"\">"+topLink.name+"</a></li>");
	}
	// 初始化底部
	initFooter();
	// 全局加载根类目
	loadRootCategorys();
	var pathname = window.location.pathname;
	// alert(pathname);
	if(pathname=="" || pathname=="/" || pathname=="/index.html") {
		loadIndex();
	}
	// 搜索form提交
	$("#searchForm").submit(function() {
		var keyword = $(this).find("input[name='keyword']").val();
		if($.trim(keyword).length==0) {
			alert("请输入搜索关键词！");
			return false;
		}
	});

});
// 加载根类目
function loadRootCategorys() {
	// 载入ROOT类目
	$.ajax({
		url: serv_basepath + "category/ajax/Roots.html",
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showRootCategorys",
		success: function (data) {
			//console.info("success");
		}
	});
}
// index.html页面数据加载
function loadIndex() {
	// 载入文章列表
	$.ajax({
		url: serv_basepath + "article/ajax/Items.html",
		type: 'GET',
		dataType: "jsonp",
		jsonpCallback: "showIndex",
		success: function (data) {
			//console.info("success");
		}
	});
}

// ROOT-categorys回调
function showRootCategorys(data) {
	var _code = getQueryString("code");
	if(_code!=undefined)
		$("#base_navs li").removeClass("current");
	var roots = data.roots;
	if(roots!=undefined && roots.length>0) {
		var rootCates = $("#root_categorys").empty();
		for(var i=0;i<roots.length;i++) {
			var item = roots[i];
			var _class = "";
			if(item.code==_code) {
				_class = "class=\"current\"";
				$(document).attr("title", item.name + " - Category - scode.org.cn");
			}
			var cateHtml = "<li "+_class+"><a href=\"category.html?code="+item.code+"\"><span>"+item.name+"</span></a></li>";
			rootCates.append(cateHtml);
		}
	}
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

// Footer-html
function initFooter() {
	var footerHtml = "<div class=\"wrapper\"><div class=\"about-us\"><ul>"+
		"<li><a href=\"#\">关于我们</a></li>"+
		"<li><a href=\"#\">新浪微博</a></li>"+
		//"<li><a href=\"#\">站长统计</a></li>"+
		"</ul></div>"+
		"<div class=\"copyright\">Powered by <a href=\""+basepath+"\">Scode.org.cn</a> ©2019-2029</div></div>";
	$("#body_footer").empty().html(footerHtml);
}
