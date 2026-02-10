// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import ThemeSettingsOffcanvas from "../components/common/ThemeSettingsOffcanvas";
import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import MenuBar from "../components/common/MenuBar";
import ApexCharts from "apexcharts";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/maps/world-merc.js";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

const IndexPage = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showFees, setShowFees] = useState(false);
  const birthdayDateRef = useRef(null);

  // Sidebar opens only via user action (burger icon)

  useEffect(() => {
    document.body.classList.toggle("navbar-open", isNavbarOpen);
    return () => {
      document.body.classList.remove("navbar-open");
    };
  }, [isNavbarOpen]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("tabler-theme");
    const domTheme = document.documentElement.getAttribute("data-bs-theme");
    const nextTheme = savedTheme || domTheme;
    if (nextTheme === "dark" || nextTheme === "light") {
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-bs-theme", nextTheme);
    }
  }, []);

  useEffect(() => {
    const calendarEl = document.getElementById("dashboard-calendar");
    if (!calendarEl) return;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const yearRange = Array.from({ length: 5 }, (_, index) => currentYear - 2 + index);
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      height: "auto",
      headerToolbar: {
        left: "title",
        center: "",
        right: "prev,next",
      },
      events: [
        {
          title: "Review",
          start: new Date(currentYear, currentMonth, 4, 10, 0),
          end: new Date(currentYear, currentMonth, 4, 11, 0),
        },
        {
          title: "Demo",
          start: new Date(currentYear, currentMonth, 12, 14, 0),
          end: new Date(currentYear, currentMonth, 12, 15, 0),
        },
      ],
    });
    calendar.render();
    const titleEl = calendarEl.querySelector(".fc-toolbar-title");
    const handleTitleClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const monthValue = target.getAttribute("data-month");
      const yearValue = target.getAttribute("data-year");
      if (monthValue !== null) {
        const nextMonth = Number(monthValue);
        if (!Number.isNaN(nextMonth)) {
          const currentDate = calendar.getDate();
          calendar.gotoDate(new Date(currentDate.getFullYear(), nextMonth, 1));
        }
      }
      if (yearValue !== null) {
        const nextYear = Number(yearValue);
        if (!Number.isNaN(nextYear)) {
          const currentDate = calendar.getDate();
          calendar.gotoDate(new Date(nextYear, currentDate.getMonth(), 1));
        }
      }
    };
    const renderTitleDropdowns = () => {
      const target = calendarEl.querySelector(".fc-toolbar-title");
      if (!target) return;
      const currentDate = calendar.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYearValue = currentDate.getFullYear();
      const monthItems = months
        .map(
          (month, index) =>
            `<button class="dropdown-item${index === currentMonth ? " active" : ""}" type="button" data-month="${index}">${month}</button>`,
        )
        .join("");
      const yearItems = yearRange
        .map(
          (year) =>
            `<button class="dropdown-item${year === currentYearValue ? " active" : ""}" type="button" data-year="${year}">${year}</button>`,
        )
        .join("");
      target.innerHTML = `
        <div class="d-inline-flex align-items-center gap-3 fc-title-dropdowns">
          <div class="dropdown">
            <button class="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${months[currentMonth]} <span class="ms-1">▾</span>
            </button>
            <div class="dropdown-menu">
              ${monthItems}
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${currentYearValue} <span class="ms-1">▾</span>
            </button>
            <div class="dropdown-menu">
              ${yearItems}
            </div>
          </div>
        </div>
      `;
    };
    if (titleEl) {
      titleEl.addEventListener("click", handleTitleClick);
    }
    calendar.on("datesSet", renderTitleDropdowns);
    renderTitleDropdowns();
    return () => calendar.destroy();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSettingsOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSettingsOpen]);

  useEffect(() => {
    window.ApexCharts = ApexCharts;
    window.jsVectorMap = jsVectorMap;
window.ApexCharts &&
          new ApexCharts(document.getElementById("chart-active-users-3"), {
            chart: {
              type: "radialBar",
              fontFamily: "inherit",
              height: 192,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: false,
              },
            },
            plotOptions: {
              radialBar: {
                startAngle: -120,
                endAngle: 120,
                hollow: {
                  margin: 16,
                  size: "50%",
                },
                dataLabels: {
                  show: true,
                  value: {
                    offsetY: -8,
                    fontSize: "24px",
                  },
                },
              },
            },
            series: [78],
            labels: [""],
            tooltip: {
              theme: "dark",
            },
            grid: {
              strokeDashArray: 4,
            },
            colors: ["rgba(var(--tblr-primary-rgb), 1)"],
            legend: {
              show: false,
            },
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("chart-revenue-bg"), {
            chart: {
              type: "area",
              fontFamily: "inherit",
              height: 40,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            fill: {
              colors: ["rgba(var(--tblr-primary-rgb), 0.16)", "rgba(var(--tblr-primary-rgb), 0.16)"],
              type: "solid",
            },
            stroke: {
              width: 2,
              lineCap: "round",
              curve: "smooth",
            },
            series: [
              {
                name: "Profits",
                data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 39, 62, 51, 35, 41, 67],
              },
            ],
            tooltip: {
              theme: "dark",
            },
            grid: {
              strokeDashArray: 4,
            },
            xaxis: {
              labels: {
                padding: 0,
              },
              tooltip: {
                enabled: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                padding: 4,
              },
            },
            labels: [
              "2020-06-20",
              "2020-06-21",
              "2020-06-22",
              "2020-06-23",
              "2020-06-24",
              "2020-06-25",
              "2020-06-26",
              "2020-06-27",
              "2020-06-28",
              "2020-06-29",
              "2020-06-30",
              "2020-07-01",
              "2020-07-02",
              "2020-07-03",
              "2020-07-04",
              "2020-07-05",
              "2020-07-06",
              "2020-07-07",
              "2020-07-08",
              "2020-07-09",
              "2020-07-10",
              "2020-07-11",
              "2020-07-12",
              "2020-07-13",
              "2020-07-14",
              "2020-07-15",
              "2020-07-16",
              "2020-07-17",
              "2020-07-18",
              "2020-07-19",
            ],
            colors: ["rgba(var(--tblr-primary-rgb), 1)"],
            legend: {
              show: false,
            },
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("chart-new-clients"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 40,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: false,
              },
            },
            stroke: {
              width: 2,
              lineCap: "round",
              curve: "smooth",
            },
            series: [
              {
                name: "New clients",
                data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 4, 46, 39, 62, 51, 35, 41, 67],
              },
            ],
            tooltip: {
              theme: "dark",
            },
            grid: {
              strokeDashArray: 4,
            },
            xaxis: {
              labels: {
                padding: 0,
              },
              tooltip: {
                enabled: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                padding: 4,
              },
            },
            labels: [
              "2020-06-20",
              "2020-06-21",
              "2020-06-22",
              "2020-06-23",
              "2020-06-24",
              "2020-06-25",
              "2020-06-26",
              "2020-06-27",
              "2020-06-28",
              "2020-06-29",
              "2020-06-30",
              "2020-07-01",
              "2020-07-02",
              "2020-07-03",
              "2020-07-04",
              "2020-07-05",
              "2020-07-06",
              "2020-07-07",
              "2020-07-08",
              "2020-07-09",
              "2020-07-10",
              "2020-07-11",
              "2020-07-12",
              "2020-07-13",
              "2020-07-14",
              "2020-07-15",
              "2020-07-16",
              "2020-07-17",
              "2020-07-18",
              "2020-07-19",
            ],
            colors: ["rgba(var(--tblr-primary-rgb), 1)"],
            legend: {
              show: false,
            },
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("chart-active-users"), {
            chart: {
              type: "bar",
              fontFamily: "inherit",
              height: 40,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: false,
              },
            },
            plotOptions: {
              bar: {
                columnWidth: "50%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            series: [
              {
                name: "Profits",
                data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 39, 62, 51, 35, 41, 67],
              },
            ],
            tooltip: {
              theme: "dark",
            },
            grid: {
              strokeDashArray: 4,
            },
            xaxis: {
              labels: {
                padding: 0,
              },
              tooltip: {
                enabled: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                padding: 4,
              },
            },
            labels: [
              "2020-06-20",
              "2020-06-21",
              "2020-06-22",
              "2020-06-23",
              "2020-06-24",
              "2020-06-25",
              "2020-06-26",
              "2020-06-27",
              "2020-06-28",
              "2020-06-29",
              "2020-06-30",
              "2020-07-01",
              "2020-07-02",
              "2020-07-03",
              "2020-07-04",
              "2020-07-05",
              "2020-07-06",
              "2020-07-07",
              "2020-07-08",
              "2020-07-09",
              "2020-07-10",
              "2020-07-11",
              "2020-07-12",
              "2020-07-13",
              "2020-07-14",
              "2020-07-15",
              "2020-07-16",
              "2020-07-17",
              "2020-07-18",
              "2020-07-19",
            ],
            colors: ["rgba(var(--tblr-primary-rgb), 1)"],
            legend: {
              show: false,
            },
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("chart-mentions"), {
            chart: {
              type: "bar",
              fontFamily: "inherit",
              height: 240,
              parentHeightOffset: 0,
              toolbar: {
                show: false,
              },
              animations: {
                enabled: false,
              },
              stacked: true,
            },
            plotOptions: {
              bar: {
                columnWidth: "50%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            series: [
              {
                name: "Web",
                data: [5, 8, 6, 7, 9, 8, 10, 12, 9, 11, 13, 10, 14, 16, 12, 18, 15, 14, 20, 18, 16, 22, 19, 17, 24, 20, 18, 26, 22, 19, 28, 24, 21, 30, 26, 22],
              },
              {
                name: "Social",
                data: [2, 3, 2, 3, 4, 3, 4, 5, 4, 5, 6, 5, 6, 7, 6, 7, 8, 7, 8, 9, 8, 9, 10, 9, 10, 11, 10, 11, 12, 11, 12, 13, 12, 13, 14, 13],
              },
              {
                name: "Other",
                data: [1, 2, 1, 2, 2, 2, 3, 3, 2, 3, 3, 3, 4, 4, 3, 4, 4, 4, 5, 5, 4, 5, 5, 5, 6, 6, 5, 6, 6, 6, 7, 7, 6, 7, 7, 7],
              },
            ],
            tooltip: {
              theme: "dark",
            },
            grid: {
              padding: {
                top: -20,
                right: 0,
                left: -4,
                bottom: -4,
              },
              strokeDashArray: 4,
              xaxis: {
                lines: {
                  show: true,
                },
              },
            },
            xaxis: {
              labels: {
                padding: 0,
              },
              tooltip: {
                enabled: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                padding: 4,
              },
            },
            labels: [
              "2026-01-05",
              "2026-01-15",
              "2026-01-25",
              "2026-02-05",
              "2026-02-15",
              "2026-02-25",
              "2026-03-05",
              "2026-03-15",
              "2026-03-25",
              "2026-04-05",
              "2026-04-15",
              "2026-04-25",
              "2026-05-05",
              "2026-05-15",
              "2026-05-25",
              "2026-06-05",
              "2026-06-15",
              "2026-06-25",
              "2026-07-05",
              "2026-07-15",
              "2026-07-25",
              "2026-08-05",
              "2026-08-15",
              "2026-08-25",
              "2026-09-05",
              "2026-09-15",
              "2026-09-25",
              "2026-10-05",
              "2026-10-15",
              "2026-10-25",
              "2026-11-05",
              "2026-11-15",
              "2026-11-25",
              "2026-12-05",
              "2026-12-15",
              "2026-12-25",
            ],
            colors: [
              "rgba(var(--tblr-primary-rgb), 1)",
              "rgba(var(--tblr-primary-rgb), 0.8)",
              "rgba(var(--tblr-primary-rgb), 0.8)",
            ],
            legend: {
              show: false,
            },
          }).render();

const mapEl = document.getElementById("map-world");
if (mapEl) {
  const map = new jsVectorMap({
          selector: "#map-world",
          map: "world",
          backgroundColor: "transparent",
          regionStyle: {
            initial: {
              fill: "var(--tblr-bg-surface-secondary)",
              stroke: "var(--tblr-border-color)",
              strokeWidth: 2,
            },
          },
          zoomOnScroll: false,
          zoomButtons: false,
          series: {
            regions: [
              {
                attribute: "fill",
                scale: {
                  scale1: "rgba(var(--tblr-primary-rgb), 0.1)",
                  scale2: "rgba(var(--tblr-primary-rgb), 0.2)",
                  scale3: "rgba(var(--tblr-primary-rgb), 0.3)",
                  scale4: "rgba(var(--tblr-primary-rgb), 0.4)",
                  scale5: "rgba(var(--tblr-primary-rgb), 0.5)",
                  scale6: "rgba(var(--tblr-primary-rgb), 0.6)",
                  scale7: "rgba(var(--tblr-primary-rgb), 0.7)",
                  scale8: "rgba(var(--tblr-primary-rgb), 0.8)",
                  scale9: "rgba(var(--tblr-primary-rgb), 0.9)",
                  scale10: "rgba(var(--tblr-primary-rgb), 1)",
                },
                values: {
                  AF: "scale2",
                  AL: "scale2",
                  DZ: "scale4",
                  AO: "scale3",
                  AG: "scale1",
                  AR: "scale5",
                  AM: "scale1",
                  AU: "scale7",
                  AT: "scale5",
                  AZ: "scale3",
                  BS: "scale1",
                  BH: "scale2",
                  BD: "scale4",
                  BB: "scale1",
                  BY: "scale3",
                  BE: "scale5",
                  BZ: "scale1",
                  BJ: "scale1",
                  BT: "scale1",
                  BO: "scale2",
                  BA: "scale2",
                  BW: "scale2",
                  BR: "scale8",
                  BN: "scale2",
                  BG: "scale2",
                  BF: "scale1",
                  BI: "scale1",
                  KH: "scale2",
                  CM: "scale2",
                  CA: "scale7",
                  CV: "scale1",
                  CF: "scale1",
                  TD: "scale1",
                  CL: "scale4",
                  CN: "scale9",
                  CO: "scale5",
                  KM: "scale1",
                  CD: "scale2",
                  CG: "scale2",
                  CR: "scale2",
                  CI: "scale2",
                  HR: "scale3",
                  CY: "scale2",
                  CZ: "scale4",
                  DK: "scale5",
                  DJ: "scale1",
                  DM: "scale1",
                  DO: "scale3",
                  EC: "scale3",
                  EG: "scale5",
                  SV: "scale2",
                  GQ: "scale2",
                  ER: "scale1",
                  EE: "scale2",
                  ET: "scale2",
                  FJ: "scale1",
                  FI: "scale5",
                  FR: "scale8",
                  GA: "scale2",
                  GM: "scale1",
                  GE: "scale2",
                  DE: "scale8",
                  GH: "scale2",
                  GR: "scale5",
                  GD: "scale1",
                  GT: "scale2",
                  GN: "scale1",
                  GW: "scale1",
                  GY: "scale1",
                  HT: "scale1",
                  HN: "scale2",
                  HK: "scale5",
                  HU: "scale4",
                  IS: "scale2",
                  IN: "scale7",
                  ID: "scale6",
                  IR: "scale5",
                  IQ: "scale3",
                  IE: "scale5",
                  IL: "scale5",
                  IT: "scale8",
                  JM: "scale2",
                  JP: "scale9",
                  JO: "scale2",
                  KZ: "scale4",
                  KE: "scale2",
                  KI: "scale1",
                  KR: "scale6",
                  KW: "scale4",
                  KG: "scale1",
                  LA: "scale1",
                  LV: "scale2",
                  LB: "scale2",
                  LS: "scale1",
                  LR: "scale1",
                  LY: "scale3",
                  LT: "scale2",
                  LU: "scale3",
                  MK: "scale1",
                  MG: "scale1",
                  MW: "scale1",
                  MY: "scale5",
                  MV: "scale1",
                  ML: "scale1",
                  MT: "scale1",
                  MR: "scale1",
                  MU: "scale1",
                  MX: "scale7",
                  MD: "scale1",
                  MN: "scale1",
                  ME: "scale1",
                  MA: "scale3",
                  MZ: "scale2",
                  MM: "scale2",
                  NA: "scale2",
                  NP: "scale2",
                  NL: "scale6",
                  NZ: "scale4",
                  NI: "scale1",
                  NE: "scale1",
                  NG: "scale5",
                  NO: "scale5",
                  OM: "scale3",
                  PK: "scale4",
                  PA: "scale2",
                  PG: "scale1",
                  PY: "scale2",
                  PE: "scale4",
                  PH: "scale4",
                  PL: "scale10",
                  PT: "scale5",
                  QA: "scale4",
                  RO: "scale4",
                  RU: "scale7",
                  RW: "scale1",
                  WS: "scale1",
                  ST: "scale1",
                  SA: "scale5",
                  SN: "scale2",
                  RS: "scale2",
                  SC: "scale1",
                  SL: "scale1",
                  SG: "scale5",
                  SK: "scale3",
                  SI: "scale2",
                  SB: "scale1",
                  ZA: "scale5",
                  ES: "scale7",
                  LK: "scale2",
                  KN: "scale1",
                  LC: "scale1",
                  VC: "scale1",
                  SD: "scale3",
                  SR: "scale1",
                  SZ: "scale1",
                  SE: "scale5",
                  CH: "scale6",
                  SY: "scale3",
                  TW: "scale5",
                  TJ: "scale1",
                  TZ: "scale2",
                  TH: "scale5",
                  TL: "scale1",
                  TG: "scale1",
                  TO: "scale1",
                  TT: "scale2",
                  TN: "scale2",
                  TR: "scale6",
                  TM: "scale1",
                  UG: "scale2",
                  UA: "scale4",
                  AE: "scale5",
                  GB: "scale8",
                  US: "scale10",
                  UY: "scale2",
                  UZ: "scale2",
                  VU: "scale1",
                  VE: "scale5",
                  VN: "scale4",
                  YE: "scale2",
                  ZM: "scale2",
                  ZW: "scale1",
                },
              },
            ],
          },
        });
}
        window.addEventListener("resize", () => {
          map.updateSize();
        });

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-activity"), {
            chart: {
              type: "radialBar",
              fontFamily: "inherit",
              height: 40,
              width: 40,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 0,
                  size: "75%",
                },
                track: {
                  margin: 0,
                },
                dataLabels: {
                  show: false,
                },
              },
            },
            colors: ["var(--tblr-primary)"],
            series: [35],
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("chart-development-activity"), {
            chart: {
              type: "area",
              fontFamily: "inherit",
              height: 192,
              sparkline: {
                enabled: true,
              },
              animations: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            fill: {
              colors: ["rgba(var(--tblr-primary-rgb), 0.16)", "rgba(var(--tblr-primary-rgb), 0.16)"],
              type: "solid",
            },
            stroke: {
              width: 2,
              lineCap: "round",
              curve: "smooth",
            },
            series: [
              {
                name: "Purchases",
                data: [3, 5, 4, 6, 7, 5, 6, 8, 24, 7, 12, 5, 6, 3, 8, 4, 14, 30, 17, 19, 15, 14, 25, 32, 40, 55, 60, 48, 52, 70],
              },
            ],
            tooltip: {
              theme: "dark",
            },
            grid: {
              strokeDashArray: 4,
            },
            xaxis: {
              labels: {
                padding: 0,
              },
              tooltip: {
                enabled: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
            },
            yaxis: {
              labels: {
                padding: 4,
              },
            },
            labels: [
              "2020-06-20",
              "2020-06-21",
              "2020-06-22",
              "2020-06-23",
              "2020-06-24",
              "2020-06-25",
              "2020-06-26",
              "2020-06-27",
              "2020-06-28",
              "2020-06-29",
              "2020-06-30",
              "2020-07-01",
              "2020-07-02",
              "2020-07-03",
              "2020-07-04",
              "2020-07-05",
              "2020-07-06",
              "2020-07-07",
              "2020-07-08",
              "2020-07-09",
              "2020-07-10",
              "2020-07-11",
              "2020-07-12",
              "2020-07-13",
              "2020-07-14",
              "2020-07-15",
              "2020-07-16",
              "2020-07-17",
              "2020-07-18",
              "2020-07-19",
            ],
            colors: ["rgba(var(--tblr-primary-rgb), 1)"],
            legend: {
              show: false,
            },
            point: {
              show: false,
            },
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-bounce-rate-1"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: "round",
            },
            series: [
              {
                color: "var(--tblr-primary)",
                data: [17, 24, 20, 10, 5, 1, 4, 18, 13],
              },
            ],
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-bounce-rate-2"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: "round",
            },
            series: [
              {
                color: "var(--tblr-primary)",
                data: [13, 11, 19, 22, 12, 7, 14, 3, 21],
              },
            ],
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-bounce-rate-3"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: "round",
            },
            series: [
              {
                color: "var(--tblr-primary)",
                data: [10, 13, 10, 4, 17, 3, 23, 22, 19],
              },
            ],
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-bounce-rate-4"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: "round",
            },
            series: [
              {
                color: "var(--tblr-primary)",
                data: [6, 15, 13, 13, 5, 7, 17, 20, 19],
              },
            ],
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-bounce-rate-5"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: "round",
            },
            series: [
              {
                color: "var(--tblr-primary)",
                data: [2, 11, 15, 14, 21, 20, 8, 23, 18, 14],
              },
            ],
          }).render();

