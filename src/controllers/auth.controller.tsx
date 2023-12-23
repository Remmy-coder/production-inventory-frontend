import { Navigate, Outlet, RouteProps, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../services/userApi";
import { parsedAuthenticatedUserObject } from "../common/apiConfig";
import Loader from "../components/LoadingPage";

type ProtectedRouteProps = {} & RouteProps;

export const CompanyProtectedRoute: React.FC<ProtectedRouteProps> = ({
  ...rest
}) => {
  const {
    data: user,
    isSuccess,
    isError,
  } = useGetUserByIdQuery(parsedAuthenticatedUserObject?.id || "");

  const navigate = useNavigate();

  if (isError) {
    navigate("/login");
    localStorage.clear();
  }

  return isSuccess ? <Outlet /> : <Loader />;
};
