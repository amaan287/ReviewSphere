import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Header from "@/components/layout/header";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { routes } from "./routes/routes";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <div className="scroll-smooth">
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
        {/* <FooterDock /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
