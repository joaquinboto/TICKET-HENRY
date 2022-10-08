import { Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "../router/index";
import { UserAuth} from '../firebase/context'
import { useSelector } from "react-redux";
 
const AuthGuard = () => {
  const {user} = UserAuth()
  const auth = useSelector((state) => state.user)
  return user != null || auth ? <Outlet /> : <Navigate replace to={PublicRoute.LOGIN} />;
};


export default AuthGuard;

