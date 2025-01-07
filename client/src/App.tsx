import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/header";
import Signup from "./pages/SIgnupPage";
import LoginPage from "./pages/LoginPage";
import ReviewPage from "./pages/ReviewPage";
import ProfilePage from "./pages/ProfilePage";
import Create from "./pages/CreateReview";

function App() {
  return (
    <div className="scroll-smooth">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<Create />} />
        </Routes>

        {/* <FooterDock /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
