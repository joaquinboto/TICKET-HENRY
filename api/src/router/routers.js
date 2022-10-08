const express = require("express");
const router = express.Router();
const { mercadopagoPayment } = require("../controllers/payments-controller");
const {
  register,
  login,
  getUsers,
  resetPassword,
  addFavorite,
  upDateUser,
  googleSignIn,
  deleteFavorite,
  getFavorite,
  changePassword,
} = require("../controllers/users-controller");
const {
  createEvent,
  getEvents,
  getEventDetail,
  getEventsDetailDb,
  deleteEvents,
  updateEvent,
  getEventsById,
  getEventHome,
  ticketsSoldAndAvailableAndAvailableEvents,
} = require("../controllers/events-controller");
const {
  getCart,
  getAllCarts,
  addEventToCart,
  removeOneEventFromCart,
  clearCart,
  checkoutCart,
  checkStock
} = require("../controllers/cart-controller");
const { passwordRecovery, sendInvoice, } = require("../controllers/email-controller");
const { fileUpload } = require("../helpers/fileUpload");
const passport = require("passport");
const {
  getReviewScore,
  postReviewScore,
  putReviewScore,
  deleteReviewScore,
  getComments,
} = require("../controllers/reviewScore-controller");
const {
  adminPut,
  bannedUser,
  hideEvent,
  showEvent,
  unbanUser,
  deleteCommentToAdmin,
  getAllOrders,
  upgradeToAdmin,
  upgradeToUser
} = require("../controllers/admin-controller");

// USUARIO
router.post("/user/google", googleSignIn);
router.post("/login", login);
router.post("/register", register);
router.put("/password", passwordRecovery);
router.put("/resetpassword/:id", resetPassword);
router.put("/user/:id/profile", fileUpload, upDateUser);
router.get("/users", getUsers);
router.put("/changePassword", changePassword);

//EVENTOS
router.post("/createEvent", fileUpload, createEvent);
router.post("/event/:id/update", fileUpload, updateEvent);
router.get("/events", getEvents);
router.get("/eventsCreate/:id", getEventDetail);
router.delete("/events/:id", deleteEvents);
router.get("/eventsDB/:id", getEventsDetailDb);
router.get("/dashboard/events/:id", getEventsById);
router.get(
  "/ticketsSoldAndAvailableAndAvailableEvents",
  ticketsSoldAndAvailableAndAvailableEvents
);

//FAVORITOS / REVIEWS / COMMENTS
router.put("/favorites", addFavorite);
router.delete("/favorites", deleteFavorite);
router.get("/favorites/:idUser", getFavorite);
router.get("/reviewScor", getReviewScore);
router.post("/reviewScore/:eventId", postReviewScore);
router.put("/reviewScore/:eventId", putReviewScore);
router.delete("/reviewScore/:eventId", deleteReviewScore);
router.get("/comments/:id", getComments);

// ADMIN
router.put("/admin", adminPut);
router.put("/user/:id/banned", bannedUser);
router.put("/hideEvent", hideEvent);
router.put("/showEvent", showEvent);
router.get("/showOrders", getAllOrders);
router.put("/unbanUser", unbanUser);
router.put("/upgradeToAdmin", upgradeToAdmin);
router.put('/upgradeToUser', upgradeToUser);
router.delete("/deleteComents", deleteCommentToAdmin);

//CART
router.get('/checkStock/:userId' , checkStock)
router.get("/cart", getCart);
router.get("/allcart/:userId", getAllCarts);
router.post("/addcart", addEventToCart);
router.put("/deleteeventcart", removeOneEventFromCart);
router.put("/clearcart", clearCart);
router.put("/payment", mercadopagoPayment);
router.put("/checkout", checkoutCart);
router.put("/sendinvoice/:id", sendInvoice)

module.exports = router;




