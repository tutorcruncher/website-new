import { NextResponse } from "next/server";

export async function POST(req) {
  const url = "https://socket.tutorcruncher.com/f8d3735b347ad375b206/enquiry";

  try {
    const body = await req.json();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
