// @ts-nocheck
import { useEffect } from "react";
import pricingBody from "../assets/marketing/pricing.body.html?raw";

const MarketingPricingPage = () => {
  useEffect(() => {
    document.body.classList.add("body-marketing", "body-gradient");
    return () => {
      document.body.classList.remove("body-marketing", "body-gradient");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: pricingBody }} />;
};

export default MarketingPricingPage;
