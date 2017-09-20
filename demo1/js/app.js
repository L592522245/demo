$(function() {
	// 显示二维码
	$(".header-info>a").hover(function() {
		$(this).children('div').stop(true,true).slideToggle(200);
	});

	// 图片轮播去掉默认按钮和控制点
	$("#demo-slider-0").flexslider({
		controlNav: false,
		directionNav: false,
	});
	// 图片轮播上下按键
	$(".nav-right").click(function() {
		$('#demo-slider-0').flexslider("next");
	});
	$(".nav-left").click(function() {
		$('#demo-slider-0').flexslider("prev");
	});
	
	// 打开二级导航栏
	$(".nav-box>ul>li").hover(function() {
		var navLiNum = $(this).index();
		$("#nav-" + navLiNum).css("display", "flex").stop(true).animate({opacity: "1"})
					.siblings().css("display", "none").animate({opacity: "0"});
		if($("#nav-" + navLiNum).length > 0) {
			$(".nav-list").stop(true).animate({
				opacity: "1",
				height: "228px"
			});	
		} else {
			$(".nav-list").stop(true).animate({
				opacity: "0",
				height: "0"
			});
		}
	}, function() {
		var navLiNum = $(this).index();
		if(!$("#nav-" + navLiNum).hover()) {
			$("#nav-" + navLiNum).css({"display": "none", "opacity": "0"});
		}
		$(".nav-list").stop(true).animate({
			opacity: "0",
			height: "0"
		});
	});
	
	$(".nav-list").hover(function() {
		$(this).stop(true).animate({
			opacity: "1",
			height: "228px"
		});
	}, function() {
		$(this).stop(true).animate({
			height: "0",
			opacity: "0"
		});
		$(".nav-list-box").css("display", "none");
	});

	// 主页项目展示
	$("#indexP-slider-1").flexslider({
		itemWidth: 200,
		itemMargin: 20,
		controlNav: false,
		slideshow: false
	});

	// 图片全屏
	$(".index-fullscreen").click(function(event) {
		$(".indexContact-weixin").fadeIn();
	});
	$(".indexContact-weixin").click(function(event) {
		$(this).fadeOut();
	});
	
	// 向下滚动显示侧边栏
	(function($) {
		var ost = 0;
		$(window).scroll(function() {
			var cOst = $(this).scrollTop();
			if(cOst < 200) {
				$('.sidebar').fadeOut(250);
			} else {
				$('.sidebar').fadeIn(250);
			}
			ost = cOst;
		});
	})(jQuery);
	
	// 悬停侧边栏显示信息
	$(".sidebar-tool").hover(function() {
		$(this).children("div").stop(true).css("display", "block").animate({
			opacity: "1",
			right: "60px"
		});
	}, function() {
		$(this).children("div").stop(true).animate({
			opacity: "0",
			right: "80px"
		}, function() {
			$(this).css("display", "none");
		})
	});
	
	// 选中菜单栏动画
	$(".nav-active>img").slideDown(200);
	
	// 荣誉
	$("#honorSelect").change(function() {
		var selectV = $(this).val();
		if((selectV) == 0) {
			$(".honorBox").children().fadeIn();
		}
		$(".h" + selectV).fadeIn().siblings("div[class!=h" + selectV + "]").css("display", "none");
	});
	
	// 横向滚动
	$(".honor-cont-box").children().eq($(".active-time").index()).fadeIn();
	$(".honor-scroll-back>ul>li").click(function() {
		var index = $(this).index();
		var li_width = $(this).innerWidth();
		if(!$(this).hasClass("active-time")) {
			$(this).addClass("active-time").siblings().removeClass("active-time");
			$(".honor-scroll-back").animate({left: "-" + li_width * index});
			$(".honor-cont-box").children().eq(index).fadeIn().siblings().hide();
		};
	});
	$(".honor-btn-right").click(function() {
		var li = $(".honor-scroll-back").children().children();
		var li_num = li.length;
		var now_index = $(".active-time").index();
		var li_width = li.eq(now_index + 1).innerWidth();
		if(now_index == (li_num - 1)) {
			return false;
		} else {
			now_index ++;
			$(".honor-scroll-back").stop(true, true);
			$(".honor-cont-box").children().stop(true,true);
			$(".honor-scroll-back").animate({left: "-=" + li_width});
			li.eq(now_index).addClass("active-time").siblings().removeClass("active-time");
			$(".honor-cont-box").children().eq(now_index).fadeIn().siblings().hide();
		}
	});
	$(".honor-btn-left").click(function() {
		var li = $(".honor-scroll-back").children().children();
		var li_num = li.length;
		var now_index = $(".active-time").index();
		var li_width = li.innerWidth();
		if(now_index == 0) {
			return false;
		} else {
			now_index --;
			$(".honor-scroll-back").stop(true, true);
			$(".honor-cont-box").children().stop(true,true);
			$(".honor-scroll-back").animate({left: "+=" + li_width});
			li.eq(now_index).addClass("active-time").siblings().removeClass("active-time");
			$(".honor-cont-box").children().eq(now_index).fadeIn().siblings().hide();
		}
	});
})