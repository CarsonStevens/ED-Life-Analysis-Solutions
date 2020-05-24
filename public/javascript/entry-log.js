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
    noSwipingClass: 'swiper-no-swiping',
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

  $("#feelings-input-btn").click(function() {
    $("#feelings-list").css({'display': 'block'});
    let feelingStr = $("#feelings-input").val();
    if(feelingStr.length > 0) {
      $("#feelings-list").append(`
          <li class="feeling" data-feeling="${feelingStr}">${feelingStr}<i class="fas fa-times-circle feeling-delete"></i></li>
        `);
      $("#feelings-input").val('');
      $(".feeling > .fa-times-circle").hover(function() {
        let feeling = $(this).parent();
        $(feeling).addClass("delete-shake");
        $(this).on("click", function() {
          $(this).parent().remove();
          if($("#feelings-list").children().length == 0) $("#feelings-list").css({'display': 'none'});
        });
      }, function() {
        $(this).parent().removeClass("delete-shake");
      });
    } else {
      alert("You didn't enter a feeling, silly!");
    }
  });


  $("#feelings-wheel").on("click", function() {
    if($("#floating-feelings-wheel-container").css('display') == 'none') $("#floating-feelings-wheel-container").css({'display': 'flex'});
  });
  $("#floating-feelings-wheel-exit").on("click", function() {
    $("#floating-feelings-wheel-container").css({"display": "none"});
  });

  let floatingFeelingsWheelTimer = null;
  let floatDelay = 250;
  $("#feelings-wheel").on("mouseover", function() {
    floatingFeelingsWheelTimer = setTimeout(function(){
      if($("#floating-feelings-wheel-container").css('display') == 'none') $("#floating-feelings-wheel-container").css({'display': 'flex'});
    }, floatDelay);
  }, function() {
    clearTimeout(floatingFeelingsWheelTimer);
  });


  // Spinner Controls
  $(".inc-button").on("click", function() {
    let input = $(this).parent().parent().children("input");
    $(input).val(parseInt($(input).val())+$(input).data("step"));
  });
  $(".dec-button").click(function() {
    let input = $(this).parent().parent().children("input");
    if(parseInt($(input).val()) > 0) $(input).val(parseInt($(input).val())-$(input).data("step"));
  });

  $("#exercise-type-input").change(function() {
    if($(this).val() == 'none') $("#exercise-entry-container > section:not(:first-of-type)").css({'display': 'none'});
    else $("#entry-exercise-info-container, #entry-exercise-duration-container").css({'display': 'grid'});
  });
});
