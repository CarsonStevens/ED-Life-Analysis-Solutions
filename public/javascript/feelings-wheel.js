/*jshint esversion: 8 */

$(document).ready(function() {


  let numOuterFeelings = $("#Outer > .feeling-wheel-feeling").parent().children().length;
  let numMiddleFeelings = $("#Middle > .feeling-wheel-feeling").parent().children().length;
  let numInnerFeelings = $("#Inner > .feeling-wheel-feeling").parent().children().length;
  // console.log(numInnerFeelings, numMiddleFeelings, numOuterFeelings);
  let hoverScale = 1;

  let currentOuterFeeling = null;
  let currentOuterFeelingIndex = null;
  $("#Outer > .feeling-wheel-feeling").each(function(index) {
    $(this).hover(function() {
      if (currentOuterFeeling == null || currentOuterFeeling != moveUp($(this))) {
        $(currentOuterFeeling).css({'transform': `rotate(0deg)`});
        moveBack(currentOuterFeeling, "#Outer", currentOuterFeelingIndex);
      }
      currentOuterFeeling = moveUp($(this));
      currentOuterFeelingIndex = index;
      let yOffset = 0;
      let xOffset = 0;
      currentFade = true;
      if(index < 36) {
        let rotateDegs = (90-index*(90/(numOuterFeelings/4)));
        if (index < 18) {
          yOffset = (800-625*Math.sin(rotateDegs * Math.PI / 180));
        } else {
          yOffset = (675-625*Math.sin(rotateDegs * Math.PI / 180));
        }
        xOffset = (825 + 625*Math.cos(rotateDegs * Math.PI / 180));
        $(this).css(
          {'transform-origin': xOffset+'px '+yOffset+'px',
            'transform': `rotate(${rotateDegs}deg) scale(1.2,1.2)`
          });
      }
      else if (index >= 36 && index < 72) {
        let rotateDegs = (90-index*(90/(numOuterFeelings/4)));
        if (index >= 54) {
          yOffset = (800-625*Math.sin(rotateDegs * Math.PI / 180));
        } else {
          yOffset = (850-625*Math.sin(rotateDegs * Math.PI / 180));
        }
        xOffset = (825 + 625*Math.cos(rotateDegs * Math.PI / 180));
        $(this).css(
          {'transform-origin': xOffset+'px '+yOffset+'px',
            'transform': `rotate(${rotateDegs+180}deg) scale(1.2,1.2)`
          });
      }
      else {
        alert("error");
      }
    });
  });

  let currentMiddleFeeling = null;
  let currentMiddleFeelingIndex = null;
  $("#Middle > .feeling-wheel-feeling").each(function(index) {
    $(this).hover(function() {
      if (currentMiddleFeeling == null || currentMiddleFeeling != moveUp($(this))) {
        $(currentMiddleFeeling).css({'transform': `rotate(0deg)`});
        moveBack(currentMiddleFeeling, "#Middle", currentMiddleFeelingIndex);
      }
      currentMiddleFeeling = moveUp($(this));
      currentMiddleFeelingIndex = index;
      let yOffset = 0;
      let xOffset = 0;
      currentFade = true;
      if(index < 18) {
        let rotateDegs = (90-index*(90/(numMiddleFeelings/4)));
        if (index < 9) {
          yOffset = (800-340*Math.sin(rotateDegs * Math.PI / 180));
        } else {
          yOffset = (750-340*Math.sin(rotateDegs * Math.PI / 180));
        }
        xOffset = (825 + 340*Math.cos(rotateDegs * Math.PI / 180));
        $(this).css(
          {'transform-origin': xOffset+'px '+yOffset+'px',
            'transform': `rotate(${rotateDegs}deg) scale(1.2,1.2)`
          });
      }
      else if (index >= 18 && index < 36) {
        let rotateDegs = (90-index*(90/(numMiddleFeelings/4)));
        if (index >= 27) {
          yOffset = (800-340*Math.sin(rotateDegs * Math.PI / 180));
        } else {
          yOffset = (850-340*Math.sin(rotateDegs * Math.PI / 180));
        }
        xOffset = (825 + 340*Math.cos(rotateDegs * Math.PI / 180));
        $(this).css(
          {'transform-origin': xOffset+'px '+yOffset+'px',
            'transform': `rotate(${rotateDegs+180}deg) scale(1.3,1.3)`
          });
      }
      else {
        alert("error");
      }
    });
  });

  let currentInnerFeeling = null;
  let currentInnerFeelingIndex = null;
  let innerFeelingAngles = [2,9.5,23,36,44,54,66];
  $("#Inner > .feeling-wheel-feeling").each(function(index) {
    $(this).hover(function() {
      if (currentInnerFeeling == null || currentInnerFeeling != moveUp($(this))) {
        $(currentInnerFeeling).css({'transform': `rotate(0deg)`});
        moveBack(currentInnerFeeling, "#Inner", currentInnerFeelingIndex);
      }
      currentInnerFeeling = moveUp($(this));
      currentInnerFeelingIndex = index;
      let yOffset = 0;
      let xOffset = 0;
      let rotateDegs =  (90-innerFeelingAngles[(innerFeelingAngles.length-1)-index]*(90/(numOuterFeelings/4)));
      xOffset = (820 + 120*Math.cos(rotateDegs * Math.PI / 180));
      if (index >= 3) {

        yOffset = (820-120*Math.sin(rotateDegs * Math.PI / 180));
      } else {
        rotateDegs += 180;
        yOffset = (820+120*Math.sin(rotateDegs * Math.PI / 180));
      }

      $(this).css(
        {'transform-origin': xOffset+'px '+yOffset+'px',
          'transform': `rotate(${rotateDegs}deg) scale(1.4,1.4)`
        });
    });
  });


  function moveUp(thisObject){
      thisObject.appendTo(thisObject.parents('svg > g'));
      return thisObject;
  }

  function moveBack(thisObject, layerToAddBackTo, currentFeelingIndex) {
    $(layerToAddBackTo + " > .feeling-wheel-feeling:nth-child("+(currentFeelingIndex+1) + ")").before(thisObject);
  }

});
