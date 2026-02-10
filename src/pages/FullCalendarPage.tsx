// @ts-nocheck
import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import ThemeSettingsOffcanvas from "../components/common/ThemeSettingsOffcanvas";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

const FullCalendarPage = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

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

  useEffect(() => {
    const calendarEl = document.getElementById("calendar-default");
    if (!calendarEl) return;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      events: [
        {
          title: "Offsite Retreat",
          start: new Date(currentYear, currentMonth, 2, 9, 0),
          end: new Date(currentYear, currentMonth, 4, 17, 0),
          color: "var(--tblr-red)",
          backgroundColor: "var(--tblr-red-lt)",
          borderColor: "var(--tblr-red-200)",
        },
        {
          title: "Monthly Planning",
          start: new Date(currentYear, currentMonth, 1, 10, 0),
          end: new Date(currentYear, currentMonth, 1, 11, 30),
        },
        {
          title: "Marketing Strategy Call",
          start: new Date(currentYear, currentMonth, 4, 14, 0),
          end: new Date(currentYear, currentMonth, 4, 15, 0),
        },
        {
          title: "Design Sprint",
          start: new Date(currentYear, currentMonth, 7, 9, 0),
          end: new Date(currentYear, currentMonth, 7, 12, 0),
        },
        {
          title: "Dev Team Check-in",
          start: new Date(currentYear, currentMonth, 10, 11, 0),
          end: new Date(currentYear, currentMonth, 10, 11, 30),
        },
        {
          title: "Customer Feedback Review",
          start: new Date(currentYear, currentMonth, 13, 13, 0),
          end: new Date(currentYear, currentMonth, 13, 14, 0),
        },
        {
          title: "Mid-Month Review",
          start: new Date(currentYear, currentMonth, 15, 10, 30),
          end: new Date(currentYear, currentMonth, 15, 11, 30),
        },
        {
          title: "Webinar: Product Update",
          start: new Date(currentYear, currentMonth, 18, 16, 0),
          end: new Date(currentYear, currentMonth, 18, 17, 0),
        },
        {
          title: "Sales Training",
          start: new Date(currentYear, currentMonth, 21, 9, 30),
          end: new Date(currentYear, currentMonth, 21, 11, 0),
        },
        {
          title: "Company All-Hands",
          start: new Date(currentYear, currentMonth, 25, 15, 0),
          end: new Date(currentYear, currentMonth, 25, 16, 0),
        },
        {
          title: "End-of-Month Wrap-up",
          start: new Date(currentYear, currentMonth, 31, 10, 0),
          end: new Date(currentYear, currentMonth, 31, 11, 0),
        },
      ],
    });
    calendar.render();
    return () => calendar.destroy();
  }, []);

  useEffect(() => {
    const themeConfig = {
      theme: "light",
      "theme-base": "gray",
      "theme-font": "sans-serif",
      "theme-primary": "blue",
      "theme-radius": "1",
    };
    const url = new URL(window.location);
    const form = document.getElementById("offcanvasSettings");
    const resetButton = document.getElementById("reset-changes");
    if (!form || !resetButton) return;
    const checkItems = function () {
      for (const key in themeConfig) {
        const value = window.localStorage["tabler-" + key] || themeConfig[key];
        if (!!value) {
          document.documentElement.setAttribute("data-bs-" + key, value);
          const radios = form.querySelectorAll('[name="' + key + '"]');
          if (!!radios) {
            radios.forEach((radio) => {
              if (radio instanceof HTMLInputElement) {
                radio.checked = radio.value === value;
              }
            });
          }
        }
      }
    };
    form.addEventListener("change", function (event) {
      const target = event.target,
        name = target.name,
        value = target.value;
      for (const key in themeConfig) {
        if (name === key) {
          document.documentElement.setAttribute("data-bs-" + key, value);
          window.localStorage.setItem("tabler-" + key, value);
          url.searchParams.set(key, value);
        }
      }
      window.history.pushState({}, "", url);
    });
    resetButton.addEventListener("click", function () {
      for (const key in themeConfig) {
        const value = themeConfig[key];
        document.documentElement.removeAttribute("data-bs-" + key);
        window.localStorage.removeItem("tabler-" + key);
        url.searchParams.delete(key);
      }
      checkItems();
      window.history.pushState({}, "", url);
    });
    checkItems();
  }, []);

  return (
<div><div className="page">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {/* BEGIN NAVBAR  */}
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          {/* SIDEBAR TOGGLER */}
          <button
            className="btn btn-icon btn-ghost me-2"
            type="button"
            aria-controls="sidebar-menu"
            aria-expanded={isSidebarOpen}
            aria-label="Toggle sidebar"
            onClick={() => setIsSidebarOpen((open) => !open)}
          >
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
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
          {/* BEGIN NAVBAR TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbar-menu"
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsNavbarOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* END NAVBAR TOGGLER */}
          {/* BEGIN NAVBAR LOGO */}
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href="." aria-label="Tabler"
              ><svg xmlns="http://www.w3.org/2000/svg" width="110" height="32" viewBox="0 0 232 68" className="navbar-brand-image">
                <path
                  d="M64.6 16.2C63 9.9 58.1 5 51.8 3.4 40 1.5 28 1.5 16.2 3.4 9.9 5 5 9.9 3.4 16.2 1.5 28 1.5 40 3.4 51.8 5 58.1 9.9 63 16.2 64.6c11.8 1.9 23.8 1.9 35.6 0C58.1 63 63 58.1 64.6 51.8c1.9-11.8 1.9-23.8 0-35.6zM33.3 36.3c-2.8 4.4-6.6 8.2-11.1 11-1.5.9-3.3.9-4.8.1s-2.4-2.3-2.5-4c0-1.7.9-3.3 2.4-4.1 2.3-1.4 4.4-3.2 6.1-5.3-1.8-2.1-3.8-3.8-6.1-5.3-2.3-1.3-3-4.2-1.7-6.4s4.3-2.9 6.5-1.6c4.5 2.8 8.2 6.5 11.1 10.9 1 1.4 1 3.3.1 4.7zM49.2 46H37.8c-2.1 0-3.8-1-3.8-3s1.7-3 3.8-3h11.4c2.1 0 3.8 1 3.8 3s-1.7 3-3.8 3z"
                  fill="#066fd1"
                  style={{fill: 'var(--tblr-primary, #066fd1)'}}
                />
                <path
                  d="M105.8 46.1c.4 0 .9.2 1.2.6s.6 1 .6 1.7c0 .9-.5 1.6-1.4 2.2s-2 .9-3.2.9c-2 0-3.7-.4-5-1.3s-2-2.6-2-5.4V31.6h-2.2c-.8 0-1.4-.3-1.9-.8s-.9-1.1-.9-1.9c0-.7.3-1.4.8-1.8s1.2-.7 1.9-.7h2.2v-3.1c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v3.1h3.4c.8 0 1.4.3 1.9.8s.8 1.2.8 1.9-.3 1.4-.8 1.8-1.2.7-1.9.7h-3.4v13c0 .7.2 1.2.5 1.5s.8.5 1.4.5c.3 0 .6-.1 1.1-.2.5-.2.8-.3 1.2-.3zm28-20.7c.8 0 1.5.3 2.1.8.5.5.8 1.2.8 2.1v20.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2-.8-.8-1.2-.8-2.1c-.8.9-1.9 1.7-3.2 2.4-1.3.7-2.8 1-4.3 1-2.2 0-4.2-.6-6-1.7-1.8-1.1-3.2-2.7-4.2-4.7s-1.6-4.3-1.6-6.9c0-2.6.5-4.9 1.5-6.9s2.4-3.6 4.2-4.8c1.8-1.1 3.7-1.7 5.9-1.7 1.5 0 3 .3 4.3.8 1.3.6 2.5 1.3 3.4 2.1 0-.8.3-1.5.8-2.1.5-.5 1.2-.7 2-.7zm-9.7 21.3c2.1 0 3.8-.8 5.1-2.3s2-3.4 2-5.7-.7-4.2-2-5.8c-1.3-1.5-3-2.3-5.1-2.3-2 0-3.7.8-5 2.3-1.3 1.5-2 3.5-2 5.8s.6 4.2 1.9 5.7 3 2.3 5.1 2.3zm32.1-21.3c2.2 0 4.2.6 6 1.7 1.8 1.1 3.2 2.7 4.2 4.7s1.6 4.3 1.6 6.9-.5 4.9-1.5 6.9-2.4 3.6-4.2 4.8c-1.8 1.1-3.7 1.7-5.9 1.7-1.5 0-3-.3-4.3-.9s-2.5-1.4-3.4-2.3v.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.5-.8-1.2-.8-2.1V18.9c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v10c.8-1 1.8-1.8 3.2-2.5 1.3-.7 2.8-1 4.3-1zm-.7 21.3c2 0 3.7-.8 5-2.3s2-3.5 2-5.8-.6-4.2-1.9-5.7-3-2.3-5.1-2.3-3.8.8-5.1 2.3-2 3.4-2 5.7.7 4.2 2 5.8c1.3 1.6 3 2.3 5.1 2.3zm23.6 1.9c0 .8-.3 1.5-.8 2.1s-1.3.8-2.1.8-1.5-.3-2-.8-.8-1.3-.8-2.1V18.9c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v29.7zm29.3-10.5c0 .8-.3 1.4-.9 1.9-.6.5-1.2.7-2 .7h-15.8c.4 1.9 1.3 3.4 2.6 4.4 1.4 1.1 2.9 1.6 4.7 1.6 1.3 0 2.3-.1 3.1-.4.7-.2 1.3-.5 1.8-.8.4-.3.7-.5.9-.6.6-.3 1.1-.4 1.6-.4.7 0 1.2.2 1.7.7s.7 1 .7 1.7c0 .9-.4 1.6-1.3 2.4-.9.7-2.1 1.4-3.6 1.9s-3 .8-4.6.8c-2.7 0-5-.6-7-1.7s-3.5-2.7-4.6-4.6-1.6-4.2-1.6-6.6c0-2.8.6-5.2 1.7-7.2s2.7-3.7 4.6-4.8 3.9-1.7 6-1.7 4.1.6 6 1.7 3.4 2.7 4.5 4.7c.9 1.9 1.5 4.1 1.5 6.3zm-12.2-7.5c-3.7 0-5.9 1.7-6.6 5.2h12.6v-.3c-.1-1.3-.8-2.5-2-3.5s-2.5-1.4-4-1.4zm30.3-5.2c1 0 1.8.3 2.4.8.7.5 1 1.2 1 1.9 0 1-.3 1.7-.8 2.2-.5.5-1.1.8-1.8.7-.5 0-1-.1-1.6-.3-.2-.1-.4-.1-.6-.2-.4-.1-.7-.1-1.1-.1-.8 0-1.6.3-2.4.8s-1.4 1.3-1.9 2.3-.7 2.3-.7 3.7v11.4c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2.1-.8c-.5-.6-.8-1.3-.8-2.1V28.8c0-.8.3-1.5.8-2.1.5-.6 1.2-.8 2.1-.8s1.5.3 2.1.8c.5.6.8 1.3.8 2.1v.6c.7-1.3 1.8-2.3 3.2-3 1.3-.7 2.8-1 4.3-1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="#4a4a4a"
                /></svg
            ></a>
          </div>
          {/* END NAVBAR LOGO */}
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item d-none d-md-flex me-3">
              <div className="btn-list">
                <a href="https://github.com/tabler/tabler" className="btn btn-5" target="_blank" rel="noreferrer">
                  {/* Download SVG icon from http://tabler.io/icons/icon/brand-github */}
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
                    <path
                      d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                    />
                  </svg>
                  Source code
                </a>
                <a href="https://github.com/sponsors/codecalm" className="btn btn-6" target="_blank" rel="noreferrer">
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
                    className="icon text-pink icon-2"
                  >
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                  Sponsor
                </a>
              </div>
            </div>
            <div className="d-none d-md-flex">
              <div className="nav-item">
                <a
                  href="#"
                  className="nav-link px-0 hide-theme-dark"
                  title="Enable dark mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  onClick={(event) => {
                    event.preventDefault();
                    toggleTheme("dark");
                  }}
                >
                  {/* Download SVG icon from http://tabler.io/icons/icon/moon */}
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
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="nav-link px-0 hide-theme-light"
                  title="Enable light mode"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  onClick={(event) => {
                    event.preventDefault();
                    toggleTheme("light");
                  }}
                >
                  {/* Download SVG icon from http://tabler.io/icons/icon/sun */}
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
                    <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                  </svg>
                </a>
              </div>
              <div className="nav-item dropdown d-none d-md-flex">
                <a
                  href="#"
                  className="nav-link px-0"
                  data-bs-toggle="dropdown"
                  tabIndex="-1"
                  aria-label="Show notifications"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  {/* Download SVG icon from http://tabler.io/icons/icon/bell */}
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
                    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                  </svg>
                  <span className="badge bg-red"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                  <div className="card">
                    <div className="card-header d-flex">
                      <h3 className="card-title">Notifications</h3>
                      <div className="btn-close ms-auto" data-bs-dismiss="dropdown"></div>
                    </div>
                    <div className="list-group list-group-flush list-group-hoverable">
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto"><span className="status-dot status-dot-animated bg-red d-block"></span></div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">Example 1</a>
                            <div className="d-block text-secondary text-truncate mt-n1">Change deprecated html tags to text decoration classes (#29604)</div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                className="icon text-muted icon-2"
                              >
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto"><span className="status-dot d-block"></span></div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">Example 2</a>
                            <div className="d-block text-secondary text-truncate mt-n1">justify-content:between ⇒ justify-content:space-between (#29734)</div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions show">
                              {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                className="icon text-yellow icon-2"
                              >
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto"><span className="status-dot d-block"></span></div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">Example 3</a>
                            <div className="d-block text-secondary text-truncate mt-n1">Update change-version.js (#29736)</div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                className="icon text-muted icon-2"
                              >
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto"><span className="status-dot status-dot-animated bg-green d-block"></span></div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">Example 4</a>
                            <div className="d-block text-secondary text-truncate mt-n1">Regenerate package-lock.json (#29730)</div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                                className="icon text-muted icon-2"
                              >
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <a href="#" className="btn btn-2 w-100"> Archive all </a>
                        </div>
                        <div className="col">
                          <a href="#" className="btn btn-2 w-100"> Mark all as read </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nav-item dropdown d-none d-md-flex me-3">
                <a
                  href="#"
                  className="nav-link px-0"
                  data-bs-toggle="dropdown"
                  tabIndex="-1"
                  aria-label="Show app menu"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  {/* Download SVG icon from http://tabler.io/icons/icon/apps */}
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
                    <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    <path d="M14 7l6 0" />
                    <path d="M17 4l0 6" />
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">My Apps</div>
                      <div className="card-actions btn-actions">
                        <a href="#" className="btn-action">
                          {/* Download SVG icon from http://tabler.io/icons/icon/settings */}
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
                            <path
                              d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                            />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="card-body scroll-y p-2" style={{maxHeight: '50vh'}}>
                      <div className="row g-0">
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/amazon.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Amazon</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/android.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Android</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/app-store.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Apple App Store</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/apple-podcast.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Apple Podcast</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/apple.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Apple</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/behance.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Behance</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/discord.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Discord</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/dribbble.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Dribbble</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/dropbox.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Dropbox</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/ever-green.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Ever Green</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/facebook.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Facebook</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/figma.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Figma</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/github.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">GitHub</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/gitlab.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">GitLab</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-ads.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Ads</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-adsense.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google AdSense</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-analytics.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Analytics</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-cloud.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Cloud</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-drive.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Drive</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-fit.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Fit</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-home.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Home</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-maps.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Maps</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-meet.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Meet</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-photos.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Photos</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-play.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Play</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-shopping.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Shopping</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google-teams.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google Teams</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/google.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Google</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/instagram.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Instagram</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/klarna.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Klarna</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/linkedin.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">LinkedIn</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/mailchimp.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Mailchimp</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/medium.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Medium</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/messenger.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Messenger</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/meta.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Meta</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/monday.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Monday</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/netflix.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Netflix</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/notion.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Notion</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/office-365.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Office 365</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/opera.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Opera</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/paypal.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">PayPal</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/petreon.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Patreon</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/pinterest.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Pinterest</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/play-store.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Play Store</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/quora.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Quora</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/reddit.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Reddit</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/shopify.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Shopify</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/skype.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Skype</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/slack.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Slack</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/snapchat.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Snapchat</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/soundcloud.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">SoundCloud</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/spotify.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Spotify</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/stripe.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Stripe</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/telegram.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Telegram</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/tiktok.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">TikTok</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/tinder.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Tinder</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/trello.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Trello</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/truth.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Truth</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/tumblr.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Tumblr</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/twitch.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Twitch</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/twitter.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Twitter</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/vimeo.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Vimeo</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/vk.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">VK</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/watppad.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Wattpad</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/webflow.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Webflow</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/whatsapp.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">WhatsApp</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/wordpress.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">WordPress</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/xing.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Xing</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/yelp.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Yelp</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/youtube.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">YouTube</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/zapier.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Zapier</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/zendesk.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Zendesk</span>
                          </a>
                        </div>
                        <div className="col-4">
                          <a href="#" className="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                            <img src="./static/brands/zoom.svg" className="w-6 h-6 mx-auto mb-2" width="24" height="24" alt="" />
                            <span className="h5">Zoom</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu">
                <span className="avatar avatar-sm" style={{backgroundImage: 'url(./static/avatars/000m.jpg)'}}> </span>
                <div className="d-none d-xl-block ps-2">
                  <div>Paweł Kuna</div>
                  <div className="mt-1 small text-secondary">UI Designer</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="#" className="dropdown-item">Status</a>
                <a href="./profile.html" className="dropdown-item">Profile</a>
                <a href="#" className="dropdown-item">Feedback</a>
                <div className="dropdown-divider"></div>
                <a href="./settings.html" className="dropdown-item">Settings</a>
                <a href="./sign-in.html" className="dropdown-item">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="navbar-expand-md">
        <div className={`collapse navbar-collapse${isNavbarOpen ? " show" : ""}`} id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <div className="row flex-column flex-md-row flex-fill align-items-center">
                <div className="col">
                  {/* BEGIN NAVBAR MENU */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="./">
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/home */}
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
                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg
                        ></span>
                        <span className="nav-link-title"> Home </span>
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-base"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/package */}
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
                            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                            <path d="M12 12l8 -4.5" />
                            <path d="M12 12l0 9" />
                            <path d="M12 12l-8 -4.5" />
                            <path d="M16 5.25l-8 4.5" /></svg
                        ></span>
                        <span className="nav-link-title"> Interface </span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                          <div className="dropdown-menu-column">
                            <a className="dropdown-item" href="./accordion.html">
                              Accordion
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <a className="dropdown-item" href="./alerts.html"> Alerts </a>
                            <div className="dropend">
                              <a
                                className="dropdown-item dropdown-toggle"
                                href="#sidebar-authentication"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                role="button"
                                aria-expanded="false"
                              >
                                Authentication
                              </a>
                              <div className="dropdown-menu">
                                <a href="./sign-in.html" className="dropdown-item"> Sign in </a>
                                <a href="./sign-in-link.html" className="dropdown-item"> Sign in link </a>
                                <a href="./sign-in-illustration.html" className="dropdown-item"> Sign in with illustration </a>
                                <a href="./sign-in-cover.html" className="dropdown-item"> Sign in with cover </a>
                                <a href="./sign-up.html" className="dropdown-item"> Sign up </a>
                                <a href="./forgot-password.html" className="dropdown-item"> Forgot password </a>
                                <a href="./terms-of-service.html" className="dropdown-item"> Terms of service </a>
                                <a href="./auth-lock.html" className="dropdown-item"> Lock screen </a>
                                <a href="./2-step-verification.html" className="dropdown-item"> 2 step verification </a>
                                <a href="./2-step-verification-code.html" className="dropdown-item"> 2 step verification code </a>
                              </div>
                            </div>
                            <a className="dropdown-item" href="./avatars.html">
                              Avatars
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <a className="dropdown-item" href="./badges.html"> Badges </a>
                            <a className="dropdown-item" href="./blank.html"> Blank page </a>
                            <a className="dropdown-item" href="./buttons.html"> Buttons </a>
                            <div className="dropend">
                              <a
                                className="dropdown-item dropdown-toggle"
                                href="#sidebar-cards"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                role="button"
                                aria-expanded="false"
                              >
                                Cards
                              </a>
                              <div className="dropdown-menu">
                                <a href="./cards.html" className="dropdown-item"> Sample cards </a>
                                <a href="./card-actions.html" className="dropdown-item">
                                  Card actions
                                  <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                                </a>
                                <a href="./cards-masonry.html" className="dropdown-item"> Cards Masonry </a>
                              </div>
                            </div>
                            <a className="dropdown-item" href="./carousel.html"> Carousel </a>
                            <a className="dropdown-item" href="./colors.html"> Colors </a>
                            <a className="dropdown-item" href="./datagrid.html"> Data grid </a>
                            <a className="dropdown-item" href="./dropdowns.html"> Dropdowns </a>
                            <div className="dropend">
                              <a
                                className="dropdown-item dropdown-toggle"
                                href="#sidebar-error"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                role="button"
                                aria-expanded="false"
                              >
                                Error pages
                              </a>
                              <div className="dropdown-menu">
                                <a href="./error-404.html" className="dropdown-item"> 404 page </a>
                                <a href="./error-500.html" className="dropdown-item"> 500 page </a>
                                <a href="./error-maintenance.html" className="dropdown-item"> Maintenance page </a>
                              </div>
                            </div>
                            <a className="dropdown-item" href="./lists.html"> Lists </a>
                            <a className="dropdown-item" href="./modals.html"> Modals </a>
                          </div>
                          <div className="dropdown-menu-column">
                            <a className="dropdown-item" href="./markdown.html"> Markdown </a>
                            <a className="dropdown-item" href="./navigation.html"> Navigation </a>
                            <a className="dropdown-item" href="./offcanvas.html"> Offcanvas </a>
                            <a className="dropdown-item" href="./pagination.html"> Pagination </a>
                            <a className="dropdown-item" href="./placeholder.html"> Placeholder </a>
                            <a className="dropdown-item" href="./segmented-control.html">
                              Segmented control
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <a className="dropdown-item" href="./scroll-spy.html">
                              Scroll spy
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <a className="dropdown-item" href="./social-icons.html"> Social icons </a>
                            <a className="dropdown-item" href="./stars-rating.html"> Stars rating </a>
                            <a className="dropdown-item" href="./steps.html"> Steps </a>
                            <a className="dropdown-item" href="./tables.html"> Tables </a>
                            <a className="dropdown-item" href="./tabs.html"> Tabs </a>
                            <a className="dropdown-item" href="./tags.html"> Tags </a>
                            <a className="dropdown-item" href="./toasts.html"> Toasts </a>
                            <a className="dropdown-item" href="./typography.html"> Typography </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-form"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/checkbox */}
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
                            <path d="M9 11l3 3l8 -8" />
                            <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg
                        ></span>
                        <span className="nav-link-title"> Forms </span>
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="./form-elements.html"> Form elements </a>
                        <a className="dropdown-item" href="./form-layout.html">
                          Form layouts
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-extra"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/star */}
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
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg
                        ></span>
                        <span className="nav-link-title"> Extra </span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                          <div className="dropdown-menu-column">
                            <a className="dropdown-item" href="./activity.html"> Activity </a>
                            <a className="dropdown-item" href="./chat.html"> Chat </a>
                            <a className="dropdown-item" href="./cookie-banner.html"> Cookie banner </a>
                            <a className="dropdown-item" href="./empty.html"> Empty page </a>
                            <a className="dropdown-item" href="./faq.html"> FAQ </a>
                            <a className="dropdown-item" href="./gallery.html"> Gallery </a>
                            <a className="dropdown-item" href="./invoice.html"> Invoice </a>
                            <a className="dropdown-item" href="./job-listing.html"> Job listing </a>
                            <a className="dropdown-item" href="./license.html"> License </a>
                            <a className="dropdown-item" href="./logs.html"> Logs </a>
                            <a className="dropdown-item" href="./marketing/index.html"> Marketing </a>
                            <a className="dropdown-item" href="./music.html"> Music </a>
                            <a className="dropdown-item" href="./page-loader.html"> Page loader </a>
                          </div>
                          <div className="dropdown-menu-column">
                            <a className="dropdown-item" href="./photogrid.html"> Photogrid </a>
                            <a className="dropdown-item" href="./pricing.html"> Pricing cards </a>
                            <a className="dropdown-item" href="./pricing-table.html"> Pricing table </a>
                            <a className="dropdown-item" href="./search-results.html"> Search results </a>
                            <a className="dropdown-item" href="./settings.html"> Settings </a>
                            <a className="dropdown-item" href="./signatures.html">
                              Signatures
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <a className="dropdown-item" href="./tasks.html"> Tasks </a>
                            <a className="dropdown-item" href="./text-features.html">
                              Text features
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <a className="dropdown-item" href="./trial-ended.html"> Trial ended </a>
                            <a className="dropdown-item" href="./uptime.html"> Uptime monitor </a>
                            <a className="dropdown-item" href="./users.html"> Users </a>
                            <a className="dropdown-item" href="./widgets.html"> Widgets </a>
                            <a className="dropdown-item" href="./wizard.html"> Wizard </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-layout"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/layout-2 */}
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
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                            <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg
                        ></span>
                        <span className="nav-link-title"> Layout </span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="dropdown-menu-columns">
                          <div className="dropdown-menu-column">
                            <a className="dropdown-item" href="./layout-boxed.html"> Boxed </a>
                            <a className="dropdown-item" href="./layout-combo.html"> Combined </a>
                            <a className="dropdown-item" href="./layout-condensed.html"> Condensed </a>
                            <a className="dropdown-item" href="./layout-fluid.html"> Fluid </a>
                            <a className="dropdown-item" href="./layout-fluid-vertical.html"> Fluid vertical </a>
                            <a className="dropdown-item" href="./layout-horizontal.html"> Horizontal </a>
                            <a className="dropdown-item" href="./layout-navbar-dark.html"> Navbar dark </a>
                          </div>
                          <div className="dropdown-menu-column">
                            <a className="dropdown-item" href="./layout-navbar-overlap.html"> Navbar overlap </a>
                            <a className="dropdown-item" href="./layout-navbar-sticky.html"> Navbar sticky </a>
                            <a className="dropdown-item" href="./layout-vertical-right.html"> Right vertical </a>
                            <a className="dropdown-item" href="./layout-rtl.html"> RTL mode </a>
                            <a className="dropdown-item" href="./layout-vertical.html"> Vertical </a>
                            <a className="dropdown-item" href="./layout-vertical-transparent.html"> Vertical transparent </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item active dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-plugins"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/puzzle */}
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
                            <path
                              d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"
                            /></svg
                        ></span>
                        <span className="nav-link-title"> Plugins </span>
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="./charts.html"> Charts </a>
                        <a className="dropdown-item" href="./colorpicker.html"> Color picker </a>
                        <a className="dropdown-item" href="./datatables.html"> Datatables </a>
                        <a className="dropdown-item" href="./dropzone.html"> Dropzone </a>
                        <a className="dropdown-item active" href="/fullcalendar"> Fullcalendar </a>
                        <a className="dropdown-item" href="./inline-player.html"> Inline player </a>
                        <a className="dropdown-item" href="./lightbox.html"> Lightbox </a>
                        <a className="dropdown-item" href="./maps.html"> Map </a>
                        <a className="dropdown-item" href="./map-fullsize.html"> Map fullsize </a>
                        <a className="dropdown-item" href="./maps-vector.html"> Map vector </a>
                        <a className="dropdown-item" href="./turbo-loader.html"> Turbo loader </a>
                        <a className="dropdown-item" href="./wysiwyg.html"> WYSIWYG editor </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-addons"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/gift */}
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
                            <path d="M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z" />
                            <path d="M12 8l0 13" />
                            <path d="M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7" />
                            <path d="M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5" /></svg
                        ></span>
                        <span className="nav-link-title"> Addons </span>
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="./icons.html"> Icons </a>
                        <a className="dropdown-item" href="./emails.html"> Emails </a>
                        <a className="dropdown-item" href="./flags.html"> Flags </a>
                        <a className="dropdown-item" href="./illustrations.html"> Illustrations </a>
                        <a className="dropdown-item" href="./payment-providers.html"> Payment providers </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#navbar-help"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        role="button"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block"
                          >{/* Download SVG icon from http://tabler.io/icons/icon/lifebuoy */}
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
                            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M15 15l3.35 3.35" />
                            <path d="M9 15l-3.35 3.35" />
                            <path d="M5.65 5.65l3.35 3.35" />
                            <path d="M18.35 5.65l-3.35 3.35" /></svg
                        ></span>
                        <span className="nav-link-title"> Help </span>
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="https://tabler.io/docs" target="_blank" rel="noopener"> Documentation </a>
                        <a className="dropdown-item" href="./changelog.html"> Changelog </a>
                        <a className="dropdown-item" href="https://github.com/tabler/tabler" target="_blank" rel="noopener"> Source code </a>
                        <a className="dropdown-item text-pink" href="https://github.com/sponsors/codecalm" target="_blank" rel="noopener">
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
                            className="icon icon-inline me-1 icon-2"
                          >
                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                          </svg>
                          Sponsor project!
                        </a>
                      </div>
                    </li>
                  </ul>
                  {/* END NAVBAR MENU */}
                </div>
                <div className="col col-md-auto">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#"
                        aria-controls="offcanvasSettings"
                        onClick={(event) => {
                          event.preventDefault();
                          setIsSettingsOpen(true);
                        }}
                      >
                        <span className="badge badge-sm bg-red text-red-fg">New</span>
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          {/* Download SVG icon from http://tabler.io/icons/icon/settings */}
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
                            <path
                              d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                            />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                          </svg>
                        </span>
                        <span className="nav-link-title"> Theme Settings </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* END NAVBAR  */}
      <div className="page-wrapper">
        {/* BEGIN PAGE HEADER */}
        <div className="page-header d-print-none" aria-label="Page header">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Fullcalendar</h2>
              </div>
            </div>
          </div>
        </div>
        {/* END PAGE HEADER */}
        {/* BEGIN PAGE BODY */}
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                <div id="calendar-default"></div>
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

export default FullCalendarPage;
