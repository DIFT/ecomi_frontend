import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";


am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

const HeatMap = ({ heatMapData, name }) => {

    useLayoutEffect(() => {

        let chart = am4core.create(name, am4charts.XYChart);
        chart.maskBullets = false;

        chart.data = heatMapData

        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

        xAxis.dataFields.category = "month";
        yAxis.dataFields.category = "day";

        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.minGridDistance = 40;

        yAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.inversed = true;
        yAxis.renderer.minGridDistance = 30;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "month";
        series.dataFields.categoryY = "day";
        series.dataFields.value = "value";
        series.sequencedInterpolation = true;
        series.defaultState.transitionDuration = 3000;

        let bgColor = new am4core.InterfaceColorSet().getFor("background");

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 1;
        columnTemplate.strokeOpacity = 0.2;
        columnTemplate.stroke = bgColor;
        columnTemplate.tooltipText = "{month}, {day}: {value.workingValue.formatNumber('#,###.##')}";
        columnTemplate.width = am4core.percent(100);
        columnTemplate.height = am4core.percent(100);

        series.heatRules.push({
            target: columnTemplate,
            property: "fill",
            min: chart.colors.getIndex(3),
            max: chart.colors.getIndex(29)
        });

        // heat legend
        let heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
        heatLegend.width = am4core.percent(100);
        heatLegend.series = series;
        heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
        heatLegend.valueAxis.renderer.minGridDistance = 30;

        // heat legend behavior
        series.columns.template.events.on("over", function(event) {
            handleHover(event.target);
        })

        series.columns.template.events.on("hit", function(event) {
            handleHover(event.target);
        })

        function handleHover(column) {
            if (!isNaN(column.dataItem.value)) {
                heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
            }
            else {
                heatLegend.valueAxis.hideTooltip();
            }
        }

        series.columns.template.events.on("out", function(event) {
            heatLegend.valueAxis.hideTooltip();
        })

        return () => {
            chart.dispose();
        };
    }, []);
    return(
        <div id={name} style={{ width: "100%", height: '400px' }} className={`inline-block ml-2`}></div>
    )
}

export default HeatMap