import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    const oldUser = await User.findOne({ email });

    const checkPassword = await bcrypt.compare(password, oldUser.password);

    //if password is wrong
    if (!checkPassword)
      return response.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign({username: oldUser, id: oldUser._id}, 'test', {expiresponseIn: '1h'})

    response.status(200).json({ user: oldUser });
  } catch {
    response.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  try {
    const oldUser = await User.findOne({ email });
    //if user already exists promp message
    if (oldUser)
      return response.status(404).json({ message: "User Already exist" });

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

    newUser
      .save()
      .then(() => response.json("User Added"))
      .catch((err) => response.status(400).json("Error " + err));

    response.status(200).json({ user: newUser });
  } catch (err) {
    response.status(500).json(`error: ${err}`);
  }
};
