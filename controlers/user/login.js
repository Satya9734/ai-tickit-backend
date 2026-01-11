import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email or password not match" });
    }

const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) {
      return res.status(404).json({ message: "email or password not match" });
    }

    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_S
    );

    const cleanUser = user.toObject();
    delete cleanUser.password;
    
    res.status(200).send({
      user: cleanUser,
      token,
    });
  } catch (error) {
    
    console.log("error in login time: ", error);
    res.status(500).json({ message: error.message });
  }
};


export default login