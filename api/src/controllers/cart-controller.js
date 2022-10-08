const { Cart, Users, Event, Cart_Events } = require("../db");

const getCart = async (req, res, next) => {
  let { userId } = req.query;
  try {
    let cartUser = await Cart.findOne({
      where: {
        userId: userId,
        status: "Active",
      },
      include: {
        model: Users,
        attributes: ["username", "profile_picture", "status"],
        model: Event,
        attributes: ["id", "description", "price", "artist", "image"],
        through: { attributes: ["amount", "subtotal"] },
      },
    });
    if (cartUser) res.status(200).json(cartUser);
    else res.status(400).send("No user was found with that ID");
  } catch (err) {
    next(err);
  }
};

const getAllCarts = async (req, res, next) => {
  let { userId } = req.params;

  try {
    let allCartsUser = await Cart.findOne({
      where: {
        userId: userId,
      },
      include: {
        model: Event,
        attributes: ["id", "description", "price", "artist" , 'image'],
        through: { attributes: ["amount"] },
      },
    });
    console.log(allCartsUser);
    if (allCartsUser) res.status(200).json(allCartsUser);

    else res.status(400).send("No user was found with that ID");
  } catch (err) {
    next(err);
  }
};

const addEventToCart = async (req, res, next) => {
  let { eventId, idUser } = req.body;

  try {
    let eventToAdd = await Event.findOne({ where: { id: eventId } });
    if (!eventToAdd)
      return res.status(400).send("No event was found with that ID");

    let cart = await Cart.findOne({
      where: {
        userId: idUser,
        status: "Active",
      },
      include: {
        model: Event,
      },
    });
    // NO EXISTE EL CARRITO ?
    if (!cart)
      return res.status(400).send("No cart was found with that user ID");
    // SE ENVIA UN EVENTO QUE YA ESTA EN EL CARRITO?
    var newPrice = 0;

    let repeatedEventCheck = cart.events.filter((e) => e.id === eventId);
    if (repeatedEventCheck.length > 0) {
      const cartevent = await Cart_Events.findOne({
        where: { 
          eventId: eventId,
          CartId: cart.id
        },
      });
      await cartevent.update({ amount: cartevent.amount + 1 });
      let total = cartevent.amount * eventToAdd.price;
      await cartevent.update({
        subtotal: total,
      });
      newPrice = total;
    }

    var newPrice = cart.totalPrice + eventToAdd.price;
    await cart.addEvent(eventToAdd);
    const carteven = await Cart_Events.findOne({ where: { 
      eventId: eventId,
      CartId: cart.id
     } });
    await carteven.update({ subtotal: eventToAdd.price });
    await cart.update({
      totalPrice: newPrice,
    });
    return res.json(cart);
  } catch (err) {
    next(err);
  }
};

const checkStock = async (req, res, next) => {
  let { userId } = req.params;
  try {
    let oldCart = await Cart.findOne({
      where: {
        userId: userId,
        status: "Active",
      },
      include: {
        model: Event,
      },
    });
    if (oldCart.events.length === 0)
      return res.status(400).send("Cart is empty");

    //RESTAMOS EL STOCK / CHECKEAMOS SI HAY STOCK
    let newStock = oldCart.events.map((e) => e.stock - e.Cart_Events.amount);

    //SIN STOCK?
    if (!newStock.every((stock) => stock > -1)) {
      return res.status(400).send("A event in the cart does not have enough stock")
    }
    return res.status(200).send("El producto tiene stock");
  } catch (err) {
    next(err);
  }
}

const removeOneEventFromCart = async (req, res, next) => {
  let { userId, eventId } = req.query;
  try {
    let eventToRemove = await Event.findOne({
      where: {
        id: eventId,
      },
    });

    if (!eventToRemove)
      return res.status(400).send("No event was found with that ID");

    let cart = await Cart.findOne({
      where: {
        userId: userId,
        status: "Active",
      },
      include: {
        model: Event,
      },
    });

    const cartevent = await Cart_Events.findOne({
      where: { 
        eventId: eventId,
        CartId: cart.id },
    });
    let total = cartevent.amount * cartevent.subtotal;
    let newPrice = cart.totalPrice - total;

    if (!cart)
      return res.status(400).send("No cart was found with that user ID");

    if (await cart.removeEvent(eventToRemove)) {
      await cart.update({
        totalPrice: newPrice,
      });
      return res.send(
        `All copies of ${eventToRemove.description} removed from cart`
      );
    } else
      return res.send(`No copies of ${eventToRemove.description} in cart!`);
    // }
  } catch (err) {
    next(err);
  }
};

const clearCart = async (req, res, next) => {
  let { userId } = req.query;
  try {
    let cart = await Cart.findOne({
      where: {
        userId,
        status: "Active",
      },
      include: {
        model: Event,
      },
    });
    if (!cart)
      return res.status(400).send("No cart was found with that user ID");

    await cart.update({
      totalPrice: 0,
    });

    await cart.setEvents([]);
    res.status(200).send("Cart has been emptied");
  } catch (err) {
    next(err);
  }
};

const checkoutCart = async (req, res, next) => {
  let { userId } = req.body;
  try {
    let arrayPromises = [];
    let user = await Users.findByPk(userId);
    let oldCart = await Cart.findOne({
      where: {
        userId: userId,
        status: "Active",
      },
      include: {
        model: Event,
      },
    });
    if (oldCart.events.length === 0)
      return res.status(400).send("Cart is empty");

    //RESTAMOS EL STOCK / CHECKEAMOS SI HAY STOCK
    let events = oldCart.events.map((e) => e.id);
    let newStock = oldCart.events.map((e) => e.stock - e.Cart_Events.amount);

    //SIN STOCK?
    if (!newStock.every((stock) => stock > -1))
      return res
        .status(400)
        .send("A event in the cart does not have enough stock");

    // ACTUALIZO EL STOCK DE TODOS LOS PRODUCTOS DEL CARRITO EN LA DB
    for (let i = 0; i < events.length; i++) {
      arrayPromises.push(
        Event.update(
          {
            stock: newStock[i],
          },
          {
            where: {
              id: events[i],
            },
          }
        )
      );
    }

    arrayPromises.push(
      Cart.update(
        {
          status: "Disabled",
        },
        {
          where: {
            userId,
          },
        }
      )
    );

    let newCart = await Cart.create();
    arrayPromises.push(newCart.setUser(user));

    // SE RESUELVEN TODAS LAS PROMESAS
    await Promise.all(arrayPromises);
    res.status(200).send(oldCart.id);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCart,
  getAllCarts,
  addEventToCart,
  removeOneEventFromCart,
  clearCart,
  checkoutCart,
  checkStock
};
