import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";
import Uploadrouter from "./Controllers/UploadFile.js";
// import https from "https"
import fs from "fs"

dotenv.config();

const app = express();

// const options = {
//   key: fs.readFileSync('./server.key'), // replace it with your key path
//   cert: fs.readFileSync('./server.crt'), // replace it with your certificate path
// }

// Configure CORS
const corsOptions = {
  origin: 'https://movie-mosaic-weld.vercel.app/',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// Connect to DB
connectDB();

// Main route
app.get("/", cors(corsOptions), (req, res) => {
  res.send("API is running...");
});

// Other routes
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('Hello, HTTPS World!');
// }).listen(4000, () => {
//   console.log('Server is running on port 4000');
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
