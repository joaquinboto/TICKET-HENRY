export const PublicRoute = {
  LOGIN: "login",
  REGISTER: "register",
  HOME: "home",
  EVENTS: "events",
  LOGINSUCCESS: "login/success",
  PASSWORDRECOVERY: "passwordRecovery",
  RESETPASSWORD: "ressetPassword/:id",
};

export const PrivateRoute = {
  PRIVATE: "private",
  CREATEEVENT: "createvent",
  EVENTDETAIL: "events/:id",
  CART: "cart",
  CHECKOUT: 'payment/success',
  EDITPROFILE: 'user/:id/profile'
}

export const PrivateAdmin = {
  ADMIN_DASHBOARD: "admindashboard",
  ADMIN_DASHBOARD_EDIT: "admindashboard/:id",
}
