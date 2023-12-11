import {
  getModelForClass,
  ModelOptions,
  Severity,
  prop,
  post,
  type Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { User, UserModelType } from "./User";

@post<EventModelType>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<EventModelType[]>(/^find/, (docs) => {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      if (doc) {
        doc.id = doc._id.toString();
        doc._id = doc.id;
      }
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "events",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class EventModelType {
  @prop({ required: true })
  public name: string;
  public photo: string;
  // @prop({ required: true, ref: () => UserClass })
  // public host: mongoose.Types.ObjectId;
  @prop({ required: true })
  public host: mongoose.Types.ObjectId;

  @prop({ required: true, default: [] })
  public participants?: mongoose.Types.ObjectId[];

  @prop({ required: true, default: "" })
  public description: string;

  @prop({ required: true, default: new Date() })
  public date: Date;

  id: string;
  _id: mongoose.Types.ObjectId | string;
}

const Event = getModelForClass(EventModelType);
export { Event, EventModelType };
