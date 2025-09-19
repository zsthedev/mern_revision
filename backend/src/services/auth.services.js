import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { Vendor } from "../models/vendor.model.js";

const roles = {
  user: User,
  vendor: Vendor,
  admin: Admin,
};

class AuthServices {
  registerUser(name, email) {
    console.log(name, email);
  }
}

export const authService = new AuthServices();
