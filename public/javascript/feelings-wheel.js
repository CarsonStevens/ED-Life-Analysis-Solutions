/*jshint esversion: 8 */

$(document).ready(function() {

  $("#feelings-wheel").on("click", function() {
    if($("#floating-feelings-wheel-container").css('display') == 'none') $("#floating-feelings-wheel-container").css({'display': 'flex'});
    FeelingSelect();
  });
  $("#floating-feelings-wheel-exit").on("click", function() {
    $("#floating-feelings-wheel-container").css({"display": "none"});
  });


  let numOuterFeelings = $("#Outer > .feeling-wheel-feeling").parent().children().length;
  let numMiddleFeelings = $("#Middle > .feeling-wheel-feeling").parent().children().length;
  let numInnerFeelings = $("#Inner > .feeling-wheel-feeling").parent().children().length;
  // console.log(numInnerFeelings, numMiddleFeelings, numOuterFeelings);

  let selectedFeelingGenre = '';
  function FeelingGenreSelect() {
    let error = false;
    let selector = ".happy, .sad, .disgusted, .angry, .fearful, .surprised";
    $(".happy").hover(function() {
      if (selectedFeelingGenre != "happy") {
        selectedFeelingGenre = "happy";
        $("#Outer > .feeling-wheel-feeling").each(function(index) {
          if($(this).hasClass("happy")) {
            $(this).data("genre-index", {index: index, layer: "#Outer"});
            moveUp(this);
            let offsets = calcOuterOffsets(index);
            if (offsets == false) {
              error = true;
            } else {
              applyTransform(this, offsets.xOffset, offsets.yOffset, 0, offsets.reverse, 1.2);
            }
          }
        });
        $("#Middle > .feeling-wheel-feeling").each(function(index) {
          if($(this).hasClass("happy")) {
            $(this).data("genre-index", {index: index, layer: "#Middle"});
            moveUp(this);
            let offsets = calcMiddleOffsets(index);
            if (offsets == false) {
              error = true;
            } else {
              applyTransform(this, offsets.xOffset, offsets.yOffset, 0, offsets.reverse, 1.3);
            }
          }
        });
        $("#Inner > .feeling-wheel-feeling").each(function(index) {
          if($(this).hasClass("happy")) {
            $(this).data("genre-index", {index: index, layer: "#Inner"});
            moveUp(this);
            let offsets = calcMiddleOffsets(index);
            if (offsets == false) {
              error = true;
            } else {
              applyTransform(this, offsets.xOffset, offsets.yOffset, 0, offsets.reverse, 1.4);
            }
          }
        });
      } else {
        genreFeelingReset();
      }
    });

    if (error) {
      alert("Can't find defined layer for FeelingGenreSelect() with selector: " + selector);
    } else {
      console.log("Feeling interaction rules successfully uploaded");
    }
  }

  function genreFeelingReset() {
    $("svg > g > .feeling-wheel-feeling").each(function(index) {
      moveBack(this, this.data("genre-index").layer, this.data("genre-index").index);
    });
  }

  function FeelingSelect(extraSelectors) {
    let selector = extraSelectors || ".feeling-wheel-feeling";
    let error = false;
    if (selector.search("#Outer") != -1 || selector.search(".feeling-wheel-feeling") != -1) {
      if (selector == ".feeling-wheel-feeling") {
        selector = "#Outer > .feeling-wheel-feeling";
      }
      $(selector).each(function(index) {
        $(this).hover(function() {
          resetFeelingPosition("#Outer", this);
          currentOuterFeeling = moveUp($(this));
          currentOuterFeelingIndex = index;
          let offsets = calcOuterOffsets(index);
          if (offsets == false) {
            error = true;
          } else {
            applyTransform(this, offsets.xOffset, offsets.yOffset, offsets.rotateDegs, offsets.reverse, 1.2);
          }
        });
      });
    }

    if (!error && (selector.search("#Middle") != -1 || selector.search(".feeling-wheel-feeling") != -1)) {
      if (selector == "#Outer > .feeling-wheel-feeling") {
        selector = "#Middle > .feeling-wheel-feeling";
      }
      $(selector).each(function(index) {
        $(this).hover(function() {
          resetFeelingPosition("#Middle", this);
          currentMiddleFeeling = moveUp($(this));
          currentMiddleFeelingIndex = index;
          let offsets = calcMiddleOffsets(index);
          if (offsets == false) {
            error = true;
          } else {
            applyTransform(this, offsets.xOffset, offsets.yOffset, offsets.rotateDegs, offsets.reverse, 1.3);
          }
        });
      });
    }

    if (!error && (selector.search("#Inner") != -1 || selector.search(".feeling-wheel-feeling") != -1)) {
      if (selector == "#Middle > .feeling-wheel-feeling") {
        selector = "#Inner > .feeling-wheel-feeling";
      }
      $(selector).each(function(index) {
        $(this).hover(function() {
          resetFeelingPosition("#Inner", this);
          currentInnerFeeling = moveUp($(this));
          currentInnerFeelingIndex = index;
          let offsets = calcInnerOffsets(index);

          if (offsets == false) {
            error = true;
          } else {
            applyTransform(this, offsets.xOffset, offsets.yOffset, offsets.rotateDegs, offsets.reverse, 1.4);
          }
        });
      });
    }

    if (error) {
      alert("Can't find defined layer for FeelingSelect() with selector: " + selector);
    } else {
      console.log("Feeling interaction rules successfully uploaded");
    }
  }

  let currentOuterFeeling = null;
  let currentOuterFeelingIndex = null;
  let currentMiddleFeeling = null;
  let currentMiddleFeelingIndex = null;
  let currentInnerFeeling = null;
  let currentInnerFeelingIndex = null;

  function resetFeelingPosition(layer, selectedObject) {
    let that = selectedObject;
    if (layer == "#Outer") {
      if (currentOuterFeeling == null || currentOuterFeeling != $(that)) {
        $(currentOuterFeeling).css({'transform': `rotate(0deg)`});
        moveBack(currentOuterFeeling, "#Outer", currentOuterFeelingIndex);
      }
    } else if (layer == "#Middle") {
      if (currentMiddleFeeling == null || currentMiddleFeeling != $(that)) {
        $(currentMiddleFeeling).css({'transform': `rotate(0deg)`});
        moveBack(currentMiddleFeeling, "#Middle", currentMiddleFeelingIndex);
      }
    } else if (layer == "#Inner") {
      if (currentInnerFeeling == null || currentInnerFeeling != $(that)) {
        $(currentInnerFeeling).css({'transform': `rotate(0deg)`});
        moveBack(currentInnerFeeling, "#Inner", currentInnerFeelingIndex);
      }
    }
  }

  function applyTransform(selectedObject, xOffset, yOffset, rotateDegs, reverse, scaleMultiplier) {
    let reverseAngle = 0;
    if (reverse) reverseAngle = 180;
    $(selectedObject).css(
      {'transform-origin': xOffset+'px '+yOffset+'px',
        'transform': `rotate(${rotateDegs+reverseAngle}deg) scale(${scaleMultiplier},${scaleMultiplier})`
      }
    );
  }

  function calcMiddleOuterAngles(index) {
    let rotateDegs = (90-index*(90/(numOuterFeelings/4)));
    return rotateDegs;
  }

  function calcOuterOffsets(index) {
    let yOffset = 0;
    let xOffset = 0;
    let rotateDegs = calcMiddleOuterAngles(index);
    if(index < 36) {
      if (index < 18) {
        yOffset = (800-625*Math.sin(rotateDegs * Math.PI / 180));
      } else {
        yOffset = (675-625*Math.sin(rotateDegs * Math.PI / 180));
      }
      xOffset = (825 + 625*Math.cos(rotateDegs * Math.PI / 180));
      return {xOffset: xOffset, yOffset: yOffset, rotateDegs: rotateDegs, reverse: false};
    }
    else if (index >= 36 && index < 72) {
      if (index >= 54) {
        yOffset = (800-625*Math.sin(rotateDegs * Math.PI / 180));
      } else {
        yOffset = (850-625*Math.sin(rotateDegs * Math.PI / 180));
      }
      xOffset = (825 + 625*Math.cos(rotateDegs * Math.PI / 180));
      return {xOffset: xOffset, yOffset: yOffset, rotateDegs: rotateDegs, reverse: true};
    }
    else {
      alert("error");
      return false;
    }
  }

  function calcMiddleOffsets(index) {
    let yOffset = 0;
    let xOffset = 0;
    if(index < 18) {
      let rotateDegs = (90-index*(90/(numMiddleFeelings/4)));
      if (index < 9) {
        yOffset = (800-340*Math.sin(rotateDegs * Math.PI / 180));
      } else {
        yOffset = (750-340*Math.sin(rotateDegs * Math.PI / 180));
      }
      xOffset = (825 + 340*Math.cos(rotateDegs * Math.PI / 180));
      return {xOffset: xOffset, yOffset: yOffset, rotateDegs: rotateDegs, reverse: false};
    }
    else if (index >= 18 && index < 36) {
      let rotateDegs = (90-index*(90/(numMiddleFeelings/4)));
      if (index >= 27) {
        yOffset = (800-340*Math.sin(rotateDegs * Math.PI / 180));
      } else {
        yOffset = (850-340*Math.sin(rotateDegs * Math.PI / 180));
      }
      xOffset = (825 + 340*Math.cos(rotateDegs * Math.PI / 180));
      return {xOffset: xOffset, yOffset: yOffset, rotateDegs: rotateDegs, reverse: true};
    }
    else {
      alert("error");
      return false;
    }
  }

  function calcInnerOffsets(index) {
    //Numbers relate to the center position in relation to the outer selectors
    let innerFeelingAngles = [2,9.5,23,36,44,54,66];
    let rotateDegs =  (90-innerFeelingAngles[(innerFeelingAngles.length-1)-index]*(90/(numOuterFeelings/4)));
    let yOffset = 0;
    let xOffset = 0;
    xOffset = (820 + 120*Math.cos(rotateDegs * Math.PI / 180));
    if (index >= 3) {
      yOffset = (820-120*Math.sin(rotateDegs * Math.PI / 180));
    } else {
      rotateDegs += 180;
      yOffset = (820+120*Math.sin(rotateDegs * Math.PI / 180));
    }
    return {xOffset: xOffset, yOffset: yOffset, rotateDegs: rotateDegs, reverse: false};
  }

  function moveUp(thisObject){
      thisObject.appendTo(thisObject.parents('svg > g'));
      return thisObject;
  }

  function moveBack(thisObject, layerToAddBackTo, currentFeelingIndex) {
    $(layerToAddBackTo + " > .feeling-wheel-feeling:nth-child("+(currentFeelingIndex+1) + ")").before(thisObject);
  }



});
