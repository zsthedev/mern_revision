import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { authService } from "../services/auth.services.js";

export const register = catchAsyncError(async (req, res, next) => {
  authService.registerUser("shahzaib", "shahzaib@gmail.com");
  res.send("Register route");
});
