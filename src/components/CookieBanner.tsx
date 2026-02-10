import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem("meisemdor_cookie_consent");
      if (!accepted) {
        setVisible(true);
      }
    } catch (e) {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("meisemdor_cookie_consent", "true");
    } catch (e) {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-8 md:right-8 z-50">
      <div className="bg-card border border-border shadow-soft rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Este site usa cookies (incluindo Google AdSense) para melhorar a experiência e exibir anúncios.
          Ao continuar, você concorda com nosso uso de cookies. Veja nossa{" "}
          <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link>.
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={accept}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:opacity-95 transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

