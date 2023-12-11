// Import necessary modules and dependencies
import { DanceClass, DanceClassModelType, User } from "@/models";
import { connectDB } from "../config";
import {
  lettersAndNumbersOnly,
  stringToObjectId,
} from "@/utils/functions/helpers/string-mutations";
import mongoose from "mongoose";

// Define the number of salt rounds for password hashing
const saltRounds = 10;

/**
 * Create a new danceClass.
 *
 * @param {object} danceClassData - DanceClass creation data.
 * @param {string} danceClassData.ownerID - ID of the danceClass owner.
 * @param {string} danceClassData.type - DanceClass type.
 * @param {string} danceClassData.description - DanceClass description.
 * @param {boolean} danceClassData.password - Wgether the danceClass requires a password.
 * @returns {Promise<object>} - A new danceClass or an error object.
 */
export async function createDanceClass({
  type,
  description,
  photos,
  price,
  dates,
}: {
  type: string;
  description: string;
  price: string;
  photos: string[];
  dates: any[];
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the owner's ID

    let genPass = "";
    let hashedPassword = "";
    // if (password) {
    //   // Generate a random password
    //   genPass = generatePassword(8);

    //   // Generate a salt for password hashing
    //   const salt = await bcrypt.genSalt(saltRounds);

    //   // Hash the generated password
    //   hashedPassword = await bcrypt.hash(genPass, salt);

    //   console.log("HASHED_PASS", hashedPassword);
    // }

    // Create the danceClass with a hashed password
    const danceClassDoc = await DanceClass.create({
      type: type.trim().toLowerCase(),
      description: description.trim(),
      password: hashedPassword,
      photos,
      price,
      dates,
    });

    if (!danceClassDoc) return null;

    // const danceClass = {
    //   owner: danceClassDoc.owner,
    //   type: danceClassDoc.type,
    //   description: danceClassDoc.description,
    //   password: genPass,
    //   members: danceClassDoc.members,
    //   photo: danceClassDoc.photo,
    //   tag: danceClassDoc.tag,
    // };
    const danceClass = danceClassDoc;

    // Check if the conversation was created successfully

    return danceClass;
  } catch (error) {
    // console.error({ error });
    throw error;
    // return null;
  }
}

export async function updateDanceClass({
  danceType,
  userID,
  name,
  description,
  photo,
  tag,
  password,
}: {
  danceType: string;
  userID: string;
  name: string | undefined;
  description: string | undefined;
  photo: string;
  tag: string;
  password: string | boolean | undefined;
}) {}

