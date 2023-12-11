import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    // const events   = await getEvents()
    const events = "";

    if (!events) return NextResponse.json({ error: "Couldnt get Events" });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" });
  }
}
