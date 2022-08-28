// express to desgin API
import express, { Application, request, Router } from "express";
//Mongoose for database
import mongoose, { Schema, disconnect, model } from "mongoose";
//To creat server real time
// import socketIo, { Server, Socket } from "socket.io";
// Route files
import users from "./routers/user.router";
import login from "./routers/auth.router";
//To send data in body
import bodyParser from "body-parser";
// For create http server 
import http from "http";
import cookieParser from "cookie-parser";
//connect to mongoDB
// you can use your name account and password on mongodb like this mongodb+srv://name:password @temwork-vxavl.mongodb.net/main?retryWrites=true&w=majority
// or useing local like mongodb://localhost:27017
mongoose
  .connect(`mongodb+srv://abdo2020:01123689625@temwork-vxavl.mongodb.net/userLo?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB...");
  })
  .catch((err) => console.log(`Could not connect to mongoDB...${err.message}`));
  //Created Server real time basd on Socet.io and prtcol http
const app: Application = express();
const server = http.createServer(app);
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
// for cros originl
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authentication, X-Requested-With"
    );
    next();
  })
  .use(express.json())
  .use("/uploads", express.static("./uploads"))
    //Mount routers
  .use("/api/v1/user/", users)
  .use("/api/v1/auth/login", login)
const PORT: any = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listing now to PORT ${PORT}...`);
});
