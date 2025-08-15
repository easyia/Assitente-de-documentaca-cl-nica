import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { I18nProvider, useI18n } from './i18n';

const queryClient = new QueryClient();

function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="rounded-md border border-medical-blue bg-white px-3 py-1 text-medical-blue font-medium shadow focus:outline-none focus:ring-2 focus:ring-medical-blue/50 transition"
      >
        <option value="pt">🇧🇷 Português</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <LanguageSelector />
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
