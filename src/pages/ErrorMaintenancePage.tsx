// @ts-nocheck
import { useEffect } from "react";
import errorMaintenanceBody from "../assets/errors/error-maintenance.body.html?raw";

const ErrorMaintenancePage = () => {
  useEffect(() => {
    document.body.classList.add("d-flex", "flex-column", "bg-body", "min-vh-100");
    return () => {
      document.body.classList.remove("d-flex", "flex-column", "bg-body", "min-vh-100");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: errorMaintenanceBody }} />;
};

export default ErrorMaintenancePage;
