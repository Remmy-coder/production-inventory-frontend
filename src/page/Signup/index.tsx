import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CompanyBackgroundImg from "../../assets/images/company-registration.jpg";
import UserCreation from "./UserCreation";
import CompanyRegistration from "./CompanyRegistration";

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

export enum RegistrationFlow {
  companyRegistration = "COMPANY_REGISTRATION",
  userRegistration = "USER_REGISTRATION",
}

const Signup: React.FC = () => {
  const [transition, setTransition] = useState<RegistrationFlow>(
    RegistrationFlow.companyRegistration
  );

  const companyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = companyContainerRef.current;
    if (!container) return;

    const image = new Image();
    image.src = CompanyBackgroundImg;

    image.onload = () => {
      container.style.backgroundImage = `linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ), url(${CompanyBackgroundImg})`;
      container.classList.add("loaded");
    };
  }, [CompanyBackgroundImg]);

  return (
    <>
      <CompanyRegistrationContainer ref={companyContainerRef}>
        {transition === RegistrationFlow.companyRegistration ? (
          <CompanyRegistration setTransition={setTransition} />
        ) : transition === RegistrationFlow.userRegistration ? (
          <UserCreation />
        ) : null}
      </CompanyRegistrationContainer>
    </>
  );
};

export default Signup;
