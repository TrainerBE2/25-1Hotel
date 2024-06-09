const {
  tbl_transactions,
  tbl_payments,
  tbl_reservations,
  tbl_rooms_categories,
  tbl_rooms,
  tbl_reviews,
  tbl_users,
  sequelize,
} = require("../databases/models");
const { generateTransactionId } = require("../utils/helper");

const getAllReview = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const totalCount = await tbl_reviews.count();
    const offset = (page - 1) * limit;
    const reviewList = await tbl_reviews.findAll({
      offset,
      limit,
      include: [
        {
          model: tbl_users,
          as: "user",
          attributes: ["first_name", "last_name"],
        },
        {
          model: tbl_reservations,
          as: "reservation",
          attributes: ["createdAt"],
        },
      ],
    });
    const response = {
      total_page: Math.ceil(totalCount / limit),
      current_page: page,
      total_review: totalCount,
      review_list: reviewList,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const createReview = async (req, res) => {
  try {
    const { user_id, reservation_id, rate, comment } = req.body;
    const reviewId = generateTransactionId("RVW/");
    const review = await tbl_reviews.create({
      review_id: reviewId,
      user_id: user_id,
      reservation_id: reservation_id,
      rate: rate,
      verbal: comment,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ Message: error.Message });
  }
};

const archiveReview = async (req, res) => {
  try {
    const { id } = req.query;
    const decodeId = decodeURIComponent(id);
    const review = await tbl_reviews.update(
      { archived: 1 },
      { where: { review_id: decodeId } }
    );
    if (review[0] === 1) {
      res.status(200).json({
        message: "Review has been deleted",
      });
    } else {
      console.log("code id" + decodeId);
      res.status(404).json({ message: "Review Doesn't Exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const restoreReview = async (req, res) => {
  try {
    const { id } = req.query;
    const decodeId = decodeURIComponent(id);
    const review = await tbl_reviews.update(
      { archived: 1 },
      { where: { review_id: decodeId } }
    );
    if (review[0] === 1) {
      res.status(200).json({ message: "Review has been restored" });
    } else {
      res.status(404).json({ message: "Review Doesn`t Exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editReview = async (req, res) => {
  try {
    const { id } = req.query;
    const decodeID = decodeURIComponent(id);
    const review = await tbl_reviews.findByPk(decodeID);
    if (!review) {
      return res.status(404).json({ message: "Review Not Found" });
    }

    const { rate, comment } = req.body;

    await review.update({
      rate: rate,
      verbal: comment,
    });
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByRoomOrUserId = async (req, res) => {
  try {
    const { user_id, room_id } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const whereCondition = {};
    if (user_id) {
      whereCondition.user_id = user_id;
    }

    const includeCondition = [
      {
        model: tbl_users,
        as: "user",
        attributes: ["first_name", "last_name"],
      },
      {
        model: tbl_reservations,
        as: "reservation",
        attributes: ["room_id", "createdAt"],
      },
    ];

    if (room_id) {
      includeCondition[1].where = { room_id };
    }

    const { count, rows: reviewList } = await tbl_reviews.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      include: includeCondition,
    });

    const response = {
      total_page: Math.ceil(count / limit),
      current_page: page,
      total_review: count,
      review_list: reviewList,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReview,
  archiveReview,
  restoreReview,
  editReview,
  getReviewsByRoomOrUserId,
};
