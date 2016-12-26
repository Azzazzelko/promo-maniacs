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
		var $this = this;
		$($this).addClass('active').siblings().removeClass('active');
	});

	/*************************************
	**   inner-pop-up - password pop   **
	*************************************/

	$(".authorization-pop__forgot-password").on("click", openPopup);
	$(".inner-modal").on("click", closePopup);

	function openPopup(e) { 
		e.preventDefault();
		$("#pass-res-pop-up").fadeIn(200);
	};

	function closePopup(e) {
		e.preventDefault();
		var $target = $(e.target);

		if ($target.hasClass('inner-modal') || $target.hasClass('pass-res-pop__close-button')) {
			$('.inner-modal').fadeOut(200);
			$('.qtip').hide();
		}
	};

	$(".modal").on('hidden.bs.modal', function () {
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

}());