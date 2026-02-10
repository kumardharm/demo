// @ts-nocheck
import { useEffect } from "react";
import modalsBody from "../assets/modals.body.html?raw";

const ModalsPage = () => {
  useEffect(() => {
    document.body.classList.add("d-flex", "flex-column", "bg-body", "min-vh-100");
    return () => {
      document.body.classList.remove("d-flex", "flex-column", "bg-body", "min-vh-100");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: modalsBody }} />;
};

export default ModalsPage;
