/*jshint esversion: 8 */

$(document).ready(function() {

  //   // lazy: {
  //   //   loadPrevNext: true,
  //   //   loadPrevNextAmount: 2,
  //   //   loadOnTransitionStart: false,
  //   //   elementClass: 'swiper-lazy',
  //   //   loadingClass: 'swiper-lazy-loading',
  //   //   loadedClass: 'swiper-lazy-loaded',
  //   //   preloaderClass: 'swiper-lazy-preloader'
  //   // },
  //   // preloadImages: false,
  //   // keyboard: {
  //   //   enabled: true,
  //   //   onlyInViewport: false,
  //   // }

  var swiper = new Swiper('.swiper-container', {
    // Optional parameters
    speed: 500,
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 500,
    freeMode: true,
    freeModeMomentumRatio: 0.6,
    freeModeMomentumVelocityRatio: 0.8,
    freeModeSticky: true,
    observer: true,
    observeParents: true,
    on: {
      init: function () {
        console.log('swiper initialized');
      },
      slideChange: function () {
        console.log('slide changed');
      }
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      progressbarOpposite: false,
      // renderBullet: function (index, className) {
      //       return '<span class="' + className + '">' + (index + 1) + '</span>';
      // },
      renderProgressbar: function (progressbarFillClass) {
          return '<span class="' + progressbarFillClass + '"></span>';
      },
      progressbarFillClass: 'swiper-pagination-progressbar-fill',
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
      currentClasss: "swiper-pagination-current",
      clickableClass: "swiper-pagination-clickable",
      lockClass: "swiper-pagination-lock"
    },

    grabCursor: true,
    noSwipingSelector: 'input',

    watchSlidesProgress: true,
    paginationClickable: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    }
  });

});
