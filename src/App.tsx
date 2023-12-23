import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/LoadingPage";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import { CompanyProtectedRoute } from "./controllers/auth.controller";
import Dashboard from "./page/Dashboard";
import Suppliers from "./modules/Suppliers";

const Signup = React.lazy(() => import("./page/Signup"));
const Login = React.lazy(() => import("./page/Login"));
//const Suppliers = React.lazy(() => import("./modules/Suppliers"));

const App: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Router>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route element={<DashboardLayout />}>
                <Route element={<CompanyProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<div>Hello</div>} />
                  <Route path="/suppliers" element={<Suppliers />} />
                </Route>
              </Route>
            </Routes>
          </Router>
          <ToastContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;

async function delayForImg(promise: any) {
  await new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
  return promise;
}
