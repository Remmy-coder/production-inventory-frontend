import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"; // Import the CSS file
import Dashboard from "./page/Dashboard";
// import Signup from "./page/Signup";
import { ToastContainer } from "react-toastify";
// import Login from "./page/Login/Login";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/LoadingPage";

const Signup = React.lazy(() => delayForImg(import("./page/Signup")));
const Login = React.lazy(() => delayForImg(import("./page/Login")));
const App: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
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
