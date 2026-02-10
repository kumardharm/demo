// @ts-nocheck
import { useEffect } from "react";
import pricingBody from "../assets/pricing.body.html?raw";

const PricingPage = () => {
  useEffect(() => {
    document.body.classList.remove("body-marketing", "body-gradient");
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pricingBody }} />;
};

export default PricingPage;
