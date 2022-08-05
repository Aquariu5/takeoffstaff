import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Info from "./components/Info";
import AppRouter from "./router/AppRouter";
function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Info />
    </BrowserRouter>
  );
}

export default App;
