import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import entryRouter from "./routes/entry";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Favorite Media API running"));
app.use("/api/entries", entryRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
