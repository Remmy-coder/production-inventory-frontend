import React, { useEffect, useRef, useState } from "react";
import UserLogin from "./Login";
import UserBackgroundImg from "../../assets/images/user-registration.jpg";
import styled from "styled-components";
import OtpVerification from "./OtpVerification";

const UserLoginContainer = styled.div`
  width: auto;
  min-height: 100vh;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${UserBackgroundImg}) center; */
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export enum LoginFlow {
  userLogin = "USER_LOGIN",
  otpLogin = "OTP_VALIDATION",
}

const Login: React.FC = () => {
  const [transition, setTransition] = useState<LoginFlow>(LoginFlow.userLogin);

  const userContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = userContainerRef.current;
    if (!container) return;

    const image = new Image();
    image.src = UserBackgroundImg;

    image.onload = () => {
      container.style.backgroundImage = `linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ), url(${UserBackgroundImg})`;
      container.classList.add("loaded");
    };
  }, [UserBackgroundImg]);

  return (
    <>
      <UserLoginContainer ref={userContainerRef}>
        {transition === LoginFlow.userLogin ? (
          <UserLogin setTransition={setTransition} />
        ) : transition === LoginFlow.otpLogin ? (
          <OtpVerification />
        ) : null}
      </UserLoginContainer>
    </>
  );
};

export default Login;
