import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Recibo from "./pages/Recibo";
import NotFound from "./pages/NotFound";
import SimuladorLimite from "./pages/SimuladorLimite";
import CalculadoraDAS from "./pages/CalculadoraDAS";
import ChecklistMensal from "./pages/ChecklistMensal";
import Privacidade from "./pages/Privacidade";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recibo" element={<Recibo />} />
          <Route path="/simulador" element={<SimuladorLimite />} />
          <Route path="/calculadora-das" element={<CalculadoraDAS />} />
          <Route path="/checklist" element={<ChecklistMensal />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
