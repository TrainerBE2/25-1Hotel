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
          attributes: ["first_name"],
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
      rate: rate,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ Message: error.Message });
  }
};

module.exports = { createReview, getAllReview };
