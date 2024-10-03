import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import ContactUs from "../../../../../models/contactUs";
import { Vollkorn } from "next/font/google";
import auth from '../../../../../middleware/adminauth';
import { headers } from "next/headers";




export async function GET(request) {
    try {

//auth implementation
const headersList = headers();
const referer = headersList.get("authorization");
console.log(referer,"aaaa");
const verifytoken = await auth(referer);
console.log("verifytoken", verifytoken);


      await connectMongoDB();
      const search = request.nextUrl.searchParams.get("search");
  
      let query = {};
  
      if (search) {
        const regexSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
        // Remove non-numeric characters
        const combinedPhoneNo = regexSearch.replace(/\D/g, '');
  
        // Build an array with the phone number and its variant with a leading '+'
        const phoneNumbers = [combinedPhoneNo, `+${combinedPhoneNo}`];
        query.$or = [
            { name: { $regex: new RegExp(regexSearch, 'i') } },
            { email: { $regex: new RegExp(regexSearch, 'i') } },
            {
              combinedPhoneNo: {
                $in: phoneNumbers
              }
            },
          ];
      }

      console.log(query)
  
      const contacts = await ContactUs.find(query).sort({ createdAt: -1 });
  
      return NextResponse.json(
        {
          message: "Contacts retrieved successfully",
          contacts,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      if(error.authenticationError){
        return NextResponse.json(
                { message: error.message , error: error.message },
                { status: error.status }
              );
      }else{
      return NextResponse.json(
        { error: true, message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    }
  }

// catch (error) {
  //   console.error('Error fetching leads:', error);
  //   if(error.authenticationError){
  //     return NextResponse.json(
  //       { message: error.message , error: error.message },
  //       { status: error.status }
  //     );
  //   }else{
  //     return NextResponse.json(
  //       { message: 'Failed to fetch leads', error: error.message },
  //       { status: 500 }
  //     );
  //   }
    
  // }



// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid'); // For generating a unique filename

// export async function GET(request) {
//     try {
//         await connectMongoDB();
//         const search = request.nextUrl.searchParams.get("search");

//         let query = {};

//         if (search) {
//             const regexSearch = search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
//             const combinedPhoneNo = regexSearch.replace(/\D/g, '');
//             const phoneNumbers = [combinedPhoneNo, `+${combinedPhoneNo}`];
//             query.$or = [
//                 { name: { $regex: new RegExp(regexSearch, 'i') } },
//                 { email: { $regex: new RegExp(regexSearch, 'i') } },
//                 {
//                     combinedPhoneNo: {
//                         $in: phoneNumbers
//                     }
//                 },
//             ];
//         }

//         const contacts = await ContactUs.find(query);

//         console.log('before csv')

//         // Create a CSV string from the contact data
//         const csvData = contacts.map(contact => {
//             return `${contact.name},${contact.email},${contact?.question},${contact?.message},${contact.combinedPhoneNo}`;
//         }).join('\n');

//         console.log('csvData',csvData)

//         // Generate a unique filename for the CSV file
//         const fileName = `contacts_${uuidv4()}.csv`;

//         console.log('filename', fileName)
//         const filePath = path.join('public/upload/csvfiles', fileName); // Update the path as needed
//         console.log('filePath', filePath)

//         // Write the CSV data to the file
//         fs.writeFileSync(filePath, csvData);

//         // Create a download link for the CSV file
//         const downloadLink = `http://localhost:3000/${fileName}`; // Update with your server's URL

//         console.log(downloadLink);

//         return NextResponse.json(
//             {
//                 message: "Contacts retrieved successfully",
//                 downloadLink: downloadLink,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json(
//             { error: true, message: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }
