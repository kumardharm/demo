// @ts-nocheck
import { useEffect } from "react";
import testimonialsBody from "../assets/marketing/testimonials.body.html?raw";

const MarketingTestimonialsPage = () => {
  useEffect(() => {
    document.body.classList.add("body-marketing", "body-gradient");
    return () => {
      document.body.classList.remove("body-marketing", "body-gradient");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: testimonialsBody }} />;
};

export default MarketingTestimonialsPage;
