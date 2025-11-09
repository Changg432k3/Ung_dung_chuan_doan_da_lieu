import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import DiagnosisForm from "./components/DiagnosisForm";
import ResultDisplay from "./components/ResultDisplay";
import Profile from "./components/Profile";
import Tracking from "./components/Tracking";
import Recommendations from "./components/Recommendations";
import Login from "./components/Login";
import Register from "./components/Register";
import Spinner from "./components/Spinner"; // ⚙️

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  // 🧠 State điều khiển tiến trình chẩn đoán
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Welcome />} />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/chatbot"
              element={
                <PrivateRoute>
                  <Chatbot />
                </PrivateRoute>
              }
            />

            {/* ✅ Trang chẩn đoán — giữ form và hiển thị kết quả ngay dưới */}
            <Route
              path="/diagnosis"
              element={
                <PrivateRoute>
                  <div className="space-y-6">
                    {/* Form luôn hiển thị */}
                    <DiagnosisForm
                      setLoading={setLoading}
                      setError={setError}
                      setResult={setResult}
                    />

                    {/* Đang xử lý */}
                    {loading && (
                      <div className="flex justify-center mt-4">
                        <Spinner />
                      </div>
                    )}

                    {/* Hiển thị lỗi nếu có */}
                    {error && (
                      <div className="text-red-600 text-center mt-4">
                        {error}
                      </div>
                    )}

                    {/* Khi có kết quả */}
                    {result && (
                      <div className="animate-fadeIn transition-all duration-500">
                        <ResultDisplay result={result} />
                      </div>
                    )}
                  </div>
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <ResultDisplay />
                </PrivateRoute>
              }
            />

            <Route
              path="/tracking"
              element={
                <PrivateRoute>
                  <Tracking />
                </PrivateRoute>
              }
            />

            <Route
              path="/recommendations"
              element={
                <PrivateRoute>
                  <Recommendations />
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
