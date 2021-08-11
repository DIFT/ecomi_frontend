import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

const MicroChart = ({id, values}) => {
    useLayoutEffect(() => {

        let chart = am4core.create(`${id}`, am4charts.XYChart);

        chart.data = values

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.labels.template.disabled = true;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.7;
        dateAxis.cursorTooltipEnabled = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.cursorTooltipEnabled = false;

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.tooltipText = "Paid: [bold]{value}[/]";
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tensionX = 0.8;
        series.strokeWidth = 2;
        series.fillOpacity = 0.2;
        series.stroke = chart.colors.getIndex(6);
        series.fill = chart.colors.getIndex(4);

        series.tooltip.pointerOrientation = "vertical";

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.opacity = 0;
        bullet.circle.propertyFields.opacity = "opacity";
        bullet.circle.radius = 3;

        return () => {
            chart.dispose();
        };
    }, []);
    return(
        <div id={id} style={{ width: "200px", height: "60px" }} className={`block m-0 p-0 border`}></div>
    )
}

export default MicroChart