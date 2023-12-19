import mongoose from "mongoose";

// define the blueprint of our connect
const connectSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      maxLength: 500,
    },
  },
  {
    timestamps: true, // allows automatic creation of timestamps
  }
);

// create a post model using the defined schema
// the model name will be lowercased and pluralized when added to the db
// so "Connnect" will show up as "connects" in the database
const Connect = mongoose.model("Connect", connectSchema);
export default Connect;
