import { useLayoutEffect, useEffect, useState, useRef } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4themes_dark from "@amcharts/amcharts4/themes/dark"
import { getMarketHistoricData } from '../../../actions/metrics/metrics'
am4core.useTheme(am4themes_dark)
am4core.useTheme(am4themes_animated)

const MicroChart = ({id, storePrice, floorPrice}) => {

    const chartRef = useRef(null);

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMarketHistoricData(id)
            .then(data => {
                data.prices[data.prices.push(data.prices.pop())-1].opacity = 1
                setData(data.prices)
                setLoading(false)
            })
            .catch(e => console.log(e))
    },[])

    useEffect(() => {
        if (!chartRef.current) {

            // Performance (before chart)
            am4core.options.minPolylineStep = 5;
            // am4core.options.onlyShowOnViewport = true;

            am4core.addLicense('ch-custom-attribution')
            chartRef.current = am4core.create(`${id}`, am4charts.XYChart);
            chartRef.current.data = data

            // Performance (after)
            chartRef.current.svgContainer.autoResize = false;

            // Styling
            chartRef.current.paddingTop = 0;
            chartRef.current.paddingRight = 0;
            chartRef.current.paddingBottom = 0;
            chartRef.current.paddingLeft = 0;
            chartRef.current.plotContainer.background.strokeWidth = 0;
            chartRef.current.plotContainer.background.strokeOpacity = 0;


            chartRef.current.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";


            // Create axes
            var dateAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.disabled = true;
            dateAxis.renderer.labels.template.disabled = true;
            dateAxis.startLocation = 0.5;
            dateAxis.endLocation = 0.7;
            dateAxis.cursorTooltipEnabled = false;
            dateAxis.baseInterval = {
                timeUnit: "hour",
            };

            var valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.renderer.grid.template.disabled = false;
            valueAxis.renderer.baseGrid.disabled = false;
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.cursorTooltipEnabled = false;

            // Create series
            var series = chartRef.current.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";
            series.tensionX = 0.8;
            series.strokeWidth = 2;
            series.fillOpacity = 0.3;


            var fillModifier = new am4core.LinearGradientModifier();
            fillModifier.opacities = [1, 0];
            fillModifier.offsets = [0, 3];
            fillModifier.gradient.rotation = 90;
            series.segments.template.fillModifier = fillModifier;


            series.stroke = chartRef.current.colors.getIndex(6);
            // series.fill = chartRef.current.colors.getIndex(4);
            // series.fill = chartRef.current.colors.getIndex(10);

            if (storePrice >= floorPrice){
                series.fill = am4core.color("#f87171");
                series.stroke = am4core.color("#f87171");
            } else {
                series.fill = am4core.color("#34d399");
                series.stroke = am4core.color("#34d399");
            }

            // render data points as bullets
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.opacity = 0;
            bullet.circle.propertyFields.opacity = "opacity";
            bullet.circle.radius = 3;

            return () => {
                chartRef.current && chartRef.current.dispose();
            };
        }
    }, [])

    // Load data into chart
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.data = data;
        }
    }, [data]);

    return(
        <div id={id} style={{ width: "150px", height: "30px" }} className={`block m-0 p-0`}></div>
    )
}

export default MicroChart