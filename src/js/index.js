import 'slick-carousel';

const $pdpSlider = $('.slider-pdp .js-slides');

$pdpSlider.slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  fade: true,
  asNavFor: $('.slider-thumbs .js-thumbs')
});

function silenceHiddenVideos($sliderName) {
  $sliderName.find('.slick-slide').each(function() {
    const $this = $(this);

    if (! $this.hasClass('slick-active')) {
      const video = $this.find('video').get(0);

      if (video) {
        video.pause();
      }

      const externalVideo = $this.find('.slide--external-video').find('iframe');

      if (externalVideo) {
        const currentSrc = externalVideo.prop('src');
        externalVideo.prop('src', '');
        externalVideo.prop('src', currentSrc);
      }
    }
  })
}

$pdpSlider.find('.slick-arrow').on('click', function() {
  silenceHiddenVideos($pdpSlider);
});

$('.slider-thumbs .js-thumbs').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: $('.slider-pdp .js-slides'),
  centerMode: true,
  centerPadding: 0,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

$('.js-radio-variant').on('change', function(event) {
  const $this   = $(this);
  const val     = $this.data('name');

  $('.product-single__variants option[data-variantname="'+val+'"]').prop('selected', true)
});

$('.js-section-order').each(function() {
  const $this = $(this);
  const number = $this.data('order');

  if (number) {
    $this.closest('.product__item').addClass('order-' + number);
  }
})
