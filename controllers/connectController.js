import Connect from "../models/connectModel.js";
import User from "../models/userModel.js";

// asynchronous function to create a connect
const createConnect = async (req, res) => {
  try {
    // grab required info from request body
    const { postedBy, name, email, message } = req.body;

    // if the user posting or the text is missing
    if (!postedBy || !message) {
      // indicate failure as they are necessary for posting
      return res
        .status(400)
        .json({ error: "Insufficient data to create a post" });
    }

    // get user details by searching using his ID
    const user = await User.findById(postedBy);
    // console.log(user);

    // if no such user is found
    if (!user) {
      // indicate failure in response
      return res.status(404).json({ error: "User not found" });
    }

    // define max length for message as per connect schema
    const maxLength = 500;
    // if the connect's message's length exceeds it
    if (message.length > maxLength) {
      // indicate failure in response
      return res
        .status(400)
        .json({ error: `Text must be less than ${maxLength} characters` });
    }

    // create a new connect using the details
    const newConnect = new Connect({
      postedBy,
      name,
      email,
      message,
    });

    // await addition of new connect to database
    await newConnect.save();

    // indicate success in response
    return res
      .status(201)
      .json({ message: "Connect created successfully", newConnect });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error creating a connect: ", err);
  }
};

export { createConnect };
