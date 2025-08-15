import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { I18nProvider, useI18n } from './i18n';

const queryClient = new QueryClient();

function App() {
  const { language, setLanguage } = useI18n();
  return (
    <I18nProvider>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 100 }}>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="pt">Português</option>
          <option value="es">Español</option>
        </select>
      </div>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}

export default App;