window.ApexCharts &&
          new ApexCharts(document.getElementById("sparkline-bounce-rate-6"), {
            chart: {
              type: "line",
              fontFamily: "inherit",
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: "round",
            },
            series: [
              {
                color: "var(--tblr-primary)",
                data: [22, 12, 7, 14, 3, 21, 8, 23, 18, 14],
              },
            ],
          }).render();

var themeConfig = {
          theme: "light",
          "theme-base": "gray",
          "theme-font": "sans-serif",
          "theme-primary": "blue",
          "theme-radius": "1",
        };
        var url = new URL(window.location);
        var form = document.getElementById("offcanvasSettings");
        var resetButton = document.getElementById("reset-changes");
        var checkItems = function () {
          for (var key in themeConfig) {
            var value = window.localStorage["tabler-" + key] || themeConfig[key];
            if (!!value) {
              document.documentElement.setAttribute("data-bs-" + key, value);
              var radios = form.querySelectorAll(`[name="${key}"]`);
              if (!!radios) {
                radios.forEach((radio) => {
                  radio.checked = radio.value === value;
                });
              }
            }
          }
        };
        form.addEventListener("change", function (event) {
          var target = event.target,
            name = target.name,
            value = target.value;
          for (var key in themeConfig) {
            if (name === key) {
              document.documentElement.setAttribute("data-bs-" + key, value);
              window.localStorage.setItem("tabler-" + key, value);
              url.searchParams.set(key, value);
            }
          }
          window.history.pushState({}, "", url);
        });
        resetButton.addEventListener("click", function () {
          for (var key in themeConfig) {
            var value = themeConfig[key];
            document.documentElement.removeAttribute("data-bs-" + key);
            window.localStorage.removeItem("tabler-" + key);
            url.searchParams.delete(key);
          }
          checkItems();
          window.history.pushState({}, "", url);
        });
        checkItems();

  }, []);

  useEffect(() => {
    const form = document.getElementById("offcanvasSettings");
    if (!form) return;
    const radios = form.querySelectorAll('input[name="theme"]');
    radios.forEach((radio) => {
      if (radio instanceof HTMLInputElement) {
        radio.checked = radio.value === theme;
      }
    });
  }, [theme]);

  useEffect(() => {
    const form = document.getElementById("offcanvasSettings");
    if (!form) return;
    const onChange = (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.name === "theme") {
        setTheme(target.value);
      }
    };
    form.addEventListener("change", onChange);
    return () => form.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = (nextTheme) => {
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-bs-theme", nextTheme);
    window.localStorage.setItem("tabler-theme", nextTheme);
  };

  return (
<div><div className="page">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/* BEGIN NAVBAR  */}
      <Topbar
        isNavbarOpen={isNavbarOpen}
        isSidebarOpen={isSidebarOpen}
        onToggleNavbar={() => setIsNavbarOpen((open) => !open)}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        onToggleTheme={toggleTheme}
      />
      <MenuBar
        isNavbarOpen={isNavbarOpen}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      {/* END NAVBAR  */}
      <div className="page-wrapper">
        {/* BEGIN PAGE HEADER */}
        <div className="page-header d-print-none" aria-label="Page header">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                {/* Page pre-title */}
                <div className="page-pretitle">Overview</div>
                <h2 className="page-title">Dashboard</h2>
              </div>
              {/* Page title actions */}
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <span className="d-none d-sm-inline">
                    <a href="#" className="btn btn-1"> New view </a>
                  </span>
                  <a href="#" className="btn btn-primary btn-5 d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                    {/* Download SVG icon from http://tabler.io/icons/icon/plus */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-2"
                    >
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                    Create new report
                  </a>
                  <a
                    href="#"
                    className="btn btn-primary btn-6 d-sm-none btn-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-report"
                    aria-label="Create new report"
                  >
                    {/* Download SVG icon from http://tabler.io/icons/icon/plus */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-2"
                    >
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                  </a>
                </div>
                {/* BEGIN MODAL */}
                {/* END MODAL */}
              </div>
            </div>
          </div>
        </div>
        {/* END PAGE HEADER */}
        {/* BEGIN PAGE BODY */}
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-deck row-cards">
              <div className="col-sm-12 col-lg-5">
                <div className="card welcome-card">
                  <div className="card-body">
                    <div className="row gy-3">
                      <div className="col-12 col-sm d-flex flex-column">
                        <h3 className="h2">Welcome back, Paweł</h3>
                        <p className="text-muted">You have 5 new messages and 2 new notifications.</p>
                        <div className="row g-5 mt-auto">
                          <div className="col-auto">
                            <div className="subheader">Today's Sales</div>
                            <div className="d-flex align-items-baseline">
                              <div className="h3 me-2">6,782</div>
                              <div className="me-auto">
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                  7%
                                  {/* Download SVG icon from http://tabler.io/icons/icon/trending-up */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon ms-1 icon-2"
                                  >
                                    <path d="M3 17l6 -6l4 4l8 -8" />
                                    <path d="M14 7l7 0l0 7" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="progress progress-sm">
                              <div
                                className="progress-bar bg-success"
                                style={{width: '75%'}}
                                role="progressbar"
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label="75% Complete"
                              >
                                <span className="visually-hidden">75% Complete</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="subheader">Growth Rate</div>
                            <div className="d-flex align-items-baseline">
                              <div className="h3 me-2">78,4%</div>
                              <div className="me-auto">
                                <span className="text-red d-inline-flex align-items-center lh-1">
                                  -1%
                                  {/* Download SVG icon from http://tabler.io/icons/icon/trending-down */}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon ms-1 icon-2"
                                  >
                                    <path d="M3 7l6 6l4 -4l8 8" />
                                    <path d="M21 10l0 7l-7 0" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="progress progress-sm">
                              <div
                                className="progress-bar bg-danger"
                                style={{width: '78%'}}
                                role="progressbar"
                                aria-valuenow="78"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-label="78% Complete"
                              >
                                <span className="visually-hidden">78% Complete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-auto d-flex justify-content-center">
                        <a href="./illustrations.html">
                          <svg xmlns="http://www.w3.org/2000/svg" height="200" fill="none" viewBox="0 0 800 600">
                            <style>{`
                              :where(.theme-dark, [data-theme="dark"]) .tblr-illustrations-good-info-a {
                                fill: black;
                                opacity: 0.07;
                              }
                              :where(.theme-dark, [data-theme="dark"]) .tblr-illustrations-good-info-b {
                                fill: #1d2535;
                              }
                              :where(.theme-dark, [data-theme="dark"]) .tblr-illustrations-good-info-c {
                                fill: #454c5e;
                              }
                              @media (prefers-color-scheme: dark) {
                                .tblr-illustrations-good-info-a {
                                  fill: black;
                                  opacity: 0.07;
                                }
                                .tblr-illustrations-good-info-b {
                                  fill: #1d2535;
                                }
                                .tblr-illustrations-good-info-c {
                                  fill: #454c5e;
                                }
                              }
                            `}</style>
                            <path
                              d="M125.93 300.392C125.93 346.056 174.224 379.274 195.614 416.213C217.61 454.339 222.991 512.425 260.996 534.543C297.935 555.933 350.519 532.034 396.183 532.034C441.848 532.034 494.432 555.945 531.371 534.543C569.376 512.547 574.757 454.339 596.753 416.213C618.143 379.274 666.437 346.165 666.437 300.392C666.437 254.618 618.034 221.509 596.753 184.57C574.757 146.444 569.376 88.2364 531.371 66.2405C494.432 44.8504 441.848 68.7491 396.183 68.7491C350.519 68.7491 297.935 44.8383 260.996 66.2405C222.87 88.2364 217.61 146.444 195.614 184.57C174.224 221.618 125.93 254.727 125.93 300.392Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                              opacity="0.02"
                              className="tblr-illustrations-good-info-a"
                            />
                            <path
                              d="M349.061 413.013C349.679 413.886 350.237 414.831 350.673 415.776C350.891 416.31 351.061 416.916 351.231 417.509C352.6 422.927 350.285 428.247 346.08 429.277C342.287 430.222 338.288 427.447 336.494 423.048C336.276 422.515 336.046 421.981 335.949 421.436C335.852 420.891 335.743 420.345 335.646 419.8C335.112 415.001 337.306 410.614 341.099 409.656C343.911 408.784 346.965 410.274 349.061 413.001V413.013Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M349.061 413.013C349.679 413.886 350.237 414.831 350.673 415.776C345.801 417.849 341.002 420.212 336.494 423.048C336.276 422.515 336.046 421.981 335.949 421.436C335.852 420.891 335.743 420.345 335.646 419.8C335.112 415.001 337.306 410.614 341.099 409.656C343.911 408.784 346.965 410.274 349.061 413.001V413.013Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M400.06 327.284C399.236 326.968 397.939 326.508 396.303 326.144C392.825 325.357 381.47 323.539 356.129 341.56C342.349 351.352 335.454 356.248 330.146 365.119C323.953 375.457 322.486 385.54 321.02 395.598C319.432 406.493 319.626 415.667 320.099 421.921C331.333 419 342.58 416.067 353.814 413.147C347.064 398.64 349.342 382.074 359.352 371.578C369.738 360.696 384.075 360.938 386.56 361.023C389.298 357.799 392.825 352.939 395.6 346.395C398.86 338.736 399.793 331.852 400.048 327.284H400.06Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M106.902 506.196C106.902 508.753 238.333 510.862 399.952 510.862C561.571 510.862 693.001 508.753 693.001 506.196C693.001 503.639 561.571 501.53 399.952 501.53C238.333 501.53 106.902 503.639 106.902 506.196Z"
                              fill="#D6D8E2"
                              opacity="0.5"
                              className="tblr-illustrations-good-info-b"
                            />
                            <path
                              d="M528.573 243.069C535.25 230.441 535.905 217.51 530.439 208.687C533.76 205.391 535.59 201.513 536.426 199.404C537.104 197.695 539.153 192.508 537.953 186.388C537.492 183.989 536.571 181.722 535.371 179.614C539.419 171.555 539.795 157.424 535.965 140.772L532.839 141.512C536.171 155.982 536.183 168.901 533.275 176.475C530.172 172.5 526.064 169.373 522.21 167.604C517.641 165.483 513.472 165.144 510.685 166.683C507.231 168.585 505.983 173.227 506.734 176.62C507.461 179.783 510.055 182.607 514.066 184.631C519.156 187.188 525.228 187.746 529.191 186.013C530.766 185.322 532.16 184.219 533.372 182.753C533.99 184.086 534.487 185.516 534.766 186.994C535.796 192.205 534.05 196.58 533.384 198.204C532.669 199.998 531.154 203.209 528.464 206.021C524.392 201.246 517.811 197.404 512.358 196.726C509.703 196.399 507.474 196.859 505.922 198.071C502.638 200.664 502.468 206.494 504.517 209.935C507.946 215.74 516.793 215.159 521.471 213.898C523.967 213.22 526.1 212.117 527.906 210.772C532.463 218.601 531.699 230.126 525.688 241.53L528.536 243.032L528.585 243.069H528.573ZM526.1 208.178C524.561 209.305 522.768 210.251 520.659 210.82C516.551 211.923 509.594 212.177 507.328 208.324C505.874 205.9 506.189 202.01 507.946 200.604C508.807 199.925 510.188 199.683 511.982 199.913C516.684 200.483 522.55 203.973 526.1 208.178ZM531.639 179.662C530.584 181.25 529.36 182.377 527.906 183.007C524.816 184.352 519.738 183.819 515.508 181.71C512.406 180.159 510.358 178.026 509.885 175.857C509.388 173.688 510.212 170.597 512.236 169.47C514.078 168.452 517.266 168.84 520.829 170.5C524.658 172.294 528.803 175.53 531.639 179.686V179.662Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M343.464 252.376C346.784 252.376 349.475 249.685 349.475 246.365C349.475 243.045 346.784 240.354 343.464 240.354C340.144 240.354 337.453 243.045 337.453 246.365C337.453 249.685 340.144 252.376 343.464 252.376Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M288.651 157.727C281.271 153.958 273.006 148.759 267.637 138.688C266.437 136.458 265.552 133.901 265.08 131.223C259.881 133.028 254.136 133.574 248.901 132.41C239.994 130.847 233.134 125.49 228.953 121.273L231.474 118.788C236.855 124.242 243.29 127.841 249.592 128.944C254.451 130.011 259.881 129.393 264.704 127.575C264.547 122.376 266.037 117.104 269.867 113.226C271.515 111.493 274.448 109.542 277.211 109.869C278.702 110.039 279.913 110.838 280.701 112.171L280.774 112.305C281.78 114.389 281.283 117.334 279.417 120.388C277.029 124.375 273.078 127.647 268.437 129.865C268.812 132.422 269.624 134.907 270.764 137.04C275.66 146.238 283.367 151.073 290.263 154.588L288.651 157.739V157.727ZM276.629 113.359C275.49 113.359 273.696 114.341 272.424 115.674C269.673 118.461 268.4 122.158 268.243 125.951C271.697 124.072 274.605 121.527 276.399 118.534C277.708 116.389 277.962 114.68 277.623 113.88C277.369 113.48 277.09 113.395 276.823 113.371C276.763 113.371 276.69 113.371 276.629 113.371V113.359Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M485.903 255.435C487.577 251.217 485.515 246.441 481.298 244.766C477.08 243.092 472.303 245.154 470.629 249.372C468.955 253.59 471.017 258.366 475.235 260.04C479.453 261.715 484.229 259.653 485.903 255.435Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M416.244 71.4486C417.881 67.3241 415.865 62.6533 411.741 61.0161C407.616 59.379 402.945 61.3953 401.308 65.5198C399.671 69.6443 401.687 74.3151 405.812 75.9523C409.936 77.5894 414.607 75.5731 416.244 71.4486Z"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M318.074 87.6425L336.749 62.6532C337.61 61.5019 336.907 59.8537 335.465 59.684L304.488 56.0119C303.07 55.8544 301.992 57.2844 302.561 58.6054L314.862 87.2668C315.432 88.5757 317.213 88.8059 318.062 87.6546L318.074 87.6425Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M485.475 127.223L499.63 118.898C500.285 118.51 500.273 117.577 499.618 117.201L485.33 109.105C484.675 108.73 483.851 109.214 483.863 109.966L483.997 126.387C483.997 127.138 484.833 127.611 485.475 127.223Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M243.905 364.15C244.269 381.225 244.633 398.313 244.996 415.389L180.184 447.831L176.984 443.032L215.232 405.778L210.057 365.834L243.918 364.15H243.905Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M243.905 364.15C244.269 381.225 244.633 398.313 244.996 415.389L180.184 447.831L176.984 443.032L215.232 405.778L210.057 365.834L243.918 364.15H243.905Z"
                              fill="black"
                              opacity="0.15"
                            />
                            <path
                              d="M239.095 271.294C242.791 274.954 249.262 281.365 253.31 285.012C253.553 284.6 253.783 284.176 254.013 283.752C254.425 283.013 254.522 282.783 254.667 282.516C255.31 281.474 256.279 280.977 256.558 280.819C259.83 278.905 265.211 269.282 265.211 269.282C265.259 269.173 265.332 269.064 265.393 268.967C270.107 260.641 272.034 260.278 275.27 254.267C278.506 248.243 279.184 237.179 280.505 215.074C280.554 214.274 281.378 198.786 275.694 193.647C275.355 193.344 275.003 193.078 274.967 193.066C270.701 189.927 263.672 189.575 260.254 192.823C257.249 195.671 258.364 200.155 259.297 212.068C260.727 230.586 261.454 239.845 257.77 245.444C256.146 247.904 247.59 259.466 246.439 261.005C246.427 261.017 246.366 261.09 246.293 261.187C246.208 261.308 246.111 261.429 246.051 261.562C245.081 262.956 244.318 264.022 243.676 264.871C242.258 266.798 242.245 266.676 240.828 268.7C240.052 269.815 239.446 270.736 239.07 271.318L239.095 271.294Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M206.433 506.451L190.375 501.882C190.375 501.882 190.436 497.507 193.32 496.428C196.204 495.35 204.421 502.1 206.433 506.439"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M224.538 371.057C225.447 388.606 226.356 406.142 227.277 423.69C218.03 446.147 208.784 468.603 199.537 491.06C197.343 490.854 195.138 490.648 192.944 490.442C195.15 468.191 197.355 445.941 199.561 423.69C194.883 406.142 190.205 388.606 185.527 371.057H224.538Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M169.641 462.713L170.647 446.05C170.647 446.05 174.937 445.165 176.621 447.77C178.294 450.364 173.458 459.829 169.665 462.725"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M185.614 338.36C186.038 346.941 185.771 355.557 184.802 364.101C184.268 368.888 183.553 373.263 182.79 377.226L246.257 368.815C244.403 359.144 242.864 349.425 241.712 339.657C240.67 331.04 239.907 322.424 239.446 313.783C239.361 312.595 239.289 311.42 239.24 310.22C239.107 307.566 238.998 304.876 238.913 302.149C238.816 298.44 238.755 294.793 238.755 291.217V291.145C238.755 284.031 238.913 277.147 239.216 270.53C236.804 271.669 234.344 272.724 231.86 273.718C227.642 275.366 223.328 276.832 218.953 278.056L218.565 278.141L217.814 278.347C216.59 278.686 215.341 279.014 214.081 279.317L212.978 279.571C212.603 279.668 212.215 279.741 211.839 279.838L210.615 280.08C207.719 280.698 204.689 281.207 201.526 281.631C198.787 282.007 196.109 282.261 193.564 282.443L192 282.54C188.037 282.407 184.899 282.116 182.693 281.874C179.93 281.546 177.651 281.195 175.252 282.419C174.197 282.964 173.434 283.643 172.949 284.14C178.173 296.041 181.057 306.633 182.693 314.716C183.359 317.928 185.044 326.738 185.626 338.348L185.614 338.36Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M231.18 274.53C234.513 280.201 236.743 286.418 237.785 292.841C238.173 295.156 238.415 297.519 238.488 299.895V300.258C238.67 306.996 239.082 311.238 239.421 313.832C239.421 313.819 239.433 313.795 239.433 313.783C240.875 309.117 243.723 302.076 249.286 294.865C254.497 288.139 260.096 283.801 264.047 281.207C262.92 279.559 261.272 277.39 258.957 275.148C258.666 274.857 258.363 274.566 258.036 274.275C257.866 274.105 256.351 272.748 254.461 271.342C249.989 268.058 244.959 265.586 239.627 264.022C239.457 264.228 236.355 268.058 236.185 268.264C235.919 268.628 233.143 272.094 231.847 273.718C231.495 274.142 231.253 274.445 231.168 274.53H231.18Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M111.895 251.964C122.584 272.53 128.074 282.928 134.472 287.873C139.429 291.702 142.495 294.053 145.586 295.447C146.543 295.907 147.5 296.247 148.506 296.526C148.506 296.526 157.268 298.901 161.098 301.991C161.401 302.221 161.837 302.573 162.722 303.288C163.425 303.858 164.188 304.476 164.988 305.021C167.218 300.052 170.563 291.581 172.466 286.733C171.896 286.346 170.975 285.74 169.811 285.049C167.666 283.752 167.703 283.861 165.667 282.698C164.661 282.128 163.437 281.401 161.777 280.383C161.692 280.335 161.595 280.298 161.583 280.274C161.352 280.153 161.037 279.959 160.625 279.729C157.256 277.814 148.421 272.748 147.113 271.936C139.732 267.416 135.345 255.212 130.122 240.669C126.135 229.604 125.468 224.878 121.481 223.448C117.033 221.86 110.768 225.011 108.102 229.592C107.98 229.823 107.835 230.089 107.689 230.429C104.551 237.688 111.907 251.976 111.907 251.976L111.895 251.964Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M145.582 295.447C146.539 295.907 147.497 296.247 148.503 296.525C148.503 296.525 157.265 298.901 161.094 301.991C161.397 302.221 161.834 302.573 162.718 303.288C163.421 303.857 164.185 304.475 164.985 305.021C167.214 300.052 170.559 291.581 172.462 286.733C171.892 286.345 170.971 285.74 169.808 285.049C167.663 283.752 167.699 283.861 165.663 282.698C164.657 282.128 163.433 281.401 161.773 280.383C161.688 280.334 161.591 280.298 161.579 280.274C161.349 280.153 161.034 279.959 160.622 279.729C155.023 284.37 149.981 289.666 145.594 295.447H145.582Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M180.586 284.213C179.761 290.745 180.173 297.325 181.773 303.651C182.331 305.93 183.046 308.196 183.918 310.402L184.064 310.729C186.56 316.994 187.869 321.042 188.572 323.563C188.572 323.551 188.548 323.539 188.536 323.527C185.36 319.818 179.955 314.474 171.993 310.062C164.552 305.954 157.681 304.185 153.039 303.373C153.415 301.409 154.081 298.768 155.317 295.786C155.463 295.411 155.633 295.023 155.814 294.623C155.899 294.405 156.76 292.55 157.935 290.515C160.747 285.728 164.382 281.474 168.648 277.923C168.891 278.044 173.241 280.335 173.484 280.456C173.872 280.674 177.798 282.77 179.628 283.74C180.125 283.994 180.464 284.176 180.573 284.225L180.586 284.213Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M193.454 282.407H193.502C198.083 284.261 208.3 287.909 214.274 285.934C215.595 285.485 217.971 284.71 218.831 282.552C219.316 281.086 219.207 279.498 218.516 278.117L217.752 278.323C216.698 278.602 215.438 278.929 214.02 279.292L212.917 279.547L211.766 279.813L210.554 280.068C207.56 280.783 204.519 281.292 201.452 281.619C198.714 281.983 196.047 282.249 193.478 282.431H193.43V282.407H193.454Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M193.454 282.407H193.502C198.083 284.261 208.3 287.909 214.274 285.934C215.595 285.485 217.971 284.71 218.831 282.552C219.316 281.086 219.207 279.498 218.516 278.117L217.752 278.323C216.698 278.602 215.438 278.929 214.02 279.292L212.917 279.547L211.766 279.813L210.554 280.068C207.56 280.783 204.519 281.292 201.452 281.619C198.714 281.983 196.047 282.249 193.478 282.431H193.43V282.407H193.454Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M241.7 339.633C240.658 331.041 239.894 322.424 239.434 313.771C240.876 309.105 243.724 302.064 249.286 294.853C254.498 288.127 260.097 283.789 264.047 281.195C262.92 279.547 261.272 277.378 258.957 275.136C251.104 278.323 243.59 283.267 238.755 291.133C238.755 291.145 238.743 291.145 238.743 291.169C238.391 291.751 238.064 292.296 237.785 292.841C236.392 295.496 235.798 297.628 235.398 298.44C225.097 320.182 208.191 348.492 184.789 364.089C184.256 368.876 183.541 373.251 182.777 377.214L246.245 368.803C244.39 359.132 242.851 349.413 241.7 339.645V339.633Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M213.67 266.943C204.533 271.851 192.074 272.712 189.42 270.385C188.729 269.767 188.063 269.112 187.384 268.409C187.36 268.385 187.348 268.373 187.324 268.349C183.882 264.653 180.913 260.544 178.501 256.109C178.368 255.854 177.968 255.054 177.495 254.145C175.532 250.255 174.017 247.007 172.963 244.717C172.902 244.584 172.854 244.45 172.793 244.329C172.975 244.487 173.629 244.996 174.308 245.262C174.78 245.444 175.265 245.517 175.629 245.274C176.514 244.705 176.465 242.269 175.035 239.324L193.08 232.04L203.224 235.506C203.224 235.506 203.89 236.476 205.005 237.87C206.884 240.354 208.944 242.705 211.162 244.911L211.186 244.935C212.786 246.62 214.664 248.013 216.761 249.031C222.505 251.346 222.808 262.035 213.67 266.943Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M190.485 256.69C190.861 258.23 190.994 259.805 190.885 261.38C190.74 262.859 190.303 264.301 189.612 265.61C189.031 266.676 188.279 267.634 187.383 268.409C187.358 268.385 187.346 268.373 187.322 268.349C183.88 264.653 180.911 260.544 178.499 256.109C178.366 255.854 177.966 255.054 177.493 254.145C175.53 250.255 174.015 247.007 172.961 244.717C173.373 244.971 173.858 245.214 174.306 245.262C174.779 245.444 175.264 245.517 175.627 245.274C176.512 244.705 176.463 242.269 175.033 239.324L193.078 232.04L203.222 235.506C203.222 235.506 203.889 236.476 205.004 237.87C206.882 240.354 208.942 242.705 211.16 244.911L211.184 244.935C205.197 250.146 197.659 253.237 189.734 253.721C190.037 254.691 190.291 255.685 190.485 256.69Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M213.234 229.168C213.174 230.622 212.956 232.065 212.58 233.483C212.156 235.3 211.465 237.058 210.544 238.669C206.387 246.001 196.971 250.11 186.645 248.922C184.888 248.716 183.155 248.377 181.458 247.892H181.41C181.41 247.892 181.41 247.965 181.422 247.989C181.761 248.995 182.185 249.964 182.682 250.91C182.925 251.346 182.973 251.467 183.131 251.758L183.312 252.037C183.591 252.546 186.015 255.878 186.754 257.951C187.203 259.332 187.215 260.811 186.779 262.192C185.591 260.387 183.967 258.908 182.064 257.89C181.349 257.563 180.61 257.272 179.859 257.042C176.077 255.406 173.036 252.437 171.278 248.704C170.575 247.165 170.127 245.529 169.921 243.856C169.739 242.778 169.279 238.779 170.745 235.894C173.763 229.932 185.821 227.556 192.111 227.193C193.214 227.144 195.153 227.084 196.413 226.126C196.655 225.945 196.862 225.714 197.019 225.46C198.073 223.787 197.164 221.23 196.098 219.812C194.05 217.049 189.748 216.152 185.13 217.413C193.735 211.353 204.46 212.468 209.805 218.516C212.313 221.473 213.549 225.302 213.246 229.168H213.234Z"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M213.233 229.168C213.173 230.622 212.955 232.065 212.579 233.483C212.155 235.3 211.464 237.058 210.543 238.67C206.386 246.002 196.97 250.11 186.644 248.922C184.051 248.389 181.833 247.953 181.457 247.892H181.409L177.543 246.523C183.045 246.91 188.583 246.304 193.867 244.717C198.545 243.311 205.041 241.372 209.767 235.337C211.222 233.47 212.385 231.386 213.233 229.168Z"
                              fill="black"
                              opacity="0.5"
                            />
                            <path
                              d="M582.157 280.868L605.365 340.772C609.606 351.716 616.345 361.593 625.288 369.179C631.796 374.693 637.044 381.868 640.352 390.375C640.776 391.478 641.164 392.593 641.504 393.708C649.454 419.024 637.31 446.401 613.194 457.526C583.647 471.124 548.539 454.751 539.971 423.387C539.498 421.678 539.122 419.958 538.831 418.212C537.971 413.11 537.886 407.996 538.504 403.003C539.91 391.732 538.735 380.28 534.626 369.7L510.885 308.475C509.079 303.833 511.382 298.622 516.023 296.841L570.498 275.729C575.128 273.936 580.327 276.226 582.133 280.868H582.157Z"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M585.746 269.306L589.309 278.456C590.363 281.159 589.006 284.188 586.303 285.231L527.538 308.014L510.777 314.51C508.075 315.565 505.045 314.207 504.003 311.517L500.452 302.343C499.41 299.652 500.743 296.623 503.445 295.568L568.403 270.385L578.971 266.289C581.674 265.234 584.715 266.58 585.746 269.294V269.306Z"
                              fill="#A6A9B3"
                            />
                            <path
                              d="M598.388 312.45L602.108 322.036C603.114 324.617 601.817 327.526 599.236 328.52L546.821 348.831L530.424 355.194C527.843 356.2 524.934 354.903 523.928 352.334L520.22 342.76C519.214 340.178 520.511 337.27 523.08 336.264L589.638 310.475H589.65L591.88 309.59C594.473 308.596 597.37 309.881 598.375 312.45H598.388Z"
                              fill="#A6A9B3"
                            />
                            <path
                              d="M598.387 312.45L602.107 322.036C603.113 324.617 601.816 327.526 599.235 328.52L546.82 348.831C562.599 338.894 580.148 325.478 589.661 310.475H589.673L591.903 309.59C594.496 308.596 597.393 309.881 598.399 312.45H598.387Z"
                              fill="black"
                              opacity="0.15"
                            />
                            <path
                              d="M585.747 269.306L589.31 278.456C590.364 281.159 589.007 284.189 586.304 285.231L527.539 308.014C542.664 298.234 558.867 285.437 567.871 271.221C568.065 270.942 568.223 270.664 568.392 270.397L578.96 266.301C581.662 265.247 584.704 266.592 585.734 269.306H585.747Z"
                              fill="black"
                              opacity="0.15"
                            />
                            <path
                              d="M641.531 393.72C649.482 419.037 637.338 446.413 613.221 457.539C583.675 471.136 548.567 454.763 539.999 423.399C539.526 421.691 539.15 419.97 538.859 418.225C566.891 431.325 614.882 443.759 641.531 393.72Z"
                              fill="black"
                              opacity="0.3"
                            />
                            <path
                              d="M626.045 424.534C626.051 424.281 626.054 424.029 626.054 423.775C626.054 407.203 612.619 393.768 596.047 393.768C579.475 393.768 566.041 407.203 566.041 423.775L566.031 423.775V504.706H626.045V424.534Z"
                              fill="#A6A9B3"
                            />
                            <path
                              d="M596.048 439.19C604.562 439.19 611.464 432.289 611.464 423.775C611.464 415.261 604.562 408.36 596.048 408.36C587.535 408.36 580.633 415.261 580.633 423.775C580.633 432.289 587.535 439.19 596.048 439.19Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M596.049 410.005C588.444 410.005 582.278 416.17 582.278 423.775C582.278 431.38 588.444 437.545 596.049 437.545C603.654 437.545 609.819 431.38 609.819 423.775C609.819 416.17 603.654 410.005 596.049 410.005ZM578.988 423.775C578.988 414.353 586.627 406.715 596.049 406.715C605.471 406.715 613.109 414.353 613.109 423.775C613.109 433.197 605.471 440.835 596.049 440.835C586.627 440.835 578.988 433.197 578.988 423.775Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M461.831 359.629C458.135 365.458 454.439 371.288 450.73 377.117C443.544 388.363 436.369 399.61 429.183 410.856C423.559 419.63 418.082 428.344 412.458 437.118C395.019 435.918 377.58 434.718 360.141 433.519C363.098 422.393 366.818 410.577 371.52 398.264C373.423 393.271 375.386 388.46 377.386 383.831L383.979 367.409C389.372 354.042 394.656 340.626 400.048 327.271L461.819 359.617L461.831 359.629Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M429.194 410.868C423.571 419.642 417.996 428.307 412.47 437.13C395.031 435.93 377.592 434.731 360.152 433.531C361.595 426.974 364.127 417.17 368.575 405.548C370.005 401.827 371.169 399.113 371.52 398.289C374.162 392.12 379.894 378.05 392.316 346.625C392.316 353.727 393.249 372.015 405.756 389.696C413.743 400.979 423.244 407.487 429.182 410.88L429.194 410.868Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M473.041 307.251C472.036 309.905 470.424 313.734 468.376 318.558C467.939 319.539 467.503 320.521 467.321 320.848C465.746 324.096 463.916 327.211 461.843 330.168C460.68 331.84 459.456 333.476 458.147 335.052C458.062 335.137 457.99 335.221 457.905 335.306C457.238 336.021 456.547 336.736 455.881 337.439C453.057 340.202 439.072 339.996 428.54 335.015C418.009 330.022 417.803 318.085 424.093 315.201C426.323 313.916 428.262 312.341 429.958 310.39C429.995 310.341 430.043 310.281 430.092 310.232C432.406 307.602 434.612 304.948 436.515 302.003C437.69 300.343 438.369 299.289 438.369 299.289L449.494 294.877L470.06 302.003C468.654 305.409 468.703 308.16 469.769 308.729C470.812 309.275 472.593 307.772 472.993 307.299C473.017 307.287 473.029 307.263 473.041 307.251Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M472.992 307.299C471.961 309.99 470.362 313.807 468.338 318.558C467.889 319.564 467.453 320.557 467.259 320.885C465.696 324.133 463.878 327.223 461.842 330.168C460.679 331.84 459.455 333.476 458.146 335.052C458.085 335.149 458 335.234 457.928 335.33C457.928 335.33 457.928 335.318 457.903 335.306C456.752 334.482 455.674 333.295 454.959 332.071C454.147 330.701 453.492 329.113 453.359 327.393C453.104 325.647 453.225 323.854 453.553 322.23C453.674 321.042 453.892 320 454.244 318.861C445.457 318.752 436.889 315.758 429.957 310.39C429.993 310.341 430.042 310.281 430.09 310.232C432.405 307.602 434.611 304.948 436.513 302.003C437.689 300.343 438.368 299.289 438.368 299.289L449.493 294.877L470.059 302.003C468.653 305.409 468.701 308.16 469.768 308.729C470.81 309.275 472.592 307.772 472.992 307.299Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M463.331 424.054C460.798 446.025 458.265 468.021 455.744 489.993C452.678 490.114 449.612 490.26 446.546 490.393C443.213 478.795 439.892 467.209 436.548 455.624C423.895 458.423 411.243 461.211 398.591 464.022C392.059 477.608 385.539 491.205 379.007 504.79C358.368 501.324 337.717 497.858 317.066 494.392V485.994C332.518 483.328 347.97 480.662 363.422 477.995C362.331 463.174 361.252 448.34 360.149 433.531L414.176 432.84C430.561 429.907 446.946 426.974 463.331 424.042V424.054Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M463.33 424.054C460.797 446.025 458.264 468.021 455.743 489.993C452.677 490.114 449.611 490.26 446.545 490.393C443.212 478.795 439.891 467.209 436.547 455.624C423.894 458.423 411.242 461.211 398.59 464.022L414.175 432.852C430.56 429.919 446.945 426.987 463.33 424.054Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M299.328 504.645L303.691 485.061C303.691 485.061 308.866 484.927 310.381 488.26C311.896 491.593 304.551 501.93 299.328 504.645Z"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M465.821 506.608L445.921 504.039C445.921 504.039 445.315 498.901 448.49 497.083C451.666 495.277 462.755 501.652 465.821 506.596"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M430.113 342.747C431.495 346.504 434.016 349.74 437.324 352.006L437.785 352.333L448.534 352.212L430.113 342.759V342.747Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M430.113 342.747C431.495 346.504 434.016 349.74 437.324 352.006L437.785 352.333L448.534 352.212L430.113 342.759V342.747Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path d="M437.797 352.334L452.376 349.28L453.745 353.049L441.263 361.023L437.797 352.334Z" fill="#DADCE0" />
                            <path d="M437.291 352.115L425.063 334.094L419.73 335.997L424.59 355.86L437.291 352.115Z" fill="#DADCE0" />
                            <path d="M437.797 352.334L452.376 349.28L453.745 353.049L441.263 361.023L437.797 352.334Z" fill="black" opacity="0.11" />
                            <path
                              d="M427.264 359.435C423.762 375.372 420.272 391.308 416.66 407.208C424.065 392.872 431.579 378.571 439.044 364.38C438.547 360.272 438.111 356.321 437.565 352.2L437.02 352.079C433.869 354.636 430.633 357.06 427.264 359.447V359.435Z"
                              fill="#DADCE0"
                            />
                            <path
                              d="M437.703 352.285L416.762 407.293C424.179 392.944 431.68 378.644 439.145 364.453C438.649 360.356 438.249 356.284 437.703 352.297V352.285Z"
                              fill="black"
                              opacity="0.11"
                            />
                            <path
                              d="M479.901 438.621C474.471 438.621 469.442 437.639 464.776 435.676C463.964 435.336 455.881 431.252 422.19 393.696C421.208 392.605 421.305 390.92 422.396 389.951C423.487 388.969 425.171 389.066 426.141 390.157C458.692 426.441 466.606 430.659 466.933 430.828C484.906 438.39 511.216 428.38 545.052 401.04C546.192 400.119 547.864 400.288 548.785 401.44C549.706 402.579 549.524 404.251 548.385 405.172C520.681 427.556 498.091 438.633 479.901 438.633V438.621Z"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M438.197 414.225C437.203 414.613 436.149 414.928 435.131 415.122C434.561 415.207 433.931 415.231 433.313 415.243C427.726 415.28 423.121 411.765 423.121 407.414C423.109 403.5 426.757 400.288 431.471 399.598C432.041 399.513 432.622 399.416 433.168 399.452C433.713 399.489 434.271 399.513 434.828 399.549C439.615 400.179 443.36 403.367 443.372 407.269C443.554 410.214 441.372 412.819 438.221 414.201L438.197 414.225Z"
                              fill="#FFCB9D"
                              style={{fill: 'var(--tblr-illustrations-skin, #ffcb9d)'}}
                            />
                            <path
                              d="M438.199 414.225C437.205 414.613 436.151 414.928 435.133 415.122C434.297 409.887 433.133 404.675 431.461 399.61C432.031 399.525 432.612 399.428 433.158 399.464C433.715 399.501 434.26 399.525 434.818 399.561C439.605 400.191 443.35 403.379 443.362 407.281C443.544 410.226 441.362 412.832 438.211 414.213L438.199 414.225Z"
                              fill="black"
                              opacity="0.1"
                            />
                            <path
                              d="M455.615 356.599C451.009 360.502 446.622 365.555 447.398 370.657C448.949 380.91 470.218 383.94 469.745 388.157C469.479 390.569 462.183 392.811 436.963 393.538C436.309 398.374 435.812 407.172 439.387 417.122C441.435 422.818 444.198 427.193 446.513 430.247C454.439 426.987 506.466 405.184 503.424 387.697C502.503 382.377 495.716 378.232 482.373 369.93C471.733 363.301 462.207 359.132 455.602 356.587L455.615 356.599Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M392.025 219.546C423.215 219.546 448.5 194.261 448.5 163.071C448.5 131.881 423.215 106.597 392.025 106.597C360.835 106.597 335.551 131.881 335.551 163.071C335.551 194.261 360.835 219.546 392.025 219.546Z"
                              fill="#066FD1"
                              style={{fill: 'var(--tblr-illustrations-primary, var(--tblr-primary, #066fd1))'}}
                            />
                            <path
                              d="M415.925 136.567L383.179 169.313C382.452 170.04 381.289 170.04 380.562 169.313L366.298 155.048C364.48 153.231 361.523 153.231 359.705 155.048L354.567 160.187C352.749 162.005 352.749 164.962 354.567 166.78L378.574 190.787C380.392 192.605 383.349 192.605 385.167 190.787L427.656 148.298C429.474 146.48 429.474 143.523 427.656 141.705L422.518 136.567C420.7 134.749 417.743 134.749 415.925 136.567Z"
                              fill="white"
                            />
                            <path
                              d="M570.952 241.19C570.758 241.19 570.564 241.166 570.37 241.117C569.195 240.802 568.504 239.591 568.831 238.415L580.902 194.229C581.217 193.054 582.429 192.363 583.604 192.69C584.78 193.005 585.471 194.217 585.143 195.393L573.073 239.578C572.806 240.56 571.922 241.202 570.952 241.202V241.19Z"
                              fill="#A6A9B3"
                            />
                            <path
                              d="M580.633 246.389C580.196 246.389 579.76 246.256 579.372 245.989C578.378 245.299 578.136 243.929 578.827 242.935L598.29 215.11C598.981 214.116 600.35 213.874 601.344 214.565C602.338 215.256 602.58 216.625 601.889 217.619L582.426 245.444C582.002 246.05 581.311 246.377 580.621 246.377L580.633 246.389Z"
                              fill="#A6A9B3"
                            />
                            <path
                              d="M473.668 298.78C475.304 302.828 475.328 307.445 475.328 307.445C475.328 308.935 475.328 310.681 474.649 312.838C473.716 315.807 472.116 317.71 471.268 318.667C469.414 320.8 467.426 322.097 465.996 322.86C465.136 323.2 464.385 323.575 463.645 323.951C461.634 325.236 459.973 327.017 458.822 329.101C458.204 327.647 458.071 326.023 458.458 324.496C459.089 322.206 461.512 318.267 461.694 317.698L461.815 317.358C461.924 317.019 462.07 316.704 462.264 316.389C462.736 315.298 463.112 314.159 463.367 312.995V312.886C463.367 312.886 463.318 312.898 463.294 312.898C456.519 314.365 451.005 313.904 447.648 313.383C439.104 312.014 433.639 308.354 431.809 306.294C429.676 303.894 428.803 301.216 428.803 301.216C428.658 300.743 428.561 300.355 428.5 300.101C428.185 298.962 427.87 297.325 428.04 295.374C428.064 295.096 428.1 294.829 428.137 294.574C428.209 294.126 428.306 293.714 428.403 293.326C428.464 293.084 428.561 292.732 428.731 292.308C429.833 289.642 432.233 288.285 433.505 287.642C437.396 285.679 442.243 285.388 444.897 285.267C453.09 284.891 469.681 288.854 473.668 298.768V298.78Z"
                              fill="#232B41"
                              className="tblr-illustrations-good-info-c"
                            />
                            <path
                              d="M463.286 316.91C456.512 318.377 450.997 317.916 447.64 317.395C439.097 316.026 433.631 312.366 431.801 310.306C429.668 307.906 428.795 305.228 428.795 305.228C428.65 304.755 428.553 304.367 428.492 304.113C428.177 302.973 427.862 301.337 428.032 299.386C428.056 299.108 428.093 298.841 428.129 298.586C430.819 303.725 434.019 306.743 436.043 308.366C436.043 308.366 442.029 313.19 458.863 316.462C461.02 316.886 463.056 316.91 463.056 316.91C463.129 316.91 463.201 316.91 463.286 316.91Z"
                              fill="black"
                              opacity="0.5"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Fee Collection Summary</h3>
                    <div className="card-actions d-flex gap-2">
                      <span className="avatar avatar-sm bg-success text-white">
                        {/* Download SVG icon from http://tabler.io/icons/icon/bell */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-ghost text-secondary"
                        aria-pressed={showFees}
                        aria-label={showFees ? "Hide amounts" : "Show amounts"}
                        onClick={() => setShowFees((prev) => !prev)}
                      >
                        {/* Download SVG icon from http://tabler.io/icons/icon/eye */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon"
                        >
                          <path d="M2 12s3.5 -7 10 -7s10 7 10 7s-3.5 7 -10 7s-10 -7 -10 -7z" />
                          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="h1 mb-1">{showFees ? "₹1,00,00,84,650.00" : "••••"}</div>
                    <div className="text-secondary mb-3">Total collected till date</div>
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="text-secondary">After Discount</div>
                        <div className="h3 m-0">{showFees ? "₹86,07,075.00" : "••••"}</div>
                      </div>
                      <div className="col-6 border-start ps-3">
                        <div className="text-secondary">Total Discount</div>
                        <div className="h3 m-0">{showFees ? "₹14,77,575.00" : "••••"}</div>
                      </div>
                      <div className="col-6 border-top pt-3">
                        <div className="text-secondary">Total Dues</div>
                        <div className="h3 m-0">{showFees ? "₹20,20,860.00" : "••••"}</div>
                      </div>
                      <div className="col-6 border-top border-start pt-3 ps-3">
                        <div className="text-secondary">Total Fine Paid</div>
                        <div className="h3 m-0">{showFees ? "₹0.00" : "••••"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card h-100">
                  <div className="card-header">
                    <h3 className="card-title">Total Fees Collected</h3>
                    <div className="card-actions">
                      <button
                        type="button"
                        className="btn btn-icon btn-sm btn-ghost text-secondary"
                        aria-pressed={showFees}
                        aria-label={showFees ? "Hide amounts" : "Show amounts"}
                        onClick={() => setShowFees((prev) => !prev)}
                      >
                        {/* Download SVG icon from http://tabler.io/icons/icon/eye */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon"
                        >
                          <path d="M2 12s3.5 -7 10 -7s10 7 10 7s-3.5 7 -10 7s-10 -7 -10 -7z" />
                          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <div className="h2 mb-2">{showFees ? "₹86,07,075.00" : "••••"}</div>
                    <div className="text-secondary mb-3">Collected this term</div>
                    <div id="chart-active-users-3" className="position-relative"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Sales</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="sales-dropdown"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for sales data"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sales-dropdown">
                            <a className="dropdown-item active" href="#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="#">Last 30 days</a>
                            <a className="dropdown-item" href="#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h1 mb-3">75%</div>
                    <div className="d-flex mb-2">
                      <div>Conversion rate</div>
                      <div className="ms-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          7%
                          {/* Download SVG icon from http://tabler.io/icons/icon/trending-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon ms-1 icon-2"
                          >
                            <path d="M3 17l6 -6l4 4l8 -8" />
                            <path d="M14 7l7 0l0 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-primary"
                        style={{width: '75%'}}
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label="75% Complete"
                      >
                        <span className="visually-hidden">75% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Revenue</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="revenue-dropdown"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for revenue"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="revenue-dropdown">
                            <a className="dropdown-item active" href="#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="#">Last 30 days</a>
                            <a className="dropdown-item" href="#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-0 me-2">$4,300</div>
                      <div className="me-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          8%
                          {/* Download SVG icon from http://tabler.io/icons/icon/trending-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon ms-1 icon-2"
                          >
                            <path d="M3 17l6 -6l4 4l8 -8" />
                            <path d="M14 7l7 0l0 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div id="chart-revenue-bg" className="position-relative rounded-bottom chart-sm"></div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">New clients</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="new-clients-dropdown"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for new clients"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="new-clients-dropdown">
                            <a className="dropdown-item active" href="#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="#">Last 30 days</a>
                            <a className="dropdown-item" href="#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-3 me-2">6,782</div>
                      <div className="me-auto">
                        <span className="text-yellow d-inline-flex align-items-center lh-1">
                          0%
                          {/* Download SVG icon from http://tabler.io/icons/icon/minus */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon ms-1 icon-2"
                          >
                            <path d="M5 12l14 0" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div id="chart-new-clients" className="position-relative chart-sm"></div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Active subscriptions</div>
                      <div className="ms-auto lh-1">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle text-secondary"
                            id="active-users-dropdown"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Select time range for active users"
                            >Last 7 days</a
                          >
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="active-users-dropdown">
                            <a className="dropdown-item active" href="#" aria-current="true">Last 7 days</a>
                            <a className="dropdown-item" href="#">Last 30 days</a>
                            <a className="dropdown-item" href="#">Last 3 months</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="h1 mb-3 me-2">2,986</div>
                      <div className="me-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          4%
                          {/* Download SVG icon from http://tabler.io/icons/icon/trending-up */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon ms-1 icon-2"
                          >
                            <path d="M3 17l6 -6l4 4l8 -8" />
                            <path d="M14 7l7 0l0 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div id="chart-active-users" className="position-relative chart-sm"></div>
                  </div>
                </div>
              </div>
              <div className="dashboard-bnc-grid">
                <div className="dashboard-bnc-birthday">
                  <div className="card">
                    <div className="card-header d-flex align-items-center gap-3">
                      <h3 className="card-title mb-0">Birthday</h3>
                      <div className="input-group input-group-sm ms-auto" style={{ maxWidth: "200px" }}>
                        <input
                          ref={birthdayDateRef}
                          type="date"
                          className="form-control birthday-date-input"
                          defaultValue="2026-02-01"
                        />
                        <span
                          className="input-group-text"
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            const input = birthdayDateRef.current;
                            if (!input) return;
                            const picker = input.showPicker;
                            if (picker) {
                              picker.call(input);
                            } else {
                              input.focus();
                            }
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              const input = birthdayDateRef.current;
                              if (!input) return;
                              const picker = input.showPicker;
                              if (picker) {
                                picker.call(input);
                              } else {
                                input.focus();
                              }
                            }
                          }}
                        >
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="list-group list-group-flush small" style={{ maxHeight: "220px", overflowY: "auto" }}>
                        {[
                          { name: "AAYANSH UPADHYAY", classInfo: "LKG ALL A", father: "NEERAJ UPADHYAY", avatar: "/static/avatars/052f.jpg" },
                          { name: "KRISHNA SHARMA", classInfo: "UKG B", father: "RAJESH SHARMA", avatar: "/static/avatars/003m.jpg" },
                          { name: "RIYA GUPTA", classInfo: "1st A", father: "AMIT GUPTA", avatar: "/static/avatars/000f.jpg" },
                          { name: "ARJUN MEHTA", classInfo: "2nd C", father: "SANJAY MEHTA", avatar: "/static/avatars/006m.jpg" },
                        ].map((student) => (
                          <div key={student.name} className="list-group-item">
                            <div className="d-flex align-items-center gap-3">
                              <input className="form-check-input m-0" type="checkbox" aria-label={`Select ${student.name}`} />
                              <span className="avatar avatar-md rounded-circle" style={{ backgroundImage: `url(${student.avatar})` }}></span>
                              <div className="me-auto">
                                <div className="fw-semibold text-body">{student.name}</div>
                                <div className="text-secondary small">Designation : Student • {student.classInfo}</div>
                                <div className="text-secondary small">Father: {student.father}</div>
                              </div>
                              <span className="btn btn-sm btn-outline-warning rounded-pill">Happy Birthday</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-bnc-notice">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Notice Board</h3>
                    </div>
                    <div className="card-body card-body-scrollable card-body-scrollable-shadow" style={{ maxHeight: "16rem" }}>
                      <div className="divide-y">
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: "url(/static/avatars/052f.jpg)" }}> </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Jeffie Lewzey</strong> commented on your <strong>"I'm not a witch."</strong> post.</div>
                              <div className="text-secondary">24 hours ago</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: "url(/static/avatars/002m.jpg)" }}> </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">It's <strong>Mallory Hulme</strong>'s birthday. Wish him well!</div>
                              <div className="text-secondary">now</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: "url(/static/avatars/003m.jpg)" }}> </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Dunn Slane</strong> posted <strong>"Well, what do you want?"</strong>.</div>
                              <div className="text-secondary">now</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: "url(/static/avatars/000f.jpg)" }}> </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Emmy Levet</strong> created a new project <strong>Morning alarm clock</strong>.</div>
                              <div className="text-secondary">4 days ago</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: "url(/static/avatars/001f.jpg)" }}> </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Maryjo Lebarree</strong> liked your photo.</div>
                              <div className="text-secondary">now</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: "url(/static/avatars/004m.jpg)" }}> </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Egan Poetz</strong> registered new client as <strong>Trilia</strong>.</div>
                              <div className="text-secondary">24 hours ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-bnc-calendar">
                  <div className="card">
                    <div className="card-header d-flex align-items-center">
                      <h3 className="card-title mb-0">Calendar</h3>
                      <button
                        type="button"
                        className="btn btn-sm btn-square btn-primary ms-auto"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-add-event"
                      >
                        Add Event
                      </button>
                    </div>
                    <div className="card-body">
                      <div id="dashboard-calendar"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row row-cards dashboard-four-grid">
                  <div className="col-lg-4 d-flex">
                    <div className="card flex-fill">
                      <div className="card-header">
                        <h3 className="card-title ">Fee Statistic</h3>
                      </div>
                      <div className="card-body text-center">
                        <svg width="160" height="160" viewBox="0 0 160 160" className="mb-4">
                          <circle cx="80" cy="80" r="60" fill="none" stroke="#e9ecef" strokeWidth="16" />
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#206bc4"
                            strokeWidth="16"
                            strokeDasharray="210 377"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#2fb344"
                            strokeWidth="16"
                            strokeDasharray="90 377"
                            strokeDashoffset="-220"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#f59f00"
                            strokeWidth="16"
                            strokeDasharray="45 377"
                            strokeDashoffset="-315"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#fa5252"
                            strokeWidth="16"
                            strokeDasharray="32 377"
                            strokeDashoffset="-360"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="row g-2 text-start">
                          <div className="col-6 d-flex align-items-center gap-2">
                            <span className="avatar avatar-xs rounded-circle" style={{background: "#206bc4"}}></span>
                            <span className="text-secondary">Tuition 56%</span>
                          </div>
                          <div className="col-6 d-flex align-items-center gap-2">
                            <span className="avatar avatar-xs rounded-circle" style={{background: "#2fb344"}}></span>
                            <span className="text-secondary">Transport 24%</span>
                          </div>
                          <div className="col-6 d-flex align-items-center gap-2">
                            <span className="avatar avatar-xs rounded-circle" style={{background: "#f59f00"}}></span>
                            <span className="text-secondary">Hostel 12%</span>
                          </div>
                          <div className="col-6 d-flex align-items-center gap-2">
                            <span className="avatar avatar-xs rounded-circle" style={{background: "#fa5252"}}></span>
                            <span className="text-secondary">Others 8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="card flex-fill">
                      <div className="card-header d-flex align-items-center">
                        <div>
                          <h3 className="card-title ">Daily Attendance</h3>
                          <div className="text-secondary">Target 91% · M</div>
                        </div>
                        <div className="ms-auto btn-group">
                          <button className="btn btn-sm btn-primary">M</button>
                          <button className="btn btn-sm btn-outline-primary">E</button>
                        </div>
                      </div>
                      <div className="card-body text-center">
                        <div className="position-relative d-inline-flex align-items-center justify-content-center" style={{width: 180, height: 180}}>
                          <svg width="180" height="180" viewBox="0 0 180 180">
                            <circle cx="90" cy="90" r="70" fill="none" stroke="#e9ecef" strokeWidth="14" />
                            <circle
                              cx="90"
                              cy="90"
                              r="70"
                              fill="none"
                              stroke="var(--tblr-primary, #206bc4)"
                              strokeWidth="14"
                              strokeDasharray="395 440"
                              strokeDashoffset="30"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="position-absolute text-center">
                            <div className="text-secondary fw-semibold">Avg. Attendance</div>
                            <div className="display-6">91%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex">
                    <div className="card flex-fill">
                      <div className="card-header">
                        <h3 className="card-title">Leaves Status</h3>
                      </div>
                      <div className="card-body d-flex flex-column gap-3">
                        {[
                          { name: "Anita Sharma", subject: "Math", from: "27 Jan, 2026", to: "29 Jan, 2026" },
                          { name: "Rahul Verma", subject: "Science", from: "28 Jan, 2026", to: "28 Jan, 2026" },
                          { name: "Neha Gupta", subject: "English", from: "30 Jan, 2026", to: "31 Jan, 2026" },
                        ].map((leave) => (
                          <div key={leave.name} className="border rounded-3 p-3 d-flex align-items-start justify-content-between">
                            <div>
                              <div className="fw-semibold">{leave.name}</div>
                              <div className="text-secondary">{leave.subject}</div>
                            </div>
                            <div className="text-secondary text-end">
                              <div>From: {leave.from}</div>
                              <div>To: {leave.to}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex d-lg-none d-none d-sm-flex">
                    <div className="card flex-fill">
                      <div className="card-header">
                        <h3 className="card-title">Tasks</h3>
                      </div>
                      <style>{`
                        .table-tasks tbody tr + tr td {
                          border-top: 1px solid var(--tblr-border-color);
                        }
                      `}</style>
                      <div className="table-responsive" style={{maxHeight: "320px", overflowY: "auto"}}>
                        <table className="table table-selectable card-table table-vcenter table-tasks">
                          <tbody>
                          <tr>
                            <td className="w-1 pe-0">
                              <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                            </td>
                            <td className="w-100">
                              <a href="#" className="text-reset">Extend the data model.</a>
                            </td>
                            <td className="text-nowrap text-secondary">
                              {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M11 15h1" />
                                <path d="M12 15v3" />
                              </svg>
                              December 08, 2024
                            </td>
                            <td className="text-nowrap">
                              <a href="#" className="text-secondary">
                                {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon icon-1"
                                >
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                                2/7
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1 pe-0">
                              <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                            </td>
                            <td className="w-100">
                              <a href="#" className="text-reset">Verify the event flow.</a>
                            </td>
                            <td className="text-nowrap text-secondary">
                              {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M11 15h1" />
                                <path d="M12 15v3" />
                              </svg>
                              January 01, 2024
                            </td>
                            <td className="text-nowrap">
                              <a href="#" className="text-secondary">
                                {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon icon-1"
                                >
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                                0/5
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1 pe-0">
                              <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                            </td>
                            <td className="w-100">
                              <a href="#" className="text-reset">Database backup and maintenance</a>
                            </td>
                            <td className="text-nowrap text-secondary">
                              {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M11 15h1" />
                                <path d="M12 15v3" />
                              </svg>
                              January 01, 2024
                            </td>
                            <td className="text-nowrap">
                              <a href="#" className="text-secondary">
                                {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon icon-1"
                                >
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                                0/5
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1 pe-0">
                              <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                            </td>
                            <td className="w-100">
                              <a href="#" className="text-reset">Identify the implementation team.</a>
                            </td>
                            <td className="text-nowrap text-secondary">
                              {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M11 15h1" />
                                <path d="M12 15v3" />
                              </svg>
                              September 01, 2024
                            </td>
                            <td className="text-nowrap">
                              <a href="#" className="text-secondary">
                                {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon icon-1"
                                >
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                                6/10
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1 pe-0">
                              <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                            </td>
                            <td className="w-100">
                              <a href="#" className="text-reset">Define users and workflow</a>
                            </td>
                            <td className="text-nowrap text-secondary">
                              {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M11 15h1" />
                                <path d="M12 15v3" />
                              </svg>
                              January 01, 2024
                            </td>
                            <td className="text-nowrap">
                              <a href="#" className="text-secondary">
                                {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon icon-1"
                                >
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                                0/5
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1 pe-0">
                              <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                            </td>
                            <td className="w-100">
                              <a href="#" className="text-reset">Check Pull Requests</a>
                            </td>
                            <td className="text-nowrap text-secondary">
                              {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M11 15h1" />
                                <path d="M12 15v3" />
                              </svg>
                              July 17, 2024
                            </td>
                            <td className="text-nowrap">
                              <a href="#" className="text-secondary">
                                {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon icon-1"
                                >
                                  <path d="M5 12l5 5l10 -10" />
                                </svg>
                                6/10
                              </a>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Traffic summary</h3>
                    <div id="chart-mentions" className="position-relative chart-lg"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Tasks</h3>
                  </div>
                  <style>{`
                    .table-tasks tbody tr + tr td {
                      border-top: 1px solid var(--tblr-border-color);
                    }
                  `}</style>
                  <div className="table-responsive" style={{maxHeight: "320px", overflowY: "auto"}}>
                    <table className="table table-selectable card-table table-vcenter table-tasks">
                      <tbody>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                        </td>
                        <td className="w-100">
                          <a href="#" className="text-reset">Extend the data model.</a>
                        </td>
                        <td className="text-nowrap text-secondary">
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-1"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          December 08, 2024
                        </td>
                        <td className="text-nowrap">
                          <a href="#" className="text-secondary">
                            {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-1"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            2/7
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                        </td>
                        <td className="w-100">
                          <a href="#" className="text-reset">Verify the event flow.</a>
                        </td>
                        <td className="text-nowrap text-secondary">
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-1"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          January 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <a href="#" className="text-secondary">
                            {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-1"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            0/5
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                        </td>
                        <td className="w-100">
                          <a href="#" className="text-reset">Database backup and maintenance</a>
                        </td>
                        <td className="text-nowrap text-secondary">
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-1"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          January 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <a href="#" className="text-secondary">
                            {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-1"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            0/5
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                        </td>
                        <td className="w-100">
                          <a href="#" className="text-reset">Identify the implementation team.</a>
                        </td>
                        <td className="text-nowrap text-secondary">
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-1"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          September 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <a href="#" className="text-secondary">
                            {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-1"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            6/10
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                        </td>
                        <td className="w-100">
                          <a href="#" className="text-reset">Define users and workflow</a>
                        </td>
                        <td className="text-nowrap text-secondary">
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-1"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          January 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <a href="#" className="text-secondary">
                            {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-1"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            0/5
                          </a>
                        </td>
                      
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                        </td>
                        <td className="w-100">
                          <a href="#" className="text-reset">Check Pull Requests</a>
                        </td>
                        <td className="text-nowrap text-secondary">
                          {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-1"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          July 17, 2024
                        </td>
                        <td className="text-nowrap">
                          <a href="#" className="text-secondary">
                            {/* Download SVG icon from http://tabler.io/icons/icon/check */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-1"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            6/10
                          </a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Invoices</h3>
                  </div>
                  <div className="card-body border-bottom py-3">
                    <div className="d-flex">
                      <div className="text-secondary">
                        Show
                        <div className="mx-2 d-inline-block">
                          <input type="text" className="form-control form-control-sm" value="8" size="3" aria-label="Invoices count" />
                        </div>
                        entries
                      </div>
                      <div className="ms-auto text-secondary">
                        Search:
                        <div className="ms-2 d-inline-block">
                          <input type="text" className="form-control form-control-sm" aria-label="Search invoice" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-selectable card-table table-vcenter text-nowrap datatable">
                      <thead>
                        <tr>
                          <th className="w-1"><input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices" /></th>
                          <th className="w-1">
                            No.
                            {/* Download SVG icon from http://tabler.io/icons/icon/chevron-up */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-sm icon-thick icon-2"
                            >
                              <path d="M6 15l6 -6l6 6" />
                            </svg>
                          </th>
                          <th>Invoice Subject</th>
                          <th>Client</th>
                          <th>VAT No.</th>
                          <th>Created</th>
                          <th>Status</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001401</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">Design Works</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-us me-2"></span>
                            Carlson Limited
                          </td>
                          <td>87956621</td>
                          <td>15 Dec 2017</td>
                          <td><span className="badge bg-success me-1"></span> Paid</td>
                          <td>$887</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001402</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">UX Wireframes</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-gb me-2"></span>
                            Adobe
                          </td>
                          <td>87956421</td>
                          <td>12 Apr 2017</td>
                          <td><span className="badge bg-warning me-1"></span> Pending</td>
                          <td>$1200</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001403</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">New Dashboard</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-de me-2"></span>
                            Bluewolf
                          </td>
                          <td>87952621</td>
                          <td>23 Oct 2017</td>
                          <td><span className="badge bg-warning me-1"></span> Pending</td>
                          <td>$534</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001404</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">Landing Page</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-br me-2"></span>
                            Salesforce
                          </td>
                          <td>87953421</td>
                          <td>2 Sep 2017</td>
                          <td><span className="badge bg-secondary me-1"></span> Due in 2 Weeks</td>
                          <td>$1500</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001405</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">Marketing Templates</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-pl me-2"></span>
                            Printic
                          </td>
                          <td>87956621</td>
                          <td>29 Jan 2018</td>
                          <td><span className="badge bg-danger me-1"></span> Paid Today</td>
                          <td>$648</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001406</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">Sales Presentation</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-br me-2"></span>
                            Tabdaq
                          </td>
                          <td>87956621</td>
                          <td>4 Feb 2018</td>
                          <td><span className="badge bg-secondary me-1"></span> Due in 3 Weeks</td>
                          <td>$300</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001407</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">Logo & Print</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-us me-2"></span>
                            Apple
                          </td>
                          <td>87956621</td>
                          <td>22 Mar 2018</td>
                          <td><span className="badge bg-success me-1"></span> Paid Today</td>
                          <td>$2500</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" /></td>
                          <td><span className="text-secondary">001408</span></td>
                          <td><a href="invoice.html" className="text-reset" tabIndex="-1">Icons</a></td>
                          <td>
                            <span className="flag flag-xs flag-country-pl me-2"></span>
                            Tookapic
                          </td>
                          <td>87956621</td>
                          <td>13 May 2018</td>
                          <td><span className="badge bg-success me-1"></span> Paid Today</td>
                          <td>$940</td>
                          <td className="text-end">
                            <span className="dropdown">
                              <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">Actions</button>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#"> Action </a>
                                <a className="dropdown-item" href="#"> Another action </a>
                              </div>
                            </span>
                          </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer">
                    <div className="row g-2 justify-content-center justify-content-sm-between">
                      <div className="col-auto d-flex align-items-center">
                        <p className="m-0 text-secondary">Showing <strong>1 to 8</strong> of <strong>16 entries</strong></p>
                      </div>
                      <div className="col-auto">
                        <ul className="pagination m-0 ms-auto">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                              {/* Download SVG icon from http://tabler.io/icons/icon/chevron-left */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M15 6l-6 6l6 6" />
                              </svg>
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">1</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">2</a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">3</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">4</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">5</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              {/* Download SVG icon from http://tabler.io/icons/icon/chevron-right */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-1"
                              >
                                <path d="M9 6l6 6l-6 6" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END PAGE BODY */}
        {/*  BEGIN FOOTER  */}
        <footer className="footer footer-transparent d-print-none">
          <div className="container-xl">
            <div className="row text-center align-items-center flex-row-reverse">
              <div className="col-lg-auto ms-lg-auto">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item"><a href="https://docs.tabler.io" target="_blank" className="link-secondary" rel="noopener">Documentation</a></li>
                  <li className="list-inline-item"><a href="./license.html" className="link-secondary">License</a></li>
                  <li className="list-inline-item">
                    <a href="https://github.com/tabler/tabler" target="_blank" className="link-secondary" rel="noopener">Source code</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://github.com/sponsors/codecalm" target="_blank" className="link-secondary" rel="noopener">
                      {/* Download SVG icon from http://tabler.io/icons/icon/heart */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon text-pink icon-inline icon-4"
                      >
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                      </svg>
                      Sponsor
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    Copyright &copy; 2025
                    <a href="." className="link-secondary">Tabler</a>. All rights reserved.
                  </li>
                  <li className="list-inline-item">
                    <a href="./changelog.html" className="link-secondary" rel="noopener"> v1.4.0 </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        {/*  END FOOTER  */}
      </div>
    </div>
    {/* BEGIN PAGE MODALS */}
    <div className="modal modal-blur fade" id="modal-report" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">New report</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="example-text-input" placeholder="Your report name" />
            </div>
            <label className="form-label">Report type</label>
            <div className="form-selectgroup-boxes row mb-3">
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input type="radio" name="report-type" value="1" className="form-selectgroup-input" defaultChecked />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check"></span>
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">Simple</span>
                      <span className="d-block text-secondary">Provide only basic data needed for the report</span>
                    </span>
                  </span>
                </label>
              </div>
              <div className="col-lg-6">
                <label className="form-selectgroup-item">
                  <input type="radio" name="report-type" value="1" className="form-selectgroup-input" />
                  <span className="form-selectgroup-label d-flex align-items-center p-3">
                    <span className="me-3">
                      <span className="form-selectgroup-check"></span>
                    </span>
                    <span className="form-selectgroup-label-content">
                      <span className="form-selectgroup-title strong mb-1">Advanced</span>
                      <span className="d-block text-secondary">Insert charts and additional advanced analyses to be inserted in the report</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="mb-3">
                  <label className="form-label">Report url</label>
                  <div className="input-group input-group-flat">
                    <span className="input-group-text"> https://tabler.io/reports/ </span>
                    <input type="text" className="form-control ps-0" defaultValue="report-01" autoComplete="off" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label">Visibility</label>
                  <select className="form-select" defaultValue="1">
                    <option value="1">Private</option>
                    <option value="2">Public</option>
                    <option value="3">Hidden</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Client name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label">Reporting period</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <div>
                  <label className="form-label">Additional information</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="#" className="btn btn-link link-secondary btn-3" data-bs-dismiss="modal"> Cancel </a>
            <a href="#" className="btn btn-primary btn-5 ms-auto" data-bs-dismiss="modal">
              {/* Download SVG icon from http://tabler.io/icons/icon/plus */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-2"
              >
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              Create new report
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="modal modal-blur fade" id="modal-add-event" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Add Event</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-7">
                <div className="mb-3">
                  <label className="form-label">Title *</label>
                  <input type="text" className="form-control" placeholder="Customer Feedback Review" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date &amp; Time *</label>
                  <div className="input-group mb-2">
                    <input type="text" className="form-control" placeholder="27/01/2026, 09:00 AM" />
                    <span className="input-group-text">
                      {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                      </svg>
                    </span>
                  </div>
                  <div className="d-flex align-items-center text-secondary mb-2">→</div>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="27/01/2026, 05:00 PM" />
                    <span className="input-group-text">
                      {/* Download SVG icon from http://tabler.io/icons/icon/calendar */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                      </svg>
                    </span>
                  </div>
                  <label className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" />
                    <span className="form-check-label">All-day</span>
                  </label>
                </div>
                <div>
                  <label className="form-label">Description *</label>
                  <textarea className="form-control" rows={7} placeholder="Add details, links, or notes"></textarea>
                </div>
              </div>
              <div className="col-md-5 d-flex flex-column gap-3">
                <div className="border rounded-3 p-3">
                  <div className="text-uppercase text-secondary fw-semibold mb-2">Event Type</div>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-sm btn-primary">Meeting</button>
                    <button type="button" className="btn btn-sm btn-outline-primary">Exam</button>
                    <button type="button" className="btn btn-sm btn-outline-primary">Other</button>
                  </div>
                </div>
                <div className="border rounded-3 p-3">
                  <div className="text-uppercase text-secondary fw-semibold mb-2">Valid For</div>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-sm btn-outline-primary">Student</button>
                    <button type="button" className="btn btn-sm btn-outline-primary">All Class</button>
                    <button type="button" className="btn btn-sm btn-outline-primary">Staff</button>
                    <button type="button" className="btn btn-sm btn-primary">Whole School</button>
                  </div>
                </div>
                <div className="border rounded-3 p-3">
                  <div className="text-uppercase text-secondary fw-semibold mb-2">Reminder</div>
                  <select className="form-select">
                    <option>10 minutes before</option>
                    <option>30 minutes before</option>
                    <option>1 hour before</option>
                    <option>1 day before</option>
                  </select>
                </div>
                <div className="border rounded-3 p-3">
                  <div className="text-uppercase text-secondary fw-semibold mb-2">Related Image</div>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Upload Image (If Any)" />
                    <button className="btn btn-outline-primary" type="button">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link text-secondary me-auto" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
    {/* END PAGE MODALS */}
    <div className="settings">
      <a
        href="#"
        className="btn btn-floating btn-icon btn-primary"
        aria-controls="offcanvasSettings"
        aria-label="Theme Settings"
        onClick={(event) => {
          event.preventDefault();
          setIsSettingsOpen(true);
        }}
      >
        {/* Download SVG icon from http://tabler.io/icons/icon/brush */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-1"
        >
          <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
          <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
          <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
          <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
        </svg>
      </a>
      <ThemeSettingsOffcanvas isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {isSettingsOpen ? (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setIsSettingsOpen(false)}
        />
      ) : null}
    </div>
</div>
  );
};

export default IndexPage;
