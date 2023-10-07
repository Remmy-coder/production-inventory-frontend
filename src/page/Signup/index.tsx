import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CompanyBackgroundImg from "../../assets/images/company-registration.jpg";
import UserBackgroundImg from "../../assets/images/user-registration.jpg";

const CompanyRegistration = React.lazy(() => import("./CompanyRegistration"));
const UserCreation = React.lazy(() => import("./UserCreation"));

const CompanyRegistrationContainer = styled.div`
  width: auto;
  min-height: 100vh;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${CompanyBackgroundImg}) center; */
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserRegistrationContainer = styled.div`
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

const Signup: React.FC = () => {
  const [transition, setTransition] = useState<boolean>(false);

  const companyContainerRef = useRef<HTMLDivElement>(null);

  const userContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = companyContainerRef.current;
    if (!container) return;

    const image = new Image();
    image.src = CompanyBackgroundImg;

    image.onload = () => {
      container.style.backgroundImage = `url(${CompanyBackgroundImg})`;
      container.classList.add("loaded");
    };
  }, [CompanyBackgroundImg]);

  useEffect(() => {
    const container = userContainerRef.current;
    if (!container) return;

    const image = new Image();
    image.src = UserBackgroundImg;

    image.onload = () => {
      container.style.backgroundImage = `url(${UserBackgroundImg})`;
      container.classList.add("loaded");
    };
  }, [UserBackgroundImg]);

  return (
    <>
      {transition === false ? (
        <CompanyRegistrationContainer ref={companyContainerRef}>
          <CompanyRegistration setTransition={setTransition} />
        </CompanyRegistrationContainer>
      ) : (
        <UserRegistrationContainer ref={userContainerRef}>
          <UserCreation />
        </UserRegistrationContainer>
      )}
    </>
  );
};

export default Signup;
