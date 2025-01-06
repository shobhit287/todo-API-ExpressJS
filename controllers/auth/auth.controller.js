const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const CustomErrorHandler = require("../../customErrorHandler");
const UserService = require("../../service/user.service");
const userService = new UserService();

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    const token = await generateJwtToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        maxAge: parseCookieExpiration(process.env.JWT_EXPIRATION_TIME),
      });
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

async function  logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    });
    return res.status(200).json({message: "Logout successfully"})
  } catch(error) {
    if (error instanceof CustomErrorHandler) {
      return res.status(error.statusCode).json(error.message);
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

const validateUser = async (email, password) => {
  const user = await userService.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  throw new CustomErrorHandler(401, { message: "Invalid Credentials" });
};

const generateJwtToken = async (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRATION_TIME;
  const payload = {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn });
};

const parseCookieExpiration = (expiration) => {
    const time = parseInt(expiration.match(/\d+/)[0]);
    const unit = expiration.match(/[a-zA-Z]+/)[0];
    switch (unit) {
      case 'd':
        return time * 24 * 60 * 60 * 1000;
      case 'h':
        return time * 60 * 60 * 1000;
      case 'm':
        return time * 60 * 1000;
      case 's':
        return time * 1000;
      default:
        throw new Error("Invalid Cookie Expired Time format");
    }
};

module.exports = {
  login,
  logout
};
