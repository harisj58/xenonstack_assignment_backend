import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

// asynchronous function to sign up the user
const signupUser = async (req, res) => {
  try {
    // grab the name, email, username and password from the req body
    const { name, email, username, password } = req.body;
    // check if any other user with the same username or email
    // is present in the database already
    const user = await User.findOne({ $or: [{ email }, { username }] });

    // if there is such a user
    if (user) {
      // stop the signup and indicate it in the response
      return res.status(400).json({ error: "User already exists" });
    }
    // generate the password salt using bcrypt with `10` rounds
    const salt = await bcrypt.genSalt(10);
    // hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user with the supplied credentials
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    // await the addition of user inside the database
    await newUser.save();

    // if a new user is generated successfully
    if (newUser) {
      // generate a JWT token and send it to browser to store as a cookie
      generateTokenAndSetCookie(newUser._id, res);

      // display user details in the response
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      // otherwise indicate failure in the response
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    // catch any errors that show up
    // indicate them in the response
    res.status(500).json({ error: err.message });
    // and log them to the console
    console.log("Error signing up user: ", err.message);
  }
};

// asynchronous function to log in the user
const loginUser = async (req, res) => {
  try {
    // get the email, username and password from request body
    const { email, username, password } = req.body;
    // find a user with the same email or username
    const user = await User.findOne({ $or: [{ email }, { username }] });
    // console.log(user);

    // check if the password is correct by comparing the given
    // password with the hashed password in user
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    // if user does not exist or if the password is not correct
    if (!user || !isPasswordCorrect) {
      // indicate log in failure in response
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // generate a JWT token and send it to browser to store as a cookie
    generateTokenAndSetCookie(user._id, res);

    // indicate user details in response once logged in
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err) {
    // catch any errors that show up
    // indicate them in the response
    res.status(500).json({ error: err.message });
    // log them to the console
    console.log("Error logging in: ", err.message);
  }
};

// asynchronous function to log out the user
const logoutUser = async (req, res) => {
  try {
    // clear the cookie with the key "jwt" by replacing it with "" in 1 ms
    res.cookie("jwt", "", { maxAge: 1 });
    // indicate log out success in response
    res.status(200).json({ message: "User logged out successfully!" });
  } catch (err) {
    // catch any errors that show up
    // indicate them in response
    res.status(500).json({ error: err.message });
    // log them to the console
    console.log("Error signing in: ", err.message);
  }
};

export { signupUser, loginUser, logoutUser };
