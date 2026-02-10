import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import IndexPage from "./pages/IndexPage";
import SignInCoverPage from "./pages/SignInCoverPage";
import FullCalendarPage from "./pages/FullCalendarPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TwoStepVerificationCodePage from "./pages/TwoStepVerificationCodePage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import AuthLockPage from "./pages/AuthLockPage";
import CookieBannerPage from "./pages/CookieBannerPage";
import MarketingIndexPage from "./pages/MarketingIndexPage";
import MarketingHeroPage from "./pages/MarketingHeroPage";
import MarketingPricingPage from "./pages/MarketingPricingPage";
import MarketingTextPage from "./pages/MarketingTextPage";
import MarketingTestimonialsPage from "./pages/MarketingTestimonialsPage";
import PricingPage from "./pages/PricingPage";
import Error404Page from "./pages/Error404Page";
import Error500Page from "./pages/Error500Page";
import ErrorMaintenancePage from "./pages/ErrorMaintenancePage";
import { useTablerInteractions } from "./hooks/useTablerInteractions";
import CookieBanner from "./components/CookieBanner";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useTablerInteractions();

  useEffect(() => {
    const noLayoutRoutes = new Set([
      "/",
      "/marketing-index",
      "/marketing-hero",
      "/marketing-pricing",
      "/marketing-text",
      "/marketing-testimonials",
      "/error-404",
      "/error-500",
      "/error-maintenance",
      "/sign-in",
      "/forgot-password",
      "/2-step-verification-code",
      "/terms-of-service",
      "/auth-lock",
    ]);
    if (noLayoutRoutes.has(location.pathname)) {
      document.body.classList.remove("layout-fluid");
    } else {
      document.body.classList.add("layout-fluid");
    }
  }, [location.pathname]);

  useEffect(() => {
    const idleExemptRoutes = new Set([
      "/",
      "/marketing-index",
      "/marketing-hero",
      "/marketing-pricing",
      "/marketing-text",
      "/marketing-testimonials",
      "/error-404",
      "/error-500",
      "/error-maintenance",
      "/sign-in",
      "/forgot-password",
      "/2-step-verification-code",
      "/terms-of-service",
      "/auth-lock",
    ]);
    if (idleExemptRoutes.has(location.pathname)) {
      return;
    }

    let idleTimer: number | undefined;
    const resetTimer = () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
      idleTimer = window.setTimeout(() => {
        navigate("/auth-lock", { replace: true });
      }, 15 * 60 * 1000);
    };

    const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (idleTimer) {
        window.clearTimeout(idleTimer);
      }
      events.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MarketingIndexPage />} />
        <Route path="/marketing-index" element={<MarketingIndexPage />} />
        <Route path="/marketing-hero" element={<MarketingHeroPage />} />
        <Route path="/marketing-pricing" element={<MarketingPricingPage />} />
        <Route path="/marketing-text" element={<MarketingTextPage />} />
        <Route path="/marketing-testimonials" element={<MarketingTestimonialsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/error-404" element={<Error404Page />} />
        <Route path="/error-500" element={<Error500Page />} />
        <Route path="/error-maintenance" element={<ErrorMaintenancePage />} />
        <Route path="*" element={<Error404Page />} />
        <Route path="/sign-in" element={<SignInCoverPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/2-step-verification-code" element={<TwoStepVerificationCodePage />} />
        <Route path="/auth-lock" element={<AuthLockPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-banner" element={<CookieBannerPage />} />
        <Route path="/dashboard" element={<IndexPage />} />
        <Route path="/fullcalendar" element={<FullCalendarPage />} />
      </Routes>
      <CookieBanner />
    </>
  );
};

export default App;
