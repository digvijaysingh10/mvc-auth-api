const express = require("express");
const router = express.Router();

const {
    handleSignin, handleSignup, verifyToken
} = require("../controllers/authController");

router.route("/signup").post(handleSignup);

router.route("/:id/verify/:token").get(verifyToken);

router.route("/signin").post(handleSignin);
/* 

app.get('/users/:id/verify/:token', async (req, res) => {
    const { id, token } = req.params;
  
    // Find the user in the database
    const user = await User.findById(id);
  
    // If the user is not found or the verification token doesn't match, return an error
    if (!user || user.verificationToken !== token) {
      return res.status(400).json({ error: 'Invalid verification link' });
    }
  
    // Update the user's isVerified field and clear the verification token
    user.isVerified = true;
    user.verificationToken = null;
  
    // Save the updated user to the database
    await user.save();
  
    // Return a success message to the client
    return res.status(200).json({ message: 'Email address verified successfully' });
  });
  


 */

module.exports = router;