import jwt from "jsonwebtoken"
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // ✅ prevents JS access to cookie (more secure)
    sameSite: "strict", // ✅ protects against CSRF
    secure: process.env.NODE_ENV === "development" ? false : true, // ✅ only HTTPS in prod
  });
};
