// @ts-nocheck
import { useEffect, useState } from "react";
import {
  IconApps,
  IconBell,
  IconCheckbox,
  IconGift,
  IconHome,
  IconLayoutGrid,
  IconLifebuoy,
  IconPackage,
  IconPuzzle,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";
import { sidebarBrands } from "../interface/common/sidebar";

const menuIcons = {
  home: IconHome,
  layout2: IconLayoutGrid,
  puzzle: IconPuzzle,
  package: IconPackage,
  bell: IconBell,
  checkbox: IconCheckbox,
  gift: IconGift,
  star: IconStar,
  apps: IconApps,
  lifebuoy: IconLifebuoy,
  settings: IconSettings,
};

const sidebarMenuItems = [
  { type: "link", label: "Dashboard", href: "/dashboard", icon: menuIcons.home },
  {
    type: "dropdown",
    id: "student-management",
    label: "Student Management",
    icon: menuIcons.layout2,
    items: [
      { label: "Student Admission", href: "/student-portal/admission" },
      { label: "Student ID", href: "/student-portal/id" },
      { label: "Student List", href: "/student-portal/student-list" },
      { label: "Student Promotion", href: "/student-portal/promotion" },
      { label: "Transfer Certificate", href: "/student-portal/tc-list" },
      { label: "School Leaving Certificate", href: "/student-portal/school-leaving" },
    ],
  },
  {
    type: "dropdown",
    id: "exam-control",
    label: "Exam Control",
    icon: menuIcons.puzzle,
    items: [
      { label: "Exam Schedule", href: "/exam/schedule" },
      { label: "Exam Type", href: "/exam/type" },
      { label: "Admit Card", href: "/exam/admit-card" },
      { label: "Report Card", href: "/exam/report-card" },
      { label: "Grade System", href: "/exam/grade-system" },
      { label: "Exam Attendance", href: "/exam/attendance" },
    ],
  },
  {
    type: "dropdown",
    id: "hr",
    label: "HR",
    icon: menuIcons.package,
    items: [
      { label: "Staff Record", href: "/hr/staff-record" },
      { label: "New Staff", href: "/hr/new-staff" },
      { label: "Staff Category", href: "/hr/staff-category" },
      { label: "Staff Holidays", href: "/hr/staff-holidays" },
      { label: "Designations", href: "/hr/designations" },
      { label: "Payroll", href: "/hr/payroll" },
    ],
  },
  {
    type: "dropdown",
    id: "notifications",
    label: "Notifications",
    icon: menuIcons.bell,
    items: [
      { label: "Email", href: "/notifications/email" },
      { label: "SMS", href: "/notifications/sms" },
      { label: "Whatsapp", href: "/notifications/whatsapp" },
      { label: "Notice board", href: "/notifications/notice-board" },
    ],
  },
  {
    type: "dropdown",
    id: "academics",
    label: "Academics",
    icon: menuIcons.checkbox,
    items: [
      { label: "Syllabus", href: "/academics/syllabus" },
      { label: "Timetable", href: "/academics/time-table" },
      { label: "Leave Attendance", href: "/academics/attendance" },
      { label: "Class Section", href: "/academics/class-section" },
      { label: "Homework", href: "/academics/homework" },
    ],
  },
  {
    type: "dropdown",
    id: "transport",
    label: "Transport",
    icon: menuIcons.gift,
    items: [
      { label: "Transport Details", href: "/transport/transport-details" },
      { label: "Route Details", href: "/transport/route-details" },
      { label: "Driver Details", href: "/transport/driver-details" },
      { label: "Student Details", href: "/transport/student-details" },
      { label: "Transport Fees", href: "/transport/transport-fees" },
    ],
  },
  {
    type: "dropdown",
    id: "fees",
    label: "Fees",
    icon: menuIcons.star,
    items: [
      { label: "Fees Master", href: "/fees/fees-master" },
      { label: "Collect Fees", href: "/fees/collect-fees" },
      { label: "Due List", href: "/fees/due-list" },
      { label: "Fees Invoice", href: "/fees/fees-invoice" },
      { label: "Fees Report", href: "/fees/fees-report" },
      { label: "Fees Discount", href: "/fees/fees-discount" },
    ],
  },
  {
    type: "dropdown",
    id: "hostel",
    label: "Hostel",
    icon: menuIcons.apps,
    items: [
      { label: "Hostel List", href: "/hostel/list" },
      { label: "Room Type", href: "/hostel/room-type" },
      { label: "Hostel Student List", href: "/hostel/student-list" },
    ],
  },
  {
    type: "dropdown",
    id: "enquiry",
    label: "Enquiry",
    icon: menuIcons.lifebuoy,
    items: [
      { label: "Admission Enquiry", href: "/enquiry/admission" },
      { label: "Fees Enquiry", href: "/enquiry/fees" },
    ],
  },
  {
    type: "dropdown",
    id: "sports",
    label: "Sports",
    icon: menuIcons.star,
    items: [
      { label: "Sports List", href: "/sports/list" },
      { label: "Sports Type", href: "/sports/type" },
      { label: "Sports Student List", href: "/sports/student-list" },
    ],
  },
  {
    type: "dropdown",
    id: "library",
    label: "Library",
    icon: menuIcons.puzzle,
    items: [
      { label: "Book List", href: "/library/books" },
      { label: "Issue Return", href: "/library/issue-return" },
      { label: "Late Fine", href: "/library/late-fine" },
    ],
  },
  { type: "header", label: "Control Center" },
  {
    type: "dropdown",
    id: "settings",
    label: "Settings",
    icon: menuIcons.settings,
    items: [
      { label: "Academic Setting", href: "/settings/academic" },
      { label: "App Setting", href: "/settings/app" },
      { label: "Financial Setting", href: "/settings/financial" },
      { label: "Security Setting", href: "/settings/security" },
      { label: "Website Setting", href: "/settings/website" },
      { label: "RBAC Setting", href: "/settings/rbac" },
    ],
  },
];

const Sidebar = ({ isOpen = false, onClose }) => {
  const [isOverlay, setIsOverlay] = useState(() => window.innerWidth < 1200);
  const handleNavClick = () => {
    if (isOverlay && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleResize = () => setIsOverlay(window.innerWidth < 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", isOpen && isOverlay);
  }, [isOpen, isOverlay]);

  return (
    <>
      {isOpen && isOverlay ? (
        <div className="sidebar-backdrop" role="presentation" onClick={onClose} />
      ) : null}
      <aside
        className="navbar navbar-vertical navbar-expand-lg sidebar navbar-dark bg-dark"
        data-bs-theme="dark"
        aria-hidden={isOverlay && !isOpen}
      >
        <div className="container-fluid">
          <div className="navbar-collapse" id="sidebar-menu">
            {/* BEGIN NAVBAR MENU */}
            <ul className="navbar-nav pt-lg-3">
              {sidebarMenuItems.map((item) => {
                if (item.type === "header") {
                  return (
                    <li className="nav-item mt-3" key={`header-${item.label}`}>
                      <span className="nav-link disabled text-uppercase text-white-50">{item.label}</span>
                    </li>
                  );
                }

                if (item.type === "link") {
                  const MenuIcon = item.icon;
                  return (
                    <li className="nav-item" key={item.href}>
                      <a className="nav-link" href={item.href} onClick={handleNavClick}>
                        <span className="nav-link-icon me-2">
                          {MenuIcon ? <MenuIcon className="icon icon-1" size={24} /> : null}
                        </span>
                        <span className="nav-link-title"> {item.label} </span>
                      </a>
                    </li>
                  );
                }

                const MenuIcon = item.icon;
                return (
                  <li className="nav-item dropdown" key={item.id}>
                    <a
                      className="nav-link dropdown-toggle"
                      href={`#sidebar-${item.id}`}
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="false"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-icon me-2">
                        {MenuIcon ? <MenuIcon className="icon icon-1" size={24} /> : null}
                      </span>
                      <span className="nav-link-title"> {item.label} </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-dark">
                      {item.items.map((link) => (
                        <a className="dropdown-item" href={link.href} key={`${item.id}-${link.href}`} onClick={handleNavClick}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* END NAVBAR MENU */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
