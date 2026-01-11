import User from "../../models/user.js";
import my_ingest from "../../ingest/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { name, email, password, skills = [] } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const acountCreate = await User.create({
      name,
      email,
      password: hashpass,
      skills,
    });

    await my_ingest.send({
      name: "user/signup",
      data: {
        email,
      },
    });

    const token = jwt.sign(
      { _id: acountCreate._id, email: email, role: acountCreate.role },
      process.env.JWT_S
    );

    const cleanUser = acountCreate.toObject();
    delete cleanUser.password;

    return res.send({
      user: cleanUser,
      token,
    });
  } catch (error) {
    console.log("error in acount creating time: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default signup