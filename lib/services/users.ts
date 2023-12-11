import { DanceClass, User, UserModelType } from "@/models";
import {
  lettersAndNumbersOnly,
  stringToObjectId,
} from "@/utils/functions/helpers/string-mutations";
import mongoose from "mongoose";
import { connectDB } from "../config";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

export async function createUser({
  email,
  username,
  photo,
  password,
}: {
  username: string;
  email: string;
  photo?: string;
  password?: string;
}): Promise<UserModelType | null> {
  try {
    if (password) {
      await connectDB();

      // Create the user with a hashed password
      const user = await User.create({
        email,
        username,
        photo,
      });

      return user;
    }

    await connectDB();

    const user = await User.create({ email, username, photo });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserByID({
  userID,
}: {
  userID: string | mongoose.Types.ObjectId;
}): Promise<UserModelType | null> {
  try {
    await connectDB();

    const parsedID =
      typeof userID === "string" ? stringToObjectId(userID) : userID;

    if (!parsedID) throw new Error("Invalid user id");

    const dbUser = await User.findById(parsedID)
      .select("username tag connections groups photo _id")
      .exec();

    if (!dbUser) throw Error("User not found");

    // if (!dbUser.password) return dbUser;

    // const { password, ...userWithoutPass } = dbUser as UserModelType;
    const user = dbUser;

    // if (!userWithoutPass) return null;

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserByEmail({
  email,
}: {
  email: string;
}): Promise<UserModelType | any> {
  try {
    await connectDB();

    // let user: UserModelType;

    const dbUser = await User.findOne({
      email,
    });

    if (!dbUser) return null;

    // if (!dbUser.password) {
    //   user = dbUser;
    //   return user;
    // }

    // console.log("DB_EMAIL_USER", dbUser);

    // const { password, ...userWithoutPass } = dbUser;
    // user = userWithoutPass;

    const user = dbUser;

    return user;
  } catch (error) {
    return error;
  }
}

export async function getUserByTag({ tag }: { tag: string }) {
  try {
    await connectDB();

    console.log("GET USER BY TAG", { tag });

    // let user: UserModelType;

    const dbUser = await User.findOne({
      tag,
    });

    if (!dbUser) return null;

    // if (!dbUser.password) {
    //   user = dbUser;
    //   return user;
    // }

    // const { password, ...userWithoutPass } = dbUser;

    // user = userWithoutPass;

    const user = dbUser;

    return user;
  } catch (err) {
    const error = err as Error;
    return null;
  }
}

export async function deleteUser({ userID }: { userID: string }) {
  try {
    const parsedUserID = stringToObjectId(userID);

    const user = await User.findById(parsedUserID);

    if (!user) throw new Error("user not found");

    await DanceClass.updateMany(
      {
        _id: { $in: user.classes },
        members: parsedUserID,
      },
      { $pullAll: { members: [parsedUserID] } }
    );

    const deletedUser = await User.findByIdAndDelete(user._id);

    console.log("DELETED_USER", deletedUser);

    // TODO: remove user from all events and delete all available user events

    return "success";
  } catch (error) {
    return null;
  }
}

interface UserFilter {
  page?: number;
  limit?: number;
}

export async function getUsers(filter: UserFilter = {}) {
  try {
    await connectDB();
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).lean().exec();

    return users;
  } catch (error) {
    return { error };
  }
}

export async function findUsers({
  userID,
  limit,
  page,
}: {
  userID?: string;
  page?: number;
  limit?: number;
}): Promise<UserModelType[] | null> {
  try {
    if (!userID) throw new Error("Unauthorized");

    const parsedUserID = stringToObjectId(userID);

    const user = await User.findById(parsedUserID);

    if (!user) throw new Error("User not found");

    // get page and limit parameters form request url to paginate user data when fetching from database

    const users: any = await getUsers({ page, limit });
    if (!users) throw new Error("Could not get Users");

    const usersWithoutCommonChats: UserModelType[] = await User.aggregate([
      {
        $match: {
          _id: { $ne: parsedUserID },
          // chats: { $nin: user.chats },
        },
      },
      {
        $project: {
          username: 1,
          tag: 1,
          photo: 1,
          chats: 1,
          connections: 1,
          groups: 1,
        },
      },
    ]);

    console.log("-----UsersWithoutCommonChats: ", usersWithoutCommonChats);

    const filteredUsers = usersWithoutCommonChats.filter(
      (user: UserModelType) => user._id.toString() !== parsedUserID?.toString()
    );

    return filteredUsers;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
