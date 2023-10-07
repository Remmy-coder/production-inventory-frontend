import React, { Suspense } from "react";

const UserLogin = React.lazy(() => import("./Login"));

const Login: React.FC = () => {
  return (
    <>
      <UserLogin />
    </>
  );
};

export default Login;
