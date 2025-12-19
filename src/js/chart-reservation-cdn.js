document.addEventListener("DOMContentLoaded", () => {
  const chartElement = document.getElementById("reservations-chart");

  if (chartElement) {
    var options = {
      series: [
        {
          name: "Réservations",
          data: [150, 190, 220, 260, 245, 200, 230],
        },
      ],
      chart: {
        type: "area",
        height: 280,
        fontFamily: "Archivo, sans-serif",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#5C59E8"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2, // Light purple fade
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      grid: {
        borderColor: "#E2E8F0",
        strokeDashArray: 4, // Dashed grid lines
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false, // No horizontal grid lines in the reference image
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      xaxis: {
        categories: [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#94A3B8",
            fontSize: "12px",
            fontFamily: "Archivo, sans-serif",
          },
        },
      },
      yaxis: {
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            colors: "#94A3B8",
            fontSize: "12px",
            fontFamily: "Archivo, sans-serif",
          },
          formatter: (value) => {
            return Math.trunc(value);
          },
        },
      },
      markers: {
        size: 0, // Hidden by default
        hover: {
          size: 6, // Show on hover
          sizeOffset: 3,
        },
        colors: ["#fff"],
        strokeColors: "#5C59E8",
        strokeWidth: 3,
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
        marker: {
          show: false,
        },
      },
    };

    var chart = new ApexCharts(chartElement, options);
    chart.render();
  }

  // Forfaits Chart
  const forfaitsChartElement = document.getElementById("forfaits-chart");
  if (forfaitsChartElement) {
    var forfaitsOptions = {
      series: [
        {
          name: "Forfaits",
          data: [15, 8, 20, 12, 5],
        },
      ],
      chart: {
        type: "bar",
        height: 280,
        fontFamily: "Archivo, sans-serif",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: [
        "#5A6A85", // Gratuit (Grey)
        "#00B8DB", // Standard (Cyan/Blue)
        "#FF2D2D", // VIP (Red)
        "#A838FF", // Premium (Purple)
        "#FF2D6C", // Accès Backstage (Pink)
      ],
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
          borderRadius: 8,
          borderRadiusApplication: "end", // Only rounded at the top
        },
      },
      dataLabels: { enabled: false },
      legend: { show: false },
      grid: {
        borderColor: "#E2E8F0",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } }, // No vertical lines
        yaxis: { lines: { show: true } }, // Horizontal lines allowed/needed? Reference shows light grid
        padding: { top: 0, right: 0, bottom: 0, left: 10 },
      },
      xaxis: {
        categories: [
          "Gratuit",
          "Standard",
          "VIP",
          "Premium",
          "Accès Backstage",
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#64748B", // Icon color / Label color
            fontSize: "12px",
            fontFamily: "Archivo, sans-serif",
            fontWeight: 600,
            lineHeight: "150%",
          },
        },
      },
      yaxis: {
        min: 0,
        max: 20, // inferred from visual (0, 5, 10, 15...)
        tickAmount: 4,
        labels: {
          style: {
            colors: "#94A3B8",
            fontSize: "12px",
            fontFamily: "Archivo, sans-serif",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " ventes";
          },
        },
      },
    };

    var forfaitsChart = new ApexCharts(forfaitsChartElement, forfaitsOptions);
    forfaitsChart.render();
  }

  // Participants Chart
  const participantsChartElement =
    document.getElementById("participants-chart");
  if (participantsChartElement) {
    var participantsOptions = {
      series: [75],
      chart: {
        height: 130,
        width: 130,
        type: "radialBar",
        fontFamily: "Archivo, sans-serif",
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#5E56FF"],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "55%",
            background: "transparent",
          },
          track: {
            background: "#DFE1E6",
            strokeWidth: "100%",
            margin: 0,
          },
          dataLabels: {
            show: false,
          },
        },
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      stroke: {
        lineCap: "butt",
      },
    };

    var participantsChart = new ApexCharts(
      participantsChartElement,
      participantsOptions
    );
    participantsChart.render();
  }
});
