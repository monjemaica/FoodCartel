
const router = (app) => {
  const users = require("../controller/usersController");
  const auth = require("../controller/authController");
  const foods = require("../controller/foodController");
  const orders = require("../controller/orderController");
  const reservations = require("../controller/reservController");
  
  //authentication
  const _auth = require("../middleware/index");

  //uploads
  const mutler = require('multer');
  const upload = mutler({dest: 'uploads/'});

  //PAGES
  app.get("/foodCartel", _auth.isAuthenticated, _auth.isUser, foods.homepage);

  //AUTH
  app.get("/auth/register", auth.signupPage);
  app.post("/auth/register", auth.register);
  app.post("/auth/login", auth.login);

  //USERS
  app.get("/users", _auth.isAuthenticated, _auth.isUser, users.getAllUsers);
  app.put("/users/:id", _auth.isAuthenticated, _auth.isUser, users.updateUser);
  app.delete( "/users/:id", _auth.isAuthenticated, _auth.isUser, users.deleteUser);

  //FOODS
  app.get("/foods", _auth.isAuthenticated, _auth.isUser, foods.getFoods)
  app.post("/foods", _auth.isAuthenticated, _auth.isUser, foods.create)

  //CART
  app.get("/cart", _auth.isAuthenticated, _auth.isUser, foods.cartitempage)
  app.get("/checkout", _auth.isAuthenticated, _auth.isUser, foods.payment)

  //ORDER
  // app.get("/orders", orders.getOrders);
  app.get("/orders/:user_id", _auth.isAuthenticated, _auth.isUser, orders.getUserOrders);
  app.get("/order/:_id", _auth.isAuthenticated, _auth.isUser, orders.getOrderById);
  app.post("/orders", _auth.isAuthenticated, _auth.isUser, orders.create);
  app.put("/orders/:id", _auth.isAuthenticated, _auth.isUser, orders.update);

  //RESERVATIONS
  app.post("/reservations", reservations.create);
  app.get("/reservations/:user_id", _auth.isAuthenticated, _auth.isUser, reservations.getUserReservations);


  /********************************************************ADMIN********************************************************/
  //USERS
  app.get("/admin/users", _auth.isAuthenticated, _auth.isAdmin, users.getAllUsers);
  app.put("/admin/users/:id", _auth.isAuthenticated, _auth.isAdmin, users.updateUser);
  app.delete( "/admin/users/:id", _auth.isAuthenticated, _auth.isAdmin, users.deleteUser);

  //FOODS
  app.get("/admin/foods", _auth.isAuthenticated, _auth.isAdmin, foods.getFoods)
  app.post("/admin/foods", _auth.isAuthenticated, _auth.isAdmin,upload.single('img'), foods.create)

};

module.exports = router;
