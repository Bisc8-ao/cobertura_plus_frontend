import React from "react";
import Chart from "react-apexcharts";

function ChartPie() {
    const options = {
        chart: {
            type: "pie",
        },
        labels: ["America", "Asia", "Europe", "Africa"],
        colors: ["#228B22", "#FFD700", "#1E90FF", "#FF4500"],
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            offsetY: 65,
            itemMargin: {
                horizontal: 8,
                vertical: 5,
            },
            labels: {
                colors: "#333",
                fontWeight: "bold",
                fontSize: "2rem",
                useSeriesColors: false,
            },
            markers: {
                width: 12,
                height: 12,
                radius: 6,
                offsetX: 0,
                offsetY: 0,
            },
        },
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(1)}%`,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
            style: {
                fontSize: "12px",
                fontWeight: "bold",
                colors: ["#fff"],
            },
        },
        stroke: {
            colors: ["#ffffff"],
            width: 0,
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
            },
        },
    };

    const series = [43.9, 31.4, 18.8, 6.3];

    return (
        <React.Fragment>
           
            <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Chart options={options} series={series} type="pie" width="390px" />
            </div>
        </React.Fragment>
    );
}

export { ChartPie };
