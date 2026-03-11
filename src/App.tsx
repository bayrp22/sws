import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from "./Routes";
import RouteTracker from './analytics/RouteTracker';
import { LanguageProvider } from './contexts/LanguageContext';

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <RouteTracker />
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
