import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
  },

  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpire: {
    type: Date,
  },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
  },

  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

export const Auth = mongoose.model("Auth", schema);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
