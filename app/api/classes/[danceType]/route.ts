import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import {
  getDanceClassByID,
  deleteDanceClass,
  addMemberToDanceClassByID,
  requestMembership,
  updateDanceClass,
} from "@/lib/services";
import { DanceClass } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const saltRounds = 10;

type GetProps = {
  params: {
    danceType: string;
  };
};

//pass 281019512623462
export async function GET(
  request: NextRequest,
  { params: { danceType } }: GetProps
) {
  try {
    const { searchParams } = new URL(request.url);

    const password = searchParams.get("password");

    const headersList = headers();
    const userID = headersList.get("user_id");

    console.log("GROUP_GET--UERID", userID);

    // const {password} = await request.json()
    const danceClass = await getDanceClassByID({
      danceType: danceType,
    });

    console.log("GROUP", danceClass);

    if (!danceClass) throw new Error("Couldnt get DanceClasss");

    return NextResponse.json({ danceClass });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error });
  }
}

type PostProps = {
  params: {
    danceType: string;
  };
};

type PatchProps = {
  name?: string;
  description?: string;
  password?: string | boolean;
  photo: string;
  tag: string;
};

export async function PUT(
  request: NextRequest,
  { params: { danceType } }: PostProps
) {
  try {
    const serverSession = await getServerSession(authOptions);

    const { userID } = await request.json();

    if (!(serverSession?.user && serverSession?.user.id))
      throw new Error("Unauthorized Access");

    const sessionUserID = serverSession.user.id;

    const danceClassDoc = await DanceClass.findById(
      `stringToObjectId(danceType)`
    );
    if (!danceClassDoc)
      throw new Error("Couldn't retrieve danceClass document");

    // if (sessiostringToObjectId(danceType)nUserID !== danceClassDoc.owner.toString() && sessionUserID !== userID)
    //   throw new Error("Unauthorized!");

    let result;
    if (
      // danceClassDoc.password.length < 1 ||
      // danceClassDoc.owner.toString() === userID
      ""
    ) {
      result = await addMemberToDanceClassByID({
        danceType,
        userID,
      });
    } else {
      result = await requestMembership({ danceType, userID });
    }

    if (!result) throw new Error("Could'n add member to danceClass");

    return NextResponse.json(result);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function PATCH(
  request: NextRequest,
  { params: { danceType } }: PostProps
) {
  try {
    const body = await request.json();
    const { name, description, photo, tag, password }: PatchProps = body;

    const serverSession = await getServerSession(authOptions);
    if (!serverSession || !serverSession.user || !serverSession.user.id)
      throw new Error("Invalid User");

    const userID = serverSession.user.id;
    const updateDanceClassResult = await updateDanceClass({
      danceType,
      userID,
      name,
      description,
      photo,
      tag,
      password,
    });
    // if (!updateDanceClassResult) throw new Error("Couldn't update danceClass");
    return NextResponse.json(updateDanceClassResult);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(null);
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { danceType } }: PostProps
) {
  try {
    // const serverSession = await getServerSession(authOptions);
    // if (!serverSession || !serverSession.user || !serverSession.user.id)
    //   throw new Error("Invalid User");

    // const userID = serverSession.user.id;
    // if (!(name && id))

    console.log("REACHED");

    const danceClassDeleted = await deleteDanceClass({
      danceType,
    });

    return NextResponse.json(
      {
        message: danceClassDeleted,
      },
      { status: 204, statusText: "No Content" }
    );
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
