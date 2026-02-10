// @ts-nocheck
import { useEffect, useState } from "react";
import ThemeSettingsOffcanvas from "../components/common/ThemeSettingsOffcanvas";
import { Link, useNavigate } from "react-router-dom";

const TwoStepVerificationCodePage = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("d-flex", "flex-column", "bg-body", "min-vh-100");
    return () => {
      document.body.classList.remove("d-flex", "flex-column", "bg-body", "min-vh-100");
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSettingsOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSettingsOpen]);

  useEffect(() => {
    const themeConfig = {
      theme: "light",
      "theme-base": "gray",
      "theme-font": "sans-serif",
      "theme-primary": "blue",
      "theme-radius": "1",
    };
    const url = new URL(window.location.href);
    const form = document.getElementById("offcanvasSettings");
    const resetButton = document.getElementById("reset-changes");
    if (!form || !resetButton) return;

    const checkItems = () => {
      for (const key in themeConfig) {
        const value = window.localStorage[`tabler-${key}`] || themeConfig[key];
        if (value) {
          document.documentElement.setAttribute(`data-bs-${key}`, value);
          const radios = form.querySelectorAll(`[name="${key}"]`);
          radios.forEach((radio) => {
            radio.checked = radio.value === value;
          });
        }
      }
    };

    const onChange = (event) => {
      const target = event.target;
      const name = target?.name;
      const value = target?.value;
      for (const key in themeConfig) {
        if (name === key) {
          document.documentElement.setAttribute(`data-bs-${key}`, value);
          window.localStorage.setItem(`tabler-${key}`, value);
          url.searchParams.set(key, value);
        }
      }
      window.history.pushState({}, "", url);
    };

    const onReset = () => {
      for (const key in themeConfig) {
        const value = themeConfig[key];
        document.documentElement.removeAttribute(`data-bs-${key}`);
        window.localStorage.removeItem(`tabler-${key}`);
        url.searchParams.delete(key);
      }
      checkItems();
      window.history.pushState({}, "", url);
    };

    form.addEventListener("change", onChange);
    resetButton.addEventListener("click", onReset);
    checkItems();

    return () => {
      form.removeEventListener("change", onChange);
      resetButton.removeEventListener("click", onReset);
    };
  }, []);

  return (
    <>
      <div className="page page-center min-vh-100 d-flex flex-column justify-content-center">
        <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <Link to="/sign-in" aria-label="Tabler" className="navbar-brand navbar-brand-autodark">
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="32" viewBox="0 0 232 68" className="navbar-brand-image">
              <path
                d="M64.6 16.2C63 9.9 58.1 5 51.8 3.4 40 1.5 28 1.5 16.2 3.4 9.9 5 5 9.9 3.4 16.2 1.5 28 1.5 40 3.4 51.8 5 58.1 9.9 63 16.2 64.6c11.8 1.9 23.8 1.9 35.6 0C58.1 63 63 58.1 64.6 51.8c1.9-11.8 1.9-23.8 0-35.6zM33.3 36.3c-2.8 4.4-6.6 8.2-11.1 11-1.5.9-3.3.9-4.8.1s-2.4-2.3-2.5-4c0-1.7.9-3.3 2.4-4.1 2.3-1.4 4.4-3.2 6.1-5.3-1.8-2.1-3.8-3.8-6.1-5.3-2.3-1.3-3-4.2-1.7-6.4s4.3-2.9 6.5-1.6c4.5 2.8 8.2 6.5 11.1 10.9 1 1.4 1 3.3.1 4.7zM49.2 46H37.8c-2.1 0-3.8-1-3.8-3s1.7-3 3.8-3h11.4c2.1 0 3.8 1 3.8 3s-1.7 3-3.8 3z"
                fill="#066fd1"
                style={{ fill: "var(--tblr-primary, #066fd1)" }}
              />
              <path
                d="M105.8 46.1c.4 0 .9.2 1.2.6s.6 1 .6 1.7c0 .9-.5 1.6-1.4 2.2s-2 .9-3.2.9c-2 0-3.7-.4-5-1.3s-2-2.6-2-5.4V31.6h-2.2c-.8 0-1.4-.3-1.9-.8s-.9-1.1-.9-1.9c0-.7.3-1.4.8-1.8s1.2-.7 1.9-.7h2.2v-3.1c0-.8.3-1.5.8-2.1s1.3-.8 2.1-.8 1.5.3 2 .8.8 1.3.8 2.1v3.1h3.4c.8 0 1.4.3 1.9.8s.8 1.2.8 1.9-.3 1.4-.8 1.8-1.2.7-1.9.7h-3.4v13c0 .7.2 1.2.5 1.5s.8.5 1.4.5c.3 0 .6-.1 1.1-.2.5-.2.8-.3 1.2-.3zm28-20.7c.8 0 1.5.3 2.1.8.5.5.8 1.2.8 2.1v20.3c0 .8-.3 1.5-.8 2.1-.5.6-1.2.8-2.1.8s-1.5-.3-2-.8-.8-1.2-.8-2.1c-.8.9-1.9 1.7-3.2 2.4-1.3.7-2.8 1-4.3 1-2.2 0-4.2-.6-6-1.7-1.8-1.1-3.2-2.7-4.2-4.7s-1.6-4.3-1.6-6.9c0-2.6.5-4.9 1.5-6.9s2.4-3.6 4.2-4.8c1.8-1.1 3.7-1.7 5.9-1.7 1.5 0 3 .3 4.3.8 1.3.6 2.5 1.3 3.4 2.1 0-.8.3-1.5.8-2.1.5-.5 1.2-.7 2-.7zm-9.7 21.3c2.1 0 3.8-.8 5.1-2.3s2-3.4 2-5.7-.7-4.2-2-5.8c-1.3-1.5-3-2.3-5.1-2.3-2 0-3.7.8-5 2.3-1.3 1.5-2 3.5-2 5.8s.6 4.2 1.9 5.7 3 2.3 5.1 2.3z"
                fill="#4a4a4a"
              />
            </svg>
          </Link>
        </div>
        <form
          className="card card-md"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/dashboard");
          }}
        >
          <div className="card-body">
            <h2 className="card-title card-title-lg text-center mb-4">Authenticate Your Account</h2>
            <p className="my-4 text-center">
              Please confirm your account by entering the authorization code sent to <strong>+1 856-672-8552</strong>.
            </p>
            <div className="my-5">
              <div className="row g-4">
                <div className="col">
                  <div className="row g-2">
                    <div className="col">
                      <input type="text" className="form-control form-control-lg text-center px-3 py-3" maxLength={1} inputMode="numeric" pattern="[0-9]*" data-code-input />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control form-control-lg text-center px-3 py-3" maxLength={1} inputMode="numeric" pattern="[0-9]*" data-code-input />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control form-control-lg text-center px-3 py-3" maxLength={1} inputMode="numeric" pattern="[0-9]*" data-code-input />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row g-2">
                    <div className="col">
                      <input type="text" className="form-control form-control-lg text-center px-3 py-3" maxLength={1} inputMode="numeric" pattern="[0-9]*" data-code-input />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control form-control-lg text-center px-3 py-3" maxLength={1} inputMode="numeric" pattern="[0-9]*" data-code-input />
                    </div>
                    <div className="col">
                      <input type="text" className="form-control form-control-lg text-center px-3 py-3" maxLength={1} inputMode="numeric" pattern="[0-9]*" data-code-input />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4">
              <label className="form-check">
                <input type="checkbox" className="form-check-input" />
                Don't ask for codes again on this device
              </label>
            </div>
            <div className="form-footer">
              <div className="btn-list flex-nowrap">
                <Link to="/sign-in" className="btn btn-3 w-100">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary btn-3 w-100">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="text-center text-secondary mt-3">
          It may take a minute to receive your code. Haven't received it? <Link to="/2-step-verification-code">Resend a new code.</Link>
        </div>
        </div>
      </div>
      <div className="settings">
        <a
          href="#"
          className="btn btn-floating btn-icon btn-primary"
          aria-controls="offcanvasSettings"
          aria-label="Theme Settings"
          onClick={(event) => {
            event.preventDefault();
            setIsSettingsOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-1"
          >
            <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
            <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
            <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
            <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
          </svg>
        </a>
        <ThemeSettingsOffcanvas isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        {isSettingsOpen ? (
          <div
            className="offcanvas-backdrop fade show"
            onClick={() => setIsSettingsOpen(false)}
          />
        ) : null}
      </div>
    </>
  );
};

export default TwoStepVerificationCodePage;
