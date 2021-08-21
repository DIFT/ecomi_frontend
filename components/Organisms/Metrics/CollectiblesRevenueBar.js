import { useEffect, useRef, useState } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4themes_dark from "@amcharts/amcharts4/themes/dark"
import { getCollectibleRevenueData } from '../../../actions/metrics/metrics'
import {getPercentageChangeNumberOnly, getRarityThresholds, getSerialRarity} from "../../../utils"

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

const CollectiblesRevenueBar = ({ id }) => {

    const chartRef = useRef(null);

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getCollectibleRevenueData()
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch(e => console.log('Error getting nft revenue data'))
    }, [])

    useEffect(() => {

        if (!chartRef.current) {
            am4core.addLicense('ch-custom-attribution')
            chartRef.current = am4core.create(id, am4charts.XYChart);

            chartRef.current.data = data

            // Create axes
            var categoryAxis = chartRef.current.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.disabled = true;
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

            var valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;

            // Create series
            var series = chartRef.current.series.push(new am4charts.ColumnSeries());
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
                return chartRef.current.colors.getIndex(target.dataItem.index);
            });

            // Cursor
            chartRef.current.cursor = new am4charts.XYCursor();

            return () => {
                chartRef.current.dispose();
            };
        }

    }, []);

    // Load data into chart
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data = data;
        }
    }, [data]);

    return(
        <div id={id} style={{ width: "100%", height: "600px" }}></div>
    )
}

export default CollectiblesRevenueBar