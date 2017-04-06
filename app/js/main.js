$(function() {

	/*****************
	**  slider card **
	*****************/

	$('#carousel-card').carousel({
		ride : false,
		pause : true,
		interval : false
	});

	if ( $("#slider-thumbs").length ){
		$("#slider-thumbs").slick({
			infinite: false,
			vertical: true,
			verticalSwiping: true,
			swipeToSlide: false,
			slidesToShow: 6,
			slidesToScroll: 6,
			touchMove:false,
			responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5
				}
			}]
		});
	}

	var _currentSlide;
	var _tmpSlide;
	$("#slider-thumbs").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.slick-slide').addClass('slick-active_block');

		_currentSlide = $('.slick-slide.slick-current').data('slick-index');
	});

	$("#slider-thumbs").on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$('.slick-slide').removeClass('slick-current');
		$('.slick-slide').eq(_currentSlide).addClass('slick-current').addClass('slick-active').removeClass('slick-active_block');

		_tmpSlide = $('.slick-slide.slick-current').data('slick-index');
	});

	$("#slider-thumbs").on('breakpoint', function (event, slick, currentSlide, nextSlide) {
		if ( _tmpSlide != undefined ){
			_currentSlide = _tmpSlide;
		};
	});

	$("body").on("click", ".slick-slide", function(e){
		$('.slick-slide').removeClass('slick-current');
		$(this).removeClass('slick-active_block').addClass('slick-current');

		_currentSlide = $('.slick-slide.slick-current').data('slick-index');
		_tmpSlide = $('.slick-slide.slick-current').data('slick-index');
	});

	/*************************************
	**   inner-pop-up - password pop   **
	*************************************/

	var modals = (function(){

		var innerModal = $(".inner-modal");			 	//Внутренние модалки
		var openButtons = $("[data-my-pop='true']"); 	//Кнопки с дата атрибутом, открывающие внутренние модалки.

		var init = function(){
			setUpListeners();
		};

		var setUpListeners = function(){
			innerModal.on("click", closePopup);
			openButtons.on("click", thatWillBeOpen);
			$(".modal").on('hidden.bs.modal', hideQTips);
			$(".modal a").on("click", hideQTips);     //при клике на любой линк в модалке, убираем ошибки валида
			$('select').select2();					  //custom select
		};

		function thatWillBeOpen(e){		//открываем модалку по Хрефу.
			e.preventDefault();

			var $this = $(this);
			var href = $this.attr("href");

			openPopup(href);
		};

		function openPopup(target) { 
			$(target).fadeIn(200);
		};

		function closePopup(e) {
			var $target = $(e.target);

			if ($target.hasClass('inner-modal') || $target.attr('data-my-pop-close')) {
				innerModal.fadeOut(200);
				$('.qtip').hide();
			}
		};

		function hideQTips(){
			$('.qtip').hide();
		};

		return {
			init:init
		}
	}());

	$(document).ready(function(){
		modals.init();
	});

    /******************
	**  validation   **
	******************/

	var validation = (function(){

		var inputs = $("form").find('input, textarea'); //инпуты в формах

		var init = function(){
			setUpListeners();
		};

		var setUpListeners = function(){
			inputs.on('keydown', function(e){ 	        //удаляем ошибки при нажатии клавишь на поле ввода
				var $this = $(this);
				$this.removeClass('input_error');
			});

			$("form").on("submit", function(e){
				e.preventDefault();

				( isValid($(this)) ) ? console.log("well done!") : console.log("valid fail!");
			});
		};

		function isValid(thisForm){

			var isValid = true;

			thisForm.find('input, textarea').each(function(i){

				var $this = $(this),
				thisVal = $this.val();

				if ($this.prop('required')) {

					if ($this.is('input[type="email"]')) {

						if (validateEmail(thisVal)) {

							$this.removeClass('input_error');
							return isValid = true;

						} else {

							$this.addClass('input_error');
							showErrors($this);
							return isValid = false;
						}

					}

					if (!thisVal.trim()) {

						$this.addClass('input_error');
						showErrors($this);
						return isValid = false;

					} else {

						$this.removeClass('input_error');
						return isValid = true;

					}	

				}

			});

			return isValid;
		};

		function validateEmail(email){
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		};

		function showErrors(elem){
			elem.qtip({ 
				content: {
					text: 'Нужно заполнить все поля' 
				},
				position: {
					my: 'left center', 
					at: 'right center',
					adjust: {
						x: 40
					}
				}, 
				show: {
					ready: true,
					event: false
				},
				hide: {
					event: 'focus'
				}
			})
		};

		return {
			init:init
		}
	}());

	$(document).ready(function(){
		validation.init();
	});

	/******************
	**  file-preview **
	******************/

	var filePreview = (function(){

		var previewList = $('.creator-list');
		var overlayContainer = $('.overlay-img-container');
		
		var init = function(){
			setUpListeners();
			resAndDrag();
		};

		var setUpListeners = function(){
			$('.overlay-img-control').on("click", function(e){
				e.preventDefault();
			});

			$('.overlay-img-control.refresh').on("click", defaultImage);
			$('#creator-upload-button').on('change', loadFile);
			previewList.on('click', '.creator-item', activeOverlay);
			previewList.on('click', '.creator-item-close', deletePreviewImg);
		};

		function loadFile(e){
			var creatorItem = $('.creator-item');
			
			if ( e.target.files[0] ) {
				if ( e.target.files[0].type != 'image/jpeg' ) {
					if ( e.target.files[0].type != 'image/png' ) {
						return;
					}
				}
			};

			var output = URL.createObjectURL(e.target.files[0]);

			creatorItem.removeClass('active');

			var preview = '<li class="creator-item active"> \
			<img src="'+output+'" alt="img" class="creator-img img-responsive"> \
			<a href="#" class="creator-item-close"></a> \
			</li>';
			previewList.append(preview);

			var realHeight;
			var realWidth;

			$('.creator-item.active').find("img").load(function(e){
				realHeight = $('.creator-item.active').find("img")[0].naturalHeight;
				realWidth = $('.creator-item.active').find("img")[0].naturalWidth;
				
				var containerHeight = $("#tab-content-container").outerHeight();
				var containerWidth = $("#tab-content-container").outerWidth();

				var procHeigt = 0;
				var procWidth = 0;

				if (realHeight > containerHeight) {
					procHeigt = (realHeight-containerHeight)/realHeight*100;
				}

				if (realWidth > containerWidth) {
					procWidth = (realWidth-containerWidth)/realWidth*100;
				}

				procHeigt > procWidth ? proc = procHeigt : proc = procWidth;

				proc = proc.toFixed(0);
				

				var _newH = (realHeight/100*(100-proc)).toFixed(0)-10;
				var _newW = (realWidth/100*(100-proc)).toFixed(0)-10;

				overlayContainer.height(_newH);
				overlayContainer.width(_newW);

				overlayContainer.attr("data-w", _newW);
				overlayContainer.attr("data-h", _newH);

				overlayContainer.css({
					"top"  : 0,
					"left" : 0
				});

				addOverlayImg(output);
			});

		};

		function activeOverlay(e){
			var $this = $(this);
			$this.addClass('active').siblings().removeClass('active');

			var src = $this.find("img").attr('src');

			var containerHeight = $("#tab-content-container").outerHeight();
			var containerWidth = $("#tab-content-container").outerWidth();
			var realHeight = $this.find("img")[0].naturalHeight;
			var realWidth = $this.find("img")[0].naturalWidth;

			var procHeigt = 0;
			var procWidth = 0;

			if (realHeight > containerHeight) {
				procHeigt = (realHeight-containerHeight)/realHeight*100;
			}

			if (realWidth > containerWidth) {
				procWidth = (realWidth-containerWidth)/realWidth*100;
			}

			procHeigt > procWidth ? proc = procHeigt : proc = procWidth;

			proc = proc.toFixed(0);
			
			var _newH = (realHeight/100*(100-proc));
			var _newW = (realWidth/100*(100-proc));
			
			overlayContainer.height(_newH);
			overlayContainer.width(_newW);
			overlayContainer.css({
				"top"  : 0,
				"left" : 0
			});

			overlayContainer.attr("data-w", _newW);
			overlayContainer.attr("data-h", _newH);

			addOverlayImg(src);
		};


		function addOverlayImg(src){
			overlayContainer.show().find("img").attr("src", src);
		};

		function deletePreviewImg(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);
			$this.parent().remove();

			if ( !previewList.children().length ) 
				overlayContainer.hide();	
		};

		function defaultImage(e){
			var _w = overlayContainer.attr("data-w");
			var _h = overlayContainer.attr("data-h");

			overlayContainer.css({
				"top" : "0",
				"left" : "0",
				"width" : _w,
				"height" : _h
			});
		};

		function resAndDrag(){
			overlayContainer.resizable({
				aspectRatio: true,
				minWidth: 30,
				containment: "#tab-content-container"
			}).draggable({ 
				containment: "#tab-content-container", 
				scroll: false 
			});
		};

		return {
			init:init
		}
	}());

