import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import ContactUs from "../../../../models/contactUs";
import Joi from "joi";
import userHTML from "../../../../common/userHtml";
import adminHTML from "../../../../common/adminHtml";
import auth from '../../../../middleware/adminauth';
import { headers } from "next/headers";
import { SendMailClient } from "zeptomail";



export async function POST(request) {
  try {
    await connectMongoDB();
    const requestBody = await request.json(); // Parse the entire request body
    console.log(requestBody);

    let modifiedUserHTML;
    let modifiedAdminHTML;
    

    modifiedUserHTML = userHTML.replace(/{name}/g, requestBody.name);
    modifiedAdminHTML = adminHTML.replace(/{name}/g, "Admin");

    modifiedUserHTML = modifiedUserHTML.replace(
      /{comment}/g,
      `Thank you for showing interest in AccioESOPs.  One of our experts will get in touch with you soon. 

        For any query, reach out to us at +918040245425
        <br>
      <br>
      Regards
      <br>
      Team AccioESOPs

       `
    );
    modifiedAdminHTML = modifiedAdminHTML.replace(
      /{comment}/g,
      `A founder is showing interest in AccioESOPs.
      <br>
      <br>
      Here are the details:
      

      <table style="width:100%;">
      <tr>
          <td>Name:</td>
          <td><strong>${requestBody.name}</strong></td>
      </tr>
      <tr>
          <td>Email:</td>
          <td><strong>${requestBody.email}</strong></td>
      </tr>
      <tr>
          <td>Phone:</td>
          <td><strong>${requestBody.countryCode}${requestBody.phone}</strong></td>
      </tr>
  </table>

       `
    );

    
    await ContactUs.create(requestBody); // Pass the entire body object

    
    const useremail = requestBody.email;
    const adminEmail= process.env.ADMIN_EMAIL;
    const emailAddresses = [`${useremail}`, `${adminEmail}`];

    const url = process.env.ZEPTO_MAIL_URL;
    const token = process.env.ZEPTO_MAIL_TOKEN;
    let client = new SendMailClient({ url, token });


    for (const email of emailAddresses) {
      // Create a copy of htmlContent for each recipient
      
      console.log(email);
      let emailContent;
      let final_subject;
      if (email === adminEmail) {
        // Modify the emailContent for 'rupanshi.d@lawsikho.in'
        emailContent = modifiedAdminHTML; // Replace with appropriate content
        final_subject="Founders have expressed interest or have questions"
      } else {
        emailContent = modifiedUserHTML;
        final_subject="Thank you for reaching out to the AccioESOPs team"
      }

      client
        .sendMail({
          from: {
            address: "noreply@accioesops.com",
            name: "accioESOPs",
          },
          to: [
            {
              email_address: {
                address: `${email}`,
              },
            },
          ],
          subject: `${final_subject}`,
          htmlbody: `${emailContent}`,
        })
        .then((resp) => console.log("success"))
        .catch((error) => console.log("error"));
    }

    return NextResponse.json(
      { error: false, message: "Data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "internal server error", error },
      { status: 500 }
    );
  }
}

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
    const page = parseInt(request.nextUrl.searchParams.get("page") || 1);
    const pageSize = parseInt(request.nextUrl.searchParams.get("limit") || 10);
    const sourceFilter = request.nextUrl.searchParams.getAll("source");

    let query = {};

    if (sourceFilter.length > 0) {
      // If there are multiple source filters, build an array for the query
      query.source = { $in: sourceFilter };
    }

    if (search) {
      const regexSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

      // Remove non-numeric characters
      const combinedPhoneNo = regexSearch.replace(/\D/g, "");

      // Build an array with the phone number and its variant with a leading '+'
      const phoneNumbers = [combinedPhoneNo, `+${combinedPhoneNo}`];
      query.$or = [
        { name: { $regex: new RegExp(regexSearch, "i") } },
        { email: { $regex: new RegExp(regexSearch, "i") } },
        { message: { $regex: new RegExp(regexSearch, "i") } },
        {
          combinedPhoneNo: {
            $in: phoneNumbers,
          },
        },
      ];
    }

    // Calculate the skip value based on the page and page size
    const skip = (page - 1) * pageSize;

    const totalContacts = await ContactUs.countDocuments(query);

    const contacts = await ContactUs.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const totalPages = Math.ceil(totalContacts / pageSize);

    return NextResponse.json(
      {
        message: "Contacts retrieved successfully",
        contacts,
        pagination: {
          page,
          totalPages,
          totalRecords: totalContacts,
          limit: pageSize,
        },
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
      { error: true, message: "Internal server error",error: error.message },
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