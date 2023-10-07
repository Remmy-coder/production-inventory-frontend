import axios from "axios";
import { ICompanyRegistration } from "../../interfaces/company";

const API_URL = "http://localhost:3002/company";

// Register company
const register = async (companyData: Partial<ICompanyRegistration>) => {
  const response = await axios.post(API_URL, companyData);

  if (response.data) {
    localStorage.setItem("company", JSON.stringify(response.data));
  }

  return response.data;
};

const companyAuthService = {
  register,
};

export default companyAuthService;
