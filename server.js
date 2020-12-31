import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { addUser, sendNewsLetter } from "./src/Controller/Controller";

const url = "mongodb://localhost/accubits";

const app = express();
const PORT = 4000;

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("db connected...");
});

app.use(cors());
app.use(express.json());

app.post("/adduser", (req, res) => {
  addUser(req, res);
});

app.post("/sendnewsletter", (req, res) => {
  sendNewsLetter(req, res);
});

app.listen(PORT, (err) => console.log(`Server is listening on port ${PORT}`));
