import app from "./app.js";
import { connectDB } from "./config/databse.js";

app.get("/", (req, res, next) => {
  res.send("Hello from the server");
});

await connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
