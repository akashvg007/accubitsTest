import userSchema from "../../Models/User";
import { makeResponse } from "../Response/Response";
import { publishToQueue } from "../Services/MQServiece";
import csv from "csv-parser";
import fs from "fs";

export const addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, age } = req.body;
    const count = await userSchema.count();
    const orderObj = new userSchema({
      Id: count,
      firstname,
      lastname,
      email,
      age,
    });
    console.log("controller::addUser:body", req.body);
    const Orders = await orderObj.save();
    makeResponse(res, Orders);
  } catch (err) {
    console.log("Controller::catch::error", err);
    makeResponse(res, [], true);
  }
};

const getUser = async (req, res) => {
  try {
    const Users = await userSchema.find();
    return Users;
  } catch (err) {
    return [];
  }
};

export const sendNewsLetter = async (req, res) => {
  let { csv_file } = req.body;
  const results = [];
  fs.createReadStream(csv_file)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);
      // [
      //   { email : 'akashvg007', content: 'something',name:'news letter name' },
      // ]
    });
  const data = results[0];
  const users = await getUser();
  users.forEach(async (user) => {
    const { firstname, lastname, email } = user;
    let payload = "";
    if (data.email == email)
      payload = `Hi ${firstname} ${lastname}, ${data.content}`;
    await publishToQueue("news-letter", payload); //hard coding the queue name for now
  });
  res.statusCode = 200;
  res.data = { "message-sent": true };
};
