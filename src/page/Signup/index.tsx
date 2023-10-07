import React, { useState, Suspense } from "react";
import styled from "styled-components";
import CompanyBackgroundImg from "../../assets/images/company-registration.jpg";
import UserBackgroundImg from "../../assets/images/user-registration.jpg";
import Loader from "../../components/LoadingPage";

const CompanyRegistration = React.lazy(() => import("./CompanyRegistration"));
const UserCreation = React.lazy(() => import("./UserCreation"));

const CompanyRegistrationContainer = styled.div`
  width: auto;
  min-height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${CompanyBackgroundImg}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserRegistrationContainer = styled.div`
  width: auto;
  min-height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${UserBackgroundImg}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Signup: React.FC = () => {
  const [transition, setTransition] = useState<boolean>(false);
  return (
    <>
      {transition === false ? (
        <CompanyRegistrationContainer>
          <CompanyRegistration setTransition={setTransition} />
        </CompanyRegistrationContainer>
      ) : (
        <UserRegistrationContainer>
          <UserCreation />
        </UserRegistrationContainer>
      )}
    </>
  );
};

export default Signup;
