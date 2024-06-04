import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegisterPage } from "./pages/register";
import { ToastContainer } from "react-toast";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <meta name="color-scheme" content="light only"></meta>
      <div className="min-h-screen min-w-vh rounded">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/join" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
