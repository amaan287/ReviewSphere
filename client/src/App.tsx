import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/header";
import Signup from "./pages/SIgnupPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
