import { NextRequest, NextResponse } from "next/server";
import { addEvent, getEvents } from "@/lib/store";
import { get } from "http";

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.type || !body.userId) {
        return NextResponse.json({ error: "type and userId are required" }, { status: 400 });
    }

    const event = addEvent({
        type: body.type,
        userId: body.userId,
        metadata: body.metadata,
    })

    return NextResponse.json(event, { status: 201 });
}

export async function GET() {
    const events = getEvents();
    return NextResponse.json(events);
}