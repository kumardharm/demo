// @ts-nocheck
import { useEffect } from "react";
import error404Body from "../assets/errors/error-404.body.html?raw";

const Error404Page = () => {
  useEffect(() => {
    document.body.classList.add("d-flex", "flex-column", "bg-body", "min-vh-100");
    return () => {
      document.body.classList.remove("d-flex", "flex-column", "bg-body", "min-vh-100");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: error404Body }} />;
};

export default Error404Page;
