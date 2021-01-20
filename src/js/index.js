import 'slick-carousel';

$('.slider-pdp .js-slides').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  fade: true,
  asNavFor: $('.slider-thumbs .js-thumbs')
});

$('.slider-thumbs .js-thumbs').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: $('.slider-pdp .js-slides'),
  centerMode: true,
  centerPadding: 0,
  focusOnSelect: true
});

$('.js-radio-variant').on('change', function(event) {
  const $this   = $(this);
  const val     = $this.data('name');
  
  $('.product-single__variants option[data-variantname="'+val+'"]').prop('selected', true)
});
