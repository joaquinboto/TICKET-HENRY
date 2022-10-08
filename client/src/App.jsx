import React, { lazy } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute ,PrivateAdmin } from "./router/index";
import { AuthGuard, RoleGuard } from "../src/auth/index";
import { RoutesWithNotFound, Rol } from "./utils/index";
import PasswordRecovery from "./components/PasswordRecovery";
import { AdminDashboard } from "./components/Private";
import AdminDashboardEdit from "./components/Private/Dashboard/AdminDashboardEdit";
import UpdatePassword from "./components/UpdatePassword";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getCart } from "./store/actions";
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Private = lazy(() => import("./components/Private/Private"));
const Home = lazy(() => import("./components/Home"));
const Events = lazy(() => import("./components/Events"));
const LoginSuccess = lazy(() => import("./components/UI/LoginSuccess"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesWithNotFound>
          <Route path="/" element={<Home />} />
          <Route path={PublicRoute.HOME} element={<Home />} />
          <Route path={PublicRoute.LOGIN} element={<Login />} />
          <Route path={PublicRoute.REGISTER} element={<Register />} />
          <Route path={PublicRoute.EVENTS} element={<Events />} />
          <Route path={PublicRoute.LOGINSUCCESS} element={<LoginSuccess />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={`${PrivateRoute.PRIVATE}/*`} element={<Private />} />
          </Route>
          <Route element={<RoleGuard rol={Rol.admin} />}>
            <Route
              path={PrivateAdmin.ADMIN_DASHBOARD}
              element={<AdminDashboard />}
            />
            <Route
              path={PrivateAdmin.ADMIN_DASHBOARD_EDIT}
              element={<AdminDashboardEdit />}
            />
          </Route>
          <Route
            path={PublicRoute.PASSWORDRECOVERY}
            element={<PasswordRecovery />}
          />
          <Route
            path={PublicRoute.RESETPASSWORD}
            element={<UpdatePassword />}
          />
        </RoutesWithNotFound>
      </BrowserRouter>
    </div>
  );
}

export default App;
