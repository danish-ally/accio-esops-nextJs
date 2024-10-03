import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Seo from "../../../../../models/seo";

export async function GET(request, { params }) {
    const pageUrl = request.nextUrl.searchParams.get("pageUrl");
    await connectMongoDB();
    const seo = await Seo.findOne({ pageUrl: pageUrl });
  
    if (seo) {
      return NextResponse.json(
        { message: "got page successfully", seo },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Seo not found" }, { status: 404 });
    }
  }