import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { DanceClassModelType } from ".";

@post<UserModelType>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<UserModelType[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "users",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index(
  { username: "text" },
  {
    // unique: true,
    default_language: "english",
  }
)
class UserModelType {
  @prop({ required: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: false })
  public password?: string;

  @prop({ required: true, default: [] })
  public classes: mongoose.Types.ObjectId[];

  @prop({ required: true, default: "" })
  public photo: string;

  @prop({ required: true, default: false })
  public isAdmin: string;

  _id: mongoose.Types.ObjectId | string;

  public id: string;
}

const User = getModelForClass(UserModelType);
export { User, UserModelType };