$(document).ready(function(){
	if ( $('.overlay-img-container').length )
		filePreview.init();
});

	/******************
	**  counts  *******
	******************/

	var counts = (function(){

		var countContainer = $(".card-count");					//контейнер к кол-ву товара
		var cardMinus = $(".card-count .card-count__minus");	//кнопка минуса
		var cardPlus = $(".card-count .card-count__plus");		//кнопка плюса

		var init = function(){
			setUpListeners();
		};

		var setUpListeners = function(){
			cardMinus.on("click", function(e){
				e.preventDefault();

				var $this = $(this);
				var textContainer = $this.siblings('.card-count__text');
				var text = parseInt( textContainer.html() );
				( text == 0 ) ? "" : textContainer.html(text-1);
			});

			cardPlus.on("click", function(e){
				e.preventDefault();

				var $this = $(this);
				var textContainer = $this.siblings('.card-count__text');
				var text = parseInt( textContainer.html() );
				( text == 99 ) ? "" : textContainer.html(text+1);
			});
		};

		return {
			init:init
		}
	}());

	$(document).ready(function(){
		counts.init();
	});

	/****************************
	**  basket-animation  *******
	****************************/

	if ( $('.basket').is(":visible") ) { //корзина спрятана на мобилках, свойственно анимация там и не нужна
		$(".clothing-item__button").click(function(e){
			e.preventDefault();

			var $this = $(this);
			var target = $this.parent().find("img:not(.clone)");
			var _top = target.offset().top - $(window).scrollTop();
			var _left = target.offset().left - $(window).scrollLeft();
			var basket = $(".basket-in");
			var basTop = basket.offset().top - $(window).scrollTop();
			var basLeft = basket.offset().left - $(window).scrollLeft();

			target 
			.clone()
			.addClass('clone')  
			.css({
				'position' : 'fixed',
				'z-index' : '100',
				'top' : _top,
				'left' : _left
			})  
			.insertBefore(target) 
			.animate({
				opacity: 0.5,   
				top: basTop,
				left: basLeft,   
				width: 50,   
				height: 50 
			},700, function(){ $(this).remove() });  
		});
	};

	/************************
	*** filters close btn ***
	************************/
	// Крестик на фильтрах. При нажатии, смотрит текст где лежал,
	// если текст совпадает с текстом инпута вложенным в сплывашку
	// убирает *checked* атрибут;

	var filtCloseBtns = $(".filters-item__close");
	filtCloseBtns.on("click", function(e){
		e.preventDefault();
		var $this = $(this);

		var $thisTxt = $(this).prev().text();
		var $inputsTexts = $this.parent().parent().next().find('.drop-brand-label-text');

		$inputsTexts.each(function() {
			var $this = $(this);

			if ( $this.text() == $thisTxt )
				$this.prev().removeAttr("checked");
		});
	});

	/********************
	*** filters click ***
	********************/
	//открываем дроп по нажатию на

	$('.filters-toggle-drop').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();

		var $this = $(this);
		$this.parent().parent().find(".dropdown-toggle").dropdown('toggle');
	});

	$('.filters-list, .filters-price__selected').on('click', function(e){
		e.preventDefault();
		e.stopPropagation();

		var $this = $(this);
		
		if ( !$(e.target).hasClass('filters-item__close') ) 
			$this.parent().find(".dropdown-toggle").dropdown('toggle');
	});

	/*******************
	**** input mask ****
	*******************/
	if ( $("input[name='tel']").length ) {
		$("input[name='tel']").mask("+7 (999) 999-99-99",{placeholder:"_"});
	}

	/*******************
	**** dropdown fix **
	*******************/
	// Фикс дропдауна, при наличии инпутов внутри. (Убираем с кнопок data-toggle)

	$('.filters .dropdown .dropdown-toggle').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('open');
	});

	$('body').on('click', function (e) {
		if ( !$('.filters .dropdown').is(e.target) && $('.filters .dropdown').has(e.target).length === 0 && $('.open').has(e.target).length === 0 ) {
			$('.filters .dropdown').removeClass('open');
		};
	});


	/*******************
	**** sidebar-items**
	*******************/

	$('.sidebar-item').on('click', function(e){
		$('.sidebar-item').removeClass('active');
		$(this).addClass('active');
	});

	$('.sidebar-item.active').find('.collapse').addClass('in');


	/*
	* animate-logo
	*/
	
	var imgHead = [
			$('.logo-particle_1').attr('src'),
			$('.logo-particle_2').attr('src'),
			$('.logo-particle_3').attr('src'),
			$('.logo-particle_4').attr('src'),
			$('.logo-particle_5').attr('src')
		], i=1;

	function csaHead(){

		if( i > (imgHead.length-1) ){
			$('.logo-div-img').animate({'opacity':'0'},600,function(){
				i=1;
				$('.logo-div-img').css({
					'background-image':'url('+imgHead[0]+')'
				});
			});
			$('.logo-div-img').animate({'opacity':'1'},600);
		}else{
			$('.logo-div-img').animate({'opacity':'0'},600,function(){
				$('.logo-div-img').css({
					'background-image':'url('+imgHead[i]+')'
				});
				i++;
			});
			$('.logo-div-img').animate({'opacity':'1'},600);
		}
		
	}
	var intervalCsaHead = setInterval(csaHead,2000);


}());