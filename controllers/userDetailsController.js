const UserDetails = require("../models/userDetailsModel");
const User = require("../models/authModel");
const middleware = require("../middleware/requirelogin");
// Route to get user details by ID
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user?._id?.toString() ?? '';
    // Find the user details by ID and populate 'profileData' with 'name' and 'email' from the User model
    const userDetails = await UserDetails.findById(id).populate(
      "profileData",
      "name email"
    );

    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postUserDetails = async (req, res) => {
  try {
    const id = req.user?._id?.toString() ?? '';
    const {profilePic, address, personalDetails } = req.body;
    // Check if the referenced User exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found in the User model" });
    }

    // Create new UserDetails document
    const newUserDetails = new UserDetails({
      profileData: id, // The ID referencing the User model
      profilePic,
      address,
      personalDetails,
    });

    // Save the document to the database
    const savedUserDetails = await newUserDetails.save();

    res.status(201).json({
      message: "User details added successfully",
      data: savedUserDetails,
    });
  } catch (error) {
    console.error("Error adding user details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Route to update user details by ID
exports.updateUserDetails = async (req, res) => {
  try {
    const { profilePic, address, personalDetails } = req.body;
    const id = req.user?._id?.toString() ?? '';
    // Find the user details by ID and update with the new data
    const updatedUserDetails = await UserDetails.findByIdAndUpdate(
      id,
      {
        profilePic,
        address,
        personalDetails,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    ).populate("profileData", "name email");

    if (!updatedUserDetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
