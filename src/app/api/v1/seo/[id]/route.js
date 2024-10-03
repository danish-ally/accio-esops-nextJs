import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Seo from "../../../../../models/seo";


export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const requestBody = await request.json();
    const { pageUrl} = requestBody;

    await connectMongoDB();

    // Check if pageUrl, ogUrl, or ogImageUrl already exist
    const existingSeo = await Seo.findOne({
      $or: [{ pageUrl }]
    });

    if (existingSeo && existingSeo._id != id) {
      return NextResponse.json({ error: true, message: "URL already exists" }, { status: 400 });
    }

    const updatedDocument = await Seo.findByIdAndUpdate(id, requestBody, { new: true });

    if (updatedDocument) {
      return NextResponse.json({ error: false, message: "Seo updated", updatedDocument }, { status: 200 });
    } else {
      return NextResponse.json({ error: true, message: "Seo not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}



// export async function PATCH(request, { params }) {
//     try {
//       await connectMongoDB();
  
//       const { id } = params;
//       const requestBody = await request.json();
  
//       const existingUser = await Seo.findById(id);
  
//       if (!existingUser) {
//         return NextResponse.json({ error: 'Seo not found' }, { status: 404 });
//       }
  
//       const hasUpdates = requestBody.pageName !== existingUser.pageName || requestBody.pageUrl !== existingUser.pageUrl || requestBody.seoTitle !== existingUser.seoTitle || requestBody.seoDescription !== existingUser.seoDescription || requestBody.seoKeywords !== existingUser.seoKeywords || requestBody.ogTitle !== existingUser.ogTitle || requestBody.ogUrl !== existingUser.ogUrl || requestBody.ogType !== existingUser.ogType || requestBody.ogImageUrl !== existingUser.ogImageUrl || requestBody.status !== existingUser.status  ;
  
//       if (hasUpdates) {
//         const version = existingUser.version + 1;
//         const updatedFields = {
//             pageName: requestBody.pageName,
//             pageUrl: requestBody.pageUrl,
//             seoTitle : requestBody.seoTitle,
//             seoDescription : requestBody.seoDescription,
//             seoKeywords : requestBody.seoKeywords,
//             ogTitle: requestBody.ogTitle,
//             ogUrl: requestBody.ogUrl,
//             ogType: requestBody.ogType,
//             ogImageUrl : requestBody.ogImageUrl,
//             status :requestBody.status
//         };
  
//         let updateHistory = existingUser.updateHistory;
  
//         // Check if the initial version data is already present in updateHistory
//         const initialVersionData = {
//           version: 1,
//           updatedFields: {
//             pageName: existingUser.pageName,
//             pageUrl: existingUser.pageUrl,
//             seoTitle : existingUser.seoTitle,
//             seoDescription : existingUser.seoDescription,
//             seoKeywords : existingUser.seoKeywords,
//             ogTitle: existingUser.ogTitle,
//             ogUrl: existingUser.ogUrl,
//             ogType: existingUser.ogType,
//             ogImageUrl : existingUser.ogImageUrl,
//             status :existingUser.status

//           },
//           updatedAt: existingUser.createdAt,
//           _id: existingUser._id,
//         };
  
//         // Ensure the initial version (version 1) data is in updateHistory
//         if (!updateHistory.some((entry) => entry.version === 1)) {
//           updateHistory = [initialVersionData, ...updateHistory];
//         }
  
//         // Add the current update to updateHistory
//         const currentUpdate = {
//           version,
//           updatedFields,
//           updatedAt: new Date(),
//           _id: existingUser._id,
//         };
  
//         updateHistory = [currentUpdate, ...updateHistory];
  
//         existingUser.trackUpdate(version, updatedFields);
//         existingUser.pageName = requestBody.pageName;
//         existingUser.pageUrl = requestBody.pageUrl;
//         existingUser.seoTitle = requestBody.seoTitle;
//         existingUser.seoDescription = requestBody.seoDescription;
//         existingUser.seoKeywords = requestBody.seoKeywords;
//         existingUser.ogTitle = requestBody.ogTitle;
//         existingUser.ogUrl = requestBody.ogUrl;
//         existingUser.ogType = requestBody.ogType;
//         existingUser.ogImageUrl = requestBody.ogImageUrl;
//         existingUser.status = requestBody.status;
//         existingUser.version = version;
//         existingUser.updateHistory = updateHistory;
//       }
  
//       await existingUser.save();
  
//       return NextResponse.json({ message: 'Seo updated successfully', updatedUser: existingUser }, { status: 200 });
//     } catch (error) {
//       console.error('Error updating seo:', error);
//       return NextResponse.json({ error: 'Error updating Seo' }, { status: 500 });
//     }
//   }