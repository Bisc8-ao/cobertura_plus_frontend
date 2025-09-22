import React from "react";
import Chart from "react-apexcharts";
import { UseThemeMode } from "../../hooks";

function BarChart() {
    const { mode } = UseThemeMode();
    const modeDark = mode === "dark";
    const options = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false,
            },
            background: "transparent",
        },
        title: {
            text: "Website visits",
            align: "left",
            style: {
                fontSize: "18px",
                fontWeight: "bold",
                color: modeDark ? "#fdffff" : "#333",
            },
        },
        subtitle: {
            text: "(+43%) than last year",
            align: "left",
            style: {
                fontSize: "12px",
                color: modeDark ? "#939ea9" : "#666",
            },
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
            ],
            labels: {
                style: {
                    colors: modeDark ? "#838282ff" : "#666",
                    fontSize: "12px",
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: modeDark ? "#838282ff" : "#666",
                    fontSize: "12px",
                },
            },
            axisBorder: {
                show: false,
            },
        },
        grid: {
            borderColor: modeDark ? "#7a7a7a33" : "#e0e0e0",
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        tooltip: {
            theme: mode,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            offsetY: -16,
            labels: {
                colors: modeDark
                    ? ["#ffffff", "#ffffff"]
                    : ["#333333", "#333333"],
                useSeriesColors: false,
                style: {
                    fontWeight: 900,
                },
            },
            markers: {
                width: 10,
                height: 10,
                radius: 5,
                shape: "circle",
                offsetX: -1,
            },
        },
        colors: ["#20B2AA", "#FFD700"],

        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: "end",
                columnWidth: "35%",
            },
        },
        dataLabels: {
            enabled: false,
        },
    };

    const series = [
        {
            name: "Team A",
            data: [42, 32, 20, 36, 65, 67, 36, 23, 55],
        },
        {
            name: "Team B",
            data: [50, 68, 47, 67, 38, 36, 22, 68, 23],
        },
    ];

    return (
        <React.Fragment>
            <Chart
                options={options}
                series={series}
                type="bar"
                width="100%"
                height="350"
            />
        </React.Fragment>
    );
}

export { BarChart };
