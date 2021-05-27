import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import {getPercentageChangeNumberOnly, getRarityThresholds, getSerialRarity} from "../../utils";


am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

const MicroChart = ({ historicalValue, storePrice}) => {

    useLayoutEffect(() => {

        let chart = am4core.create("microchart", am4charts.XYChart);

        let nftPriceHistory = []
        historicalValue && historicalValue.forEach((transaction) => {
            nftPriceHistory.push({
                "date" : transaction.node.createdAt,
                "value" : transaction.node.amountUsd,
                "buyer": transaction.node.buyer.username,
                "change": getPercentageChangeNumberOnly(transaction.node.amountUsd, storePrice)
            })
        })

        chart.padding(0, 0, 0, 0);

        chart.data = nftPriceHistory

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
        series.tooltipText = "Buyer: {buyer} \n Paid: [bold]{value}[/] \n - {change}%"
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
        <div id="microchart" style={{ width: "100px", height: "20px" }} className={`inline-block ml-2`}></div>
    )
}

export default MicroChart