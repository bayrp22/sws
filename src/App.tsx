import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import RouteTracker from './analytics/RouteTracker';

const App = () => (
  <BrowserRouter>
    <RouteTracker />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
