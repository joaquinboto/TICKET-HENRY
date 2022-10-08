const { use } = require("passport");
const { where } = require("sequelize");
const { ReviewScore } = require("../db");

const getReviewScore = async (req, res) => {
  const { eventId } = req.query;
  try {
    const review = await ReviewScore.findAll({
      where: {
        eventId: eventId,
      },
    });
    if (!review) res.json("Review not found");
    res.json(review);
  } catch (error) {
    console.log(error);
  }
};

const postReviewScore = async (req, res) => {
  const { eventId } = req.params;
  const { description, score, userId, username } = req.body;

  try {
    const review = await ReviewScore.findOne({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    // if (review) return res.json("You already left a review on this event")
    const newReview = await ReviewScore.create({
      username,
      description,
      score,
      userId,
      eventId: eventId,
    });
    res.json(newReview);
  } catch (error) {
    console.log(error);
  }
};

const putReviewScore = async (req, res) => {
  const { eventId } = req.params;
  const { userId, description, score } = req.body;
  const getReview = await ReviewScore.findOne({
    where: {
      userId: userId,
      eventId: eventId,
    },
  });
  if (!getReview) return res.json("Review not found");
  try {
    await ReviewScore.update(
      {
        description: description,
        score: score,
      },
      {
        where: {
          userId: userId,
          eventId: eventId,
        },
      }
    );
    const review = await ReviewScore.findOne({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });
    res.status(200).send(review);
  } catch (error) {
    console.log(error);
  }
};

const deleteReviewScore = (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  try {
    const review = ReviewScore.destroy({
      where: {
        eventId: eventId,
        userId: userId,
      },
    });
    if (!review) return res.status(404).send("Comment not found");
    res.status(200).send("The comment was removed successfully");
  } catch (error) {
    console.log(error);
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ReviewScore.findAll({
      where: { userId: id },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getReviewScore,
  postReviewScore,
  putReviewScore,
  deleteReviewScore,
  getComments,
};
