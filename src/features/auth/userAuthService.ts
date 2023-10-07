import axios from "axios";
import { IUserRegistration } from "../../interfaces/user"
import userAuthSlice from "./userAuthSlice";

const API_URL = 'http://localhost:3002/user'

// Register user
const register = async (userData: Partial<IUserRegistration>) => {
    const response = await axios.post(API_URL, userData);

    // if(response.data){
    //     localStorage.setItem("user", JSON.stringify(response.data))
    // }

    return response.data;
} 

const userAuthService = {
    register,
};

export default userAuthService;