import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";

function App() {
  return (
    <BrowserRouter>
      <meta name="color-scheme" content="light only"></meta>
      <div className="min-h-screen min-w-vh rounded">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/join" element={<div>Register</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
