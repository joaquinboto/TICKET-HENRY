import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoute } from "../../router/index";
import { RoutesWithNotFound } from "../../utils/index";

const CreateEvent = lazy(() => import("../CreateEvent"));
const EventDetail = lazy(() => import("../UI/CardDetail"));
const Events = lazy(() => import("../Events"));
const AdminDashboard = lazy(() => import("./Dashboard/AdminDashboard"));
const AdminDashboardEdit = lazy(() => import("./Dashboard/AdminDashboardEdit"));
const Checkout = lazy(() => import('../UI/Checkout'));
const EditProfile = lazy(() => import("../UI/EditProfile"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoute.EVENTS} />} />
      <Route path={PrivateRoute.CREATEEVENT} element={<CreateEvent />} />
      <Route path={PrivateRoute.EVENTS} element={<Events />} />
      <Route path={PrivateRoute.EVENTDETAIL} element={<EventDetail />} />
      <Route path={PrivateRoute.ADMIN_DASHBOARD} element={<AdminDashboard />} />
      <Route
        path={PrivateRoute.ADMIN_DASHBOARD_EDIT}
        element={<AdminDashboardEdit />}
      />
      <Route path={PrivateRoute.CHECKOUT} element={<Checkout />} />
      <Route path={PrivateRoute.EDITPROFILE} element={<EditProfile />} />
    </RoutesWithNotFound>
  );
}

export default Private;
