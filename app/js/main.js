$(function() {

	/*****************
	** custom select *
	*****************/

	$('select').select2();

	/*****************
	**  slider card **
	*****************/

	var $thumbs = $(".slider-thumbs__list .slider-thumbs__item");

	$thumbs.on("click", function(e){
		var $this = $(this);
		$this.addClass('active').siblings().removeClass('active');
	});

	/*************************************
	**   inner-pop-up - password pop   **
	*************************************/

	var innerModal = $(".inner-modal");			 //Внутренние модалки
	var openButtons = $("[data-my-pop='true']"); //Кнопки с дата атрибутом, открывающие внутренние модалки.

	innerModal.on("click", closePopup);
	openButtons.on("click", thatWillBeOpen);

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

	$(".modal").on('hidden.bs.modal', function () {
		$('.qtip').hide();
	});

	$(".modal a").on("click", function(e){     //при клике на любой линк в модалке, убираем ошибки валида
		$('.qtip').hide();
	});

    /******************
	**  validation   **
	******************/

	var inputs = $("form").find('input, textarea'); //инпуты в формах

	inputs.on('keydown', function(e){ //удаляем ошибки при нажатии клавишь на поле ввода
		var $this = $(this);
		$this.removeClass('input_error');
	});

	$("form").on("submit", function(e){
		e.preventDefault();
		
		( isValid($(this)) ) ? console.log("well done!") : console.log("valid fail!");

	});

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

	/******************
	**  file-preview **
	******************/

	var previewList = $('.creator-list');
	var overlayContainer = $('.overlay-img-container');

	$('.overlay-img-control').on("click", function(e){
		e.preventDefault();
	});

	$('.overlay-img-control.refresh').on("click", defaultImage);
	$('#creator-upload-button').on('change', loadFile);
	previewList.on('click', '.creator-item', activeOverlay);
	previewList.on('click', '.creator-item-close', deletePreviewImg);

	function loadFile(e){
		var creatorItem = $('.creator-item');
		console.log(e.target.files[0]);
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

		addOverlayImg(output);
	};

	function activeOverlay(e){
		var $this = $(this);
		$this.addClass('active').siblings().removeClass('active');

		var src = $this.find("img").attr('src');
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
		overlayContainer.css({
			"width" : "auto",
			"height" : "auto",
			"top" : "0",
			"left" : "0"
		})
	};

	if ( overlayContainer.length ) {
		overlayContainer.resizable({
			aspectRatio: true,
			minWidth: 25,
			containment: "#tab-content-container"
		}).draggable({ 
			containment: "#tab-content-container", 
			scroll: false 
		});
	};

	/******************
	**  counts  *******
	******************/

	var countContainer = $(".card-count");
	var cardMinus = $(".card-count .card-count__minus");
	var cardPlus = $(".card-count .card-count__plus");

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

	function changeCount(val){
		event.preventDefault();

		( text == 0 ) ? "" : cardText.html(text+val);
	};

}());