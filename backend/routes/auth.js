const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const jwt = require('jsonwebtoken');
const { tbl_users } = require('../databases/models');

router.post("/register", authController.register);
router.post("/login", authController.login);

// Route for verifying email
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
  
    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;
  
      // Find the user in the database by email
      const user = await tbl_users.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Update the user's verification status (set verified to true)
      await user.update({ email_verified: 1 });
  
      // Send a response to the client
    res.status(200).send('Email verified successfully <script>window.close();</script>');

      // Optionally, you can redirect the user to a page confirming their email verification
    //   res.redirect('/email-verified');
    } catch (error) {
      console.error(error);
      res.status(400).send('Invalid or expired token');
    }
  });

module.exports = router;
