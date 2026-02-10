// @ts-nocheck
import { useEffect } from "react";
import textBody from "../assets/marketing/text.body.html?raw";

const MarketingTextPage = () => {
  useEffect(() => {
    document.body.classList.add("body-marketing", "body-gradient");
    return () => {
      document.body.classList.remove("body-marketing", "body-gradient");
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: textBody }} />;
};

export default MarketingTextPage;
