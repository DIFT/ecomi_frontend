import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import {getPercentageChangeNumberOnly, getRarityThresholds, getSerialRarity} from "../../utils";


am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

function Chart({ historicalValue, storePrice}) {

    console.log('Collectible data is: ', historicalValue)

    //console.log('Collectible history is: ', historicalValue)
    useLayoutEffect(() => {

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        let nftPriceHistory = []
        historicalValue && historicalValue.forEach((transaction) => {
            nftPriceHistory.push({
                "date" : transaction.node.createdAt,
                "value" : transaction.node.amountUsd,
                "buyer": transaction.node.buyer.username,
                "change": getPercentageChangeNumberOnly(transaction.node.amountUsd, storePrice)
            })
        })
        console.log('My test data is: ', nftPriceHistory)

        chart.data = nftPriceHistory

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "Buyer: {buyer} Paid: [bold]{value}[/] - {change}%"
        series.strokeWidth = 3;
        series.tensionX = 0.8;
        series.fillOpacity = 0.2;
        series.stroke = chart.colors.getIndex(6);
        series.fill = chart.colors.getIndex(4);
        // series.contents.stroke = chart.colors.getIndex(4)

        series.tooltip.pointerOrientation = "vertical";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.opacity = 0;
        bullet.circle.propertyFields.opacity = "opacity";
        bullet.circle.radius = 3;

        return () => {
            chart.dispose();
        };
    }, []);
    return(
        <div className={`bg-gray-800 px-8 py-8 border border-gray-700`}>
            <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
        </div>
    )
}

export default Chart