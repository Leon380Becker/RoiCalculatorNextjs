"use client";

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
  ChartData,
  ChartOptions,
  ScriptableContext,
  Tick,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  cumulativeOutputArray: number[];
  annualAvgYearOne: number;
  annualAvgYearTwo: number;
  annualAvgYearThree: number;
  containerHeight?: string;
  labelFontSize?: number;
}

export const Graph = forwardRef<any, GraphProps>(
  (
    {
      cumulativeOutputArray,
      annualAvgYearOne,
      annualAvgYearTwo,
      annualAvgYearThree,
      containerHeight = "100%",
      labelFontSize = 12,
    },
    ref
  ) => {
    const chartRef = useRef<Chart<"line"> | null>(null);
    const [graphHeight, setGraphHeight] = useState(300);
    const [devicePixelRatio, setDevicePixelRatio] = useState(1);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const updateGraphHeight = () => {
          const screenWidth = window.innerWidth;
          if (screenWidth >= 1024) setGraphHeight(500);
          else if (screenWidth >= 768) setGraphHeight(400);
          else setGraphHeight(300);
        };

        updateGraphHeight();
        setDevicePixelRatio(window.devicePixelRatio || 1);
        window.addEventListener("resize", updateGraphHeight);
        return () => window.removeEventListener("resize", updateGraphHeight);
      }
    }, []);

    // Safety checks
    const safeNumber = (val: number) => (isFinite(val) && !isNaN(val) ? val : 0);
    const safeArray = (arr: number[]) =>
      Array.isArray(arr) && arr.length >= 36
        ? arr.map((val) => (isFinite(val) ? val : 0))
        : new Array(36).fill(0);

    const dataPoints = safeArray(cumulativeOutputArray);
    const avgOne = safeNumber(annualAvgYearOne);
    const avgTwo = safeNumber(annualAvgYearTwo);
    const avgThree = safeNumber(annualAvgYearThree);

    const maxBlue = Math.max(...dataPoints);
    const maxRed = Math.max(avgOne, avgTwo, avgThree);
    const scalingFactor = maxBlue > 0 && maxRed > 0 ? maxBlue / maxRed : 1;

    const annualAvgData = [
      0,
      ...new Array(12).fill(avgOne * scalingFactor),
      ...new Array(12).fill(avgTwo * scalingFactor),
      ...new Array(12).fill(avgThree * scalingFactor),
    ];

    const xLabels = Array.from({ length: 37 }, (_, i) => {
      if (i === 12) return "Year one";
      if (i === 24) return "Year two";
      if (i === 36) return "Year three";
      return "";
    });

    // Correctly typed data for the line chart
    const data: ChartData<"line", number[], string> = {
      labels: xLabels,
      datasets: [
        {
          label: "ROI",
          data: [0, ...dataPoints],
          borderColor: "#5F0BFF",
          borderWidth: 4,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderCapStyle: "butt",
        },
        {
          label: "",
          data: annualAvgData,
          borderColor: "red",
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
          borderCapStyle: "butt",
        },
      ],
    };

    // Correctly typed options for the line chart
    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio,
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            font: { weight: "bold", size: labelFontSize },
            autoSkip: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: { weight: "bold", size: labelFontSize },
            // Type for tick callback uses ScriptableContext + Tick type to avoid TS error
            callback: (value: string | number, _index: number, _ticks: Tick[]) => {
              const val = Number(value);
              if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}m`;
              if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
              if (val === 0) return "0";
              return "";
            },
          },
        },
      },
      plugins: {
        tooltip: { enabled: true },
        legend: { display: false },
      },
    };

    useImperativeHandle(ref, () => ({
      getChartImage: () => {
        const chart = chartRef.current;
        if (!chart) return null;

        const originalRatio = chart.options.devicePixelRatio ?? 1;
        chart.options.devicePixelRatio = 5.0;
        chart.update("none");

        const image = chart.toBase64Image("image/png", 5.0);

        chart.options.devicePixelRatio = originalRatio;
        chart.update("none");

        return image;
      },
    }));

    return (
      <div
        style={{
          width: "100%",
          height: `${graphHeight}px`,
          maxHeight: containerHeight,
          overflow: "hidden",
        }}
      >
        <Line ref={chartRef} data={data} options={options} />
      </div>
    );
  }
);

Graph.displayName = "Graph";
