import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* Log in a user */
/* Presumptions: Client side makes sure form fields are filled in */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      return res.status(401).json({ error: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const { token, user } = await returnTokenAndUser(existingUser);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

/* Create a new user */
/* Presumptions: Client side makes sure form fields are filled in */
const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });

    const { token, user } = await returnTokenAndUser(createdUser);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Delete a user */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    User.findByIdAndDelete(id, (error, document) => {
      /* The PostSchema.post() middleware will execute here before rest of logic */
      if (error) {
        return res
          .status(404)
          .json({ error: "Error occurred while deleting user" });
      }
      if (!document) {
        return res.status(404).json({ error: "No user with that id" });
      }
      return res.status(204).json({ message: "Successfully deleted user" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/* Helper function to create a signed JWT token and send the token with the user's credentials */
const returnTokenAndUser = async (user) => {
  const tokenContent = {
    id: user._id,
    username: user.username,
  };

  const token = await jwt.sign(tokenContent, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return { token, user: tokenContent };
};

export { login, signup, deleteUser };
