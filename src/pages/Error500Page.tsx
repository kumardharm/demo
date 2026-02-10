// @ts-nocheck
import { useEffect } from "react";
import error500Body from "../assets/errors/error-500.body.html?raw";

const Error500Page = () => {
  useEffect(() => {
    document.body.classList.add("d-flex", "flex-column", "bg-body", "min-vh-100");
    return () => {
      document.body.classList.remove("d-flex", "flex-column", "bg-body", "min-vh-100");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: error500Body }} />;
};

export default Error500Page;
