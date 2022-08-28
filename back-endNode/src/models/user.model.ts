import { ObjectId, ObjectID } from "mongodb";
import mongoose, { Schema, disconnect, model, Model, Document } from "mongoose";
import joi, { boolean, date, number, string } from "joi";

process.env.SUPPRESS_NO_CONFIG_WARNING = "../models/user.model.ts";
const schema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  confirmPassword:{
    type:String,
    required:true
  }
})
export interface Iusers extends Document {
  name: String;
  email: String;
  password:  String | any;
  phone: String;
  gender: number;
  confirmPassword: String | any;
}
export const User = mongoose.model("user", schema);
//vaildtion whene user register
export async function validateUser(user: any) {
  const schema = await {
    name: joi.string().min(8).max(30).required(),
    email: joi.string().email().min(8).max(100).required(),
    phone: joi.number().min(11).required(),
    password: joi.string().min(8).max(28).required(),
    confirmPassword: joi.string().min(8).max(100).required(),
  };
  return joi.validate(user, schema);
}
