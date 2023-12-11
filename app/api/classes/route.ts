import { NextResponse, NextRequest } from "next/server";

import {
  createDanceClass,
  deleteAllDanceClasses,
  exitDanceClass,
  getDanceClasses,
} from "@/lib/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { customErrorResponse } from "@/utils/functions/server/error";

export async function GET() {
  try {
    const danceClasss = await getDanceClasses({});

    if (!danceClasss)
      return NextResponse.json({ error: "Couldnt get DanceClasses" });

    return NextResponse.json(danceClasss);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      description,
      photos,
      price,
      type,
      dates,
    }: Parameters<typeof createDanceClass>[0] = await request.json();

    console.log({
      type,
      description,
      photos,
    });

    const serverSession = await getServerSession(authOptions);

    const user = serverSession?.user;

    console.log("CREATE_CLASS_USER_SESSSION", { user });

    // if (!(user && user.id && user.isAdmin))
    //   return NextResponse.json(
    //     {
    //       message: "Unauthorized access",
    //     },
    //     { status: 401, statusText: "Unauthorized" }
    //   );

    // if (!ID)
    //   return NextResponse.json({
    //     error: {
    //       message: "Please Provide a type and description for the danceClass",
    //     },
    //   });

    console.log("CREATE_CLASS-data", type, description);

    if (!(type && description && photos))
      return NextResponse.json(
        {
          message: "Please Provide a danceClass type, tag and description",
        },
        { status: 400, statusText: "Bad Request" }
      );

    const danceClass = await createDanceClass({
      type,
      description,
      photos,
      price,
      dates,
    });

    console.log("DANCE_CLASS_CREATED", { danceClass });

    if (!danceClass)
      return NextResponse.json("Couldnt Create DanceClass", { status: 400 });

    return NextResponse.json(danceClass);
  } catch (error: any) {
    console.error({ error, code: error.code });
    return NextResponse.json(customErrorResponse(error), { status: 500 });
  }
}

type PostProps = {
  params: {
    ID: string;
  };
};
