$(function(){var t=$(".slider-thumbs__list .slider-thumbs__item");t.on("click",function(t){var e=$(this);e.addClass("active").siblings().removeClass("active")});var e=function(){function t(t){t.preventDefault();var n=$(this),i=n.attr("href");e(i)}function e(t){$(t).fadeIn(200)}function n(t){var e=$(t.target);(e.hasClass("inner-modal")||e.attr("data-my-pop-close"))&&(o.fadeOut(200),$(".qtip").hide())}function i(){$(".qtip").hide()}var o=$(".inner-modal"),r=$("[data-my-pop='true']"),a=function(){c()},c=function(){o.on("click",n),r.on("click",t),$(".modal").on("hidden.bs.modal",i),$(".modal a").on("click",i),$("select").select2()};return{init:a}}();$(document).ready(function(){e.init()});var n=function(){function t(t){var i=!0;return t.find("input, textarea").each(function(t){var o=$(this),r=o.val();if(o.prop("required"))return o.is('input[type="email"]')?e(r)?(o.removeClass("input_error"),i=!0):(o.addClass("input_error"),n(o),i=!1):r.trim()?(o.removeClass("input_error"),i=!0):(o.addClass("input_error"),n(o),i=!1)}),i}function e(t){var e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return e.test(t)}function n(t){t.qtip({content:{text:"Нужно заполнить все поля"},position:{my:"left center",at:"right center",adjust:{x:40}},show:{ready:!0,event:!1},hide:{event:"focus"}})}var i=$("form").find("input, textarea"),o=function(){r()},r=function(){i.on("keydown",function(t){var e=$(this);e.removeClass("input_error")}),$("form").on("submit",function(e){e.preventDefault(),t($(this))?console.log("well done!"):console.log("valid fail!")})};return{init:o}}();$(document).ready(function(){n.init()});var i=function(){function t(t){var e=$(".creator-item");if(console.log(t.target.files[0]),!t.target.files[0]||"image/jpeg"==t.target.files[0].type||"image/png"==t.target.files[0].type){var i=URL.createObjectURL(t.target.files[0]);e.removeClass("active");var o='<li class="creator-item active"> \t\t\t<img src="'+i+'" alt="img" class="creator-img img-responsive"> \t\t\t<a href="#" class="creator-item-close"></a> \t\t\t</li>';a.append(o),n(i)}}function e(t){var e=$(this);e.addClass("active").siblings().removeClass("active");var i=e.find("img").attr("src");n(i)}function n(t){c.show().find("img").attr("src",t)}function i(t){t.preventDefault(),t.stopPropagation();var e=$(this);e.parent().remove(),a.children().length||c.hide()}function o(t){c.css({width:"auto",height:"auto",top:"0",left:"0"})}function r(){c.resizable({aspectRatio:!0,minWidth:25,containment:"#tab-content-container"}).draggable({containment:"#tab-content-container",scroll:!1})}var a=$(".creator-list"),c=$(".overlay-img-container"),l=function(){s(),r()},s=function(){$(".overlay-img-control").on("click",function(t){t.preventDefault()}),$(".overlay-img-control.refresh").on("click",o),$("#creator-upload-button").on("change",t),a.on("click",".creator-item",e),a.on("click",".creator-item-close",i)};return{init:l}}();$(document).ready(function(){$(".overlay-img-container").length&&i.init()});var o=function(){var t=($(".card-count"),$(".card-count .card-count__minus")),e=$(".card-count .card-count__plus"),n=function(){i()},i=function(){t.on("click",function(t){t.preventDefault();var e=$(this),n=e.siblings(".card-count__text"),i=parseInt(n.html());0==i?"":n.html(i-1)}),e.on("click",function(t){t.preventDefault();var e=$(this),n=e.siblings(".card-count__text"),i=parseInt(n.html());99==i?"":n.html(i+1)})};return{init:n}}();$(document).ready(function(){o.init()}),$(".basket").is(":visible")&&$(".clothing-item__button").click(function(t){t.preventDefault();var e=$(this),n=e.parent().find("img:not(.clone)"),i=n.offset().top-$(window).scrollTop(),o=n.offset().left-$(window).scrollLeft(),r=$(".basket-in"),a=r.offset().top-$(window).scrollTop(),c=r.offset().left-$(window).scrollLeft();n.clone().addClass("clone").css({position:"fixed","z-index":"100",top:i,left:o}).insertBefore(n).animate({opacity:.5,top:a,left:c,width:50,height:50},700,function(){$(this).remove()})});var r=$(".filters-item__close");r.on("click",function(t){t.preventDefault();var e=$(this),n=$(this).prev().text(),i=e.parent().parent().next().find(".drop-brand-label-text");i.each(function(){var t=$(this);t.text()==n&&t.prev().removeAttr("checked")})})}());