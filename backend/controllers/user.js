const { validateUsername } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const { generateToken } = require("../helpers/tokens");

// Function to register new users
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
      sYear,
      sMonth,
      batch,
    } = req.body;

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This Email address already exists, try with a different email address",
      });
    }

    // Encrypting the Passwords (using BCrypt)
    // Here, 12 is the salt value, greater the salt value is more harder is the encryption method
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Validate Usernames (usernames are made using first + last name)
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    // Creating a new User
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      gender,
      bYear,
      bMonth,
      bDay,
      sYear,
      sMonth,
      batch,
    }).save();

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      bYear: user.bYear,
      bMonth: user.bMonth,
      bDay: user.bDay,
      sYear: user.sYear,
      sMonth: user.sMonth,
      batch: user.batch,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to activate the accounts of new users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking the email id
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "The Email address you entered is not connected to an account.",
      });
    }
    // Checking the password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      bYear: user.bYear,
      bMonth: user.bMonth,
      bDay: user.bDay,
      sYear: user.sYear,
      sMonth: user.sMonth,
      batch: user.batch,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(
      req.user.id,
      {
        picture: url,
      },
      { new: true }
    );
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payments = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      payment_method_types: ["card"], // Allow only card payments
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Yog-Sadhana",
            },
            unit_amount: 50000, // 500 INR in minor currency (paise)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/`,
      cancel_url: `${process.env.BASE_URL}/login`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};
