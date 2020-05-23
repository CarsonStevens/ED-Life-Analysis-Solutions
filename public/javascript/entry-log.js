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
    preventInteractionOnTransition: true,
    noSwiping: false,
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


  function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }

  setInputFilter(document.getElementById("weight-input-manual"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
  });

});
