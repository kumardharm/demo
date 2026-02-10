// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const COOKIE_CONSENT_KEY = "cookie-consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    setIsVisible(!storedConsent);
  }, []);

  const handleAccept = (value: "essential" | "all") => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="offcanvas offcanvas-bottom h-auto show" role="dialog" aria-modal="false" style={{ visibility: "visible" }}>
      <div className="offcanvas-body">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <strong>Do you like cookies?</strong> 🍪 We use cookies to ensure you get the best experience on our website. <Link to="/terms-of-service">Learn more</Link>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary" onClick={() => handleAccept("essential")}>
                Essential Cookies Only
              </button>
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary" onClick={() => handleAccept("all")}>
                Allow All Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
