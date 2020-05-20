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

});
