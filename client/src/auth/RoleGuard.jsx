import { Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "../router/index";

import { useSelector } from "react-redux";
 
const RoleGuard = ({rol}) => {


  const auth = useSelector((state) => state.user)

  return auth.status === rol  ? <Outlet /> : <Navigate replace to={PublicRoute.HOME} />;
};


export default RoleGuard;
