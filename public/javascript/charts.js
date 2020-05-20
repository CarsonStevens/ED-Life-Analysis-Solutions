/*jshint esversion: 8 */

Array.prototype.std = function() {
  let i, j, total = 0,
    mean = 0,
    diffSqredArr = [];
  for (i = 0; i < this.length; i += 1) {
    total += this[i];
  }
  mean = total / this.length;
  for (j = 0; j < this.length; j += 1) {
    diffSqredArr.push(Math.pow((this[j] - mean), 2));
  }
  return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl) {
    return firstEl + nextEl;
  }) / this.length));
};

Array.prototype.mean = function() {
  let i, j, total = 0,
    mean = 0,
    diffSqredArr = [];
  for (i = 0; i < this.length; i += 1) {
    total += this[i];
  }
  mean = total / this.length;
  return mean;
};

function toggleAxes(axis) {
  let disabled = true;
  axis.series.each(function(series) {
    if (!series.isHiding && !series.isHidden) {
      disabled = false;
    }
  });
  axis.disabled = disabled;
}

function createDashboardChart(weights, stdWeights) {

  // Themes begin
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  let chart = am4core.create("chart", am4charts.XYChart);

  // Add data to chart
  chart.data = createFakeData(weights, stdWeights);
  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  //dateAxis.renderer.grid.template.location = 0;
  //dateAxis.renderer.minGridDistance = 30;

  let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis1.title.text = "Calories";
  valueAxis1.title.fill = am4core.color("#514e24");
  let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis2.title.text = "Water";
  valueAxis2.title.fill = am4core.color("#343874");
  let valueAxis3 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis3.title.text = "Weight";
  let valueAxis4 = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis4.title.text = "Std Weight";

  valueAxis1.renderer.opposite = true;
  valueAxis1.renderer.labels.template.fill = am4core.color("#514e24");
  valueAxis2.renderer.labels.template.fill = am4core.color("#343874");
  valueAxis2.renderer.opposite = true;
  valueAxis2.renderer.grid.template.disabled = true;

  // Create series
  let series1 = chart.series.push(new am4charts.ColumnSeries());
  series1.dataFields.valueY = "calories";
  series1.dataFields.dateX = "date";
  series1.yAxis = valueAxis1;
  series1.name = "Calories";
  series1.tooltipText = "{name}\n[bold font-size: 10]{valueY} cals[/]";
  series1.fill = chart.colors.getIndex(0);
  series1.strokeWidth = 1;
  series1.clustered = false;
  series1.columns.template.width = am4core.percent(40);
  series1.interpolationDuration = 5000;
  series1.sequencedInterpolation = true;

  series1.events.on("hidden", function(ev) {
    series1.hide();
    toggleAxes(series1.yAxis);
  });

  series1.events.on("shown", function() {
    series1.show();
    toggleAxes(series1.yAxis);
  });

  let series2 = chart.series.push(new am4charts.ColumnSeries());
  series2.dataFields.valueY = "water";
  series2.dataFields.dateX = "date";
  series2.yAxis = valueAxis2;
  series2.name = "Water oz";
  series2.tooltipText = "{name}\n[bold font-size: 10] {valueY} oz[/]";
  series2.fill = chart.colors.getIndex(0).lighten(0.5);
  series2.strokeWidth = 0;
  series2.clustered = false;
  series2.toBack();

  series2.events.on("hidden", function(ev) {
    series2.hide();
    toggleAxes(series2.yAxis);
  });

  series2.events.on("shown", function() {
    series2.show();
    toggleAxes(series2.yAxis);
  });

  let series3 = chart.series.push(new am4charts.LineSeries());
  series3.dataFields.valueY = "standardizedWeight";
  series3.dataFields.dateX = "date";
  series3.name = "Std. Weight";
  series3.strokeWidth = 2;
  let range = valueAxis4.createSeriesRange(series3);
  range.value = 0;
  range.endValue = -1000;
  range.contents.stroke = am4core.color("#a55");
  range.contents.fill = am4core.color("#a55");
  range.contents.strokeOpacity = 0.7;
  range.contents.fillOpacity = 0.3;
  series3.fillOpacity = 0.3;
  series3.tensionX = 0.7;
  series3.yAxis = valueAxis4;
  series3.tooltipText = "{name}\n[bold font-size: 10]{valueY}[/]";

  let bullet3 = series3.bullets.push(new am4charts.CircleBullet());
  bullet3.circle.radius = 3;
  bullet3.circle.strokeWidth = 2;
  bullet3.circle.fill = am4core.color("#fff");

  series3.events.on("hidden", function(ev) {
    series3.hide();
    toggleAxes(series3.yAxis);
  });

  series3.events.on("shown", function() {
    series3.show();
    toggleAxes(series3.yAxis);
  });


  let series4 = chart.series.push(new am4charts.LineSeries());
  series4.dataFields.valueY = "actualWeight";
  series4.dataFields.dateX = "date";
  series4.name = "Weight";
  series4.strokeWidth = 2;
  series4.tensionX = 0.7;
  series4.yAxis = valueAxis3;
  series4.tooltipText = "{name}\n[bold font-size: 10]{valueY} lbs.[/]";
  series4.stroke = chart.colors.getIndex(0).lighten(0.5);
  series4.strokeDasharray = "3,3";

  let bullet4 = series4.bullets.push(new am4charts.CircleBullet());
  bullet4.circle.radius = 3;
  bullet4.circle.strokeWidth = 2;
  bullet4.circle.fill = am4core.color("#fff");

  series4.events.on("hidden", function(ev) {
    series4.hide();
    toggleAxes(series4.yAxis);
  });

  series4.events.on("shown", function() {
    series4.show();
    toggleAxes(series4.yAxis);
  });


  // Add cursor
  chart.cursor = new am4charts.XYCursor();

  // Add legend
  chart.legend = new am4charts.Legend();
  chart.legend.position = "top";

  // Add scrollbar
  chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series1);
  chart.scrollbarX.series.push(series3);
  chart.scrollbarX.parent = chart.bottomAxesContainer;



  // series.tooltip.getFillFromObject = false;
  // series.tooltip.adapter.add("x", (x, target)=>{
  //     if(series.tooltip.tooltipDataItem.valueY < 0){
  //         series.tooltip.background.fill = chart.colors.getIndex(4);
  //     }
  //     else{
  //         series.tooltip.background.fill = chart.colors.getIndex(0);
  //     }
  //     return x;
  // });


  // valueAxis.renderer.labels.template.fill = am4core.color("#A0CA92");
  // valueAxis.renderer.labels.template.fontSize = 20;

}

function standardizeWeights(weights, timelength) {
  weights = weights.filter(function(_v) {
    return !isNaN(_v);
  });
  let _std = weights.std();
  let _mean = weights.mean();
  let stdWeights = weights.map(function(_v) {
   return (_v - _mean) / _std;
  });
  return stdWeights;
}


function createFakeData(weights, stdWeights) {
  let chartData = [{}];
  for (let i = 0; i < weights.length; i++) {
    chartData[i] = {
      "date": "2013-01-" + i,
      "standardizedWeight": stdWeights[i],
      "actualWeight": weights[i],
      "calories": 2250 + Math.random() * 500,
      "water": Math.floor(5 + Math.random() * 32)
    };
  }
  return chartData;
}

let weights = [170.0, 172.1, 170.5, 168.3, 169.9, 168.6, 169.7, 171.5, 170.4,
  170.6, 171.5, 170.5, 168.7, 169.8, 171.5
];
let stdWeights = standardizeWeights(weights, 0);

createDashboardChart(weights, stdWeights);
