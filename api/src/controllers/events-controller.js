const { Event } = require("../db");
const fs = require("fs");
const uploadImage = require("../helpers/cloudinary");
const fsExtra = require("fs-extra");

const createEvent = async (req, res) => {
  const {
    description,
    price,
    date,
    artist,
    place,
    stock,
    category,
    image,
    imageId,
    userId,
  } = req.body;

  try {
    const newEvent = await Event.create({
      description,
      price,
      date,
      artist,
      place,
      currentStock: stock,
      stock,
      category,
      image,
      imageId,
    });
    newEvent.setUser(userId);
    res.json(newEvent);
  } catch (error) {
    console.log(error);
  }
};

const updateEvent = async (req, res) => {
  const {
    description,
    price,
    date,
    artist,
    place,
    stock,
    category,
    image,
    imageId,
  } = req.body;
  console.log(req.body);
  const { id } = req.params;
  try {
    if (!id) res.status(404).json({ message: "id is require..." });
    let eventUpdate = await Event.findOne({ where: { id } });
    if (!eventUpdate) res.status(404).json({ message: "event not found..." });

    if (description) await Event.update({ description }, { where: { id } });
    if (price) await Event.update({ price }, { where: { id } });
    if (date) await Event.update({ date }, { where: { id } });
    if (artist) await Event.update({ artist }, { where: { id } });
    if (place) await Event.update({ place }, { where: { id } });
    if (stock) await Event.update({ stock }, { where: { id } });
    if (category) await Event.update({ category }, { where: { id } });
    if (image) {
      await uploadImage.deleteImage(eventUpdate.imageId);
      await Event.update({ image, imageId }, { where: { id } });
    }
    eventUpdate = await Event.findOne({ where: { id } });
    res.status(200).json(eventUpdate);
  } catch (error) {
    console.log(error);
  }
};

const deleteEvents = async (req, res) => {
  const { id } = req.params;

  if (id.includes("-")) {
    try {
      let deleteEvent = await Event.update(
        { isActive: false },
        {
          where: {
            id: id,
          },
        }
      );
      if (deleteEvent[0] === 0) {
        return res.status(404).send("Event not found");
      }

      console.log(deleteEvent);
      res.status(200).send("The event was removed successfully");
    } catch (error) {
      console.log(error);
      res.status(404).send("Event not found");
    }
  } else {
    try {
      let response = await Event.update(
        { isActive: false },
        {
          where: {
            id: id,
          },
        }
      );
      if (response[0] === 0) {
        return res.status(404).send("Event not found");
      }
      console.log(response);
      res.status(200).send("The event was removed successfully");
    } catch (error) {
      console.log(error);
      res.status(404).send("Event not found");
    }
  }
};

const getEvents = async (req, res) => {
  const eventsCreated = await Event.findAll({
    where: {
      isActive: true,
    },
  });
  try {
    res.json(eventsCreated);
  } catch (error) {
    console.log(error);
  }
};

const getEventDetail = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let detail;

  if (id.includes("-")) {
    try {
      detail = await Event.findOne({
        where: {
          id: id,
        },
      });
      console.log(detail);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await Event.findOne({
        where: {
          id: id,
        },
      });
      const elem = response.dataValues;
      detail = {
        id: elem.id,
        description: elem.description,
        price: elem.price,
        date: elem.date,
        artist: elem.artist,
        place: elem.place,
        stock: elem.stock,
        category: elem.category,
        isActive: elem.isActive,
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("ID not found");
  }
};

const getEventsDetailDb = async (req, res) => {
  const { id } = req.params;
  let detail;

  if (id.includes("-")) {
    try {
      detail = await Event.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await Event.findOne({
        where: {
          id: id,
        },
      });
      const elem = response.dataValues;
      detail = {
        id: elem.id,
        description: elem.description,
        price: elem.price,
        date: elem.date,
        artist: elem.artist,
        place: elem.place,
        stock: elem.stock,
        category: elem.category,
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("ID not found");
  }
};

const getEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const eventsById = await Event.findAll({
      where: { userId: id, isActive: true },
    });
    // console.log(eventsById);
    res.status(200).json(eventsById);
  } catch (error) {
    res.send(error.message);
  }
};

const getEventHome = async (req, res) => {
  try {
    let eventos;
    const evento1 = await Event.findOne({
      where: {
        stock: stock <= 200,
      },
    });
    res.status(200).json(evento1);
    console.log(evento1);
  } catch (error) {
    console.log(error);
  }
};

const ticketsSoldAndAvailableAndAvailableEvents = async (req, res) => {
 

  try {
    const { count, rows } = await Event.findAndCountAll();
    console.log(count);

    const currentStock = rows.map((el) => el.currentStock).reduce((acc, row) => acc + row, 0);
    const stock = rows.map((el) => el.stock).reduce((acc, row) => acc + row, 0);
    const soldTickets = currentStock - stock
    const allStock = rows.map((el) => el.stock).reduce((acc, row) => acc + row, 0);

    res.status(200).json({ soldTickets , activeEvent: count , allStock });
  } catch (error) {
    res.send("error...", error);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventsDetailDb,
  getEventDetail,
  deleteEvents,
  updateEvent,
  getEventsById,
  getEventHome,
  ticketsSoldAndAvailableAndAvailableEvents,
};
