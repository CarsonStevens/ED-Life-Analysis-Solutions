/*jshint esversion: 8 */

$(document).ready(function() {

  // Dashboard tab switching
  $(".tab").on("click", function() {
    $(".container").css({"display": "none"});
    if($(this).data("tab") == "dashboard" && !$("#dashboard").hasClass("selected-tab")) {
      $(".selected-tab").addClass("unselected-tab").removeClass("selected-tab");
      $("#dashboard").addClass("selected-tab").removeClass("unselected-tab");
      $("#dashboard-container").css({"display": "grid"});
    }
    else if ($(this).data("tab") == "entry" && !($("#entry").hasClass("selected-tab"))) {
      $(".selected-tab").addClass("unselected-tab").removeClass("selected-tab");
      $("#entry").addClass("selected-tab").removeClass("unselected-tab");
      $("#entry-container").css({"display": "grid"});
    }
    else if ($(this).data("tab") == "settings" && !$("#settings").hasClass("selected-tab")) {
      $(".selected-tab").addClass("unselected-tab").removeClass("selected-tab");
      $("#settings").addClass("selected-tab").removeClass("unselected-tab");
      $("#settings-container").css({"display": "flex"});
    }
  });

  $("#user-media-title").on("click", function() {
    if($("#floating-newsfeed-container").css("display") == "none") {
      $("#floating-newsfeed-container").css({"display": "flex"}).html(`
        <i id="floating-newsfeed-exit" class="fas fa-times-circle"></i>
        <span id="floating-newsfeed-title" class="dashboard-title">Newsfeed</span>
        <section id="floating-newsfeed">
          ${$("#newsfeed").html()}
        </section>
        `);
      $("#floating-newsfeed-exit").on("click", function() {
        $("#floating-newsfeed-container").css({"display": "none"});
      });

    } else {
      $("#floating-newsfeed-container").css({"display": "none"});
    }
  });
});
