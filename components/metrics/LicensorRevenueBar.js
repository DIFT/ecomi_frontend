import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import {getPercentageChangeNumberOnly, getRarityThresholds, getSerialRarity} from "../../utils";


am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

function LicensorRevenueBar({ data, name }) {

    useLayoutEffect(() => {

        let chart = am4core.create(name, am4charts.XYChart);

        chart.data = data

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.labels.template.truncate = true;
        categoryAxis.renderer.labels.template.maxWidth = '50';
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        let label = categoryAxis.renderer.labels.template;
        label.truncate = true;
        label.maxWidth = 100;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "revenueRealised";
        series.dataFields.categoryX = "name";
        series.tooltipText = `[{categoryX}: bold]
        {name} 
        $\{valueY}[/]`;
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function(fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
        });

        // Cursor
        chart.cursor = new am4charts.XYCursor();

        return () => {
            chart.dispose();
        };
    }, []);
    return(
        <div id={name} style={{ width: "100%", height: "400px" }}></div>
    )
}

export default LicensorRevenueBar