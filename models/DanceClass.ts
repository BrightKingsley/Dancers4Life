// "use server";
// "server only";
// import {
//   getModelForClass,
//   ModelOptions,
//   Severity,
//   prop,
//   post,
//   type Ref,
//   index,
// } from "@typegoose/typegoose";
// import mongoose, { Schema } from "mongoose";
// import { User, UserModelType } from "./User";

// @post<DanceClassModelType>("save", (doc) => {
//   if (doc) {
//     doc.id = doc._id.toString();
//     doc._id = doc.id;
//   }
// })
// @post<DanceClassModelType[]>(/^find/, (docs) => {
//   // @ts-ignore
//   // if (docs.op === "find") {
//   // docs.forEach((doc) => {
//   //   doc.id = doc._id.toString();
//   //   doc._id = doc.id;
//   // });
//   // }
// })
// @ModelOptions({
//   schemaOptions: {
//     timestamps: true,
//     collection: "DanceClasses",
//   },
//   options: {
//     allowMixed: Severity.ALLOW,
//   },
// })
// // class Member extends UserDanceClass {
// //   isBlocked: false;
// // }
// @index(
//   { type: "text" },
//   {
//     // unique: true, TODO
//     default_language: "english",
//     weights: {
//       name: 1,
//     },
//   }
// )
// class DanceClassModelType {
//   @prop({ required: true })
//   public type: string;

//   @prop({ required: true })
//   public price: number;

//   @prop({ required: true, default: [] })
//   public description: string;

//   @prop({ required: true, default: [] })
//   public photos: string[];

//   @prop({ required: true, default: new Date() })
//   public startDate: Date;

//   @prop({ required: true, default: new Date() })
//   public endDate: Date;

//   @prop({
//     required: true,
//     // ref: () => UserDanceClass,
//     default: [],
//   })
//   public members: mongoose.Types.ObjectId[];

//   id: string;

//   _id: mongoose.Types.ObjectId | string;
// }

// const DanceClass = getModelForClass(DanceClassModelType);
// export { DanceClass, DanceClassModelType };
// import mongoose, { Document, Schema, Model, Types } from "mongoose";
// import { User, UserModelType } from "./User";

// interface DanceClassModelType extends Document {
//   type: string;
//   price: number;
//   description: string[];
//   photos: string[];
//   startDate: Date;
//   endDate: Date;
//   members: Types.ObjectId[];
//   id: string;
// }

// const DanceClassSchema = new Schema<DanceClassModelType>(
//   {
//     type: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: [String], required: true, default: [] },
//     photos: { type: [String], required: true, default: [] },
//     startDate: { type: Date, required: true, default: new Date() },
//     endDate: { type: Date, required: true, default: new Date() },
//     members: { type: [Schema.Types.ObjectId], required: true, default: [] },
//   },
//   {
//     timestamps: true,
//     collection: "DanceClasses",
//   }
// );

// DanceClassSchema.index(
//   { type: "text" },
//   {
//     default_language: "english",
//     weights: {
//       name: 1,
//     },
//   }
// );

// DanceClassSchema.post<DanceClassModelType>("save", function (doc) {
//   if (doc) {
//     doc.id = doc._id.toString();
//     doc._id = doc.id;
//   }
// });

// const DanceClass: Model<DanceClassModelType> =
//   mongoose.models.DanceClass || mongoose.model("DanceClass", DanceClassSchema);

// export { DanceClass, type DanceClassModelType };

// DanceClassSchema.post<DanceClassModelType[]>("find", function (docs) {
//   // @ts-ignore
//   if (docs.op === "find") {
//     docs.forEach((doc) => {
//       doc.id = doc._id.toString();
//       doc._id = doc.id;
//     });
//   }
// });

import {
  getModelForClass,
  ModelOptions,
  Severity,
  prop,
  post,
  index,
} from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User, UserModelType } from "./User";

@post<DanceClassModelType>("save", (doc) => {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "danceClasses",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index(
  { type: "text" },
  {
    default_language: "english",
    weights: {
      type: 1,
    },
  }
)
class DanceClassModelType {
  @prop({ required: true, unique: true })
  public type: string;

  @prop({ required: true })
  public price: number;

  @prop({ required: true, default: "" })
  public description: string;

  @prop({ required: true, default: [] })
  public photos: string[];

  // @prop({ required: true, default: new Date() })
  // public startDate: Date;

  @prop({ required: true, default: [] })
  public dates: { start: Date; end: Date }[];

  // @prop({ required: true, default: new Date() })
  // public endDate?: Date;

  @prop({
    required: true,
    default: [],
  })
  public members: Types.ObjectId[];

  id?: string;

  _id?: Types.ObjectId | string;
}

const DanceClass = getModelForClass(DanceClassModelType);
export { DanceClass, DanceClassModelType };
