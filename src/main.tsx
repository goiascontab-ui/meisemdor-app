import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service worker registration (safe: only if supported and on secure origin / localhost)
if ("serviceWorker" in navigator) {
  try {
    const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    if (isLocal || location.protocol === "https:") {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          // no-op; registration successful
          console.log("Service worker registrado");
        })
        .catch((err) => {
          console.warn("Falha ao registrar service worker:", err);
        });
    }
  } catch (e) {
    // não bloquear o restante da app
    console.warn("Erro ao tentar registrar service worker:", e);
  }
}
