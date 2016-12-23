$(function() {

  /* ----- custom select ------*/
  $('select').select2();

  /* ----- slider card --------*/
  var $thumbs = $(".slider-thumbs__list .slider-thumbs__item");

  $thumbs.on("click", function(e){
  	var $this = this;
  	$($this).addClass('active').siblings().removeClass('active');
  });


}());