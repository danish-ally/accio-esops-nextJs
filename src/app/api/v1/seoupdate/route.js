// import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
// import Seo from "../../../../../models/seo";


export async function POST(request) {

  return NextResponse.json({ message: "Seo data received 1" }, { status: 200 });
}