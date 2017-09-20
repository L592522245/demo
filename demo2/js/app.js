$(function() {
    // 产品中心
    // 搜索框清空按钮
    $(".p-search__container--input").keyup(function () {
        var btn = $(".p-search__container--delectbox");
        btn.show();
    });
    $(".p-search__container--delectbox").click(function () {
        var input = $(".p-search__container--input");
        input.val("");
        $(this).hide();
    });

    $(".p-search__container--input").focus(function () {
        $(".p-header__a, .p-nav, .p-main, .scroll-top").hide();
        $(".p-header__colse, .p-search-container").show();
    });
    $(".p-header__colse").click(function () {
        $(".p-header__a, .p-nav, .p-main, .scroll-top").show();
        $(".p-header__colse, .p-search-container").hide();
    });

    $(".p-search-select span, .p-search-select i").click(function () {
       $(".p-search-select__box").fadeIn();
    });
    $(".p-search-select__item").click(function () {
        var select = $(this).html();
        var selected = $(".p-search-select span");
        selected.html(select);
        $(".p-search-select__box").fadeOut();
    });

    $(".history-item").click(function () {
        var input = $(".p-search__container--input");
        input.val($(this).html());
    });

    $(".p-nav-item").click(function () {
        $(this).addClass("p-nav-item--active").siblings().removeClass("p-nav-item--active");
        if($(this).children("span").length > 0) {
            var up = $(".p-nav__icon--u");
            var down = $(".p-nav__icon--d");
            up.toggleClass("p-nav__icon--active");
            down.toggleClass("p-nav__icon--active");
        }
    });

    // 上拉显示返回顶部按钮
    (function($) {
        var ost = 0;
        $(window).scroll(function() {
            var cOst = $(this).scrollTop();
            if(cOst > 250) {
                $(".scroll-top").fadeIn();
            } else {
                $(".scroll-top").fadeOut();
            }
            ost = cOst;
        });
    })(jQuery);

    // 下拉显示头部
    (function($) {
        var ost = 0;
        $(window).scroll(function() {
            var cOst = $(this).scrollTop();
            if(cOst > 250 && cOst < ost) {
                $(".p-header").addClass("p-header--hide");
            } else {
                $(".p-header").removeClass("p-header--hide");
            }
            ost = cOst;
        });
    })(jQuery);

    $(".p-row-header__icon").click(function () {
        $(this).stop(true).toggleClass("p-row-header__icon--scroll");
        var row = $(this).parent().siblings(".p-row-body");
        row.toggleClass("p-row-body--show");
    });

    // 侧边拦筛选框
    var textArray = new Array();
    var textStr = "";
    $(".multi .p-row-body__item").click(function () {
        $(this).toggleClass("p-row-body__item--select");
        var text = $(this).html();
        var span = $(this).parents(".p-row-body").siblings(".p-row-header").children(".p-row-header__filter");
        if($(this).hasClass("p-row-body__item--select")) {
            textArray.push(text);
        } else {
            textArray.splice(jQuery.inArray(text ,textArray),1);  // 从数组中删除指定的元素
        }
        $(textArray).each(function (i) {
            if(textArray.length > 0) {
                textStr += textArray[i] + "，";
            }
        });
        textStr = textStr.substring(0, textStr.length-1); // 删除字符串最后一个字符
        span.html(textStr);
        textStr = "";
    });
    $(".p-offcanvas-footer__clear").click(function () {
        var item = $(".p-row-body__item");
        var span = $(".p-row-header__filter");
        item.removeClass("p-row-body__item--select");
        span.empty();
        textArray.length = 0; // 清空数组
        textStr = "";
    });

    $(".p-offcanvas-footer__ok").click(function () {
        $("#doc-oc-demo3").offCanvas("close");
    });

    /* 购物车 */
    // 结算
    $("#cart .sc-navbar__account").click(function() {
        if(!$(".sc-items__select--circle").hasClass("sc-checked")) {
            $(".popup-box").stop(true).find("p").html("请选择商品！").end()
                .css("display", "flex").animate({
                opacity: 1
            }, 200, function () {
                setTimeout(function () {
                    $(".popup-box").animate({
                        opacity: 0
                    }, 200, function () {
                        $(this).css("display", "none");
                    });
                }, 800);
            });
            event.preventDefault();
        }
    });
    // 数量减
    $(".sc-items-minus").click(function() {
        var t = $(this).siblings(".sc-items-amin__num");
        t.val(parseInt(t.val()) - 1);
        if (t.val() <= 1) {
            t.val(1);
        }
        totalPrice();
    });
    // 数量加
    $(".sc-items-plus").click(function() {
        var t = $(this).siblings(".sc-items-amin__num");
        t.val(parseInt(t.val()) + 1);
        if (t.val() <= 1) {
            t.val(1);
        }
        totalPrice();
    });
    // 点击商品按钮
    $(".sc-items .sc-items__select--circle").click(function () {
        $(this).toggleClass("sc-checked");
        var items = $(this).closest(".sc-shop").find(".sc-items .sc-items__select--circle");
        var itemsC = $(this).closest(".sc-shop").find(".sc-items .sc-checked");
        var shops = $(this).closest(".sc-items").siblings(".sc-shop-header").children(".sc-items__select--circle");
        if(items.length == itemsC.length) {
            shops.addClass("sc-checked");
            if($(".sc-shop-header").length == $(".sc-shop-header .sc-checked").length) {
                $(".sc-navbar__money .sc-items__select--circle").addClass("sc-checked");
                totalPrice();
            } else {
                $(".sc-navbar__money .sc-items__select--circle").removeClass("sc-checked");
                totalPrice();
            }
        } else {
            shops.removeClass("sc-checked");
            $(".sc-navbar__money .sc-items__select--circle").removeClass("sc-checked");
            totalPrice();
        }
    });
    // 点击店铺按钮
    $(".sc-shop-header .sc-items__select--circle").click(function () {
        $(this).toggleClass("sc-checked");
        var itemcircle = $(this).parent().siblings().children().children(".sc-items__select--circle");
        if($(this).hasClass("sc-checked")) {
            itemcircle.addClass("sc-checked");
            if($(".sc-shop-header").length == $(".sc-shop-header .sc-checked").length) {
                $(".sc-navbar__money .sc-items__select--circle").addClass("sc-checked");
                totalPrice();
            } else {
                $(".sc-navbar__money .sc-items__select--circle").removeClass("sc-checked");
                totalPrice();
            }
        } else {
            itemcircle.removeClass("sc-checked");
            $(".sc-navbar__money .sc-items__select--circle").removeClass("sc-checked");
            totalPrice();
        }
    });
    // 点击全选按钮
    $(".sc-navbar__money .sc-items__select--circle").click(function () {
        $(this).toggleClass("sc-checked");
        if($(this).hasClass("sc-checked")) {
            $(".sc-shop .sc-items__select--circle").addClass("sc-checked");
            totalPrice();
        } else {
            $(".sc-shop .sc-items__select--circle").removeClass("sc-checked");
            totalPrice();
        }
    });
    // 计算总价
    function totalPrice() {
        var allprice = 0;
        $(".sc-shop").each(function () {
            var shopprice = 0;
            $(this).find(".sc-items .sc-checked").each(function () {
                var num = parseInt($(this).siblings(".sc-items-main").find(".sc-items-amin__num").val());
                var price = parseInt($(this).siblings(".sc-items-main").find(".sc-items-main__money span").text())/100;
                var total = price * num;
                shopprice += total;
            });
            allprice += shopprice;
        });
        $(".sc-navbar__count strong").text(allprice.toFixed(2));
    }
    // 编辑删除
    $(".sc-items-edit__btn").click(function () {
        $(this).siblings(".sc-items-delete").toggleClass("dn");
    });
    $(".sc-items-delete").click(function () {
        if($(this).parents(".sc-shop").children(".sc-items").length == 1) {
            $(this).parents(".sc-shop").remove();
        } else {
            $(this).parents(".sc-items").remove();
        }
    });

    /* 商品详情 */
    // 产品图片展示
    $("#product-detail .am-slider").flexslider({
        slideshow: false
    });
    // 添加/取消收藏
    $(".followed").click(function () {
        if($(this).children(".pd-navbar__follow").attr("src") == "img/follow1.png") {
            $(this).children(".pd-navbar__follow").attr("src", "img/follow2.png");
            $(".popup-box").stop(true).find("p").html("已添加至收藏夹").end()
                .css("display", "flex").animate({
                opacity: 1
            }, 200, function () {
                setTimeout(function () {
                    $(".popup-box").animate({
                        opacity: 0
                    }, 200, function () {
                        $(this).css("display", "none");
                    });
                }, 800);
            });
        } else {
            $(this).children(".pd-navbar__follow").attr("src", "img/follow1.png");
            $(".popup-box").stop(true).find("p").html("已移出收藏夹").end()
                .css("display", "flex").animate({
                opacity: 1
            }, 200, function () {
                setTimeout(function () {
                    $(".popup-box").animate({
                        opacity: 0
                    }, 200, function () {
                        $(this).css("display", "none");
                    });
                }, 800);
            });
        }
    });
    // 加入购物车
    $(".pd-navbar__entercart").click(function () {
       var cart = $("#product-detail .u-badge .u-badge__num");
       var count = parseInt(cart.text());
       count++;
       $(".popup-loading").stop(true).css("display", "flex").animate({
           opacity: 1
       }, function () {
           setTimeout(function () {
               $(".popup-loading").animate({
                   opacity: 0
               }, 200, function () {
                   $(this).css("display", "none");
               });
               cart.text(count);
           }, 400);
       });
    });

    /* 关注页面 */
    // 取消收藏
    $(".cancel-follow").click(function () {
        var items = $(this).parents(".f-items");
        items.remove();
        $(".popup-box").stop(true).find("p").html("已取消关注").end()
            .css("display", "flex").animate({
            opacity: 1
        }, 200, function () {
            setTimeout(function () {
                $(".popup-box").animate({
                    opacity: 0
                }, 200, function () {
                    $(this).css("display", "none");
                });
            }, 800);
        });
    });


    // 用户中心
    // 退出登陆
    $(".comfirm-btn").click(function () {
        $("#logout").modal({
            onConfirm: function(options) {
                window.location.href = "login.html";
            },
            // closeOnConfirm: false,
            onCancel: function() {}
        });
    });

    // 删除订单
    $(".orders-delete").click(function () {
        $("#delete-orders").modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var parents = $(this.relatedTarget).parents(".o-items");
                setTimeout(function() {
                    parents.remove();
                    $(".popup-box").stop(true).find("p").html("已删除").end()
                        .css("display", "flex").animate({
                        opacity: 1
                    }, 200, function () {
                        setTimeout(function () {
                            $(".popup-box").animate({
                                opacity: 0
                            }, 200, function () {
                                $(this).css("display", "none");
                            });
                        }, 800);
                    });
                }, 400);
            },
            // closeOnConfirm: false,
            onCancel: function() {}
        });

    });

    // 确认收货
    $(".orders-receive").click(function () {
        $("#receive-product").modal({
            onConfirm: function(options) {
                $(".popup-box").stop(true).find("p").html("已收货").end()
                    .css("display", "flex").animate({
                    opacity: 1
                }, 200, function () {
                    setTimeout(function () {
                        $(".popup-box").animate({
                            opacity: 0
                        }, 200, function () {
                            $(this).css("display", "none");
                        });
                    }, 800);
                });
            },
            // closeOnConfirm: false,
            onCancel: function() {}
        });
    });

    // 取消订单
    $(".orders-cancel").click(function () {
        $("#cancel-order").modal({
            onConfirm: function(options) {
                $(".popup-box").stop(true).find("p").html("已取消").end()
                    .css("display", "flex").animate({
                    opacity: 1
                }, 200, function () {
                    setTimeout(function () {
                        $(".popup-box").animate({
                            opacity: 0
                        }, 200, function () {
                            $(this).css("display", "none");
                        });
                    }, 800);
                });
            },
            // closeOnConfirm: false,
            onCancel: function() {}
        });
    });

    // 修改密码按钮
    $(".password-btn>.comfirm-btn").click(function() {
        var password = false;
        $(".password-input input").each(function() {
            if($(this).val() == "") {
                password = false;
            } else {
                password = true;
            }
        });
       if(!password) {
           $(".popup-box").stop(true).find("p").html("请输入密码！").end()
               .css("display", "flex").animate({
               opacity: 1
               }, 200, function () {
                   setTimeout(function () {
                       $(".popup-box").animate({
                           opacity: 0
                       }, 200, function () {
                           $(this).css("display", "none");
                       });
                   }, 800);
               });
           event.preventDefault();
       }
    });
    $(".password-input input").keyup(function() {
        var password = false;
        $(".password-input input").each(function() {
            if($(this).val() == "") {
                password = false;
            } else {
                password = true;
            }
        });
        if(password) {
            $(".password-btn>.comfirm-btn").css("background-color", "#27a9e3")
        }
    });

    // 数据加载
    $(".popup-loading").animate({
        opacity: 0
    }, 200, function () {
        $(this).css("display", "none");
    });

    // 默认地址
    $(".input-radio").click(function() {
        $(this).toggleClass("input-radio-select");
    });

    // 删除地址
    $(".address-delete").click(function () {
        var address = $(this).parents(".address-item");
        $("#delete-adress").modal({
            onConfirm: function(options) {
                setTimeout(function() {
                    $(".popup-box").stop(true).find("p").html("已删除").end()
                        .css("display", "flex").animate({
                        opacity: 1
                    }, 200, function () {
                        setTimeout(function () {
                            $(".popup-box").animate({
                                opacity: 0
                            }, 200, function () {
                                $(this).css("display", "none");
                            });
                        }, 800);
                    });
                    address.remove();
                }, 400);
            },
            // closeOnConfirm: false,
            onCancel: function() {}
        });
    });

    // 选择地址
    $("#select-address .order-address").click(function () {
       if(!$(this).hasClass("selected")) {
           $(this).addClass("selected").siblings().removeClass("selected");
       }
    });

    // 修改名字
    $(".change-name").click(function () {
        var name = $(this).children(".s-items__info");
        $('#change-name').modal({
            relatedTarget: this,
            onConfirm: function(e) {
                setTimeout(function() {
                    $(".popup-box").stop(true).find("p").html("修改成功").end()
                        .css("display", "flex").animate({
                        opacity: 1
                    }, 200, function () {
                        setTimeout(function () {
                            $(".popup-box").animate({
                                opacity: 0
                            }, 200, function () {
                                $(this).css("display", "none");
                            });
                        }, 800);
                    });
                    name.html(e.data);
                }, 400);
            },
            onCancel: function(e) {
            }
        });
    });

    // 选择地址

});


