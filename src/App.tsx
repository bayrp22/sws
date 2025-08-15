import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import RouteTracker from './analytics/RouteTracker';
import { LanguageProvider } from './contexts/LanguageContext';

const App = () => (
  <BrowserRouter>
    <RouteTracker />
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