export async function getDanceClassByID({ danceType }: { danceType: string }) {
  try {
    await connectDB();

    const parsedDanceClassID = stringToObjectId(danceType);

    const danceClass = await DanceClass.findById(parsedDanceClassID);

    if (!danceClass) throw new Error("DanceClass not found");

    const danceClassInfo = {
      type: danceClass.type,
      description: danceClass.description,
      photos: danceClass.photos,
      members: danceClass.members,
    };

    return danceClassInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getDanceClassByType(type: string) {
  try {
    await connectDB();

    const danceClass = await DanceClass.findOne({ type });
    console.log({ danceClass });
    if (!danceClass) throw new Error("DanceClass not found");

    const danceClassInfo = {
      type: danceClass.type,
      id: danceClass._id.toString(),
      description: danceClass.description,
      photos: danceClass.photos,
      members: danceClass.members,
      dates: danceClass.dates,
    };

    return danceClassInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Get a danceClass by its ID.
 *
 * @param {object} query - Query parameters.
 * @param {string} query.danceType - ID of the danceClass to retrieve.
 * @param {string} query.password - Password for accessing a password-protected danceClass.
 * @returns {Promise<object>} - The requested danceClass or an error object.
 */

/*
export async function getDanceClassByID({
  danceType,
  password,
}: {
  danceType: string;
  password?: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the danceClass's ID
    const parsedDanceClassID = stringToObjectId(danceType);

    console.log("parsedDanceClassID", parsedDanceClassID);

    // Check if the danceClass's ID is valid
    if (!parsedDanceClassID) throw new Error("DanceClass not Found");

    // Find the danceClass by its ID
    const danceClass = await DanceClass.findById(parsedDanceClassID);

    console.log("FOUND_GROUP", danceClass);

    // If the danceClass is not found, return an error
    if (!danceClass) throw new Error("DanceClass not found");

    if (danceClass.password) {
      console.log("password available");

      // Check if a password is provided and compare it with the hashed password
      if (!password) throw new Error("Password Incorrect");

      const match = await bcrypt.compare(password, danceClass.password);

      if (!match) throw new Error("Password Incorrect");

      return {
        danceClass,
        password,
      };
    }

    return danceClass;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
*/

export async function exitDanceClass({
  userID,
  danceType,
  sessionUser,
}: {
  userID: string;
  danceType: string;
  sessionUser: string;
}) {
  try {
    const parsedUserID = stringToObjectId(userID);
    const parsedDanceClassID = stringToObjectId(danceType);

    if (!(parsedUserID && parsedDanceClassID))
      return "Invalid User or danceClass ID";

    const danceClass = await DanceClass.findById(parsedDanceClassID);
    if (!danceClass) return "DanceClass not found";

    const updatedDanceClass = await DanceClass.findOneAndUpdate(
      { _id: parsedDanceClassID, members: parsedUserID }, // Check if userIdToRemove exists in connections array
      { $pull: { members: parsedUserID } }, // Remove userIdToRemove from connections
      { new: true } // Return the updated user document
    ).exec();

    const updatedUser = await User.findOneAndUpdate(
      { _id: parsedUserID, danceClasses: parsedDanceClassID }, // Check if danceClassIdToRemove exists in danceClasses array
      { $pull: { danceClasses: parsedDanceClassID } }, // Remove danceClassIdToRemove from danceClasses
      { new: true } // Return the updated user document
    ).exec();

    if (!(updatedDanceClass && updatedUser)) return "Couldn't exit danceClass";

    return "exited danceClass successfully";
  } catch (error) {
    console.error({ error });
    return null;
  }
}

/**
 * Delete a danceClass by its ID.
 *
 * @param {object} params - Parameters for danceClass deletion.
 * @param {string} params.danceType - ID of the danceClass to delete.
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteDanceClass({ danceType }: { danceType: string }) {
  try {
    // Connect to the database
    await connectDB();
    const danceClassDoc = await DanceClass.findOne({ type: danceType });
    if (!danceClassDoc) throw new Error("Couldn't get DanceClass");

    // Find the danceClass by its ID

    // Find and delete the danceClass by its ID
    // const danceClassDoc = await DanceClass.findByIdAndDelete(danceType);

    danceClassDoc.members?.forEach(async (member) => {
      await User.findOneAndUpdate(
        { _id: member, classes: danceClassDoc.type }, // Check if danceClassIdToRemove exists in danceClasses array
        { $pull: { danceClasses: danceClassDoc.type } }, // Remove danceClassIdToRemove from danceClasses
        { new: true } // Return the updated user document
      ).exec();
    });

    const deletedDanceClass = await danceClassDoc.deleteOne();

    console.log({ deletedDanceClass });

    return "Deleted Successfully";
  } catch (error) {
    console.error({ error });
    return null;
  }
}

/**
 * Delete all danceClasses.
 *
 * @returns {Promise<boolean | object>} - True if deletion is successful or an error object.
 */
export async function deleteAllDanceClasses() {
  try {
    // Connect to the database
    await connectDB();

    // Delete all danceClasses
    await DanceClass.deleteMany();
    return true;
  } catch (error: any) {
    return { error };
  }
}

// Define a filter interface for danceClass retrieval
interface DanceClassFilter {
  page?: number;
  limit?: number;
}

/**
 * Get a list of danceClasses with optional pagination.
 *
 * @param {DanceClassFilter} filter - Filtering and pagination options.
 * @returns {Promise<object>} - An array of danceClasses or an error object.
 */
export async function getDanceClasses(params: { filter?: DanceClassFilter }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract filtering and pagination options
    const page = params?.filter?.page ?? 1;
    const limit = params?.filter?.limit ?? 10;
    const skip = (page - 1) * limit;

    // Find and retrieve danceClasses with optional pagination
    const danceClassDocs = await DanceClass.find()
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    if (!danceClassDocs) throw new Error("Couldnt get DanceClasses");

    const danceClasses: DanceClassModelType[] = danceClassDocs.map(
      (danceClass) => danceClass
    );

    console.log("GROUPSS:", danceClasses);
    return danceClasses;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Add a member to a danceClass by danceClass name.
 *
 * @param {object} params - Parameters for adding a member to a danceClass.
 * @param {string} params.name - DanceClass name.
 * @param {string} params.userID - ID of the user to add to the danceClass.
 * @returns {Promise<object>} - The updated danceClass or an error object.
 */

// TODO Check if this function is really needed
export async function findDanceClassByTagAndAddMember({
  tag,
  userID,
}: {
  tag: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedUserID = stringToObjectId(userID);

    if (!parsedUserID) throw new Error("Invalid UserId");

    // Find the danceClass by tag and add the user as a member
    const danceClassDoc = await DanceClass.findOneAndUpdate(
      {
        tag,
        members: { $nin: [parsedUserID] },
      },
      { $addToSet: { members: parsedUserID } },
      { new: true }
    ).exec();

    if (!danceClassDoc) throw new Error("Couldn't Update DanceClass doc");

    const userDoc = await User.findOneAndUpdate(
      { _id: parsedUserID, danceClasses: { $nin: [danceClassDoc._id] } },
      { $addToSet: { danceClasses: danceClassDoc._id } },
      { new: true }
    ).exec();

    if (!userDoc) throw new Error("Couldn't Update User doc");

    console.log({ danceClassDoc, userDoc });

    danceClassDoc.save();
    userDoc.save();

    // const danceClassMembers = danceClassDoc.members;
    const danceClass = {
      _id: danceClassDoc._id,
      members: danceClassDoc.members,
    };

    return danceClass;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addMemberToDanceClassByID({
  danceType,
  userID,
}: {
  danceType: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedUserID = stringToObjectId(userID);
    const parsedDanceClassID = stringToObjectId(danceType);

    if (!parsedUserID) throw new Error("Invalid UserId");

    const danceClassDOcument = await DanceClass.findById(parsedDanceClassID);
    const userDOcument = await User.findById(parsedUserID);
    console.log({ danceClassDOcument, userDOcument });

    // Find the danceClass by danceType and add the user as a member
    const danceClassDoc = await DanceClass.findOneAndUpdate(
      {
        _id: parsedDanceClassID,
        members: { $nin: [parsedUserID] },
      },
      { $addToSet: { members: parsedUserID } },
      { new: true }
    ).exec();
    console.log({ danceClassDoc });

    if (!danceClassDoc) throw new Error("Couldn't Update DanceClass doc");

    const userDoc = await User.findOneAndUpdate(
      { _id: parsedUserID, danceClasses: { $nin: [danceClassDoc._id] } },
      { $addToSet: { danceClasses: danceClassDoc._id } },
      { new: true }
    ).exec();

    console.log({ danceClassDoc, userDoc });
    if (!userDoc) throw new Error("Couldn't Update User doc");

    danceClassDoc.save();
    userDoc.save();

    // const danceClassMembers = danceClassDoc.members;

    const danceClass = {
      _id: danceClassDoc._id,
      members: danceClassDoc.members,
    };

    return danceClass;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestMembership({
  danceType,
  userID,
}: {
  danceType: string;
  userID: string;
}) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the user's ID
    const parsedUserID = stringToObjectId(userID);
    const parsedDanceClassID = stringToObjectId(danceType);

    if (!parsedUserID) throw new Error("Invalid UserId");

    // Find the danceClass by danceType and add the user as a member
    const danceClassDoc = await DanceClass.findOneAndUpdate(
      {
        _id: parsedDanceClassID,
        members: { $nin: [parsedUserID] },
        joinRequests: { $nin: [parsedUserID] },
      },
      { $addToSet: { joinRequests: parsedUserID } },
      { new: true }
    ).exec();

    if (!danceClassDoc) throw new Error("Couldn't Update DanceClass doc");

    const userDoc = await User.findOneAndUpdate(
      {
        _id: parsedUserID,
        danceClasses: { $nin: [danceClassDoc._id] },
        danceClassesRequested: { $nin: [danceClassDoc._id] },
      },
      { $addToSet: { danceClassesRequested: danceClassDoc._id } },
      { new: true }
    ).exec();

    if (!userDoc) throw new Error("Couldn't Update User doc");

    console.log({ danceClassDoc, userDoc });

    danceClassDoc.save();
    userDoc.save();

    return "success";
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMembers({
  userID,
  danceType,
}: {
  userID: string;
  danceType: string;
}) {
  try {
    const parsedUserID = stringToObjectId(userID);
    const parsedDanceClassID = stringToObjectId(danceType);

    const user = await User.findById(parsedUserID);
    // if (
    //   !user?.danceClasses
    //     .map((danceClass) => danceClass.toString())
    //     .includes(danceType)
    // )
    //   throw new Error("User not a member of this DanceClass");

    const danceClassMembersDocument = await DanceClass.findById(
      parsedDanceClassID
    ).select("members");

    if (!danceClassMembersDocument)
      throw new Error("Couldn't find danceClass document");

    const danceClassMembers = await Promise.all(
      danceClassMembersDocument.members
        .filter((member) => member.toString() !== userID)
        .map(async (memberID) => {
          const userDoc = await User.findById(memberID);
          if (!userDoc)
            throw new Error("Couldn't retrieve danceClass document");
          const userInfo = {
            username: userDoc.username,
            photo: userDoc.photo,
          };

          return userInfo;
        })
    );

    console.log("MEMEMEMEMEMEMMEMEBBBBBEEEERRRRRRRSSSSSS", {
      user,
      danceClassMembers,
    });
    if (!danceClassMembers) throw new Error("Could not get danceClass members");

    return danceClassMembers;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
