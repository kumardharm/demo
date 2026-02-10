import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/app.css";
import "./styles/demo.css";
import "@tabler/core/dist/css/tabler.css";
import "@tabler/core/dist/css/tabler-flags.css";
import "@tabler/core/dist/css/tabler-socials.css";
import "@tabler/core/dist/css/tabler-payments.css";
import "@tabler/core/dist/css/tabler-vendors.css";
import "@tabler/core/dist/css/tabler-marketing.css";
import "@tabler/core/dist/css/tabler-themes.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
