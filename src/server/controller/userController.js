import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    const oldUser = await User.findOne({ email });

    const checkPassword = await bcrypt.compare(password, oldUser.password);

    //if password is wrong
    if (!checkPassword) {
      return response
        .status(400)
        .json({ error: "Incorrect email or password" });
    }
    response.status(200).json({ user: oldUser });
    return;
  } catch (err) {
    response.status(500).json({ error: "Incorrect email or password" });
    return;
  }
};

export const signUp = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    const oldUser = await User.findOne({ email });

    //if user already exists promp message
    if (oldUser)
      return response.status(404).json({ message: "Email already exist" });

    // so password wont saved in a plain text
    // 12 - level of dificulty to hash password

    const hashedPassword = await bcrypt.hash(password, 12);
    // const result = await User.create({username: `${username}`, password: hashedPassword });
    const newUser = await new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    newUser.save();

    response.status(200).json({ user: newUser });
    return;
  } catch (err) {
    response.status(500).json(`error: ${err}`);
    return;
  }
};
